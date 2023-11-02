const request = require('supertest')
const app = require('../../../app')
const { resetTestDB } = require('./config')

describe('api server', () => {
  let api;

  beforeEach(async () => {
    await resetTestDB()
  })

  beforeAll(async() => {
    const port = 5001
    api = app.listen(port, () => {
      console.log('🌕Test server running in port '+port)
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
  })

  test('responds to GET /event/:id with status 200', (done) => {
    
    request(api)
      .get('/event/1')
      .expect(200,done)
  })

  test('responds to GET /event with status 200', () => {
    
    request(api)
      .get('/event')
      .set('Authorization', 'sdfsfafsfasdf')
      .expect(200)
  })

})

