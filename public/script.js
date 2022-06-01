let albums = [];
let filters = [];
async function getAlbums() {
    const response = await fetch('/albums');
    console.log(response);
    const json = await response.json();
    console.log(json)
    return json;
}

// takes in sorting function to determine sorting order
async function renderAlbums(method = sortByArtistTitle) {
    if (albums.length == 0) {
        let albumData = await getAlbums();
        albums = albumData;
    }
    albumData = albums;
    // clear the container
    let container = document.getElementById("albumListContainer");
    container.innerHTML = "";

    // render each row
    let albumList = document.createElement("ol");
    // albumData = sortByScore(albumData);
    albumData = method(albumData);

    for (let i = 0; i < albumData.length; i++) {


        // check to see if the album has been filtered out
        if (filters.indexOf(albumData[i][2]) == -1) {

            let albumDiv = document.createElement("li")
            albumDiv.classList.add("album");


            // album cover
            let img = document.createElement("img");
            img.src = `https://raw.githubusercontent.com/joshmwood/album-images/main/img/${albumData[i][4]}`;
            img.classList.add("album--image")
            albumDiv.appendChild(img);

            let albumInfo = document.createElement("div");
            albumInfo.classList.add("album--info");

            // album title
            let albumTitle = document.createElement("h1");
            albumTitle.classList.add("album--title")
            albumTitle.textContent = albumData[i][0];
            albumInfo.appendChild(albumTitle);

            // artist title
            let artistTitle = document.createElement("h2");
            artistTitle.classList.add("album--artist-title");
            artistTitle.textContent = albumData[i][1];
            albumInfo.appendChild(artistTitle);
            albumDiv.appendChild(albumInfo);

            // genre(s)
            let albumGenre = document.createElement("div")
            albumGenre.classList.add("genre");
            let span = document.createElement("span");
            span.textContent = albumData[i][2];
            albumGenre.appendChild(span);
            albumInfo.appendChild(albumGenre);

            // review
            let reviewSentence = document.createElement("p");
            reviewSentence.classList.add("album--review")
            if (albumData[i][5]) {
                reviewSentence.textContent = `"${albumData[i][5]}"`
                albumInfo.appendChild(reviewSentence);
            }

            //score
            albumScore = document.createElement("div");
            albumScore.classList.add("score");
            let div = document.createElement("div");
            div.textContent = `${albumData[i][3]}`
            albumScore.appendChild(div);
            albumDiv.appendChild(albumScore);

            albumList.appendChild(albumDiv);
        }
    }

    container.appendChild(albumList);
}

function sortByScore(albumData) {
    console.log(albumData);
    albumData.sort((a, b) => {
        const scoreA = parseInt(a[3]);
        const scoreB = parseInt(b[3]);
        return scoreB - scoreA;
    })
    console.log(albumData);
    return albumData;
}

function sortByArtistTitle(albumData) {
    console.log(albumData);
    albumData.sort((a, b) => {
        let artistA = a[1].toUpperCase();
        let artistB = b[1].toUpperCase();

        // check if it begins with the word "The", and ignore it.
        // i.e 'The Beatles' becomes 'Beatles, The'
        if (artistA.startsWith("THE ")) {
            artistA = artistA.slice(4);
        }
        if (artistB.startsWith("THE ")) {
            artistB = artistB.slice(4);
        }

        if (artistA < artistB) {
            return -1;
        }
        if (artistA > artistB) {
            return 1;
        }
        return 0;
    })
    console.log(albumData);
    return albumData;
}

function sortByAlbumTitle(albumData) {
    console.log(albumData);
    albumData.sort((a, b) => {
        const albumA = a[0].toUpperCase();
        const albumB = b[0].toUpperCase();

        if (albumA < albumB) {
            return -1;
        }
        if (albumA > albumB) {
            return 1;
        }
        return 0;
    })
    console.log(albumData);
    return albumData;
}

renderAlbums(sortByScore);

function sortByScoreButton() {
    renderAlbums(sortByScore);
    lastSorted = sortByScore;
}

function sortByArtistButton() {
    renderAlbums(sortByArtistTitle);
    lastSorted = sortByArtistTitle;
}

function sortByAlbumButton() {
    renderAlbums(sortByAlbumTitle);
    lastSorted = sortByAlbumTitle;
}

function applyFiltersButton() {
    renderAlbums(lastSorted);
}

const scoreButton = document.getElementById("sortByScore");
const artistButton = document.getElementById("sortByArtist");
const albumButton = document.getElementById("sortByAlbum");
const applyFilters = document.getElementById("applyFilters");
scoreButton.addEventListener("click", sortByScoreButton);
artistButton.addEventListener("click", sortByArtistButton);
albumButton.addEventListener("click", sortByAlbumButton);

applyFilters.addEventListener("click", applyFiltersButton);

let checkboxes = document.querySelectorAll("input[type=checkbox]");

checkboxes.forEach(ele => {
    ele.addEventListener('change', function () {
        if (this.checked) {
            console.log("Checkbox is checked..");
            // remove from filters array
            let genreToRemove = this.value;
            let index = filters.indexOf(genreToRemove);
            if (index != -1) {
                filters.splice(index, 1);
                console.log(filters);
            }

        } else {
            console.log("Checkbox is unchecked..");
            filters.push(this.value)
            console.log(this.value);
            console.log(filters);

        }
    });
})

let lastSorted = sortByScore;
