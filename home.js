const apiKey = 'a7051bf63fac7a3bc57919c27f8de004';
let movies = []; 
let currentIndex = 0; 
const itemsPerPage = 4; 
async function fetchPopularMovies() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
        const data = await response.json();
        movies = data.results; 
        console.log("Popular movies fetched:", movies);
        displayMovies(); 
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

function displayMovies() {
    const moviesList = document.querySelector(".set-of-movie");
    moviesList.innerHTML = ''; 
    const displayedMovies = movies.slice(currentIndex, currentIndex + itemsPerPage);
    const movieElements = displayedMovies.map(movie => {
        return `
            <div class="movie">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <a href="#">More Info</a>
            </div>
        `;
    }).join(""); 
    
    moviesList.innerHTML = movieElements; 
}

document.getElementById("arrow-left").addEventListener("click", () => {
    console.log("arrow-left clicked");
    currentIndex = Math.max(currentIndex - itemsPerPage, 0); 
    displayMovies();
});
document.getElementById("arrow-right").addEventListener("click", () => {
    console.log("arrow-right clicked");
    currentIndex = Math.min(currentIndex + itemsPerPage, movies.length - itemsPerPage); 
    displayMovies();
});
fetchPopularMovies();
