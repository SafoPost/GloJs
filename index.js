'use strict';

// кнопки рассчитать/сбросить
const btnStart = document.getElementById('start');
const btnCancel = document.getElementById('cancel');

// кнопки "плюс"
const btnIncomePlus = document.getElementsByTagName('button')[0];
const btnExpensesPlus = document.getElementsByTagName('button')[1];

// "галочка" депозит
const depositCheck = document.getElementById('deposit-check');

// возможные/обязательные расходы
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');

// поля рассчетов
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];


// поля ввода
const salaryAmount = document.querySelector('.salary-amount');
let incomeItems = document.querySelectorAll('.income-items');
let incomeTitle = document.querySelectorAll('.income-title');
let incomeAmount = document.querySelectorAll('.income-amount');
let expensesItems = document.querySelectorAll('.expenses-items');
let expensesTitle = document.querySelector('.expenses-title');
let expensesAmount = document.querySelector('.expenses-amount');
const targetAmount = document.querySelector('.target-amount');
const periodTitle = document.querySelector('.period-title');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');

// депозит
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');


// Инпуты рассчетов
const resultTotal = document.querySelectorAll('.result-total');


const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);

class AppData {
  constructor() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
  }
  start() {
    btnStart.style.display = 'none';
    btnCancel.style.display = 'block';
    this.budget = +salaryAmount.value;


    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
    this.getBudget();
    this.showResult();
    this.lockInput();
  }
  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('change', () => {
      periodAmount.textContent = periodSelect.value;
      incomePeriodValue.value = this.calcPeriod()
    });
  }
  checkInput() {
    let numInputs = document.querySelectorAll('[placeholder="Сумма"]');
    numInputs.forEach((item) => {
      item.addEventListener('input', function () {
        if (!isNumber(this.value)) {
          this.value = '';
        }
      })
    })
  }
  addIncomeBlock() { // Добавляем поля для ввода доп.заработка
    let clonIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(clonIncomeItem, btnIncomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      btnIncomePlus.style.display = 'none';
    }
    this.checkInput();
  }
  addExpensesBlock() { // Добавляем поля для ввода доп.расходов
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      btnExpensesPlus.style.display = 'none';
    }
    this.checkInput();
  }
  getIncome() {
    incomeItems.forEach((item, index) => {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome + index] = +cashIncome;
      }
    });
    for (let key in this.income) {
      this.incomeMonth += +this.income[key]
    }
  }
  getExpenses() { // Выводим расходы:значения
    expensesItems.forEach((item, index) => {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses + index] = +cashExpenses;
      }
    });
  }
  getAddIncome() {
    additionalIncomeItem.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }
  getAddExpenses() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  }

  getExpensesMonth() { // Сумма обязательных расходов за месяц
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key]
    }
  }
  getBudget() { // Считаем бюджет на месяц/день
    const manthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + manthDeposit;
    this.budgetDay = Math.ceil(this.budgetMonth / 30)
  }
  getTargetMonth() { // Период, за который цель будет достигнута
    return Math.ceil(targetAmount.value / this.budgetMonth);
  }
  getStatusIncome() { // Выводим уровень дохода
    if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (this.budgetDay < 1200 && this.budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay < 600 && this.budgetDay > 0) {
      return ('К сожалению, у вас уровень дохода ниже среднего');
    } else {
      return ('Что то пошло не так');
    };
  }
  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }
  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';
      depositPercent.value = 5;
      depositPercent.addEventListener('input', function () {
        if (!isNumber(depositPercent.value)) {
          depositPercent.value = '';
        }
        if (depositPercent.value < 0 || depositPercent.value > 100) {
          depositPercent.value = '';
          alert('Введите число от 1 до 100');
        } else {
        }
      })
    } else {
      depositPercent.style.display = 'none';
      depositPercent.value = valueSelect;
    }
  }
  calcPeriod() { // Считаем накопления за определённый период
    return this.budgetMonth * periodSelect.value;
  }
  getPeriod() {
    return periodAmount.textContent = periodSelect.value;
  }
  lockInput() {
    let inputTypeText = document.querySelectorAll('[type="text"]');
    inputTypeText.forEach(function (item) {
      item.disabled = true;
    });
    let btnPlus = document.querySelectorAll('.btn_plus');
    btnPlus.forEach(function (item) {
      item.disabled = true;
    });
    return resultTotal.disabled = false;
  }
  reset() {
    location.reload();
  }
  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);

    }
  }
  eventListenerAll() {
    this.checkInput();
    btnStart.disabled = true;
    salaryAmount.addEventListener('input', function (event) {
      if (event.target.value.trim() === '' && depositPercent.value < 0 || depositPercent.value > 100) {
        btnStart.disabled = true;
      } else {
        btnStart.disabled = false;
      }
    });
    btnStart.addEventListener('click', this.start.bind(this));
    btnIncomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
    btnExpensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
    periodSelect.addEventListener('input', this.getPeriod);
    btnCancel.addEventListener('click', this.reset);

    depositCheck.addEventListener('click', this.depositHandler.bind(this))
  }
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