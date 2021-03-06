'use strict';

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _cron = require('cron');

var _Review = require('./Review');

var _Review2 = _interopRequireDefault(_Review);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.on('unhandledRejection', console.dir);

// モジュールの取り込み

const sqlite3 = require('sqlite3').verbose();

const CRON_TIME = _config2.default.cron.time;
const TIME_ZONE = _config2.default.cron.timeZone;
const DB_PATH = process.cwd() + "/reviewet.sqlite";

// 通知しない設定
let ignoreNotification = _config2.default.firstTimeIgnore;
let outputs = _config2.default.outputs;

// DB作成
const db = new sqlite3.Database(DB_PATH);
db.serialize(function () {
  db.run("CREATE TABLE IF NOT EXISTS review(" + "id TEXT, " + // レビューID（重複していたら登録しない）
  "kind TEXT, " + // アプリのOS種別
  "app_name TEXT, " + // アプリ名
  "title TEXT, " + // レビュータイトル
  "message TEXT, " + // レビュー内容
  "rating INTEGER, " + // 評価
  "updated TEXT, " + // レビュー投稿日（日付の文字列）
  "version TEXT, " + // レビューしたアプリのバージョン
  "create_date DATE, " + // 登録日
  "PRIMARY KEY (id, kind))");
});

try {
  //  const CronJob = require('cron').CronJob;
  new _cron.CronJob(CRON_TIME, function () {

    // 未設定の場合は全件表示
    if (outputs === null) {
      outputs = -1;
    }
    // 文字列から数値変換
    else {
        outputs = parseInt(outputs);
      }

    try {
      let app = new _Review2.default(outputs, ignoreNotification, _config2.default, db);
      app.main();
    } catch (e) {
      console.log("application error: " + e);
    }

    // 通知しない設定をオフにする
    ignoreNotification = false;
    outputs = -1;
  }, null, true, TIME_ZONE);
} catch (ex) {
  console.log("cron pattern not valid");
}