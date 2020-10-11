import Handler from "./handler.js";
const handler = new Handler();
document.querySelector('#door-open').addEventListener('click', handler.handlerDoorOpen);
document.querySelector('#door-close').addEventListener('click', handler.handlerDoorClose);
document.querySelector('#turn-on').addEventListener('click', handler.handlerTurnOn);
document.querySelector('#turn-off').addEventListener('click', handler.handlerTurnOff);