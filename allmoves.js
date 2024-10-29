const apiKey = "a7051bf63fac7a3bc57919c27f8de004";
// https://api.themoviedb.org/3/movie/popular?api_key=a7051bf63fac7a3bc57919c27f8de004&language=en-US&page=1
let movies = [];

async function fetchPopularMovies() {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
        );
        const data = await response.json();
        movies = data.results;
        console.log("Popular movies fetched:", movies);
        getallMovies();
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

function getallMovies() {
    const moviesList = document.querySelector(".allmovies .container");
    const displayedMovies = movies;
    const movieElements = displayedMovies
        .map((movie) => {
            return `
            <div class="movie">
                <div class="imgandicons">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <div class="icon">
                        <i class="fa-solid fa-play"></i>
                        <span>${movie.vote_average}</span>
                    </div>
                </div> 
                <div class="about">
                    <div>
                        <h2>${movie.title}</h2>
                        <a href="#">More Info</a>
                    </div>
                    <button onclick="addToFavorites('${movie.title}', ${movie.id}, this); fivarate(this);">
                    <i onclick="fivarate(this)" class="fa-regular fa-heart hart"></i> 
                    </button>
                </div>
            </div>
        `;
        })
        .join("");
    moviesList.innerHTML = movieElements;
}
function addToFavorites(movieName, id, button) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(movieName)) {
        alert(`${movieName} موجود بالفعل في قائمة المفضلات`);
        return;
    }
    favorites.push({ id: id, movieName: movieName });
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert(`تم إضافة ${movieName} إلى قائمة المفضلات`);
}
function fivarate(icon) {
    if (icon.classList.contains("fa-regular")) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
    } else {
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
    }
}

fetchPopularMovies();
