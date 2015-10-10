'use strict';

var phoneBook = [];
var SPACE_COUNT = 7;
/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/
module.exports.add = function add(name, phone, email) {
    var isAdd = 0;
    if (isValidPhone(phone) && isValidEmail(email)) {
        var newPerson = {
            name: name,
            phone: phone.replace(/\D/g, ''),
            email: email
        };
        phoneBook.push(newPerson);
        isAdd++;
    }
    return isAdd;
};

/*
    Функция, определяющая валидность телефонного номера
*/
function isValidPhone(phone) {
    var rePhone = /^(\+?\d{1,2})?\s?(\(\d{3}\)|(\d{3}))\s?(\d{3})(\s|-)?(\d{1})(\s|-)?(\d{3})$/;
    return rePhone.test(phone);
}

/*
 Функция, определяющая валидность email
 */
function isValidEmail(email) {
    var reEmail = /^(\w)+@[A-Za-zА-Яа-яёЁ0-9_-]+\.[A-Za-zА-Яа-яёЁ0-9_]+(\.([A-Za-zА-Яа-яёЁ0-9_])+)?/;
    return reEmail.test(email);
}

/*
   Функция поиска записи в телефонную книгу.
   Поиск ведется по всем полям.
*/
module.exports.find = function find(query, parent) {
    var foundContacts = [];
    if (!query) {
        for (var i = 0, contactsLength = phoneBook.length; i < contactsLength; i++) {
            console.log(phoneBook[i].name + ', ' + getCorrectPhone(phoneBook[i].phone) +
                        ', ' + phoneBook[i].email);
        }
    } else {
        for (var i = 0, contactsLength = phoneBook.length; i < contactsLength; i++) {
            if (phoneBook[i].name.indexOf(query) != -1 ||
                phoneBook[i].phone.indexOf(query) != -1 ||
                phoneBook[i].email.indexOf(query) != -1) {
                if (parent === undefined) {
                    console.log(phoneBook[i].name + ', ' + getCorrectPhone(phoneBook[i].phone) +
                        ', ' + phoneBook[i].email);
                }
                foundContacts.push(i);
            }
        }
    }
    return foundContacts;
};

/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {
    var pointToDelete = module.exports.find(query, true);
    var countOfPoint = pointToDelete.length;
    for (var i = 0; i < countOfPoint; i++) {
        phoneBook.splice(pointToDelete[i], 1);
    }
    console.log(countOfPoint.toString() + ' contacts deleted');
    return countOfPoint;
};

