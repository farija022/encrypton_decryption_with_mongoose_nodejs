
require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const Cryptr = require('cryptr')
const userSchema = require('./user')
const bodyParser = require('body-parser')

const app = express()


mongoose.connect(process.env.DATABASE_URL, () => {
    console.log('mongodb connected')
},
    e => console.error(e)
)

app.use(express.json())
app.use(bodyParser.json())

const farija = new Cryptr('hello');

const User = new mongoose.model('description', userSchema)

app.post("/", async (req, res) => {
    try {

        const data = req.body.data
        const encryptedData = farija.encrypt(data);
        const de = farija.decrypt(encryptedData);

        const user = new User({
            data: encryptedData
        })
        await user.save()
        console.log(user); // ae57409bee47d148a84db55da5ecc1cb883ffa6f6d1059d02dbcd48ac607683f16e467cf6e097bb8957465648cdaf2940399974763f2213a21808050f653d2a73b17d52b8de50ada005930a8fa1024e5adbfb5007be74865ad787265de62dc63d1453324ac
        console.log(de);
        return res.send("encrypted")
    }
    catch (err) {
        return res.send(err)
        console.log(err)
    }
})

app.get("/", async (req, res) => {

    try {

        const filter = {};
        const datas = await User.find(filter);
        console.log(datas)

        datas.forEach((data) => {
            const de = farija.decrypt(data.data);
            console.log(de)
            //return res.end(de);
            // if (de) {
            //     return res.send(de);
            // }
        });



        return res.send("See in the console log")
    } catch (err) {
        return res.send(err)
    }
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log("Server is connected")
})