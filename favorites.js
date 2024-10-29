async function api(movieId) {
    const apiKey = "a7051bf63fac7a3bc57919c27f8de004";
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
    try {
        const data = await fetch(url);
        const movieData = await data.json();
        console.log(movieData); // Debugging
        return `
            <div class="film">
                <div class="photo">
                    <img src="https://image.tmdb.org/t/p/w500${movieData.poster_path}" alt="${movieData.title}">
                </div>
                <div class="title">
                    <span class="title">${movieData.title}</span>
                </div>
            </div>
        `;
    } catch (e) {
        console.error(e);
        return `<h2>Error fetching movie data</h2>`;
    }
}

async function loadFavoritesMovies() {
    const favoritesList = document.getElementById('favoritesList');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    console.log(favorites); 
    const dataPromises = favorites.map((movie) => api(movie.id));
    const data = await Promise.all(dataPromises);
    favoritesList.innerHTML = data.join("");
}


document.addEventListener("DOMContentLoaded", loadFavoritesMovies);
