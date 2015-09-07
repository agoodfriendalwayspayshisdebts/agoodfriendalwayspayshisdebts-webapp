"use strict";

/* @ngInject */
function ResultDetailsController($stateParams, Results) {
  var model = this;

  activate();

  function activate() {
    model.loading = true;
    Results.get($stateParams.id).then(function (data) {
      model.loading = false;
      model.result = data;
    });
  }
}

module.exports = ResultDetailsController;