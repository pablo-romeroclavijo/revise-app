const request = require('supertest')
const app = require('../../../app')
const { resetTestDB } = require('./config')

describe('api server', () => {
  let api;

  beforeEach(async () => {
    await resetTestDB()
  })

  beforeAll(() => {
    api = app.listen(3000, () => {
      // console.log('🌕Test server running in port 5000')
    })
  })

  afterAll((done) => {
    // console.log('Gracefully stopping the test server')
    api.close(done)
  })

  test('responds to GET / with status 200', (done) => {
    request(api)
      .get('/')
      .expect(200, done)
  }, 10000)

  test('responds to GET /:code with status 200', (done) => {
    request(api)
      .get('/event/1')
      .expect(200, done)
  }, 10000)



})

