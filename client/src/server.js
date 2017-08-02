var express = require('express')
var bodyParser = require('body-parser')
var axios = require('axios')
var cheerio = require('cheerio')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Origin", "*")
  next()
})


let results = []

function callback(response, html) {
  if (response.status == 200) {
    let $ = cheerio.load(html, {
      ignoreWhitespace: true,
    })
    let ulNames = []
    $('ul').each(function(i, element){
      ulNames.push($(this).attr('class'))
    })
    let divNames = []
    $('div').each(function(i, element){
      divNames.push($(this).attr('class'))
    })
    let ulCN = ulNames.filter(e => !!e).find(value => value.toLowerCase().includes('ingredient') && value.toLowerCase().includes('list'))
    ulCN = ulCN && ulCN.includes(' ') ? ulCN.split(' ')[0] : ulCN
    let divCN = divNames.filter(e => !!e).find(value => value.toLowerCase().includes('ingredient'))
    let ind = ulCN ? $(`ul.${ulCN}`).text() : $(`div.${divCN} ul`).text()
    let indS = ind.replace(/\s+/g, ' ')
    let ingredients = indS.match(/(\d+[\/\d. ]*|\d).*?(?=(\d+[\/\d. ]*|\d))/g)

    let olNames = []
    $('ol').each(function(i, element){
      olNames.push($(this).attr('class'))
    })
    let olCN = olNames.filter(e => !!e).find(value => value.toLowerCase().includes('direction') && value.toLowerCase().includes('list') || value.toLowerCase().includes('instruction'))
    olCN = olCN && olCN.includes(' ') ? olCN.split(' ')[1] : olCN
    let divDirCN = divNames.filter(e => !!e).find(value => value.toLowerCase().includes('direction') || value.toLowerCase().includes('instruction'))
    divDirCN = divDirCN && divDirCN.includes(' ') ? divDirCN.split(' ')[0] : divDirCN
    let dirct = olCN ? $(`ol.${olCN}`).text() : $(`div.${divDirCN} ol`).text()
    let instructions = dirct.split(/\n/).map(step => step.trim()).filter(value => value !== '')
    results = [ingredients, instructions]
  }
}

const scrapeRecipe = (url)=>{
  axios.get(`${url}`)
  .then(response => {
    callback(response, response.data)
  })
}


app.get('/', function(req, res) {
  res.send('Hello, World!')
})

app.post('/fetch', function(req, res) {
  var input = req.body.input
  scrapeRecipe(input)
  setTimeout(() => {
    console.log('BEFORE SENDING', results)
    res.send(results)
    results = []
  }, 1000)
  setTimeout(() => {
    console.log('AFTER SENDING', results)
  }, 1500)
})

app.listen(3003, function(){
  console.log('listening on port 3003')
})
