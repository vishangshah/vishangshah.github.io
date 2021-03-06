$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText)
{
    omdb_apikey = 'xxxxxx'
    axios.get('https://www.omdbapi.com?s='+searchText+'&apikey='+omdb_apikey)
        .then((response) => {
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
                    <div class="col-md-3">
                        <div class="well text-center">
                            <img src="${movie.Poster}">
                            <h5>${movie.Title}</h5>
                            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                        </div>
                    </div>
                `;
            });
            
            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

function movieSelected(id)
{
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie()
{
    let movieId = sessionStorage.getItem('movieId');
    omdb_apikey = 'xxxxxx'
    axios.get('https://www.omdbapi.com?i='+movieId+'&apikey='+omdb_apikey)
        .then((response) => {
            let movie = response.data;
            let output = `
                <div class="row">
                    <div class="col-md-4">
                        <img src="${movie.Poster}" class="thumbnail">
                    </div>
                    <div class="col-md-8">
                        <h2>${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Genre: </strong>${movie.Genre}</li>
                            <li class="list-group-item"><strong>Released: </strong>${movie.Released}</li>
                            <li class="list-group-item"><strong>Rated: </strong>${movie.Rated}</li>
                            <li class="list-group-item"><strong>IMDB Rating: </strong>${movie.imdbRating}</li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="well">
                        <hr>
                        <h3>Plot</h3>
                        ${movie.Plot}
                        <hr>
                        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">IMDB</a>
                        <a href="index.html" class="btn btn-default">Back to Search</a>
                    </div>
                </div>
            `;

        $("#movie").html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}
