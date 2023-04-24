const clientId = "3b6eed8d7949490d9c59bfc5c37ffa55" ; 
const clientSec = "bf8fd6f44fdb4d9c867b7abe58c37c31" ; 

function onResponse(response){
    return response.json();
}

function onTokenResponse(response) {
    return response.json();
}

function getToken(json)
{
	token_data = json;
	
}

function onJson(json){
    
    const products = document.querySelector('#products');
    products.innerHTML = '';
    //processo ciascun risultato
    for(let i=0; i<7; i++){
        const doc = json[i];

        const caption1 = document.createElement('span');
        const brand = doc.brand;
        caption1.textContent = brand;

        const caption2 = document.createElement('span');
        const name = doc.name;
        caption2.textContent = name;

        const photo = document.createElement('img');
        photo.src = doc.image_link;
        const prod = document.createElement('div');
        prod.classList.add('prod');
        
        photo.src = doc.image_link;
        prod.appendChild(photo);
        prod.appendChild(caption1);
        prod.appendChild(caption2);
        products.appendChild(prod);
    }

}

function search(event){
    event.preventDefault();
    //leggi valore del campo di testo
    const product_input = document.querySelector('#product');
    const product_value = encodeURIComponent(product_input.value);
    //preparo la richiesta
    rest_url = "http://makeup-api.herokuapp.com/api/v1/products.json?product_type=" + product_value;
    //eseguo fetch
    fetch(rest_url).then(onResponse).then(onJson);
}

function onJsonSpotify(json) {
   
    const song = document.querySelector('#song');
    song.innerHTML = '';

    const result = json.tracks.items[0] ;

    const album = document.createElement('span');
    const name_album = result.album.name;
    album.textContent = "Album: " + name_album;

    const artist = document.createElement('span');
    const name_artist = result.artists[0].name;
    artist.textContent = "Artist: " + name_artist;

    const image = document.createElement('img');
    image.src = result.album.images[0].url;

    const link = document.createElement('a');
    const url_link = result.preview_url;
    link.textContent = "Click per ascoltare";
    link.href = url_link;
   
    
    song.appendChild(image);
    song.appendChild(artist);
    song.appendChild(album);
    song.appendChild(link);   
}

function searchOnSpotify(event){
    event.preventDefault();
    //Leggi valore del campo di testo
	const song_input = document.querySelector('#author');
    const song_value = encodeURIComponent(song_input.value);
    //eseguo richiesta
    fetch("https://api.spotify.com/v1/search?type=track&include_external=audio&q=" + song_value,
    {
        headers:
        {
            'Authorization': 'Bearer ' + token_data.access_token
        }
    }
    ).then(onResponse).then(onJsonSpotify);
}




//richiesta token
let token_data;
fetch("https://accounts.spotify.com/api/token",
{
    method: "post",
    body: 'grant_type=client_credentials',
    headers:
    {
        'Content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSec)
    }
}
).then(onTokenResponse).then(getToken);

const formMakeUp = document.querySelector('#makeUp');
formMakeUp.addEventListener('submit', search);

const formMusic = document.querySelector('#music');
formMusic.addEventListener('submit', searchOnSpotify);

