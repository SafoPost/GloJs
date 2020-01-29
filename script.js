'use strict';
let money = +prompt('Ваш месячный доход?');
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


let expenses1 = prompt('Введите обязательную статью расходов?', 'Коммунальные платежи');
let amount1 = +prompt('Во сколько это обойдется?', 2000);
let expenses2 = prompt('Введите обязательную статью расходов?', 'Продукты');
let amount2 = +prompt('Во сколько это обойдется?', 10000);

function getExpensesMonth(amount1, amount2) {
  return amount1 + amount2;
};
console.log(getExpensesMonth(amount1, amount2));

addExpenses.toLowerCase();
console.log(addExpenses.split(', '));

function getAccumulatedMonth() {
  return money - getExpensesMonth(amount1, amount2);
};

getAccumulatedMonth();

let accumulatedMonth = getAccumulatedMonth();

function getTargetMonth() {
  return Math.floor(mission / accumulatedMonth);
};

console.log('Цель будет достигнута за ' + +getTargetMonth() + ' месяцев');

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