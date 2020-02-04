'use strict';

let btnStart = document.getElementById('start'); // кнопка рассчитать

console.log(btnStart);

let btnIncomeAdd = document.getElementsByTagName('button')[0]; // доп.расходы
let btnExpensesAdd = document.getElementsByTagName('button')[1]; // доп.возмож.рарходы

console.log(btnIncomeAdd, btnExpensesAdd);

let depositCheck = document.querySelector('#deposit-check');

console.log(depositCheck);

let additionalIncomeItem = document.querySelectorAll('.additional_income-item');

console.log(additionalIncomeItem);

let budgetDayValue = document.getElementsByClassName('.result-total')[1];
let expensesMonthValue = document.getElementsByClassName('result-total')[2];
let additionalIncomeValue = document.getElementsByClassName('.result-total')[3];
let additionalExpensesValue = document.getElementsByClassName('.result-total')[4];
let incomePeriodValue = document.getElementsByClassName('.result-total')[5];
let targetMonthValue = document.getElementsByClassName('.result-total')[6];

console.log(budgetDayValue, expensesMonthValue, additionalIncomeValue, additionalExpensesValue, incomePeriodValue, targetMonthValue);

let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let incomeAmount = document.querySelector('.income-amount');
let expensesTitle = document.querySelector('.expenses-title');
let expensesAmount = document.querySelector('.expenses-amount');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');
let targetAmount = document.querySelector('.target-amount');


console.log(salaryAmount, incomeTitle, incomeAmount, expensesTitle, expensesAmount, additionalExpensesItem, depositAmount, depositPercent, targetAmount);






/* document.getElementById('#start');

document.getElementsByClassName('.income_add');
document.getElementsByClassName('.expenses_add');

document.querySelector('#deposit-check');

document.querySelectorAll('.additional_income-item');

document.querySelectorAll('.budget_day-value');
document.querySelectorAll('expenses_month-value');
document.querySelectorAll('.additional_income-value');
document.querySelectorAll('.additional_expenses-value');
document.querySelectorAll('.income_period-value');
document.querySelectorAll('.target_month-value');

document.querySelector('.salary-amount');
document.querySelector('.income-title');
document.querySelector('.income-amount');
document.querySelector('.additional_income-item');
document.querySelector('.expenses-title');
document.querySelector('.expenses-amount');
document.querySelector('.additional_expenses-item');
document.querySelector('.deposit-amount');
document.querySelector('.deposit-percent');
document.querySelector('.target-amount'); */