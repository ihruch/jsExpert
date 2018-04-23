const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const adminUsers = require('./db.json').adminUser;

server.use(middlewares)

// Custom route with login check, before JSON Server router
server.use(jsonServer.bodyParser)
server.post('/login', (req, res) => {
    let adminUser = adminUsers[0];
    if(req.body.login == adminUser.login && req.body.password == adminUser.password){
        res.jsonp({loginStatus:true})
    } else {
        res.jsonp({loginStatus:false})
    }
})

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})