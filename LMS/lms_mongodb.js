const { MongoClient } = require("mongodb")
const url = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(url)
dbName = 'Library'
const db = client.db(dbName);

async function write_book() { //done
    const collection = db.collection('Books')
    var query
    let x = await collection.find(query).toArray(function(err, res) {
        if (err) throw err
        console.log(res)
    })
    fs.writeFileSync('books.json', JSON.stringify(x))
}

async function write_journal() { //done
    const collection = db.collection('Journals')
    var query 
    let x = await collection.find(query).toArray(function(err, res) {
        if (err) throw err
        console.log(res)
    })
    fs.writeFileSync('journals.json', JSON.stringify(x))
}

async function fetch_book(docName, field) { //done
    const collection = db.collection('Books')
    var query
    switch(field){
        case 'author':
            query = {'author': docName}
            break
        case 'date':
            query = {'date': docName}
            break
        case 'id':
            query = {'book_ID': parseInt(docName)}
            break
        case 'title':
            query = {'book_title': docName}
            break
        case 'empty':
            break;
        default: console.log("Error at fetch_book")
    }
    let x = await collection.find(query).toArray(function(err, res) {
        if (err) throw err
        console.log(res)
    })

    var result = display('Books', x)
    return result
}

async function fetch_journal(docName, field) { //done
    const collection = db.collection('Journals')
    var query
    switch(field){
        case 'author':
            query = {'author': docName}
            break
        case 'date':
            query = {'date': docName}
            break
        case 'ID':
            query = {'journal_ID': parseInt(docName)}
            break
        case 'title':
            query = {'journal_title': docName}
            break
        case 'empty':
            break;
        default: console.log("Error at fetch_journal")
    }
    let x = await collection.find(query).toArray(function(err, res) {
        if (err) throw err
        console.log(res)
    })

    var result = display('Journals', x)
    return result
}

async function update_document(docType,title, newTitle) { //done
    switch(docType) {
        case 'Books':
            update_book(title, newTitle)
            break
        case 'Journals':
            update_journal(title, newTitle)
            break
        case 'All':
            update_book(title, newTitle)
            update_journal(title, newTitle)
            break
        default: console.log("Oops, something went wrong at update_document")
    }
}

async function update_book(title, newTitle) { //done
    const collection = db.collection('Books')
    const query = {'book_title': title}
    var newValue = { $set: {'book_title': newTitle}}
    
    await collection.updateOne(query, newValue, function(err, res) {
        if (err) throw err
        console.log("Book "+title+ "updated to "+newTitle)
    })
    console.log(title+" updated to "+ newTitle)
}

async function update_journal(title, newTitle) { //done
    const collection = db.collection('Journals')
    const query = {'journal_title': title}
    var newValue = { $set: {'journal_title': newTitle}}
    
    await collection.updateOne(query, newValue, function(err, res) {
        if (err) throw err
        console.log(res)
    })
    console.log(title+" updated to "+ newTitle)
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
    var htmlOpt = "<html><body><br><table border = '2'>"
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
    htmlOpt += "</table></body></html>" 
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
    update_document, write_book, write_journal, fetch_book, fetch_journal, display, string_similarity
}