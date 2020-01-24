let money = 80000;
let income = 'фриланс';
let addExpenses = 'Коммуналка, телефон, такси, развлечения';
let deposit = true;
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
console.log(budgetDay);

