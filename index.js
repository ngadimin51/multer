'use strict'

// persiapan express, app, http dan server
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)

// definisikan variabel multer
const multer  = require('multer')

// definisikan storage untuk penyimpanan file
const storage = multer.diskStorage({
    // lokasi penyimpanan file
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    // membuat nama file unik agar tidak bertabrakan dengan file lainnya saat diakses dan memberi ekstensi sesuai mimetype
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        if ( file.mimetype == 'image/jpeg') {
            var mimetype = '.jpg'
        } else if ( file.mimetype == 'image/png') {
            var mimetype = '.png'
        } else if ( file.mimetype == 'image/gif') {
            var mimetype = '.gif'
        } else {
            // Add mimetype here
            console.log('\n\n> add your mimetype here. Please read https://ndalu.id/blog/mimetpe-list')
            var mimetype = '.document'
        }
        cb(null, uniqueSuffix + mimetype)
    }
})
// definisikan upload untuk single file
const upload = multer({ storage: storage }).single('file')

// gunakan folder public sebagai static
app.use(express.static('public'))

// route halaman / untuk contoh view upload file
app.get('/', (req, res) => {
    const path = require('path') // load path
    res.sendFile(path.join(__dirname, './public/index.html')) // kirim file index.html di folder public untuk view
})
// route untuk post dari halaman index.html
app.post('/', upload, (req, res) => {
    const file = req.file
    console.log(file)
    res.send({message: 'Your file was uploaded', file: file, path: 'http://localhost:3000/images/'+file.filename})
})

server.listen(3000, console.log('\n> Server run and listening port 3000'))