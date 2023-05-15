const {MongoClient} = require("mongodb")
const express = require("express")
const path = require('path')
const app = express();
const fs = require('fs')
const body_parser = require("body-parser")
app.use(body_parser.urlencoded({extended: true}));
var Utility = require("C:/FS/FS_projects/UST_Projects/LMS/lms_utility.js")

const url = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(url)
const dbName = 'Library' 
const router = express.Router()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get("/", function(req, res){
    res.sendFile(__dirname + "/lms.html")
});

app.post("/get_document", function(req, res) {
    fs.truncateSync('success/fetch_success.html', 0, function() {
        console.log('File cleared')
    })
    const docType = req.body.document
    const field = req.body.field
    const docName = req.body.doc_attr
    switch(docType) {
        case 'Books':
            x = Utility.fetch_book_flat(docName, field)
            x.then((value) => {
                fs.writeFileSync('success/fetch_success.html', value)
                res.sendFile(__dirname + '/'+ 'success/fetch_success.html')
            })
            .catch(console.err)
            .finally(() => client.close()) 
            break

        case 'Journals':
            x = Utility.fetch_journal_flat(docName, field)
            x.then((value) => {
                fs.writeFileSync('success/fetch_success.html', value)
                res.sendFile(__dirname + '/'+ 'success/fetch_success.html')
            })
            .catch(console.err)
            .finally(() => client.close())
            break

        case 'empty':
            y = Utility.fetch_book_flat(docName, field, 'books.json')
            y.then((value) => {
                //res.write(value)
                fs.appendFileSync('success/fetch_success.html', value)
            })
            .catch(console.err)

            z = Utility.fetch_journal_flat(docName, field, 'journals.json')
            z.then((value) => {
                /*res.write(value)
                res.end() */
                fs.appendFileSync('success/fetch_success.html', value)
                res.sendFile(__dirname + '/'+ 'success/fetch_success.html')
                
            })
            .catch(console.err)
            .finally(() => client.close())
            break
        default: console.log("Error in /get_document")
    }
})

app.post("/update_document", function(req, res) {
    const docType = req.body.document
    const title = req.body.doc_name
    const newTitle = req.body.new_name
    Utility.update_document_flat(docType,title, newTitle)
    res.sendFile(__dirname + '/'+ 'success/update_success.html')
    client.close()
})

app.post("/add_document", function(req, res) {
    const docType = req.body.document
    const title = req.body.title
    const author = req.body.author
    const dop = req.body.dop
    switch(docType) {
        case 'Books':
            Utility.add_book(title, author, dop)
            break
        case 'Journals':
            Utility.add_journal(title, author, dop)
    }
})

app.use(express.static('success'))
app.use(express.static('about'))
app.use(express.static('login'))
app.use(express.static('update'))

var server = app.listen(8000, function(){
    console.log("Server is running at port", server.address().port)
})