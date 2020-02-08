'use strict';

// кнопки рассчитать/сбросить
let btnStart = document.getElementById('start');
let btnCancel = document.getElementById('cancel');

// кнопки "плюс"
let btnIncomePlus = document.getElementsByTagName('button')[0];
let btnExpensesPlus = document.getElementsByTagName('button')[1];


// "галочка" депозит
let depositCheck = document.querySelector('#deposit-check');

// возможные расходы
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');

// поля рассчетов
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];


// поля ввода
let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let incomeItems = document.querySelectorAll('.income-items');
let expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');
let targetAmount = document.querySelector('.target-amount');
let periodTitle = document.querySelector('.period-title');
let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');

// Инпуты рассчетов
let resultTotal = document.querySelectorAll('.result-total');


let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
};

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  expensesMonth: 0,
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  start: function () {

    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();
    this.blockInput();

  },
  showResult: function () { // Выводим все рассчёты
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();

    periodSelect.addEventListener('change', function () {
      periodAmount.textContent = periodSelect.value;
      incomePeriodValue.value = appData.calcPeriod()
    });

  },
  addIncomeBlock: function () { // Добавляем поля для ввода доп.заработка
    let clonIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(clonIncomeItem, btnIncomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      btnIncomePlus.style.display = 'none';
    }
  },
  addExpensesBlock: function () { // Добавляем поля для ввода доп.расходов
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      btnExpensesPlus.style.display = 'none';
    }
  },
  getExpenses: function () { // Выводим расходы:значения
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = +cashExpenses;
      }
    }, this);
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = +cashIncome;
      }
    }, this);
    for (let key in this.income) {
      appData.incomeMonth += +appData.income[key]
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    }, this)
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    }, this)
  },
  getExpensesMonth: function () { // Сумма обязательных расходов за месяц
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
    return this.expensesMonth;
  },
  getBudget: function () { // Считаем бюджет на месяц/день
    appData.budgetMonth = (appData.budget + appData.incomeMonth - appData.expensesMonth);
    appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
  },
  getTargetMonth: function () { // Период, за который цель будет достигнута
    return Math.ceil(targetAmount.value / appData.budgetMonth);
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
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', 10);
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(appData.moneyDeposit));
    }
  },
  calcPeriod: function () { // Считаем накопления за определённый период
    return appData.budgetMonth * periodSelect.value;
  },
  getPeriod: function () {
    return periodAmount.textContent = periodSelect.value;
  },
  blockInput: function () {
    let inputTypeText = document.querySelectorAll('[type="text"]');
    inputTypeText.forEach(function (item) {
      item.disabled = true;
    });
    let btnPlus = document.querySelectorAll('.btn_plus');
    btnPlus.forEach(function (item) {
      item.disabled = true;
    });
    return resultTotal.disabled = false;
  },
  reset: function () {
    location.reload();
  }

};


btnStart.addEventListener('click', function () {
  if (salaryAmount.value.trim() === '') {
    btnStart.disabled = true;
  } else {
    btnStart.disabled = false;
    appData.start();

    btnStart.style.display = 'none';
    btnCancel.style.display = 'block';
    console.log(appData.incomeMonth);
    btnCancel.addEventListener('click', appData.reset)
  }
});

btnIncomePlus.addEventListener('click', appData.addIncomeBlock);
btnExpensesPlus.addEventListener('click', appData.addExpensesBlock);

periodSelect.addEventListener('input', appData.getPeriod);



/* if (appData.getTargetMonth() > 0) {
  console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев');
} else {
  console.log('К сожалению, цель не будет достигнута');
};

for (let key in appData) {
  console.log('Наша программа включает в себя данные:' +
    '\n дополнительный заработок: ' + appData.income +
    '\n обязательные расходы за месяц: ' + appData.expenses +
    '\n возможные расходы за месяц: ' + appData.addExpenses +
    '\n наличие депозита в банке: ' + appData.deposit +
    '\n цель: ' + appData.mission +
    '\n период, за который цель будет достигнута: ' + appData.period +
    '\n доход за месяц: ' + appData.budget +
    '\n бюджет на день: ' + appData.budgetDay +
    '\n бюджет на месяц: ' + appData.budgetMonth +
    '\n сумма обязательных расходов за месяц: ' + appData.expensesMonth);
}; */