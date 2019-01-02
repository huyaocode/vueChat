let auth = ''
beforeAll().then(data => {
  auth = `Bearer ${data.token}`
  fetch('/api/v1/get_all_approve', {
    headers: new Headers({
      'Authorization': auth
    })
  }).then(res => res.json())
  .then(res => {
    getUserInfo(res.data)
  })
})

function getUserInfo(approveData) {
  approveData.forEach(item => {
    console.log(item)
    fetch(`/api/v1/user_info?user_id=${item.user_id}`, {
      headers: new Headers({
        'Authorization': auth
      })
    }).then(res=>res.json())
    .then(res => {
      let data = {}
      data.image = item.image
      data.success = item.success
      Object.assign(data, res.data.userInfo[0])
      appendTable(data)
    })
  })
}

function appendTable(data) {
  $('#auth-table-body')
    .append(`
      <tr>
        <td>${data.github || 'nickName'}</td>
        <td><img with="50" height="50" class="table-avator" src="${data.avator}"></td>
        <td>${data.sex=="0"?'男':'女'}</td>
        <td><img with="100" height="100" class="table-approve" src="${data.image}"></td>
        <td>
          <button type="button" ${data.success==0?'':'disabled'} class="btn ${data.success==0?'btn-primary':'btn-success'} approve-btn" data-id="${data.user_id}">${data.success==0?'认证':'已认证'}</button>
        </td>
      </tr>
    `)
    $('.approve-btn').unbind().on('click', function(e) {
      let id = Number($(this).attr('data-id'))
      $(this).attr('disabled', true)
      approveOK(id, this)
    })
}

function approveOK(user_id, element) {
  console.log(user_id)
  fetch('/api/v1/approve_ok', {
    method: 'POST',
    body: JSON.stringify({
      user_id: user_id
    }),
    headers: new Headers({
      'Authorization': auth,
      'Content-Type': 'application/json'
    })
  }).then(res=>res.json())
  .then(res => {
    $(element).removeClass('btn-primary').addClass('btn-success').html('已认证')
  })
}
