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

const AppData = function () {
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.expensesMont = 0;
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;

};

AppData.prototype.start = function () {

  btnStart.style.display = 'none';
  btnCancel.style.display = 'block';
  this.budget = +salaryAmount.value;
  
  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();
  this.showResult();
  this.lockInput();
};

AppData.prototype.showResult = function () { // Выводим все рассчёты
  const _this = this;
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = this.getTargetMonth();
  incomePeriodValue.value = this.calcPeriod();
  periodSelect.addEventListener('change', function () {
    periodAmount.textContent = periodSelect.value;
    incomePeriodValue.value = _this.calcPeriod()
  });
};

AppData.prototype.addIncomeBlock = function () { // Добавляем поля для ввода доп.заработка
  let clonIncomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(clonIncomeItem, btnIncomePlus);
  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length === 3) {
    btnIncomePlus.style.display = 'none';
  }
};

AppData.prototype.addExpensesBlock = function () { // Добавляем поля для ввода доп.расходов
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpensesPlus);
  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length === 3) {
    btnExpensesPlus.style.display = 'none';
  }
};

AppData.prototype.getExpenses = function () { // Выводим расходы:значения
  const _this = this;
  expensesItems.forEach(function (item) {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      _this.expenses[itemExpenses] = +cashExpenses;
    }
  });
};

AppData.prototype.getIncome = function () {
  const _this = this;
  incomeItems.forEach(function (item) {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if (itemIncome !== '' && cashIncome !== '') {
      _this.income[itemIncome] = +cashIncome;
    }
  });
  for (let key in this.income) {
    this.incomeMonth += +this.income[key]
  }
};

AppData.prototype.getAddExpenses = function () {
  let addExpenses = additionalExpensesItem.value.split(',');
  const _this = this;
  addExpenses.forEach(function (item) {
    item = item.trim();
    if (item !== '') {
      _this.addExpenses.push(item);
    }
  })
};

AppData.prototype.getAddIncome = function () {
  const _this = this;
  additionalIncomeItem.forEach(function (item) {
    let itemValue = item.value.trim();
    if (itemValue !== '') {
      _this.addIncome.push(itemValue);
    }
  })
};

AppData.prototype.getExpensesMonth = function () { // Сумма обязательных расходов за месяц
  for (let key in this.expenses) {
    this.expensesMonth += +this.expenses[key]
  }
  return this.expensesMonth;
};

AppData.prototype.getBudget = function () { // Считаем бюджет на месяц/день
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.ceil(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function () { // Период, за который цель будет достигнута
  return Math.ceil(targetAmount.value / this.budgetMonth);
};

AppData.prototype.getStatusIncome = function () { // Выводим уровень дохода
  if (this.budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  } else if (this.budgetDay < 1200 && this.budgetDay >= 600) {
    return ('У вас средний уровень дохода');
  } else if (this.budgetDay < 600 && this.budgetDay > 0) {
    return ('К сожалению, у вас уровень дохода ниже среднего');
  } else {
    return ('Что то пошло не так');
  };
};

AppData.prototype.getInfoDeposit = function () {
  if (this.deposit) {
    do {
      this.percentDeposit = prompt('Какой годовой процент?', 10);
    } while (!isNumber(this.percentDeposit));
    do {
      appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
    } while (!isNumber(this.moneyDeposit));
  }
};

AppData.prototype.calcPeriod = function () { // Считаем накопления за определённый период
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.getPeriod = function () {
  return periodAmount.textContent = periodSelect.value;
};

AppData.prototype.lockInput = function () {
  let inputTypeText = document.querySelectorAll('[type="text"]');
  inputTypeText.forEach(function (item) {
    item.disabled = true;
  });
  let btnPlus = document.querySelectorAll('.btn_plus');
  btnPlus.forEach(function (item) {
    item.disabled = true;
  });
  return resultTotal.disabled = false;
};

AppData.prototype.reset = function () {
  location.reload();
};

AppData.prototype.eventListenerAll = function () {

  btnStart.disabled = true;
  salaryAmount.addEventListener('input', function (event) {
    if (event.target.value.trim() === '') {
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
    }
  });
  btnStart.addEventListener('click', this.start.bind(this));
  btnIncomePlus.addEventListener('click', this.addIncomeBlock);
  btnExpensesPlus.addEventListener('click', this.addExpensesBlock);
  periodSelect.addEventListener('input', this.getPeriod);
  btnCancel.addEventListener('click', this.reset)
};


const appData = new AppData();

appData.eventListenerAll();

console.log(appData);

// btnStart.addEventListener('click', appData.start);
// btnIncomePlus.addEventListener('click', appData.addIncomeBlock);
// btnExpensesPlus.addEventListener('click', appData.addExpensesBlock);
// periodSelect.addEventListener('input', appData.getPeriod);



/*
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