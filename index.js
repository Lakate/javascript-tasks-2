'use strict';

var phoneBook = require('./phone-book');
var countPerson = 0;

// Добавляем записи
countPerson += phoneBook.add('Сергей', '7 (999) 666-7-778', 'gs@example.com');
countPerson += phoneBook.add('Сергей 2', '999 4433444', 'gs@example.com');
countPerson += phoneBook.add('Олег', '+7 (999) 777-7-777', 'just7@yandex-team.ru');
countPerson += phoneBook.add('Екатерина', '+79991234567', 'lakate@yandex-team.ru');
countPerson += phoneBook.add('Павел', '+7 999 897 6 453', 'bratvarulit@yandex-team.ru');
countPerson += phoneBook.add('Руслан', '+34 (999) 313-7-212', 'just713@yandex-team.ru');
countPerson += phoneBook.add('Ёжик', '343 313 7 212', 'yo@yandex-team.ru');

// Невалидные данные не должны попадать в книгу!
countPerson += phoneBook.add('Честный Хрюндель', '7+ (111) 777-2-222', 'info@example.com.ru');
countPerson += phoneBook.add('Бесчестный Хрендель', '7 (111) 777-2-222', 'infoexample.com.ru');

console.log(countPerson.toString() + ' person in phonebook\n');

console.log('Query: ' + '777');
phoneBook.find('777');
console.log('\n');
// Выводит построчно записи, все поля через запятую:
// Сергей, +7 (999) 666-7-778, gogolef@yandex-team.ru
// Олег, +7 (999) 777-7-777, just7@yandex-team.ru
console.log('Query: ' + 'Сергей');
phoneBook.find('Сергей');
console.log('\n');
// Сергей, 7 (999) 666-7-778, gs@example.com
// Сергей 2, 999 4433444, gs@example.com
console.log('Query: ' + '');
phoneBook.find('');
console.log('\n');
// Выводит построчно все записи, все поля через запятую
console.log('Query: ' + 'undefined');
phoneBook.find();
console.log('\n');
// Выводит построчно все записи, все поля через запятую

countPerson -= phoneBook.remove('Олег');
console.log(countPerson.toString() + ' person in phonebook\n');
// Выводит количество удалённых контактов, которые удовлетворят запросу:
// Удален 1 контакт

// Экспортируем записи, пример файла рядом
phoneBook.importFromCsv('./backup.csv');
// Добавлено 4 контакта

// Выводит записи в виде красивой таблички
phoneBook.showTable();
