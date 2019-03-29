// let apiUrl = "https://itunes-api-proxy.glitch.me/"
/* globals fetch */

let searchTerm = document.querySelector('#music-search')
console.log(searchTerm)

// add event listener for sumbit search form, prevent default

// defines response to searching the iTunes API. Returns the json data from search term
function getMusicSearch (searchTerm) {
    const promise = fetch(
        `https://itunes-api-proxy.glitch.me/search?term=${searchTerm}`
    )
    .then(function (response) {
        if (!response.ok) {
            throw Error(response.statusText)
        }
        // console.log(response.json())
        return response.json()
    })
    return promise
}

// data attribute with url of song needed to pLAY on PLAY button(click)


document.addEventListener('DOMContentLoaded', function () {
    searchTerm.addEventListener('input', function () {
        console.log(searchTerm.value)
    })
    getMusicSearch(searchTerm)

})