$(document).ready(() => {
    document.getElementById('searchForm').addEventListener('submit',(e) => {
        let search = document.getElementById('searchText').value;
        getMovies(search);
        e.preventDefault();
    });
});

function getMovies(search) {
    $.ajax({
        type: 'GET',
        url: 'http://www.omdbapi.com?s=' + search + '&apikey=thewdb',
        err: (err) => {
            console.log(err);
        }
    }).done((response) => {
        let movies = response.Search;
        moviesDisplay = document.getElementById('movies');
        moviesDisplay.innerHTML = '';
        for(let movie of movies) {
            moviesDisplay.innerHTML += `
            <div class="col-md-3">
                <div class="card text-center">
                <img src="${movie.Poster}">
                <h5>${movie.Title}</h5>
                <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                </div>
            </div>
            `
        }
    });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    $.ajax({
        type: 'GET',
        url: 'http://www.omdbapi.com?i=' + movieId + '&apikey=thewdb'
    }).done((movie) => {
        let output =`
        <div class="row">
          <div class="col-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="card">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
      `;
      document.getElementById('movie').innerHTML = output;
    })
}