'use strict';

let btnStart = document.getElementById('start');
let buttonPlus = document.getElementsByTagName('button')[0];
let buttonPlusNext = document.getElementsByTagName('button')[1];
let depositCheck = document.querySelector('#deposit-check');
let incomeItems = document.querySelectorAll('.income-items');
let resultTotal = document.getElementsByClassName('result-total');
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let additionalIncomeValue = document.querySelector('.additional_income-value');
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];
let salaryAmount = document.querySelector('.salary-amount')
let incomeTitle = document.querySelector('.income-title')
let incomeAmount = document.querySelector('.income-amount')
let additionalIncomeItem = document.querySelectorAll('.additional_income-item')
let expensesTitle = document.querySelector('.expenses-title')
let expensesItems = document.querySelectorAll('.expenses-items')
let additionalExpensesItem = document.querySelector('.additional_expenses-item')
let depositCheck1 = document.querySelector('.deposit-check')
let depositAmount = document.querySelector('.deposit-amount')
let depositPercent = document.querySelector('.deposit-percent')
let targetAmount = document.querySelector('.target-amount')
let periodSelect = document.querySelector('.period-select')
let periodTitle = document.querySelector('.period-title');
let periodAmount = document.querySelector('.period-amount');
let cancel = document.getElementById('cancel');
let inputs = document.querySelectorAll('input');

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};







let appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function () {
    this.budget = +salaryAmount.value;
    this.getBlocked();
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();
    this.blockInput();

    if (appData.getTargetMonth().toFixed(1) > 0) {
      console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth().toFixed(1)) + ' месяцев');
    } else {
      console.log('Цель не будет достигнута');
    };
  },

  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('change', function () {
      periodAmount.textContent = periodSelect.value;
      incomePeriodValue.value = appData.calcPeriod()
    });
  },
  getBudget: function () {
    let proffit = (+appData.budget + appData.incomeMonth - +appData.expensesMonth);
    appData.budgetMonth = proffit;
    let dayIncome = Math.floor(appData.budgetMonth / 30);
    appData.budgetDay = dayIncome;
    return proffit.toFixed(1);
  },

  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
    return appData.expensesMonth;
  },

  getTargetMonth: function () {
    return targetAmount.value / appData.getBudget();


  },

  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonPlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      buttonPlus.style.display = 'none';

    }
  },

  addExpensesBlock: function () {

    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonPlusNext);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      buttonPlusNext.style.display = 'none';
    }
  },

  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });

  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = +cashIncome;
      }
    });
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    })
  },

  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
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
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', '10').trim();
      }
      while (isNaN(appData.percentDeposit) || appData.percentDeposit === '' && appData.percentDeposit !== null)
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 10000).trim();
      }
      while (isNaN(appData.moneyDeposit) || appData.moneyDeposit === '' && appData.moneyDeposit !== null)
    }
  },
  getPeriod: function () {
    return periodAmount.textContent = periodSelect.value;
  },
  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  },
  getBlocked: function () {
    inputs = document.querySelectorAll('input');
    inputs.forEach(function (item) {
      item.setAttribute('disabled', 0);
    })
    start.setAttribute('style', 'display: none');
    cancel.setAttribute('style', 'display: block');
    periodSelect.removeAttribute('disabled');
  },
  getReset: function (event) {
    inputs.forEach(function (item) {
      item.value = '';
      item.removeAttribute('disabled', 0);
    })
    periodSelect.value = 1;
    periodAmount.innerHTML = 1;
    buttonPlusNext.setAttribute('style', 'display: block;');
    buttonPlus.setAttribute('style', 'display: block;');
    for (let i = 1; i < expensesItems.length; i++) {
      let expenses = document.querySelector('.expenses');
      expenses.removeChild(expensesItems[i]);
    }
    if (incomeItems.length > 1) {
      for (let j = 0; j < incomeItems.length; j++) {
        incomeItems = document.querySelectorAll('.income-items');
        let incomes = document.querySelector('.income');
        incomes.removeChild(incomeItems[j]);
      }
    }
    cancel.setAttribute('style', 'display: none');
    start.setAttribute('style', 'display: block');
  },
  blockInput: function () {
    let inputTypeText = document.querySelectorAll('[type="text"]');
    inputTypeText.forEach(function (item) {
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

    btnCancel.addEventListener('click', appData.reset)
  }
});


