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
// Staff.prototype.getPosition = function () {
//   if (this.position === '1') {
//     return `Sếp`;
//   } else if (this.position === '2') {
//     return `Trưởng phòng `;
//   } else {
//     return `Nhân viên `;
//   }
// };
// Không cần phải làm hàm position, bỏ value trong html sẽ cho ra nội dung của option
let staffs = [];
document.getElementById('btnThemNV').addEventListener('click', addStaff);
function addStaff() {
  const id = document.getElementById('tknv').value;
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const dayStart = document.getElementById('datepicker').value;
  const basicSalary = +document.getElementById('luongCB').value;
  const position = document.getElementById('chucvu').value;
  const workHour = +document.getElementById('gioLam').value;
  let staff = new Staff(
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
    <td>${staff.position}</td>
    <td>${salary.toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND',
    })}</td>
    <td>${staff.rankStaff(staff.workHour)}</td>
    <button class = "btn btn-success" onclick = "selectStaff('${
      staff.id
    }')"> Cập Nhật </button>
    <button class = "btn btn-danger" onclick = "deleteStaff('${
      staff.id
    }')"> Xóa </button>
    </tr>
    `;
  }
  tbodyEl.innerHTML = html;
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
  let searchEl = document.getElementById('searchName').value;
  searchEl = searchEl.toLowerCase()
  let newStaffs = [];
  for (let i = 0; i < staffs.length; i++) {
    let staff = staffs[i];
    let rankOfStaff = staff.rankStaff(staff.workHour)
    rankOfStaff = rankOfStaff.toLowerCase()
    if (rankOfStaff.indexOf(searchEl) !== -1) {
      newStaffs.push(staff);
    }
  } 
  display(newStaffs);
}

