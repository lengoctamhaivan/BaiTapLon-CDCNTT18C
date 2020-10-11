const express = require('express')
const router = express.Router()
const db = require('./database.json')

const parseToFloat32Array = (descriptor) => {
    let arr = []
    descriptor.forEach(element => {
        arr.push(parseFloat(element))
    })
    return arr
}

router.route('/login')
    .post((req, res) => {
        if(req.body.user == "Hai Van"){
            req.session.user = "HaiVanxxx"
            return res.json({ msg: "OK" })
        }
    })
    .get((req, res) => {
        res.render('login')
    })
module.exports = router