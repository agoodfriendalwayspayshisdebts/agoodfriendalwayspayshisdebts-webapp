"use strict";

var _ = require("underscore");

/* @ngInject */
function ExpenseService(Expenses) {
  var service = this;

  service.expenseCount = 0;
  service.expenses = [];
  service.skip = 0;

  service.addExpense = addExpense;
  service.deleteExpense = deleteExpense;
  service.initializeForEvent = initializeForEvent;
  service.loadMoreFrom = loadMoreFrom;

  var expenseBatchSize = 4;

  function addExpense(eventId, expense) {
    return Expenses.add(eventId, expense).then(function (addedExpense) {
      service.skip++;
      service.expenses.push(addedExpense);
      service.expenseCount++;
      return addedExpense;
    });
  }

  function deleteExpense(eventId, expenseId) {
    return Expenses.delete(eventId, expenseId).then(function () {
      service.skip--;
      var position = _.findIndex(service.expenses, function (expense) {
        return expense.id === expenseId;
      });
      service.expenses.splice(position, 1);
      service.expenseCount--;
    });
  }

  function initializeForEvent(eventId) {
    // So expenses are not displayed two times before masonry reloads after route change
    service.expenses = [];
    return Expenses.fetchWithCount(eventId, 0, expenseBatchSize).then(function (data) {
      service.skip = 0;
      service.expenseCount = data.expenseCount;
      service.expenses = data.expenses;
      return data;
    });
  }

  function loadMoreFrom(eventId) {
    service.skip += expenseBatchSize;
    return Expenses.fetch(eventId, service.skip, expenseBatchSize).then(function (expenses) {
      _.each(expenses.reverse(), function (expense) {
        service.expenses.unshift(expense);
      });
      return expenses;
    });
  }
}

Object.defineProperty(ExpenseService.prototype,
  "allLoaded", {
    enumerable: true,
    cofigurable: false,
    get: function () {
      return this.expenses.length === this.expenseCount;
    }
  }
);

module.exports = ExpenseService;
