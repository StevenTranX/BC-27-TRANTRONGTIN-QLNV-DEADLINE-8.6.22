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
  if (this.position === '1') {
    return this.basicSalary * 3;
  } else if (this.position === '2') {
    return this.basicSalary * 2;
  } else {
    return this.basicSalary;
  }
};
Staff.prototype.rankStaff = function () {
  if (this.workHour >= 192) {
    return `Nhân viên xuất sắc`;
  } else if (this.workHour >= 176) {
    return `Nhân viên giỏi`;
  } else if (this.workHour >= 160) {
    return `Nhân viên khá `;
  } else if (this.workHour < 160) {
    return `Nhân viên trung bình `;
  }
};
Staff.prototype.getPosition = function () {
  if (this.position === '1') {
    return `Sếp`;
  } else if (this.position === '2') {
    return `Trưởng phòng `;
  } else {
    return `Nhân viên `;
  }
};
let staffs = [];
document.getElementById('btnThemNV').addEventListener('click', addStaff);
function addStaff() {
  const id = document.getElementById('tknv').value;
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const dayStart = document.getElementById('datepicker').value;
  const basicSalary = document.getElementById('luongCB').value;
  const position = document.getElementById('chucvu').value;
  const workHour = document.getElementById('gioLam').value;
  const staff = new Staff(
    id,
    name,
    email,
    password,
    dayStart,
    basicSalary,
    position,
    workHour
  );
  staffs.push(staff);
  display(staffs);
  resetForm();
}
function display(staffs) {
  const tbodyEl = document.getElementById('tableDanhSach');
  let html = '';
  for (let i = 0; i < staffs.length; i++) {
    const staff = staffs[i];
    const salary = staff.calcSalary();
    html += `
    <tr>
    <td>${staff.id}</td>
    <td>${staff.name}</td>
    <td>${staff.email}</td>
    <td>${staff.dayStart}</td>
    <td>${staff.getPosition()}</td>
    <td>${salary.toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND',
    })}</td>
    <td>${staff.rankStaff()}</td>
    <button class = "btn btn-success" onclick = "selectStaff('${
      staff.id
    }')"> Cập Nhật </button>
    <button class = "btn btn-danger" onclick = "deleteStaff('${
      staff.id
    }')"> Xóa </button>
    </tr>
    `;
    tbodyEl.innerHTML = html;
  }
}

function resetForm() {
  const id = (document.getElementById('tknv').value = '');
  const name = (document.getElementById('name').value = '');
  const email = (document.getElementById('email').value = '');
  const password = (document.getElementById('password').value = '');
  const dayStart = (document.getElementById('datepicker').value = '');
  const basicSalary = (document.getElementById('luongCB').value = '');
  const position = (document.getElementById('chucvu').value = '');
  const workHour = (document.getElementById('gioLam').value = '');
}

function deleteStaff(staffId) {
  let index = -1;
  for (let i = 0; i < staffs.length; i++) {
    if (staffs[i].id === staffId) {
      index = i;
      break;
    }
  }
  if (index !== -1) {
    staffs.splice(index, 1);
    display(staffs);
  }
}
document.getElementById('btnTimNV').addEventListener('click', searchStaff);
function searchStaff() {
  // const rankOfStaff = rankStaff();
  const searchEl = document.getElementById('searchName').value;
  let newStaffs = [];
  for (let i = 0; i < staffs.length; i++) {
    let staff = staffs[i];
    if (staff.rankStaff() === searchEl) {
      newStaffs.push(staff);
    }
  }
  display(newStaffs);
}

