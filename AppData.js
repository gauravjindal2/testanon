"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * アプリのデータを保持するクラス
 * @param string kind ios or android
 */
class AppData {
  constructor(kind, appId) {
    this.kind = kind;
    this.appId = appId;
    this.name = "";
    this.url = "";
    this.recentId = "";
  }
}
exports.default = AppData;