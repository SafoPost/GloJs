'use strict';

let btnStart = document.getElementById('#start'); // кнопка рассчитать

console.log(btnStart);

let btnIncomeAdd = document.getElementsByClassName('.income_add'); // доп.элем
let btnExpensesAdd = document.getElementsByClassName('.expenses_add');

console.log(btnIncomeAdd, btnExpensesAdd);

let depositCheck = document.querySelector('#deposit-check');

console.log(depositCheck);

let additionalIncomeItem = document.querySelectorAll('.additional_income-item');

console.log(additionalIncomeItem);

let budgetDayValue = document.querySelectorAll('.budget_day-value');
let expensesMonthValue = document.querySelectorAll('expenses_month-value');
let additionalIncomeValue = document.querySelectorAll('.additional_income-value');
let additionalExpensesValue = document.querySelectorAll('.additional_expenses-value');
let incomePeriodValue = document.querySelectorAll('.income_period-value');
let targetMonthValue = document.querySelectorAll('.target_month-value');

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