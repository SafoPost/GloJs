'use strict';
let question = prompt('Ваш месячный доход?');
let question2 = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let question3 = confirm('Есть ли у вас депозит в банке?')
let money = question;
let income = 'Фриланс';
let addExpenses = question2;
let deposit = question3;
let mission = 300000;
let period = 10;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцам');
console.log('Цель - заработать ' + mission + ' рублей');
addExpenses.toLowerCase();
console.log(addExpenses.split(', '));

let budgetDay = money / 30;
console.log('Бюджет на день: ' + budgetDay);

let expenses1 = prompt('Введите обязательную статью расходов?', 'Коммунальные платежи');
let amount1 = prompt('Во сколько это обойдется?', '2000');
let expenses2 = prompt('Введите обязательную статью расходов?', 'Продукты');
let amount2 = prompt('Во сколько это обойдется?', '10000');

let budgetMonth = money - amount1 - amount2;
console.log('Бюджет на месяц с учетом расходов: ' + budgetMonth + ' рублей');

mission /= budgetMonth;
let newMission = Math.floor(mission);
console.log('Цель будет достигнута за ' + newMission + ' месяцев');

budgetDay = budgetMonth / 30;
let newBudgetDay = Math.ceil(budgetDay);
console.log('Бюджет на день с учетом расходов: ' + newBudgetDay + ' рублей');

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay < 1200, budgetDay >= 600) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay < 600, budgetDay > 0) {
  console.log('К сожалению, у вас уровень дохода ниже среднего');
} else if (budgetDay < 0) {
  console.log('Что то пошло не так');
};