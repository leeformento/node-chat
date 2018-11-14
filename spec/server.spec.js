const request = require('request');

describe('get messages', () => {
    it('should return 200 Ok', (done) => {
        request.get('https://lee-chat.herokuapp.com/messages', (err, res) => {
            expect(res.statusCode).toEqual(200)
            done()
        })
    })
    it('should return a list that is not empty', (done) => {
        request.get('https://lee-chat.herokuapp.com/messages', (err, res) => {
            expect(JSON.parse(res.body)[0].name).toEqual('tim')
            done()
        })
    })
})