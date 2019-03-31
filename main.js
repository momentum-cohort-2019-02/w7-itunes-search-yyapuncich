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

        getArtistData(searchText)
            .then(musicData => {
                // iterate through every index of results
                let arrayOfData = musicData.results
                // console.log(arrayOfData)
                for (let i = 0; i < arrayOfData.length; i++) {
                    // console.log(arrayOfData[i])
                    // checked out Dan M's code to see how he did this for loop
                    // create divs below to put my track data in HTML
                    let createListSection = document.createElement('ul')
                    let trackListItem = document.createElement('li')
                    let artistListItem = document.createElement('li')
                    let trackArtItem = document.createElement('li')
                    let trackAudioItem = document.createElement('li')
                    query('.song-set').appendChild(createListSection)
                    createListSection.appendChild(trackListItem)
                    createListSection.appendChild(artistListItem)
                    createListSection.appendChild(trackArtItem)
                    createListSection.appendChild(trackAudioItem)

                    let audioURl = arrayOfData[i].previewUrl
                    let artistName = arrayOfData[i].artistName
                    let trackName = arrayOfData[i].trackName
                    let trackArt = arrayOfData[i].artworkUrl100

                    trackListItem.innerText = trackName
                    trackArtItem.innerHTML = trackArt
                    artistListItem.innerText = artistName
                    trackAudioItem.innerHTML = audioURl
                    console.log(artistName)
                    console.log(trackName)
                    // return createListSection    
                }
                // for (let row of musicData.results) {
                //     const createSongSet = document.createElement('span')
                //     createSongSet.setAttribute('class', "song-set")
                //     // create 'span' for every set of song info
                //     for (items in row) {
                //         if (row.trackName) {
                //         trackListItem.innerText = row.trackName
                //         artistName = row.artistName
                //         query('.song-set').appendChild(trackListItem)
                //         }
            })
    })

    // console.log(musicData.results[0].artistName)
})