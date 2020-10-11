export default class Handler {
    constructor() {
        this.statusDoor = 0;
        this.statusLight = 0;
        const button = document.querySelector('#door-close');
        const buttonTurnOff = document.querySelector('#turn-off');
        if (this.statusDoor === 0) {
            button.classList.add('active');
        }
        if (this.statusLight === 0) {
            buttonTurnOff.classList.add('active');
        }
    }
    handlerDoorOpen() {
        const button = document.querySelector('#door-close');
        const button2 = document.querySelector('#door-open');
        const imgDoor = document.querySelector('#door');
        imgDoor.src = "theme-assets\\images\\icons\\door_open.png";
        this.statusDoor = 1;
        if (this.statusDoor === 1) {
            button.classList.remove('active');
            button2.classList.add('active');
        }

    }

    handlerDoorClose() {
        const button = document.querySelector('#door-close');
        const button2 = document.querySelector('#door-open');
        const imgDoor = document.querySelector('#door');
        imgDoor.src = "theme-assets\\images\\icons\\door_close.png";
        button.classList.add('active');
        this.statusDoor = 0;
        if (this.statusDoor === 0){
            button2.classList.remove('active');
        }
    }

    handlerTurnOn() {
        const light = document.querySelector('#lignt');
        const buttonTurnOn = document.querySelector('#turn-on');
        const buttonTurnOff = document.querySelector('#turn-off');
        this.statusLight = 1;
        if (this.statusLight === 1) {
            buttonTurnOff.classList.remove('active');
            buttonTurnOn.classList.add('active');
        }
        light.src = "theme-assets/images/icons/light1.png";
    }

    handlerTurnOff() {
        const light = document.querySelector('#lignt');
        const buttonTurnOn = document.querySelector('#turn-on');
        const buttonTurnOff = document.querySelector('#turn-off');
        light.src = "theme-assets/images/icons/light0.png";
        this.statusLight = 0 ;
        if (this.statusLight === 0) {
            buttonTurnOn.classList.remove('active');
            buttonTurnOff.classList.add('active');
        }
    }
}