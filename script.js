'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
};

let money;

let start = function () {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
};

start();

let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let income = 'Фриланс';
let mission = 300000;
let period = 10;

let showTypeOf = function (data) {
  console.log(data, typeof (data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.toLowerCase().split(', '));

let expenses = [];

let getExpensesMonth = function () {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов?');
    sum += prompt('Во сколько это обойдется?');
    while (!isNumber(sum)) {
      sum = prompt('Во сколько это обойдется?');
    };
  };
  console.log(expenses);
  return sum;
};

let expensesMonth = getExpensesMonth();

console.log('Обязательные расходы за месяц: ' + expensesMonth);

function getAccumulatedMonth() {
  return money - expensesMonth;
};

getAccumulatedMonth();

let accumulatedMonth = getAccumulatedMonth();
let targetMonth;

function getTargetMonth() {
  targetMonth = Math.floor(mission / accumulatedMonth);
  if (targetMonth > 0) {
    console.log('Цель будет достигнута за ' + targetMonth + ' месяцев');
  } else {
    console.log('К сожалению, цель не будет достигнута');
  }
};

getTargetMonth();

let budgetDay = accumulatedMonth / 30;
let newBudgetDay = Math.ceil(budgetDay);
console.log('Бюджет на день с учетом расходов: ' + newBudgetDay + ' рублей');

let getStatusIncome = function () {
  if (budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  } else if (budgetDay < 1200, budgetDay >= 600) {
    return ('У вас средний уровень дохода');
  } else if (budgetDay < 600, budgetDay > 0) {
    return ('К сожалению, у вас уровень дохода ниже среднего');
  } else {
    return ('Что то пошло не так');
  };
};
console.log(getStatusIncome());