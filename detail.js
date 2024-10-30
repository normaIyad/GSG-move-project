const apiKey = 'a7051bf63fac7a3bc57919c27f8de004';

const movieDetail = document.getElementById('movie-detail');
const movieReviews = document.getElementById('reviews');

async function getMovie() {

    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    console.log(movieId);

    if(!movieId){
        movieDetail.innerHTML = '<p>No movie ID found in the URL.</p>';
    }
    else {

        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`);
            const movie = await response.json();
            console.log("Popular movies fetched:", movie);

            const creditResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`);
            const movieCredits = await creditResponse.json();
            console.log("Movie credits fetched:", movieCredits);

            movieDetail.innerHTML = `
            <h1>${movie.title}</h1>
                <div class="card">
                    <div class="movie-image">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                    </div>
                    <div class="movie-content">
                        <h2>Movie Details</h2>
                        <ul>
                            <li>
                                <span class="movie-rate"><strong>Rating: </strong>${movie.vote_average}/10</span></li>
                            <li>
                                <span><strong>Release Date: </strong>${movie.release_date}</span>
                            </li>
                            <li>
                                <span><strong>Genre: </strong>${movie.genres.map(genre =>genre.name)}</span>
                            </li>
                            <li>
                                <span><strong>Actors: </strong>${movieCredits.cast.slice(0,5).map(credit=>credit.name)}</span>
                            </li>
                            <li>
                                <span><strong>Country: </strong>${movie.production_countries[0].name}</span>
                            </li>
                            <li>
                                <span><strong>Language: </strong>${movie.spoken_languages[0].name}</span>
                            </li>
                        </ul>
                        <p><strong>Overview:</strong> ${movie.overview}</p>
                    </div>
                </div>
            `;

            getMovieReviews(movieId);



        } catch (error) {
            console.error("Error fetching movie detail", error);
            movieDetail.innerHTML = '<p>Failed to load movie details.</p>';

        }

    }


}


async function getMovieReviews(movieId) {

    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}&language=en-US`);
        const data = await response.json();
        console.log("movie reviews:", data);

        if(data.results.length == 0){
            movieReviews.innerHTML = '<p>No reviews available.</p>';
        }
        else{
            data.results.slice(0,3).forEach(review => {
                const reviewDiv = document.createElement('div');
                reviewDiv.classList.add('review-item');
                reviewDiv.innerHTML = `
                    <div class="user-icon"><i class="fa-solid fa-circle-user"></i></div>
                    <div class="review-content">
                    <h4>${review.author}</h4>
                    <small>Posted on: ${new Date(review.created_at).toLocaleDateString()}</small><br>
                    <small>Rating: ${review.author_details.rating || 'N/A'}</small><br>
                    <p>${review.content.substring(0, 200)}...<a href="${review.url}" target="_blank">Read full review</a></p> <!-- Short preview -->
                    </div>
                `;
                movieReviews.appendChild(reviewDiv);

            })

        }


    } catch (error) {
        console.error("Error fetching movie reviews", error);
        movieReviews.innerHTML = '<p>Failed to load movie reviews.</p>';

    }
}

getMovie();