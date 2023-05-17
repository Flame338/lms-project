const { MongoClient } = require("mongodb")
const url = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(url)
dbName = 'Library'
const db = client.db(dbName);
const fs = require('fs');
const { finished } = require("stream");
const books = './JSON/books.json'
const journals = './JSON/journals.json'

async function loadJSON(fileName = '') { //loading JSON
   return await JSON.parse (
    fs.existsSync(fileName)
    ? fs.readFileSync(fileName).toString()
    : '""'
    )
}

async function saveJSON(fileName = '', json = '') { //saving JSON to file
    fs.writeFile(fileName, JSON.stringify(json, null, 2), finished)

    function finished (err) {
        console.log("Document has been written")
    }
}

async function add_book_flat(title='', author='', dop='') { //bug: double printing new element into file
    var value = []
    value = await loadJSON(books)
    console.log('Before pushing data')
    console.log(value)
    console.log('After pushing data')
    var len = value.length
    var index = value.length == null? 1: value.length +1 
    var book_info = {
        author: author,
        date: dop,
        book_ID:  index,
        book_title: title
    }
    value[len] = book_info
    console.log(value)
    saveJSON(books, value)
    client.close()
}

async function fetch_book_flat(bookattr, field) { //.json version for fetching books
    const data = await loadJSON(books)
    var Opt = []
    var len = data.length
    console.log(field)
    switch(field) {
        case 'title':
            for(var i = 0; i < len; i++) {
                if(data[i].book_title == bookattr)
                Opt.push(data[i])
            }
            break
        case 'author':
            for(var i = 0; i < len; i++) {
                if(data[i].author == bookattr)
                Opt.push(data[i])
            }
            break
        case 'date':
            for(var i = 0; i < len; i++) {
                if(data[i].date == bookattr)
                Opt.push(data[i])
            }
            break
        case 'id':
            for(var i = 0; i < len; i++) {
                if(data[i].book_ID == parseInt(bookattr))
                Opt.push(data[i])
            }
            break
        case 'empty':
            for(var i = 0; i < len; i++) {
                Opt.push(data[i])
            }
            break
    }
    return await display('Books', Opt)
}

async function fetch_journal_flat(bookattr, field) { //.json version of fetch_journals
    const data = await loadJSON(journals)
    var Opt = []
    var len = data.length
    switch(field) {
        case 'title':
            for(var i = 0; i < len; i++) {
                if(data[i].journal_title == bookattr)
                Opt.push(data[i])
            }
            break
        case 'author':
            for(var i = 0; i < len; i++) {
                if(data[i].author == bookattr)
                Opt.push(data[i])
            }
            break
        case 'date':
            for(var i = 0; i < len; i++) {
                if(data[i].date == bookattr)
                Opt.push(data[i])
            }
            break
        case 'id':
            for(var i = 0; i < len; i++) {
                if(data[i].journal_ID == parseInt(bookattr))
                Opt.push(data[i])
            }
            break
        case 'empty':
            for(var i = 0; i < len; i++) {
                Opt.push(data[i])
            }
            break
    }
    return await display('Journals', Opt)
}

async function update_document_flat(docType,title, newTitle) { 
    switch(docType) {
        case 'Books':
            update_book_flat(title, newTitle)
            break
        case 'Journals':
            update_journal_flat(title, newTitle)
            break
        case 'All':
            update_book_flat(title, newTitle)
            update_journal_flat(title, newTitle)
            break
        default: console.log("Oops, something went wrong at update_document")
    }
}

async function update_book_flat(title, newTitle) {
    const data = await loadJSON(books)
    const len = data.length
    var i
    for(i = 0; i < len; i++) {
        if(data[i].book_title == title)
        data[i].book_title = newTitle
    }
    console.log(title + " updated to " +newTitle)
    saveJSON(books, data)
}

async function update_journal_flat(title, newTitle) {
    const data = await loadJSON(journals)
    const len = data.length
    for(var i = 0; i< len; i++) {
        if(data[i].journal_title == title)
        data[i].journal_title = newTitle
    }
    console.log(title + " updated to " + newTitle)
    saveJSON(journals, data)
}

async function display(docType, value = []) { //universal display function
    var id = [], title = [], author = [], date = []
    var len = value.length
    switch(docType) {
        case 'Books':
            for(var i = 0;i < len;i++) {
                id[i] = value[i].book_ID
                title[i] = value[i].book_title
                author[i] = value[i].author
                date[i] = value[i].date }
            break
        case 'Journals':
            for(var i = 0;i < len;i++) {
                id[i] = value[i].journal_ID
                title[i] = value[i].journal_title
                author[i] = value[i].author
                date[i] = value[i].date }
            break
        default: console.log("Error in docType in display")
    }
    var htmlOpt = "<div><table border = '2'>"
    htmlOpt += "<tr><th>ID</th> <th>Title</th>"
    htmlOpt += "<th>Author</th><th>DOP</th></tr>"
    for(var i = 0; i< len; i++){
        htmlOpt += "<tr>";
        htmlOpt += "<td>" + id[i] + "</td>"
        htmlOpt += "<td>" + title[i] + "</td>"
        htmlOpt += "<td>" + author[i] + "</td>"
        htmlOpt += "<td>" + date[i] + "</td>"
        htmlOpt += "</tr>"
    }
    htmlOpt += "</table></div>" 
    return htmlOpt 
}

module.exports = { 
    display, loadJSON, saveJSON, fetch_book_flat, fetch_journal_flat, update_document_flat
}