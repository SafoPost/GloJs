


'use strict';
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;

let start = function () {
  do {
    money = prompt('Ваш месячный доход?', '').trim();
  }
  while (!isNumber(money));
};
start();


let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 100000,
  period: 12,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  getExpensesMonth: function () {
    let sum = 0;
    for (let key in appData.expenses) {
      sum += appData.expenses[key];
    }
    return sum;
  },
  getBudget: function () {
    let proffit = (+money - +appData.getExpensesMonth());
    appData.budgetMonth = proffit;
    let dayIncome = Math.floor(appData.budgetMonth / 30);
    appData.budgetDay = dayIncome;
    return proffit.toFixed(1);
  },
  getTargetMonth: function () {
    let target = appData.mission / appData.getBudget();
    return target;
  },
  asking: function () {
    let amount;
    for (let i = 0; i < 2; i++) {
      let question = prompt('Введите обязательную статью расходов?', 'Коммунальные платежи');
      do {
        amount = prompt('Во сколько это обойдется?');
      }
      while (!isNumber(amount));
      appData.expenses[question] = +amount;
    }
    appData.addExpenses = prompt('Перечислите возможные затраты', 'Например: Путешествия, развлечения').toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у Вас депозит в банке?');
  },

  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return ('Ваш уровень дохода высокий');
    } else if (appData.budgetDay < 1200 && appData.budgetDay >= 600) {
      return ('Ваш уровень дохода средний');
    } else if (appData.budgetDay < 600 && appData.budgetDay > 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (appData.budgetDay <= 0) {
      return ('Что-то пошло не так');
    }
  }
};

appData.asking();


console.log(money);

appData.expensesMonth = appData.getExpensesMonth();
console.log('Расходы на месяц ', appData.expensesMonth);

console.log(appData.addExpenses);
console.log(appData.deposit);
console.log('Цель заработать ' + appData.mission + ' рублей');
console.log('Период равен ' + appData.period + ' Месяцев');

let targetMonth = appData.getTargetMonth().toFixed(1);
if (targetMonth > 0) {
  console.log('Цель будет достигнута за ' + Math.ceil(targetMonth) + ' месяцев');
} else if (targetMonth <= 0) {
  console.log('Цель не будет достигнута');
}

for (let key in appData) {
  console.log('Свойство ' + key + ' значение ' + appData[key]);
}




