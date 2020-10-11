const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const session = require('express-session')
const parser = require('body-parser')
const user = require('./user')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(parser.urlencoded({extended: true}))
app.use(session({
	secret: '$3sc3t',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }
}))

app.use('/user', user)
app.get('/', (req, res) => {
	if(req.session.user)
		return res.render('index')
	return res.redirect('/user/login')
})

io.on('connection', socket => {
	socket.on('connect', () => {
		console.log("Hello!")
	})
	socket.on('turnOnLight1', () => { })
	socket.on('turnOnLight2', () => { })
})

server.listen(8080, '0.0.0.0', () => {
	console.log('Server is running at http://localhost:8080')
})