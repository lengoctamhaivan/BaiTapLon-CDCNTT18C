import socketio
import serial
import _thread

sio = socketio.Client()
ser = serial.Serial('COM7', 9600)
ser.close()
ser.open()

while True:
    data = int(input())
    ser.write(str(data).encode('utf-8'))

def read_data():
    while True:
        if ser.is_open:
            data = str(ser.readline())
            print(data)
            '''if data == 'LED_OUT_DOOR-OFF':
                sio.emit('LED_OUT_DOOR-OFF')
            elif data == 'LED_OUT_DOOR-ON':
                sio.emit('LED_OUT_DOOR-ON')
            elif data == 'LED_IN_DOOR-OFF':
                sio.emit('LED_IN_DOOR-OFF')
            elif data == 'LED_IN_DOOR-ON':
                sio.emit('LED_IN_DOOR-ON')
            elif data == 'DOOR-CLOSE':
                sio.emit('DOOR-CLOSE')
            elif data == 'DOOR-OPEN':
                sio.emit('DOOR-OPEN')
            else: 
                print(data)'''
            

read_data()

@sio.event
def connect():
    _thread.start_new__thread(read_data)
    print('connection established')

@sio.event
def disconnect():
    print('disconnected from server')

try:
    sio.connect('http://localhost:8080')
    print('ok')
except:
   ser.close()