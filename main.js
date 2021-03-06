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

    return fetch(`https://itunes-api-proxy.glitch.me/search?term=${searchText}`)
        .then(response => {
            if (!response.ok) {
                console.log('not ok')
                throw Error(response.statusText)
            }
            console.log('responjson')
            return response.json()
        })
}

function playMusic(trackAudioItem, track, trackName, artistName) {
    let nowPlaying = query('.now-playing-header')
    trackAudioItem.addEventListener('click', event => {
        track.play()
        nowPlaying.innerHTML = "Currently listening to - - - " + trackName + "by" + artistName
        if (event.target) {
            trackAudioItem.addEventListener('click', () => {
                track.pause()
                nowPlaying.innerHTML = "<p>Listen to more?</p>"
            })
        }
    })
}

// function pauseMusic(playMusic) {
//     if (playMusic()) {
//         trackAudioItem.addEventListener('click', () => {
//             track.pause()
//             nowPlaying.innerHTML = "Currently listening to - - - " + trackName + "by" + artistName
//         })
// }

function generateDisplay(searchText) {
    getArtistData(searchText)
        .then(musicData => {
            // iterate through every index of results
            let arrayOfData = musicData.results
            // console.log(arrayOfData) https://stackoverflow.com/questions/36413159/understanding-nested-for-loops-in-javascript
            for (let i = 0; i < arrayOfData.length; i++) {
                // console.log(arrayOfData[i])
                // checked out Dan M's code to see how he did this for loop
                // create divs below to put my track data in HTML
                const createListSection = document.createElement('ul')
                createListSection.classList.add("track-details")
                let trackListItem = document.createElement('li')
                let artistListItem = document.createElement('li')
                let trackArtItem = document.createElement('li')
                let trackAudioItem = document.createElement('li')
                // add my <ul> to song-set section and <li>s to <ul>
                query('.song-set').appendChild(createListSection)
                createListSection.appendChild(trackListItem)
                createListSection.appendChild(artistListItem)
                createListSection.appendChild(trackArtItem)
                createListSection.appendChild(trackAudioItem)
                // set variables to get info for each track
                let artistName = arrayOfData[i].artistName
                let trackName = arrayOfData[i].trackName
                let trackArt = arrayOfData[i].artworkUrl100
                // set inner contents of <li> I created above
                trackListItem.innerText = trackName
                // InnerHTML https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
                trackArtItem.innerHTML = "<img src=" + trackArt + ">"
                artistListItem.innerText = artistName
                // set audio contents for each track item
                // https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement#Basic_usage
                let audioURL = arrayOfData[i].previewUrl
                let track = new Audio(audioURL)
                // Controls are ugly ya'll
                // track.setAttribute("controls", "")
                playMusic(trackAudioItem, track, trackName, artistName)
                // .then(track => {
                //     track.addEventListener('change', () => {
                //         return track
                //     })
                // })
                // add track audio to track-details-list
                trackAudioItem.innerText = "Play!"
                trackAudioItem.appendChild(track)
                trackAudioItem.classList.add("audio-list-item")
                // change now playing header
            }
        })
}
// Classlist: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList

document.addEventListener('DOMContentLoaded', function () {
    console.log('dom content loaded')
    let searchField = query('#music-search')
    searchField.addEventListener('change', event => {
        event.preventDefault()
        query(".artist-name-header").innerHTML =
            "<p>Results for " + searchField.value + "</p>"
        let searchText = ''
        searchText += encodeURIComponent(searchField.value)
        console.log(searchText)
        searchField.value = ''
        // clears display for new results
        query('.song-set').innerHTML = ''

        generateDisplay(searchText)
    })
})