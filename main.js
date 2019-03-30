/* globals fetch */

function query(selector) {
    return document.querySelector(selector)
}

function queryAll(selector) {
    return document.querySelectorAll(selector)
}

// restructuring my javascript file to look more like Abbys... using more functions
function getArtistData(searchText) {
    console.log('get artist data')

    return fetch(`https://itunes-api-proxy.glitch.me/search?${searchText}`)
        .then(response => {
            if (!response.ok) {
                console.log('not ok')
                throw Error(response.statusText)
            }
            console.log('responjson')
            return response.json()
        })
}

function createElement(musicData) {
    let newListItem = document.createElement('li')
    let newInfo = document.createTextNode(musicData.results.artistName)
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('dom content loaded')

    let searchField = query('#music-search')
    searchField.addEventListener('change', event => {
        event.preventDefault()
        let searchText = 'term='
        searchText += encodeURIComponent(searchField.value)
        console.log(searchText)
        searchField.value = ''

        getArtistData(searchText)
            .then(musicData => {
                for (let row of musicData.results) {
                    listElement = document.createElement('li')
                    listElement.innerText = row.trackName
                    query('#search-result').appendChild(listElement)
                }
                console.log(musicData.results[0].artistName)
            })
    })
})