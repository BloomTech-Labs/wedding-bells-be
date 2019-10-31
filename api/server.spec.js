const request = require("supertest");
const server = require("../api/server")

/* ---------------------- User Endpoints ---------------*/
describe('/api/users CRUD', function() {
    it('should create a user', function(done) {
        request(server)
            .post('/api/users')
            .send({
                spouse_one_name: "Poly",
                spouse_two_name: "Futurebae",
                email: "testemail123@gmail.com",
                password: "password123"
            })
            .set('Accept', 'application/json')
            .expect(201, done);
    });

    it('should return 400 if missing spouse names,email,password fields of user', function (done) {
        request(server)
            .post('/api/users')
            .send({ spouse_one_name: '', spouse_two_name: null, email: '', password: '' })
            .expect(400, done);
    });

    it('should update a user in api/users', function (done) {
        request(server)
            .put('api/users/1')
            .send({
                spouse_one_name: "Robert",
                spouse_two_name: "Jane",
                email: "robertandjane@gmail.com",
                password: "partytime123",
            })
            .expect(200)
            .end(function (err, res) {
                expect(typeof res).toBe('object');
                if (err) return done(err);
                done();
            });
    });
 

})







/* ---------------------- Authentication ---------------*/