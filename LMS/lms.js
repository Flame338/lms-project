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
var header = fs.readFileSync('template/header.html').toString()
var footer = fs.readFileSync('template/footer.html').toString()


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, '/home/lms.html'))
}) 

app.post("/", function(req, res) {
    fs.truncateSync('render/fetch_success.html', 0, function() {
        console.log('File cleared')
    })
    const docType = req.body.document
    const field = req.body.field
    const docName = req.body.doc_attr
    var body = fs.readFileSync('template/search.html').toString()

    var Opt
    switch(docType) {
        case 'Books':
            x = Utility.fetch_book_flat(docName, field)
            x.then((value) => {
                Opt =  header + body +'<h2>Books</h2>' + value + footer
                fs.writeFileSync('render/fetch_success.html', Opt)
                res.sendFile(__dirname + "/" + 'render/fetch_success.html')
            })
            .catch(console.err)
            .finally(() => client.close()) 
            break

        case 'Journals':
            x = Utility.fetch_journal_flat(docName, field)
            x.then((value) => {
                Opt =  header + body +'<h2>Journals</h2>' + value + footer 
                fs.writeFileSync('render/fetch_success.html', Opt)
                res.sendFile(__dirname + "/" + 'render/fetch_success.html')
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
                    Opt = header + body +'<h2>Report</h2><h3>Books</h3>'+ value
                })
                .catch(console.err)

                z = Utility.fetch_journal_flat(docName, field)
                z.then((value2) => {
                    Opt += '<h3>Journals</h3>'+ value2 + footer
                    fs.appendFileSync('render/fetch_success.html', Opt)
                    res.sendFile(__dirname + '/'+ 'render/fetch_success.html')
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
        
    res.sendFile(__dirname + '/'+ 'render/update_success.html')
    client.close()
})


app.use(express.static('render'))
app.use(express.static('about'))
app.use(express.static('login'))
app.use(express.static('update'))
app.use(express.static('home'))

var server = app.listen(8000, function(){
    console.log("Server is running at port", server.address().port)
})
