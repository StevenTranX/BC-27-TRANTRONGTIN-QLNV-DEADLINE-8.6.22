'use strict';
function Staff(
  id,
  name,
  email,
  password,
  dayStart,
  basicSalary,
  position,
  workHour
) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.password = password;
  this.dayStart = dayStart;
  this.basicSalary = basicSalary;
  this.position = position;
  this.workHour = workHour;
}
Staff.prototype.calcSalary = function () {
  if (this.position === 'Sếp') {
    return this.basicSalary * 3;
  } else if (this.position === 'Trưởng Phòng') {
    return this.basicSalary * 2;
  } else {
    return this.basicSalary;
  }
};
Staff.prototype.rankStaff = function (workHour) {
  if (workHour >= 192) {
    return `Xuất sắc`;
  } else if (workHour >= 176) {
    return `Giỏi`;
  } else if (workHour >= 160) {
    return `Khá `;
  } else if (workHour < 160) {
    return `Trung bình `;
  }
};
