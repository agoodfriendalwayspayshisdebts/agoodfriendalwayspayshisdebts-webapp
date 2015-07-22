"use strict";

var angular = require("angular");

var ajaxModule = angular.module("ajax", [require("../internal")]);

ajaxModule
  .factory("AjaxInterceptorService", require("./service/ajax_interceptor_service"))
  .directive("elementValidation", require("./directive/element_validation_directive"))
  .directive("disableOnRequest", require("./directive/disable_on_request_directive"));

ajaxModule.config(["$httpProvider", function ($httpProvider) {
  $httpProvider.interceptors.push("AjaxInterceptorService");
}]);

module.exports = ajaxModule.name;