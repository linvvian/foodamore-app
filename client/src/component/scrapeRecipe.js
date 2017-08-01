var request = require('request')
var cheerio = require('cheerio')
var axios = require('axios')

const url1 = 'http://www.familycircle.com/recipe/chicken/indian-spiced-chicken-thighs/'
const url2 = 'http://www.food.com/recipe/the-best-ever-waffles-31750'
const url3 = 'http://www.delish.com/cooking/recipe-ideas/recipes/a6868/chicken-tetrazzini-recipe/'

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
    let ulCN = ulNames.filter(e => !!e).find(value => value.includes('ingredient') && value.includes('list'))
    ulCN = ulCN && ulCN.includes(' ') ? ulCN.split(' ')[0] : ulCN
    let divCN = divNames.filter(e => !!e).find(value => value.includes('ingredient'))
    let ind = ulCN ? $(`ul.${ulCN}`).text() : $(`div.${divCN} ul`).text()
    let indS = ind.replace(/\s+/g, ' ')
    let ingredients = indS.match(/(\d+[\/\d. ]*|\d).*?(?=(\d+[\/\d. ]*|\d))/g)

    let olNames = []
    $('ol').each(function(i, element){
      olNames.push($(this).attr('class'))
    })
    let olCN = olNames.filter(e => !!e).find(value => value.includes('direction') && value.includes('list'))
    olCN = olCN && olCN.includes(' ') ? olCN.split(' ')[1] : olCN
    let divDirCN = divNames.filter(e => !!e).find(value => value.includes('direction'))
    divDirCN = divDirCN && divDirCN.includes(' ') ? divDirCN.split(' ')[0] : divDirCN
    let dirct = olCN ? $(`ol.${olCN}`).text() : $(`div.${divDirCN} ol`).text()
    let instructions = dirct.split(/\n/).map(step => step.trim()).filter(value => value !== '')
    console.log('in callback', ingredients, instructions)
    results = [ingredients, instructions]
  }
}

const scrapeRecipe = (url)=>{
  let options = {
    url: url,
  }
  axios.get(`${url}`)
  .then(response => {
    callback(response, response.data)
  })
}

scrapeRecipe(url1)
