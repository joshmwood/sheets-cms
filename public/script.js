async function getAlbums() {
    const response = await fetch('/albums');
    console.log(response);
    const json = await response.json();
    console.log(json)
    return json;
}

getAlbums();

async function renderAlbums() {
    const albumData = await getAlbums();
    // render each row
    let albumList = document.createElement("ol");
    let albumDiv = document.createElement("li")
    albumDiv.classList.add("album-row");

    // start at index[1] because index[0] is the row containing column names
    for (let i = 1; i < albumData.length; i++) {

        let albumDiv = document.createElement("li")
        albumDiv.classList.add("album-row");

        let albumRank = document.createElement("div");
        albumRank.classList.add("album-rank");
        let rank = `#${i}`;
        albumRank.textContent = rank;
        albumDiv.appendChild(albumRank);

        let albumImage = document.createElement("div");
        albumImage.classList.add("album-image");
        let img = document.createElement("img");
        img.src = `img/pinkfloydanimals.jpg`;
        albumImage.appendChild(img)
        albumDiv.appendChild(albumImage);

        let albumInfo = document.createElement("div");
        albumInfo.classList.add("album-info");

        let albumTitle = document.createElement("h1");
        albumTitle.classList.add("album-title")
        albumTitle.textContent = albumData[i][0];
        albumInfo.appendChild(albumTitle);

        let artistTitle = document.createElement("h2");
        artistTitle.classList.add("title");
        artistTitle.textContent = albumData[i][1];
        albumInfo.appendChild(artistTitle);
        albumDiv.appendChild(albumInfo);

        let albumGenre = document.createElement("div")
        albumGenre.classList.add("genre");
        let span = document.createElement("span");
        span.textContent = albumData[i][2];
        albumGenre.appendChild(span);
        albumInfo.appendChild(albumGenre);

        let reviewSentence = document.createElement("p");
        reviewSentence.classList.add("review-sentence")
        reviewSentence.textContent = `this was a good album!`;
        albumInfo.appendChild(reviewSentence);

        albumScore = document.createElement("div");
        albumScore.classList.add("score");
        let div = document.createElement("div");
        div.textContent = `${albumData[i][3]}`
        albumScore.appendChild(div);
        albumDiv.appendChild(albumScore);

        albumList.appendChild(albumDiv);
    }


    let container = document.getElementById("albumListContainer");
    container.appendChild(albumList);
}

renderAlbums();