/*
   Функция импорта записей из файла (задача со звёздочкой!).
*/
module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8').split('\n');
    var temp;
    var countAddPerson = 0;

    for (var i = 0; i < data.length; i++) {
        temp = data[i].split(';');
        countAddPerson += module.exports.add(temp[0], temp[1], temp[2]);
    }
    console.log('Add ' + countAddPerson.toString() + ' person');
};

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
module.exports.showTable = function showTable(filename) {
    var table = {
        leftUpCorner: '╔',
        rightUpCorner: '╗',
        leftDownCorner: '╚',
        rightDownCorner: '╝',
        fatHorizontal: '═',
        fatVertical: '║',
        fatToDown: '╦',
        fatToUp: '╩',
        fatCrossroad: '╫',
        thinCrossroad: '┼',
        thinHorizontal: '─',
        thinVertical: '│',
        leftThinHorizontal: '╟',
        rightThinHorizontal: '╢',
        thinToDown: '╤',
        thinToUp: '╧'
    };

    var nameWidth = 0;
    var phoneWidth = 22;
    var emailWidth = 0;
    var contactsLength = phoneBook.length;
    for (var i = 0; i < contactsLength; i++) {
        nameWidth = Math.max(nameWidth, phoneBook[i].name.length);
        emailWidth = Math.max(emailWidth, phoneBook[i].email.length);
    }
    nameWidth += 2;
    emailWidth += 2;

    var frame = getFrame(table, nameWidth, phoneWidth, emailWidth);
    console.log(frame[0]);

    var phoneTable = table.fatVertical;
    for (var i = 0; i < contactsLength; i++) {
        console.log(frame[2]);
        for (var j = 0; j < nameWidth + phoneWidth + emailWidth + SPACE_COUNT; j++) {
            switch (j) {
                case 1:
                    phoneTable += phoneBook[i].name;
                    for (var k = 0; k < nameWidth - phoneBook[i].name.length; k++) {
                        phoneTable += ' ';
                    }
                    break;
                case nameWidth + 4:
                    var correctPhone = getCorrectPhone(phoneBook[i].phone);
                    phoneTable += correctPhone;
                    for (var k = 0; k < phoneWidth - correctPhone.length - 3; k++) {
                        phoneTable += ' ';
                    }
                    break;
                case nameWidth + phoneWidth + 7:
                    phoneTable += phoneBook[i].email;
                    for (var k = 0; k < emailWidth - phoneBook[i].email.length; k++) {
                        phoneTable += ' ';
                    }
                    break;
                case nameWidth + 2:
                    phoneTable += table.thinVertical;
                    break;
                case nameWidth + phoneWidth + 5:
                    phoneTable += table.fatVertical;
                    break;
                case 0:
                    phoneTable += '  ';
                    break;
                case nameWidth + 3:
                    phoneTable += '  ';
                    break;
                case nameWidth + phoneWidth + 4 :
                    phoneTable += '  ';
                    break;
                case nameWidth + phoneWidth + 6:
                    phoneTable += '  ';
                    break;
                case nameWidth + phoneWidth + emailWidth + SPACE_COUNT:
                    phoneTable += '  ';
                    break;
            }
        }
        console.log(phoneTable + ' ' + table.fatVertical);
        phoneTable = table.fatVertical;
        console.log(frame[2]);
        if (i == contactsLength - 1) {
            console.log(frame[3]);
        } else {
            console.log(frame[1]);
        }
    }
};

/*
    Функция строит остов таблицы - т.е. те строки, которые в ней повторяются.
*/
function getFrame(table, nameWidth, phoneWidth, emailWidth) {
    var frame = [table.leftUpCorner, table.leftThinHorizontal,
                 table.fatVertical, table.leftDownCorner];
    for (var i = 0; i < nameWidth + phoneWidth + emailWidth + SPACE_COUNT; i++) {
        if (i == nameWidth + 3) {
            frame[0] += table.thinToDown;
            frame[1] += table.thinCrossroad;
            frame[2] += table.thinVertical;
            frame[3] += table.thinToUp;
        }
        if (i == nameWidth + phoneWidth + 4) {
            frame[0] += table.fatToDown;
            frame[1] += table.fatCrossroad;
            frame[2] += table.fatVertical;
            frame[3] += table.fatToUp;
        }
        if (i <= nameWidth + 1 ||
            i > nameWidth + 2 && i <= nameWidth + phoneWidth + 2 ||
            i > nameWidth + phoneWidth) {
            frame[0] += table.fatHorizontal;
            frame[1] += table.thinHorizontal;
            frame[2] += ' ';
            frame[3] += table.fatHorizontal;
        }
    }
    frame[0] += table.rightUpCorner;
    frame[1] += table.rightThinHorizontal;
    frame[2] += table.fatVertical;
    frame[3] += table.rightDownCorner;

    return frame;
}

/*
    Функция делает телефонный номер красивым, для вывода на экран
*/
function getCorrectPhone(phone) {
    var phoneLength = phone.length;
    var correctPhone = '(' + phone.substr(phoneLength - 10, 3) + ') ' +
                        phone.substr(phoneLength - 7, 3) + '-' + phone[phoneLength - 4] +
                        '-' + phone.substr(phoneLength - 3, 3);
    correctPhone = phoneLength == 10 ?
                   '+7 ' + correctPhone : phone.substr(0, phoneLength - 10) + ' ' + correctPhone;
    if (correctPhone[0] != '+') {
        correctPhone = phoneLength == 10 ? '+7 ' + correctPhone : '+' + correctPhone;
    }
    return correctPhone;
}
