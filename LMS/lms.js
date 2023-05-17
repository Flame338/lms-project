const {MongoClient} = require("mongodb")
const express = require("express")
const path = require('path')
const app = express();
const fs = require('fs')
const body_parser = require("body-parser")
app.use(body_parser.urlencoded({extended: true}));
var Utility = require("./lms_utility.js")
const url = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(url)
const dbName = 'Library' 
var header = fs.readFileSync('template/header.html').toString()
var footer = fs.readFileSync('template/footer.html').toString()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, '/home/lms.html'))
}) 

app.post("/", function(req, res) {
    fs.truncateSync('success/fetch_success.html', 0, function() {
        console.log('File cleared')
    })
    const docType = req.body.document
    const field = req.body.field
    const docName = req.body.doc_attr
    var Opt
    switch(docType) {
        case 'Books':
            x = Utility.fetch_book_flat(docName, field)
            x.then((value) => {
                Opt =  header + '<h2>Books</h2>' + value + footer
                fs.writeFileSync('success/fetch_success.html', Opt)
                res.sendFile(__dirname + "/" + 'success/fetch_success.html')
            })
            .catch(console.err)
            .finally(() => client.close()) 
            break

        case 'Journals':
            x = Utility.fetch_journal_flat(docName, field)
            x.then((value) => {
                Opt =  header +'<h2>Journals</h2>'+ value + footer
                fs.writeFileSync('success/fetch_success.html', Opt)
                res.sendFile(__dirname + "/" + 'success/fetch_success.html')
            })
            .catch(console.err)
            .finally(() => client.close())
            break

        case 'empty':
            if(global.executed) {
            console.log('Function fired twice')
            }
            else {
                y = Utility.fetch_book_flat(docName, field)
                y.then((value) => {
                    Opt = header +'<h2>Books</h2>'+ value
                })
                .catch(console.err)

                z = Utility.fetch_journal_flat(docName, field)
                z.then((value2) => {
                    Opt += '<h2>Journals</h2>'+ value2 + footer
                    fs.appendFileSync('success/fetch_success.html', Opt)
                    res.sendFile(__dirname + '/'+ 'success/fetch_success.html')
                })
                .catch(console.err)
                .finally(() => client.close())
                global.executed = false
                }
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


app.use(express.static('success'))
app.use(express.static('about'))
app.use(express.static('login'))
app.use(express.static('update'))
app.use(express.static('home'))

var server = app.listen(8000, function(){
    console.log("Server is running at port", server.address().port)
})