// let apiUrl = "https://itunes-api-proxy.glitch.me/"
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

document.addEventListener('DOMContentLoaded', function () {
    let searchField = query('#music-search')
    searchField.addEventListener('change', event => {
        event.preventDefault()
        let searchText = 'term='
        searchText += encodeURIComponent(searchField.value)
        console.log(searchText)
        searchField.value = ''

        console.log('dom content loaded')
        getArtistData(searchText)
            .then(musicData => {
                console.log(musicData)


            })
    })
})
