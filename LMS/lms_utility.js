const { MongoClient } = require("mongodb")
const url = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(url)
dbName = 'Library'
const db = client.db(dbName);
const fs = require('fs');
const { finished } = require("stream");
const books = './JSON/books.json'
const journals = './JSON/journals.json'
let field_flag = false 

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

async function fetch_book_flat(bookattr, field) { //.json version for fetching books
    const data = await loadJSON(books)
    var Opt = []
    var len = data.length
    console.log('Selected field: '+ field)
    switch(field) {
        case 'title':
            for(var i = 0; i < len; i++) {
                if(data[i].book_title == bookattr)
                    Opt.push(data[i])
                field_flag = false
            }
            break
        case 'author':
            for(var i = 0; i < len; i++) {
                if(data[i].author == bookattr)
                Opt.push(data[i])
            }
            field_flag = false
            break
        case 'date':
            for(var i = 0; i < len; i++) {
                if(data[i].date == bookattr)
                Opt.push(data[i])
            }
            field_flag = false
            break
        case 'id':
            for(var i = 0; i < len; i++) {
                if(data[i].book_ID == parseInt(bookattr))
                Opt.push(data[i])
            }
            field_flag = false
            break
        case 'empty':
            for(var i = 0; i < len; i++) {
                Opt.push(data[i])
            }
            field_flag = true
            break
        default: console.log("Oops, invalid document type selected. How did you even do that?")
    }
    return await display('Books', Opt, field_flag)
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
            field_flag = false
            break
        case 'author':
            for(var i = 0; i < len; i++) {
                if(data[i].author == bookattr)
                Opt.push(data[i])
            }
            field_flag = false
            break
        case 'date':
            for(var i = 0; i < len; i++) {
                if(data[i].date == bookattr)
                Opt.push(data[i])
            }
            field_flag = false
            break
        case 'id':
            for(var i = 0; i < len; i++) {
                if(data[i].journal_ID == parseInt(bookattr))
                Opt.push(data[i])
            }
            field_flag = false
            break
        case 'empty':
            for(var i = 0; i < len; i++) {
                Opt.push(data[i])
            }
            field_flag = true
            break
        default: console.log("Oops, invalid search parameter selected. How did you even do that?")
    }
    return await display('Journals', Opt, field_flag)
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
    let htmlOpt = "<p>" + title + " updated to " +newTitle + "</p>"
    console.log(htmlOpt)
    saveJSON(books, data)
    return htmlOpt
}

async function update_journal_flat(title, newTitle) {
    const data = await loadJSON(journals)
    const len = data.length
    for(var i = 0; i< len; i++) {
        if(data[i].journal_title == title)
        data[i].journal_title = newTitle
    }
    let htmlOpt = "<p>" + title + " updated to " +newTitle + "</p>"
    console.log(htmlOpt)
    saveJSON(journals, data)
    return htmlOpt
}

async function display(docType, value = [], field_flag) { //universal display function
    console.log(field_flag)
    var id = [], title = [], author = [], date = [], author_info= []
    var len = value.length
    switch(docType) {
        case 'Books':
            for(var i = 0;i < len;i++) {
                id[i] = value[i].book_ID
                title[i] = value[i].book_title
                author[i] = value[i].author
                if(field_flag == true){
                    author_info[i] = value[i].about_author
                }
                date[i] = value[i].date }
            break
        case 'Journals':
            for(var i = 0;i < len;i++) {
                id[i] = value[i].journal_ID
                title[i] = value[i].journal_title
                author[i] = value[i].author
                if(field_flag === true){
                    author_info[i] = value[i].about_author
                }
                date[i] = value[i].date }
            break
        default: console.log("Error in docType in display")
    }
    var htmlOpt = "<div><table border = '2'>"
    htmlOpt += "<tr><th>ID</th> <th>Title</th>"
    htmlOpt += "<th>Author</th>"
    if(field_flag === true) {
        htmlOpt += "<th>Author Info</th>"
    }
    htmlOpt += "<th>DOP</th></tr>"
    for(var i = 0; i< len; i++){
        htmlOpt += "<tr>";
        htmlOpt += "<td>" + id[i] + "</td>"
        htmlOpt += "<td>" + title[i] + "</td>"
        htmlOpt += "<td>" + author[i] + "</td>"
        if(field_flag === true){
            htmlOpt += "<td>" + author_info[i] + "</td>" 
        }
        htmlOpt += "<td>" + date[i] + "</td>"
        htmlOpt += "</tr>"
    }
    htmlOpt += "</table></div>" 
    field_flag = false
    return htmlOpt 
}

function get_bigrams(string){ //universal function, work in progress
  var s = string.toLowerCase()
  var v = s.split('');
  for(var i=0; i<v.length; i++){ v[i] = s.slice(i, i + 2); }
  return v;
}

function string_similarity(str1, str2){ //fuzzy finder thingie
  if(str1.length>0 && str2.length>0){
    var pairs1 = get_bigrams(str1);
    var pairs2 = get_bigrams(str2);
    var union = pairs1.length + pairs2.length;
    var hits = 0;
    for(var x=0; x<pairs1.length; x++){
      for(var y=0; y<pairs2.length; y++){
        if(pairs1[x]==pairs2[y]) hits++;
    }}
    if(hits>0) return ((2.0 * hits) / union);
  }
  return 0.0
}



module.exports = { 
    display, loadJSON, saveJSON, fetch_book_flat, fetch_journal_flat, update_document_flat, string_similarity
}
