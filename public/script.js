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
    let table = document.getElementById("album-table");

    albumData.forEach(row => {

        let rowDiv = document.createElement("div");

        row.forEach(ele => {
            let div = document.createElement("div");
            div.innerText = ele;

            rowDiv.appendChild(div);
        })

        table.appendChild(rowDiv);

    })

}

renderAlbums();

