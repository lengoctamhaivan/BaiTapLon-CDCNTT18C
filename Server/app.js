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
	console.log('New client')
	io.emit('test')
	// Light indoor
	socket.on('turnOnLight1', () => {
		io.emit('client-LED_IN_DOOR-ON')
	})
	socket.on('turnOffLight1', () => {
		io.emit('client-LED_IN_DOOR-OFF')
	})
	// Light outdoor
	socket.on('turnOnLight2', () => {
		io.emit('client-LED_OUT_DOOR-ON')
	})
	socket.on('turnOffLight2', () => {
		io.emit('client-LED_OUT_DOOR-OFF')
	})
	// indoor
	socket.on('openDoor', () => {
		io.emit('client-DOOR-OPEN')
	})
	socket.on('closeDoor', () => {
		io.emit('client-DOOR-CLOSE')
	})

	// Light indoor
	socket.on('LED_IN_DOOR-OFF', () => {
		io.emit('device-LED_IN_DOOR-OFF')
	})
	socket.on('LED_IN_DOOR-ON', () => {
		io.emit('device-LED_IN_DOOR-ON')
	})
	// Light outdoor
	socket.on('LED_OUT_DOOR-OFF', () => {
		io.emit('device-LED_OUT_DOOR-OFF')
	})
	socket.on('LED_OUT_DOOR-ON', () => {
		io.emit('device-LED_OUT_DOOR-ON')
	})
	// indoor
	socket.on('DOOR-OPEN', () => {
		io.emit('device-DOOR-OPEN')
	})
	socket.on('DOOR-CLOSE', () => {
		io.emit('device-DOOR-CLOSE')
	})
})

server.listen(8080, '0.0.0.0', () => {
	console.log('Server is running at http://localhost:8080')
})