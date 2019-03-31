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

function generateDisplay(searchText) {
    getArtistData(searchText)
        .then(musicData => {
            // iterate through every index of results
            let arrayOfData = musicData.results
            // console.log(arrayOfData)
            for (let i = 0; i < arrayOfData.length; i++) {
                // console.log(arrayOfData[i])
                // checked out Dan M's code to see how he did this for loop
                // create divs below to put my track data in HTML
                const createListSection = document.createElement('ul')
                createListSection.setAttribute("class", "track-details")
                let trackListItem = document.createElement('li')
                let artistListItem = document.createElement('li')
                let trackArtItem = document.createElement('li')
                let trackAudioItem = document.createElement('li')
                query('.song-set').appendChild(createListSection)
                createListSection.appendChild(trackListItem)
                createListSection.appendChild(artistListItem)
                createListSection.appendChild(trackArtItem)
                createListSection.appendChild(trackAudioItem)

                let artistName = arrayOfData[i].artistName
                let trackName = arrayOfData[i].trackName
                let trackArt = arrayOfData[i].artworkUrl100

                trackListItem.innerText = trackName
                trackArtItem.innerHTML = trackArt
                artistListItem.innerText = artistName
                // trackAudioItem.innerHTML = "<audio src=" + audioURL + "></audio>"
                let audioURL = arrayOfData[i].previewUrl
                let track = new Audio(audioURL)
                trackAudioItem.addEventListener('click', () => {
                    track.play()
                })
                trackAudioItem.innerText = "Play!"
                trackAudioItem.appendChild(track)
                console.log(artistName)
                console.log(trackName)
            }
        })
}
// Classlist: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList

document.addEventListener('DOMContentLoaded', function () {
    console.log('dom content loaded')

    let searchField = query('#music-search')
    searchField.addEventListener('change', event => {
        event.preventDefault()
        let searchText = 'term='
        searchText += encodeURIComponent(searchField.value)
        console.log(searchText)
        searchField.value = ''

        generateDisplay(searchText)
    })
})