const supertest = require('supertest')
const chai = require('chai')
const app = require('../index')

const expect = chai.expect
const request = supertest(app.listen())

describe('测试部分接口', () => {
  let token = ''
  let auth = ''
  beforeEach(function(done) {
    request
      .post('/api/v1/login')
      .send({name: 'wang', password: '123'})
      .then(res => {
        token = res.body.token
        auth = `Bearer ${token}`
        done()
      })
  })

  it('测试登录', (done) => {
    request
      .post('/api/v1/login')
      .send({name: 'wang', password: '123'})
      .then(res => {
        expect(res.body.success).to.be.equal(true)
        done()
      })
  })

  it('测试message接口', (done) => {
    request
      .get('/api/v1/message?user_id=1')
      .set('Authorization', auth)
      .expect(200)
      .then(res => {
        expect(res.body.success).to.be.equal(true)
        done()
      })
  })

  it('测试private_detail接口', (done) => {
    request
      .get('/api/v1/private_detail?user_id=1&to_user=2')
      .set('Authorization', auth)
      .expect(200)
      .then(res => {
        expect(res.body.success).to.be.equal(true)
        done()
      })
  })

  it('测试private_save_msg接口', (done) => {
    request
      .post('/api/v1/private_save_msg')
      .set('Authorization', auth)
      .send({
        user_id: 1,
        to_user: 2,
        message: '测试消息',
        name: 'haha',
        time: 1546323039
      })
      .expect(200)
      .then(res => {
        expect(res.body.success).to.be.equal(true)
        done()
      })
  })

  it('测试undo_message接口', done => {
    request
      .post('/api/v1/undo_message')
      .set('Authorization', auth)
      .send({
        from_user_id: 1,
        to_user_id: 2,
        time: 1546323039,
      })
      .expect(200)
      .then(res => {
        expect(res.body.success).to.be.equal(true)
        done()
      })
  })

  it('测试user_info接口', done => {
    request
      .get('/api/v1/user_info')
      .query({
        user_id: 1
      })
      .set('Authorization', auth)
      .expect(200)
      .then(res => {
        expect(res.body.success).to.be.equal(true)
        done()
      })
  })

  it('测试is_friend接口', done => {
    request
      .get('/api/v1/is_friend')
      .query({
        user_id: 1,
        other_user_id: 2
      })
      .set('Authorization', auth)
      .expect(200)
      .then(res => {
        expect(res.body.success).to.be.equal(true)
      })
  })

})
