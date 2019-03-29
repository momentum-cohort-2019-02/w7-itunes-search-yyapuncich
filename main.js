// let apiUrl = "https://itunes-api-proxy.glitch.me/"
/* globals fetch */


// add event listener for sumbit search form, prevent default

// defines response to searching the iTunes API. Returns the json data from search term


// data attribute with url of song needed to pLAY on PLAY button(click)


document.addEventListener('DOMContentLoaded', function () {

            let searchField = document.querySelector('#music-search')
            searchField.addEventListener('change', function (event) {
                event.preventDefault()
                // allows custimization of the 'change' event
                // define searchtext, encode the text and add it to searchtext, 
                // clear the entry so we can search again:
                let searchText = 'term='
                searchText += encodeURIComponent(searchField.value)
                console.log(searchText)
                searchField.value = ''
                // add searchtext to api search and return the json data
                fetch(`https://itunes-api-proxy.glitch.me/search?${searchText}`, {
                        method: 'POST',
                        searchText: searchText
                    })
                    .then(function (response) {
                        if (!response.ok) {
                            throw Error(response.statusText)
                        }
                        return response.text()
                    })
                    .then(text => {
                        const searchResult = document.createRange().createContextualFragment(text)
                        document.querySelector('.search-result-item').appendChild(searchResult)
                    })
            })
        })