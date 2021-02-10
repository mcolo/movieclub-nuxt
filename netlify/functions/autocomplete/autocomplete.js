const fs = require('fs')
const trie = fs.readFileSync('./autocomplete_trie.json', 'utf8')
const movieData = fs.readFileSync('./autocomplete_dataset.json', 'utf-8')

exports.handler = async function(event, context) {
  // your server-side functionality
  const query = JSON.parse(event.body).query
  if (!query) return

  try {
    const ids = suggestions(event.body.query)

    if (ids) {
      const results = getMovieData(ids)
      return {
        statusCode: 200,
        body: JSON.stringify(results)
      }
    } else {
      return {
        statusCode: 400,
        body: 'Failed to find movie data'
      }
    }
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`)
  }
}

function suggestions(str) {
  let response = []
  str = str.toLowerCase()
  try {
    const startNode = str.split('').reduce((node, char) => {
      return node[char]
    }, trie)
    response = getIds(startNode)
    return response
  } catch (err) {
    console.log(err)
    return null
  }
}

function getIds(obj, ids = []) {
  if (obj['ids']) {
    ids.push(...obj['ids'])
  }

  for (let prop in obj) {
    if (prop !== 'ids') {
      getIds(obj[prop], ids)
    }
  }
  return ids
}

function getMovieData(ids) {
  let data = []
  ids.forEach((id, index) => {
    if (movieData[id].r) {
      data.push({
        title: movieData[id].t,
        year: movieData[id].y,
        rating: movieData[id].r,
        id
      })
    }
  })
  // data.sort( (a,b) => b.rating - a.rating);
  data.splice(9, data.length - 10)
  return data
}
