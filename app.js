const searchResult = document.getElementById('searchValue');
const clickButton = document.getElementById('searchButton');
const apiLink = 'https://api.lyrics.ovh/suggest/';
const resultShowItem = document.getElementById('resultItem');
const lyric = 'https://api.lyrics.ovh/v1/';
const showLyricItem = document.getElementById('showLyric');

// api call for search result
const getSearchResult = () => { 
    fetch(`${apiLink}${searchResult.value}`)
        .then(res => res.json())
        .then(data => {
            createDivBySearchResult(data.data);
        })
}
// button event handler
clickButton.addEventListener('click', () => { 
    resultShowItem.innerHTML = '';
    showLyricItem.innerHTML = '';
    getSearchResult();
});

// Take first 10 result item from the total search result
const createDivBySearchResult = (totalResult) => { 
    for (let i = 0; i < totalResult.length; i++) {
        if (i > 9) {
            break;
        } else {
            createElements(totalResult[i].title, totalResult[i].album.title, totalResult[i].artist.name, totalResult[i].artist.picture);
        }
    }
}
// create element for result item
const createElements = (title, album, artist, artistPicture) => {
    resultShowItem.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                              <div class="col-md-6">
                              <h3 class="lyrics-name">${title}</h3>
                              <p class="author lead">Artist: <span>${artist}</span></p>
                              <p class="author lead"> Album: <span>${album}</span></p>
                              </div>
                              <div class="col-md-3">
                              <h4>${artist}</h4>
                              <img src="${artistPicture}" height="100" >
                              </div>
                              <div class="col-md-3 text-md-right text-center">
                              <button onclick="getLyric('${artist}', '${title}')" class="btn btn-success">Get Lyrics</button>
                              </div>                         
                              </div>`;
}
// api call when get lyrics button click
const getLyric = (artist, title) => { 
    fetch(`${lyric}/${artist}/${title}`)
        .then(res => res.json())
        .then(data => {
            showLyric(title, artist, data.lyrics);
        })
}
// show lyrics for selected item
const showLyric = (title, artist, lyric = 'Lyric not available! Please try another one.') => {
    showLyricItem.innerHTML = ` <button class="btn go-back">&lsaquo;</button>
                            <h2 class="text-success mb-4">${title} - ${artist}</h2>
                            <pre class="lyric text-white">${lyric}</pre>
                          `;
}