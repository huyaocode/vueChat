function beforeAll() {
  return new Promise((resolve, rej) => {
    /* 登录获取token */
    fetch('/api/v1/login', {
      method: 'POST',
      body: JSON.stringify({
        name: 'wang',
        password: '123'
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .then(res => {
      resolve(res)
    })
  })
}
