'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
};

let money;
const start = function () {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money))
};

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 300000,
  period: 10,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    let valueExpenses = 0;
    for (let i = 0; i < 2; i++) {
      let keyExpenses = prompt('Введите обязательную статью расходов?');
      do {
        valueExpenses = prompt('Во сколько это обойдется?');
      } while (!isNumber(valueExpenses));
      appData.expenses[keyExpenses] = +valueExpenses;
    };
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
  },
  getExpensesMonth: function () { // Сумма обязательных расходов за месяц
    let sum = 0;
    for (let key in appData.expenses) {
      sum += appData.expenses[key];
    }
    return sum;
  },
  getBudget: function () { // Считаем бюджет на месяц/день
    appData.budgetMonth = (appData.budget - appData.expensesMonth);
    appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
  },
  getTargetMonth: function () { // Период, за который цель будет достигнута
    appData.period = Math.floor(appData.mission / appData.budgetMonth);
    if (appData.period > 0) {
      console.log('Цель будет достигнута за ' + appData.period + ' месяцев');
    } else {
      console.log('К сожалению, цель не будет достигнута');
    }
  },
  getStatusIncome: function () { // Выводим уровень дохода
    if (appData.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (appData.budgetDay < 1200 && appData.budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    } else if (appData.budgetDay < 600 && appData.budgetDay > 0) {
      return ('К сожалению, у вас уровень дохода ниже среднего');
    } else {
      return ('Что то пошло не так');
    };
  }
};

appData.asking();

appData.expensesMonth = appData.getExpensesMonth();
console.log('Обязательные расходы за месяц: ' + appData.expensesMonth);

appData.getBudget();

appData.getTargetMonth();

console.log(appData.getStatusIncome());

for (let key in appData) {
  console.log('Наша программа включает в себя данные:' +
    '\n обязательные расходы за месяц: ' + appData.expenses() +
    '\n возможные расходы: ' + appData.addExpenses +
    '\n наличие депозита в банке: ' + appData.deposit +
    '\n цель: ' + appData.mission +
    '\n период, за который цель будет достигнута: ' + appData.period +
    '\n доход за месяц: ' + appData.budget +
    '\n бюджет на день: ' + appData.budgetDay +
    '\n бюджет на месяц: ' + appData.budgetMonth +
    '\n сумма обязательных расходов за месяц: ' + appData.expensesMonth);
};
