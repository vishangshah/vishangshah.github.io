$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText)
{
    omdb_apikey = 'xxxxxxxx'
    axios.get('https://www.omdbapi.com?t='+searchText+'&apikey='+omdb_apikey)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        });
}
