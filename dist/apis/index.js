"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndexAsync = void 0;

var getIndexAsync = function getIndexAsync(url) {
  return fetch(url).then(function (response) {
    return response.json();
  });
};

exports.getIndexAsync = getIndexAsync;