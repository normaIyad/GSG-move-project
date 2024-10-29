const apiKey = "a7051bf63fac7a3bc57919c27f8de004";
// https://api.themoviedb.org/3/movie/popular?api_key=a7051bf63fac7a3bc57919c27f8de004&language=en-US&page=1
let movies = [];
let currentIndex = 0;
let pagesIndex = 0;
const itemsPerPage = 4;
const pages = document.querySelector(".pages");
async function fetchPopularMovies() {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
        );
        const data = await response.json();
        movies = data.results;
        console.log("Popular movies fetched:", movies);
        Pagination();
        displayMovies();
        getallMovies();
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}
function getallMovies() {
    const moviesList = document.querySelector(".allmovies .container");
    const displayedMovies = movies ;
    const movieElements = displayedMovies
        .map((movie) => {
            return `
            <div class="movie">
                <div class="imgandicons">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <div class="icon">
                        <i class="fa-solid fa-play"></i>
                        <h3>${movie.vote_average}</h3>
                    </div>
                </div> 
                <div class="about">
                    <div>
                        <h3>${movie.title}</h3>
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
function displayMovies() {
    const moviesList = document.querySelector(".set-of-movie");
    const displayedMovies = movies.slice(currentIndex, currentIndex + itemsPerPage);
    const movieElements = displayedMovies
        .map((movie) => {
            return `
            <div class="movie">
                <div class="imgandicons">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    <div class="icon">
                        <i class="fa-solid fa-play"></i>
                        <h3>${movie.vote_average}</h3>
                    </div>
                </div> 
                <div class="about">
                    <div>
                        <h3>${movie.title}</h3>
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
    updatePagination();
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


function Pagination() {
    let numofpage = movies.length / 4;
    for (let i = 0; i < numofpage; i++) {
        const div = document.createElement("div");
        if (i === pagesIndex) div.classList.add("active"); // Set the first dot as active
        pages.appendChild(div);
    }
}
function updatePagination() {
    const dots = document.querySelectorAll(".pages div");
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === pagesIndex);
    });
}
document.getElementById("arrow-left").addEventListener("click", () => {
    console.log("arrow-left clicked");
    currentIndex = Math.max(currentIndex - itemsPerPage, 0);
    // pages[pagesIndex].classList.remove("active");
    pagesIndex--;
    displayMovies();
});
document.getElementById("arrow-right").addEventListener("click", () => {
    console.log("arrow-right clicked");
    currentIndex = Math.min(
        currentIndex + itemsPerPage,
        movies.length - itemsPerPage
    );
    // pages[pagesIndex].classList.remove("active");
    pagesIndex++;

    displayMovies();
});
fetchPopularMovies();

const form = document.querySelector(".form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const searchInput = document
        .getElementById("search-input")
        .value.toLowerCase();
    console.log("Search input:", searchInput);
    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    console.log("Filtered movies:", filteredMovies);
    const Filtered = filteredMovies.map((movie) => {
        return `
            <div class="movie">
              <div class="img">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                </div>
                <div class= "text">
                <h3>${movie.title}</h3>
                <a href="#">More Info</a>
                </div>
            </div>
        `;
    });
    const getfelter = document.querySelector(".filter-films");
    getfelter.innerHTML = Filtered.join("");
});
// recomanded part
let recomand = document.querySelector(".recommended .moves");
async function recommended() {
    let popular = [];
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=1`
        );
        const data = await response.json();
        popular = data.results.slice(0, 7);
    } catch (e) {
        console.log(e);
    }
    displayRecomand(popular);
}
function displayRecomand(popular) {
    let movieElements = popular
        .map((movie) => {
            return `
            <div class="movie">
                 <div class="imgandicons">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <div class="icon">
                <i class="fa-solid fa-play"></i>
                <h3>${movie.vote_average}</h3>
                </div>
                </div> 
            </div>
        `;
        })
        .join("");
    recomand.innerHTML = movieElements;
}
recommended();
