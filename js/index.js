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
  
  let isValid = validation() ; 
 

  if (!isValid) {
    alert ('Vui lòng nhập vào các giá trị')
    return
  }

  document.getElementById('tknv').disabled = false ; 
  document.getElementById('btnThemNV').disabled = false; 

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
  document.getElementById('btnThemNV').attributes  = 
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
    <button 
    class = "btn btn-success"   
    data-toggle="modal"
    data-target="#myModal"  
    onclick = "selectStaff('${staff.id}')"> Cập Nhật </button>
    <button 
    class = "btn btn-danger "   
  
    onclick = "deleteStaff('${staff.id}')"> Xóa </button>
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
  let index = findStaff (staffId) 
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
function selectStaff (staffId) {
 
  let index = findStaff (staffId) ;
  let staff = staffs[index] ; 
  document.getElementById('tknv').value = staff.id ;
  document.getElementById('name').value = staff.name ;
  document.getElementById('email').value = staff.email ;
  document.getElementById('password').value = staff.password ;
  document.getElementById('datepicker').value = staff.dayStart ;
  document.getElementById('luongCB').value = staff.basicSalary ;
  document.getElementById('chucvu').value = staff.position ;
  document.getElementById('gioLam').value = staff.workHour ;

  document.getElementById('tknv').disabled = true ; 
  document.getElementById('btnThemNV').disabled = true ; 

  
}

function findStaff (staffId) {
  let index = -1 ; 
  for ( let i = 0 ; i < staffs.length ; i++ ) {
    if (staffs[i].id === staffId) {
      index = i ; 
      break
    }
  }
  return index
}
function updateStaff() {
  const id = document.getElementById('tknv').value;
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const dayStart = document.getElementById('datepicker').value;
  const basicSalary = +document.getElementById('luongCB').value;
  const position = document.getElementById('chucvu').value;
  const workHour = +document.getElementById('gioLam').value;
  const staff = new Staff (id , name , email, password, dayStart, basicSalary, position, workHour) 
  let index = findStaff(staff.id) ;
  staffs[index] =  staff
  display (staffs)
  resetForm ()
}

function isRequired (value) {
  if (!value ) {
    return false
  }
  return true ;
} 
function validation () {
  const id = document.getElementById('tknv').value;
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const dayStart = document.getElementById('datepicker').value;
  const basicSalary = +document.getElementById('luongCB').value;
  const position = document.getElementById('chucvu').value;
  const workHour = +document.getElementById('gioLam').value;
  
  let isValid = true ; 

  if (!isRequired(id)) {
    isValid = false
    document.getElementById('tbTKNV').innerHTML = "Tài khoản Nhân Viên không được để trống"
    document.getElementById('tbTKNV').style.display = "block"
  }
  if (!isRequired(name)) {
    isValid = false
    document.getElementById('tbTen').innerHTML = "Tên không được để trống"
    document.getElementById('tbTen').style.display = "block"
  }
  if (!isRequired(email)) {
    isValid = false
    document.getElementById('tbEmail').innerHTML = "Email không được để trống"
    document.getElementById('tbEmail').style.display = "block"
  }
  
  if (!isRequired(password)) {
    isValid = false
    document.getElementById('tbMatKhau').innerHTML = "Mật khẩu không được để trống"
    document.getElementById('tbMatKhau').style.display = "block"
  }
  
  if (!isRequired(dayStart)) {
    isValid = false
    document.getElementById('tbNgay').innerHTML = "Ngày làm không được để trống"
    document.getElementById('tbNgay').style.display = "block"
  }
  if (!isRequired(basicSalary)) {
    isValid = false
    document.getElementById('tbLuongCB').innerHTML = "Lương cơ bản không được để trống"
    document.getElementById('tbLuongCB').style.display = "block"
  }
  if (!isRequired(position)) {
    isValid = false
    document.getElementById('tbChucVu').innerHTML = "Chức vụ không được để trống"
    document.getElementById('tbChucVu').style.display = "block"
  }
  if (!isRequired(workHour)) {
    isValid = false
    document.getElementById('tbGioLam').style.display = "block"
    document.getElementById('tbGioLam').innerHTML = "Giờ làm không được để trống"
  }

  return isValid ; 
}

