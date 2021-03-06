"use strict";

var angular = require("angular");

module.exports = function () {
  /* @ngInject */
  angular.module("app.notification")
    .config(configure);

  function configure(NotificationProvider) {
    NotificationProvider.setOptions({
      templateUrl: "/templates/notification/default",
      delay: 5000
    });
  }
};