buttonPlusNext.addEventListener('click', appData.addExpensesBlock);
buttonPlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', appData.getPeriod);


for (let key in appData) {
  console.log('Свойство ' + key + ' значение ' + appData[key]);
}


// start.addEventListener('click', appData.start.bind(appData));

// cancel.addEventListener('click', appData.getReset);

// if (appData.getTargetMonth().toFixed(1) > 0 ){ 
//   console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth().toFixed(1)) + ' месяцев');
// } else {
//   console.log('Цель не будет достигнута');
// };

// console.log(money);


// console.log('Расходы на месяц ', appData.expensesMonth);

// console.log(appData.addExpenses);    
// console.log(appData.deposit);
// console.log('Цель заработать ' + appData.mission + ' рублей');
// console.log('Период равен ' + appData.period + ' Месяцев');
// asking: function(){


//   // if(confirm('Есть ли у ва дополнительный заработок?')){
//   //   let itemIncome;
//   //   let cashIncome;

//   //   do {
//   //     itemIncome = prompt('Какой у вас дополнительный заработок?').trim();

//   //   }
//   //   while(!isNaN(itemIncome) && itemIncome !== null)
//   //   do{
//   //     cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', '5000').trim();
//   //   }
//   //   while(isNaN(cashIncome) || cashIncome === '' && cashIncome !== null);
//   //  appData.income[itemIncome] = cashIncome;
//   //  };   

//   // // let addExpenses = String(prompt('Перечислите выши расходы через запятую', 'Коммуналка, интернет, мобильная связь'));
//   // // addExpenses = addExpenses.split(', ');
//   // let interval = addExpenses.length
//   // let mas = [interval];

//   // for(let i = 0;i<addExpenses.length; i++) {   
//   //  mas[i] = addExpenses[i][0].toUpperCase() + addExpenses[i].slice(1);   
//   // }
//   // console.log(mas.join(', '))


//   // appData.deposit = confirm('Есть ли у Вас депозит в банке?');
// },


















// let btnStart = document.getElementById('start'); // кнопка рассчитать

// let btnIncomePlus = document.getElementsByTagName('button')[0];
// let btnExpensesPlus = document.getElementsByTagName('button')[1];

// let depositCheck = document.querySelector('#deposit-check');

// let additionalIncomeItem = document.querySelectorAll('.additional_income-item');

// let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
// let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
// let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
// let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
// let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
// let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
// let targetMonthValue = document.getElementsByClassName('target_month-value')[0];

// let salaryAmount = document.querySelector('.salary-amount');
// let incomeTitle = document.querySelector('.income-title');
// let incomeAmount = document.querySelector('.income-amount');
// let expensesTitle = document.querySelector('.expenses-title');
// // let expensesAmount = document.querySelector('.expenses-amount');
// let expensesItems = document.querySelector('.expenses-items');

// let additionalExpensesItem = document.querySelector('.additional_expenses-item');
// let depositAmount = document.querySelector('.deposit-amount');
// let depositPercent = document.querySelector('.deposit-percent');
// let targetAmount = document.querySelector('.target-amount');

// let isNumber = function (n) {
//   return !isNaN(parseFloat(n)) && isFinite(n)
// };

// let appData = {
//   budget: 0,
//   budgetDay: 0,
//   budgetMonth: 0,
//   income: {},
//   addIncome: [],
//   expenses: {},
//   expensesMonth: 0,
//   addExpenses: [],
//   deposit: false,
//   percentDeposit: 0,
//   moneyDeposit: 0,
//   mission: 300000,
//   period: 6,
//   start: function () {

//     if (salaryAmount.value === '') {
//       alert('Ошибка. Поле "месячный доход" должно быть заполнено!');
//       return;
//     };

//     appData.budget = salaryAmount.value;


//     appData.getExpenses();
//     appData.getExpensesMonth();
//     appData.getBudget();

//     appData.showResult();
//   },
//   showResult: function () {
//     budgetMonthValue.value = appData.budgetMonth;
//     budgetDayValue.value = appData.budgetDay;
//     expensesMonthValue.value = appData.expensesMonth;

