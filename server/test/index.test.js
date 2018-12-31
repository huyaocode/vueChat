const supertest = require('supertest')
const chai = require('chai')
const app = require('../index')

const expect = chai.expect
const request = supertest(app.listen())

//测试组
describe('测试get请求', () => {

})
