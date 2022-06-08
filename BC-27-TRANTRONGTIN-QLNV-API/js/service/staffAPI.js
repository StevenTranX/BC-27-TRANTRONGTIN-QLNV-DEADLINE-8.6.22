const baseUrl = 'https://629f66f3461f8173e4e8b9dc.mockapi.io/staffs';

function apiGetStaffs() {
  return axios({
    url: baseUrl,
    method: 'GET',
  });
}
function apiAddStaffs(staff) {
  return axios({
    url: baseUrl,
    data: staff,
    method: 'POST',
  });
}
function apiDeleteStaffs(staffId) {
  return axios({
    url: `${baseUrl}/${staffId}`,
    method: 'DELETE',
  });
}
function apiGetStaffsInformation(staffId) {
  return axios({
    url: `${baseUrl}/${staffId}`,
    method: 'GET',
  });
}
function apiUpdateStaffs(staff) {
  return axios({
    url: `${baseUrl}/${staff}`,
    data: staff,
    method: 'PUT',
  });
}