//   },
//   addExpensesBlock: function () {
//     let cloneExpensesItem = expensesItems[0].cloneNode(true);
//     expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpensesPlus);
//     expensesItems = document.querySelectorAll('.expenses-items');
//     if (expensesItems.length === 3) {
//       btnExpensesPlus.style.display = 'none';
//     };
//   },
//   getExpenses: function () {
//     expensesItems.forEach(function (item) {
//       for (let i = 0; i < 2; i++) {
//         let itemExpenses = item.querySelector('.expenses-title').value;
//         let cashExpenses = item.querySelector('.expenses-amount').value;
//         if (itemExpenses !== '' && cashExpenses !== '') {
//           appData.expenses[itemExpenses] = +cashExpenses;
//         }
//       };
//     });
//   },
//   asking: function () {
//     if (confirm('Есть ли у вас дополнительный источник зароботка?')) {
//       let itemIncome;
//       do {
//         itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
//       } while (isNumber(itemIncome));
//       let cashIncome;
//       do {
//         cashIncome = prompt('Склолько в месяц вы на этом зарабатываете?', 10000);
//       } while (!isNumber(cashIncome));
//       appData.income[itemIncome] = cashIncome;
//     };
//     /* for (let i = 0; i < 2; i++) {
//       let keyExpenses;
//       do {
//         keyExpenses = prompt('Введите обязательную статью расходов?');
//       } while (isNumber(keyExpenses));
//       let valueExpenses = 0;
//       do {
//         valueExpenses = prompt('Во сколько это обойдется?');
//       } while (!isNumber(valueExpenses));
//       appData.expenses[keyExpenses] = +valueExpenses;
//     }; */
//     let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
//     appData.addExpenses = addExpenses.toLowerCase().split(', ');
//     for (let i = 0; i < appData.addExpenses.length; i++) {
//       appData.addExpenses[i] = appData.addExpenses[i].charAt(0).toUpperCase() + appData.addExpenses[i].substring(1);
//     };
//     console.log(appData.addExpenses);
//     appData.deposit = confirm('Есть ли у вас депозит в банке?');
//   },
//   getExpensesMonth: function () { // Сумма обязательных расходов за месяц
//     for (let key in appData.expenses) {
//       appData.expensesMonth += +appData.expenses[key];
//     }
//     return sum;
//   },
//   getBudget: function () { // Считаем бюджет на месяц/день
//     appData.budgetMonth = (appData.budget - appData.expensesMonth);
//     appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
//   },
//   getTargetMonth: function () { // Период, за который цель будет достигнута
//     return Math.floor(appData.mission / appData.budgetMonth);
//   },
//   getStatusIncome: function () { // Выводим уровень дохода
//     if (appData.budgetDay >= 1200) {
//       return ('У вас высокий уровень дохода');
//     } else if (appData.budgetDay < 1200 && appData.budgetDay >= 600) {
//       return ('У вас средний уровень дохода');
//     } else if (appData.budgetDay < 600 && appData.budgetDay > 0) {
//       return ('К сожалению, у вас уровень дохода ниже среднего');
//     } else {
//       return ('Что то пошло не так');
//     };
//   },
//   getInfoDeposit: function () {
//     if (appData.deposit) {
//       do {
//         appData.percentDeposit = prompt('Какой годовой процент?', 10);
//       } while (!isNumber(appData.percentDeposit));
//       do {
//         appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
//       } while (!isNumber(appData.moneyDeposit));
//     }
//   },
//   calcSavedMoney: function () {
//     return appData.budgetMonth * appData.period;
//   }
// };

// // appData.getInfoDeposit();
// // appData.calcSavedMoney();

// btnStart.addEventListener('click', appData.start);

// btnExpensesPlus.addEventListener('click', appData.addExpensesBlock);

// /* if (appData.getTargetMonth() > 0) {
//   console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев');
// } else {
//   console.log('К сожалению, цель не будет достигнута');
// };

// for (let key in appData) {
//   console.log('Наша программа включает в себя данные:' +
//     '\n дополнительный заработок: ' + appData.income +
//     '\n обязательные расходы за месяц: ' + appData.expenses +
//     '\n возможные расходы за месяц: ' + appData.addExpenses +
//     '\n наличие депозита в банке: ' + appData.deposit +
//     '\n цель: ' + appData.mission +
//     '\n период, за который цель будет достигнута: ' + appData.period +
//     '\n доход за месяц: ' + appData.budget +
//     '\n бюджет на день: ' + appData.budgetDay +
//     '\n бюджет на месяц: ' + appData.budgetMonth +
//     '\n сумма обязательных расходов за месяц: ' + appData.expensesMonth);
// }; */
