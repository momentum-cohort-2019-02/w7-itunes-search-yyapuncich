// let apiUrl = "https://itunes-api-proxy.glitch.me/"
/* globals fetch */


// add event listener for sumbit search form, prevent default

// defines response to searching the iTunes API. Returns the json data from search term


// data attribute with url of song needed to pLAY on PLAY button(click)


document.addEventListener('DOMContentLoaded', function () {
    
    let searchField = document.querySelector('#music-search')
    searchField.addEventListener('change', function (event) {
            event.preventDefault()

            let searchText = 'term='
            searchText += encodeURIComponent(searchField.value)
            console.log(searchText)
            searchField.value = ''

            const promise = fetch(
                    `https://itunes-api-proxy.glitch.me/search?${searchText}`
                )
                .then(function (response) {
                    if (!response.ok) {
                        throw Error(response.statusText)
                    }
                    // console.log(response.json())
                    return response.json()
                })
            return promise
        })
    })
