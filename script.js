const elementById = (id) => {
 return document.getElementById(id);
};
const error = document.getElementById('error');
const handleSearch = () => {
  const keyword = elementById("keyword");
  const keywordValue = keyword.value;
  if (keywordValue == '') {
    error.innerText = 'Please give a valid artist';
    const artistContainer = elementById("artists");
  artistContainer.innerHTML = "";

   
  } else {
    const artistContainer = elementById("artists");
  artistContainer.innerHTML = "";
    const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showArtists(data.artists));
    keyword.value = '';
    error.innerText = '';
    

  }
  
};

const showArtists = (artists) => {
  const albumContainer = elementById("albums");
  albumContainer.innerHTML = '';
  console.log(artists);
  
  const artistContainer = elementById("artists");
  artists.forEach((artist) => {
    const div = document.createElement("div");
    div.classList.add("artist-card");
    div.innerHTML = `<div class="image-container">
    <div class="image-container-inner">
      <img
        src="${artist.strArtistThumb ? artist.strArtistThumb : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'}"
        alt=""
      />
    </div>
  </div>
  <div class="info-container">
    <h1>${artist.strArtist}</h1>
    <p>Country: ${artist.strCountry}</p>
    <p>Style: ${artist.strGenre}</p>
  </div>
  <button class="album-button">
    <i class="fa-solid fa-compact-disc"></i>
    <p onclick="fetchAlbums('${artist.idArtist}')" class="button-title">Albums</p>
  </button>`;
    artistContainer.appendChild(div);
  });
};

const fetchAlbums = (id) => {
  const albumContainer = elementById("albums");
  albumContainer.innerHTML = '';
  console.log(id);
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAlbum(data.album));
  const artistContainer = elementById("artists");
  artistContainer.innerHTML = "";
  error.innerText = '';

};

const showAlbum = (albums) => {
  error.innerText = '';
  const albumContainer = elementById("albums");
  albums.forEach((album) => {
    const div = document.createElement("div");
    div.classList.add("album");
    div.innerHTML = `
        <div class="album-image-container">3
          <img
            // src="${album.strAlbumThumb ? album.strAlbumThumb : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' }"
            alt=""
          />
        </div>
        <div class="album-name">
          <h3>${album.strAlbum}</h3>
        </div>
      `;

    albumContainer.appendChild(div);
  });
};
