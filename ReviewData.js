"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ReviewData;
/**
 * 表示するレビュー情報を保持するオブジェクト
 *
 * @param param
 * @constructor
 */
function ReviewData(param) {
  this.updated = param.updated;
  this.reviewId = param.reviewId;
  this.title = param.title;
  this.titleLink = param.titleLink;
  this.message = param.message;
  this.version = param.version;
  this.rating = param.rating;
};