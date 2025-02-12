const apiKeyM = moviesAPI();
const loginURLM = 'https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=' + apiKeyM
const popularMoviesURL = 'https://api.themoviedb.org/3/movie/popular?api_key=' + apiKeyM
const trendingMoviesURL = 'https://api.themoviedb.org/3/trending/movie/day?api_key=' + apiKeyM
const inCinemaMoviesURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=' + apiKeyM + '&region=US'
const upcomingMoviesURL = 'https://api.themoviedb.org/3/movie/upcoming?api_key=' + apiKeyM + '&region=US'
const detailsURL1 = 'https://api.themoviedb.org/3/movie/'
const detailsURL2 = '?api_key=' + apiKeyM + '&language=hr-HR'
const crewURL2 = '/credits?api_key=' + apiKeyM + '&language=hr-HR'
const searchMovieURL = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKeyM + '&query='
const trailer1 = 'https://api.themoviedb.org/3/movie/'
const trailer2 = '/videos?api_key=' + apiKeyM
const personInfo1 = 'https://api.themoviedb.org/3/person/'
const personInfo2 = '?api_key=' + apiKeyM
const personCredits1 = 'https://api.themoviedb.org/3/person/'
const personCredits2 = '/combined_credits?api_key=' + apiKeyM
const findMovieByIMDB1 = 'https://api.themoviedb.org/3/find/'
const findMovieByIMDB2 = '?api_key=' + apiKeyM + '&external_source=imdb_id'
const genresURL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + apiKeyM + '&language=en'
const browseMovieURL = ' https://api.themoviedb.org/3/discover/movie?api_key=' + apiKeyM

function init() {
    fetch(newTokenURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data.request_token);
        login(data.request_token)
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function movie(id){
    fetch(findMovieByIMDB1 + id + findMovieByIMDB2, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        displayHTML(data.movie_results[0].original_title, data.movie_results[0].backdrop_path, data.movie_results[0].id);
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function displayHTML(title, img, id){
    document.getElementById('title').innerHTML = title;
    document.getElementById('background').style.background = "url('https://image.tmdb.org/t/p/original/" + img + "') no-repeat center top / cover";
    document.getElementById('movieID').innerHTML = id;
}

function getMovies(){
    document.getElementById('movies').classList.add("serverActive");
    document.getElementById('series').classList.remove("serverActive");
    getTrending();
    getPopular();
    getInCinema();
    getUpcoming();
}

function getPopular(){
	fetch(popularMoviesURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        popularniFilmovi(data.results);
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function popularniFilmovi(popularno){
    var link = "";
    document.getElementById('lista_popularno').innerHTML = link;
    for (var i = 0; i < popularno.length; i++) {
        link = link + "<li><div class='movie-card'><a href='movieDetails.html?" + popularno[i].id + "'><figure class='card-banner'><img src='https://image.tmdb.org/t/p/w185/" + popularno[i].poster_path + "'></figure></a><div class='title-wrapper'><a href='movieDetails.html?" + popularno[i].id + "'><h3 class='card-title'>" + popularno[i].title + "</h3></a><div class='badge'>" + popularno[i].release_date.split("-")[0] + "</div></div></div></li>";
    }
    document.getElementById('lista_popularno').innerHTML += link;
}

function getTrending(){
    fetch(trendingMoviesURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        trendingFilmovi(data.results);
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function trendingFilmovi(trending){
    var link = "";
    document.getElementById('lista_trending').innerHTML = link;
    for (var i = 0; i < trending.length; i++) {
        link = link + "<li><div class='movie-card'><a href='movieDetails.html?" + trending[i].id + "'><figure class='card-banner'><img src='https://image.tmdb.org/t/p/w185/" + trending[i].poster_path + "'></figure></a><div class='title-wrapper'><a href='movieDetails.html?" + trending[i].id + "'><h3 class='card-title'>" + trending[i].title + "</h3></a><div class='badge'>" + trending[i].release_date.split("-")[0] + "</div></div></div></li>";
    }
    document.getElementById('lista_trending').innerHTML += link;
}

function getInCinema(){
	fetch(inCinemaMoviesURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        uKinimaFilmovi(data.results);
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function uKinimaFilmovi(uKinima){
    var link = "";
    document.getElementById('lista_ukinima').innerHTML = link;
    for (var i = 0; i < uKinima.length; i++) {
        link = link + "<li><div class='movie-card'><a href='movieDetails.html?" + uKinima[i].id + "'><figure class='card-banner'><img src='https://image.tmdb.org/t/p/w185/" + uKinima[i].poster_path + "'></figure></a><div class='title-wrapper'><a href='movieDetails.html?" + uKinima[i].id + "'><h3 class='card-title'>" + uKinima[i].title + "</h3></a><div class='badge'>" + uKinima[i].release_date.split("-")[0] + "</div></div></div></li>";
    }
    document.getElementById('lista_ukinima').innerHTML += link;
}

function getUpcoming(){
	fetch(upcomingMoviesURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        nadolazeciFilmovi(data.results);
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function nadolazeciFilmovi(nadolazeci){
    var link = "";
    document.getElementById('lista_uskoroDolazi').innerHTML = link;
    for (var i = 0; i < nadolazeci.length; i++) {
        link = link + "<li><div class='movie-card'><a href='movieDetails.html?" + nadolazeci[i].id + "'><figure class='card-banner'><img src='https://image.tmdb.org/t/p/w185/" + nadolazeci[i].poster_path + "'></figure></a><div class='title-wrapper'><a href='movieDetails.html?" + nadolazeci[i].id + "'><h3 class='card-title'>" + nadolazeci[i].title + "</h3></a><div class='badge'>" + nadolazeci[i].release_date.split("-")[0] + "</div></div></div></li>";
    }
    document.getElementById('lista_uskoroDolazi').innerHTML += link;
}

function getDetails(id){
	fetch(detailsURL1 + id + detailsURL2, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        getCrew(data, id);
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function getCrew(details, id){
	fetch(detailsURL1 + id + crewURL2, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        detailsView(details, data.cast)
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function detailsView(details, cast){
    var godina = details.release_date.split('-');
    const hours = Math.floor(details.runtime / 60);
    const minutes = details.runtime % 60;

    document.getElementById('title').innerHTML = details.original_title;
    document.getElementById('slika').innerHTML = "<img src='https://image.tmdb.org/t/p/original/" + details.poster_path + "'>";
    document.getElementById('background').style.background = "url('https://image.tmdb.org/t/p/original/" + details.backdrop_path + "') no-repeat center top / cover";
    document.getElementById('film').innerHTML = details.original_title;
    details.genres.forEach((currentElement, idx, array) => { idx === array.length - 1 ? document.getElementById('zanr').innerHTML += '<p>' + currentElement.name + '</p>' : document.getElementById('zanr').innerHTML += '<p>' + currentElement.name + ',</p>'});
    document.getElementById('godina').innerHTML = godina[2] + '/' + godina[1] + '/' + godina[0];
    document.getElementById('trajanje').innerHTML += hours < 1 ? minutes + ' min' : hours + 'h ' + minutes + 'min';
    document.getElementById('tagline').innerHTML = details.tagline;
    document.getElementById('storyline').innerHTML = details.overview;
    cast.forEach((currentElement) => { document.getElementById('lista_glumaca').innerHTML += "<li><div class='movie-card'><a href='people.html?" + currentElement.id + "'><figure class='card-banner'><img src='https://image.tmdb.org/t/p/w185/" + currentElement.profile_path + "'></figure></a><div class='title-wrapper'><a href='people.html?" + currentElement.id + "'><h3 class='card-title'>" + currentElement.name + "</h3></a><div class='badge'>" + currentElement.character + "</div></div></div></li>"; });
    document.getElementById('status').innerHTML += details.status;
    document.getElementById('budzet').innerHTML += details.budget != "" ? details.budget.toLocaleString('en-EN', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }) : '-';
    document.getElementById('prihod').innerHTML += details.revenue != "" ? details.revenue.toLocaleString('en-EN', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }) : '-';

    document.getElementById("play").onclick = function () {
        location.href = "play.html?id=" + details.imdb_id;
    };
}

function searchMovie(query){
    fetch(searchMovieURL + query, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        pretrazi(data.results);
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function pretrazi(rezultatPretrazivanja){
    document.getElementById('movies').classList.add("serverActive");
    document.getElementById('series').classList.remove("serverActive");
    var link = "";
    document.getElementById('lista_search').innerHTML = link;
    for (var i = 0; i < rezultatPretrazivanja.length; i++) {
        link = link + "<li><div class='movie-card'><a href='movieDetails.html?" + rezultatPretrazivanja[i].id + "'><figure class='card-banner'><img src='https://image.tmdb.org/t/p/w185/" + rezultatPretrazivanja[i].poster_path + "'></figure></a><div class='title-wrapper'><a href='movieDetails.html?" + rezultatPretrazivanja[i].id + "'><h3 class='card-title'>" + rezultatPretrazivanja[i].title + "</h3></a><div class='badge'>" + rezultatPretrazivanja[i].release_date.split("-")[0] + "</div></div></div></li>";
    }
    document.getElementById('lista_search').innerHTML += link;
}

function getTrailer(movieID){
    fetch(trailer1 + movieID + trailer2, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        var trailers = [];
        data.results.forEach((currentElement) => { if(currentElement.type === "Trailer"){trailers.push(currentElement);}});
        console.log(trailers);
        listTrailer(trailers);
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function listTrailer(trailers){
    document.getElementById('top').style.overflow = "hidden";
    document.getElementById('overlay').style.display = "block";
    document.getElementById('main_div').style.display = "block";
    document.getElementById('trailers_list').style.display = "block";
    document.getElementById('video_popup').style.display = "none";
    document.getElementById('video_popup').innerHTML = "";
    document.getElementById('back').style.display = "none";
    var link = "";
    for (var i = 0; i < trailers.length; i++) {
        link = link + "<a class='trailer_list' role='button' onclick='playTrailer(\"" + trailers[i].key + "\")' style='display: flex;align-items: center;gap: 10%;margin: 2%;'><img src='https://img.youtube.com/vi/" + trailers[i].key + "/sddefault.jpg' style='width: 300px;'><h3 style='color: var(--white)'>" + trailers[i].name + "</h3></a>";
    }
    document.getElementById('trailers_list').innerHTML += link;
}

function playTrailer(key){
    document.getElementById('trailers_list').style.display = "none";
    document.getElementById('video_popup').style.display = "block";
    document.getElementById('video_popup').innerHTML = "<iframe type='text/html' style='background-color: #000;' src='https://www.youtube.com/embed/" + key + "?autoplay=1&modestbranding=1&cc_load_policy=1&cc_lang_pref=hr' allowfullscreen='' width='100%' height='100%' frameborder='0'></iframe>";
    document.getElementById('back').style.display = "block";
}

function closeModal(){
    document.getElementById('top').style.overflow = "auto";
    document.getElementById('overlay').style.display = "none";
    document.getElementById('main_div').style.display = "none";
    document.getElementById('video_popup').innerHTML = "";
    document.getElementById('trailers_list').innerHTML = "";
}

function getPerson(id){
    fetch(personInfo1 + id + personInfo2, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        personCredits(data, id);
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function personCredits(person, id) {
    fetch(personCredits1 + id + personCredits2, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data.cast);
        personView(person, data.cast);
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function personView(person, credits) {
    if(person.birthday != null){
        var godine = age(person.birthday);
        var datumRod = person.birthday.split('-')[2] + "/" + person.birthday.split('-')[1] + "/" + person.birthday.split('-')[0];
        document.getElementById('roden').innerHTML = datumRod + " (" + godine + " god)";
        document.getElementById('displayrodena').style.display = "block";
    }
    if (person.deathday != null) {
        var godineSmrti = deathAge(person.birthday, person.deathday);
        var datumSmrt = person.deathday.split('-')[2] + "/" + person.deathday.split('-')[1] + "/" + person.deathday.split('-')[0];
        document.getElementById('umro').innerHTML = datumSmrt + " (" + godineSmrti + " god)";
        document.getElementById('displayUmro').style.display = "block";
        document.getElementById('roden').innerHTML = datumRod;
    }
    if(person.place_of_birth != null){
        document.getElementById('mjestoRod').innerHTML = person.place_of_birth;
        document.getElementById('displaymjesto').style.display = "block";
    }
    document.getElementById('slika').innerHTML = "<img src='https://image.tmdb.org/t/p/original/" + person.profile_path + "'>";
    document.getElementById('ime').innerHTML = person.name;
    

    var inner = '';
    //move empty year elements into new list
    var emptyMovies = [];
    credits.forEach((currentElement) => { if(currentElement.release_date === "" || currentElement.first_air_date === "") { emptyMovies.push(currentElement) } })
    
    var mainList = credits.filter( x => !emptyMovies.includes(x));
    for (var i = 0; i < emptyMovies.length; i++) {
        var top = "<tr class='mainrow'><td class='table_data'><table class='little_table'><tbody><tr class='table_row'><td class='year'>-</td><td class='little_tabledata'><div class='movie_name_noyear'><a href='movieDetails.html?" + emptyMovies[i].id + "'><h3 class='card-title'>" + (emptyMovies[i].media_type == 'tv' ? emptyMovies[i].original_name : emptyMovies[i].original_title) + "</h3></a></div>" + (emptyMovies[i].character == "" ? "</td></tr>" : "<p class='as'>" + (emptyMovies[i].media_type == 'tv' ? "(" + emptyMovies[i].episode_count + " ep) " : "") + "as</p><h3 class='h3 character' style='color: #0080ff;'>" + emptyMovies[i].character + "</h3></td></tr>" );
        var mid = "<tr class='table_row'><td class='year'>-</td><td class='little_tabledata'><div class='movie_name_noyear'><a href='movieDetails.html?" + emptyMovies[i].id + "'><h3 class='card-title'>" + (emptyMovies[i].media_type == 'tv' ? emptyMovies[i].original_name : emptyMovies[i].original_title) + "</h3></a></div>" + (emptyMovies[i].character == "" ? "</td></tr>" : "<p class='as'>" + (emptyMovies[i].media_type == 'tv' ? "(" + emptyMovies[i].episode_count + " ep) " : "") + "as</p><h3 class='h3 character' style='color: #0080ff;'>" + emptyMovies[i].character + "</h3></td></tr>" );
        var bot = "<tr class='table_row'><td class='year'>-</td><td class='little_tabledata'><div class='movie_name_noyear'><a href='movieDetails.html?" + emptyMovies[i].id + "'><h3 class='card-title'>" + (emptyMovies[i].media_type == 'tv' ? emptyMovies[i].original_name : emptyMovies[i].original_title) + "</h3></a></div>" + (emptyMovies[i].character == "" ? "</td></tr></tbody></table></td></tr>" : "<p class='as'>" + (emptyMovies[i].media_type == 'tv' ? "(" + emptyMovies[i].episode_count + " ep) " : "") + "as</p><h3 class='h3 character' style='color: #0080ff;'>" + emptyMovies[i].character + "</h3></td></tr></tbody></table></td></tr>" );
        
        if (emptyMovies.length === 1) { 
            var full = "<tr class='mainrow'><td class='table_data'><table class='little_table'><tbody><tr class='table_row'><td class='year'>-</td><td class='little_tabledata'><div class='movie_name_noyear'><a href='movieDetails.html?" + emptyMovies[i].id + "'><h3 class='card-title'>" + (emptyMovies[i].media_type == 'tv' ? emptyMovies[i].original_name : emptyMovies[i].original_title) + "</h3></a></div>" + (emptyMovies[i].character == "" ? "</td></tr></tbody></table></td></tr>" : "<p class='as'>" + (emptyMovies[i].media_type == 'tv' ? "(" + emptyMovies[i].episode_count + " ep) " : "") + "as</p><h3 class='h3 character' style='color: #0080ff;'>" + emptyMovies[i].character + "</h3></td></tr></tbody></table></td></tr>" );
            inner += full;
            continue;
        }
        if (i === 0) {
            inner += top;
            continue;
        }
        if (i === emptyMovies.length -1) {
            inner += bot;
            continue;
        }
        inner += mid;
    }

    //Sort list
    var sortedMovies = mainList.sort((p1, p2) => ((p1.release_date != null ? new Date(p1.release_date) : new Date(p1.first_air_date)) 
        < (p2.release_date != null ? new Date(p2.release_date) : new Date(p2.first_air_date))) 
    ? 1 : ((p1.release_date != null ? new Date(p1.release_date) : new Date(p1.first_air_date)) 
        > (p2.release_date != null ? new Date(p2.release_date) : new Date(p2.first_air_date))) 
    ? -1 : 0);

    //add list to element
    var count = 0;
    sortedMovies.forEach((currentElement, idx, array) => { 
        var top = "<tr class='mainrow'><td class='table_data'><table class='little_table'><tbody><tr class='table_row'><td class='year'>" + (currentElement.release_date != null ? currentElement.release_date.split('-')[0] : currentElement.first_air_date.split('-')[0]) + "</td><td class='little_tabledata'><div class='movie_name'><a href='movieDetails.html?" + currentElement.id + "'><h3 class='card-title'>" + (currentElement.media_type == 'tv' ? currentElement.original_name : currentElement.original_title) + "</h3></a></div>" + (currentElement.character == "" ? "</td></tr>" : "<p class='as'>" + (currentElement.media_type == 'tv' ? "(" + currentElement.episode_count + " ep) " : "") + "as</p><h3 class='h3 character' style='color: #0080ff;'>" + currentElement.character + "</h3></td></tr>");
        var mid = "<tr class='table_row'><td class='year'>" + (currentElement.release_date != null ? currentElement.release_date.split('-')[0] : currentElement.first_air_date.split('-')[0]) + "</td><td class='little_tabledata'><div class='movie_name'><a href='movieDetails.html?" + currentElement.id + "'><h3 class='card-title'>" + (currentElement.media_type == 'tv' ? currentElement.original_name : currentElement.original_title) + "</h3></a></div>" + (currentElement.character == "" ? "</td></tr>" : "<p class='as'>" + (currentElement.media_type == 'tv' ? "(" + currentElement.episode_count + " ep) " : "") + "as</p><h3 class='h3 character' style='color: #0080ff;'>" + currentElement.character + "</h3></td></tr>");
        var bot = "<tr class='table_row'><td class='year'>" + (currentElement.release_date != null ? currentElement.release_date.split('-')[0] : currentElement.first_air_date.split('-')[0]) + "</td><td class='little_tabledata'><div class='movie_name'><a href='movieDetails.html?" + currentElement.id + "'><h3 class='card-title'>" + (currentElement.media_type == 'tv' ? currentElement.original_name : currentElement.original_title) + "</h3></a></div>" + (currentElement.character == "" ? "</td></tr></tbody></table></td></tr>" : "<p class='as'>" + (currentElement.media_type == 'tv' ? "(" + currentElement.episode_count + " ep) " : "") + "as</p><h3 class='h3 character' style='color: #0080ff;'>" + currentElement.character + "</h3></td></tr></tbody></table></td></tr>");
        var full = "<tr class='mainrow'><td class='table_data'><table class='little_table'><tbody><tr class='table_row'><td class='year'>" + (currentElement.release_date != null ? currentElement.release_date.split('-')[0] : currentElement.first_air_date.split('-')[0]) + "</td><td class='little_tabledata'><div class='movie_name'><a href='movieDetails.html?" + currentElement.id + "'><h3 class='card-title'>" + (currentElement.media_type == 'tv' ? currentElement.original_name : currentElement.original_title) + "</h3></a></div>" + (currentElement.character == "" ? "</td></tr></tbody></table></td></tr>" : "<p class='as'>" + (currentElement.media_type == 'tv' ? "(" + currentElement.episode_count + " ep) " : "") + "as</p><h3 class='h3 character' style='color: #0080ff;'>" + currentElement.character + "</h3></td></tr></tbody></table></td></tr>");

        var previousGodina = (idx === 0 ? "" : (array[idx - 1].release_date != null ? array[idx - 1].release_date.split('-')[0] : array[idx - 1].first_air_date.split('-')[0]));
        var currentGodina = (currentElement.release_date != null ? currentElement.release_date.split('-')[0] : currentElement.first_air_date.split('-')[0]);
        var nextGodina = (idx === array.length - 1 ? "" : (array[idx + 1].release_date != null ? array[idx + 1].release_date.split('-')[0] : array[idx + 1].first_air_date.split('-')[0]));
        if( previousGodina === "" && (currentGodina != nextGodina) ){
            inner += full;
        } else if ( (previousGodina != currentGodina) && (currentGodina != nextGodina) ){
            inner += full;
        } else if ( (previousGodina != currentGodina) && (currentGodina === nextGodina) ){
            inner += top;
        } else if ( (previousGodina === currentGodina) && (currentGodina === nextGodina) ){
            inner += mid;
        } else if ( (previousGodina === currentGodina) && (currentGodina != nextGodina) ){
            inner += bot;
        }
    })

    document.getElementById('elements').innerHTML = inner;

    //sort movies by popularity
    var sortedPopularity = mainList.sort((p1, p2) => (p1.vote_count < p2.vote_count) ? 1 : (p1.vote_count > p2.vote_count) ? -1 : 0);
    if(sortedPopularity.length >= 10){
        for (var i = 0; i < 10; i++) {    
            document.getElementById('knownForList').innerHTML += "<li><div class='movie-card'><a href='movieDetails.html?" + sortedPopularity[i].id + "'><figure class='card-banner'><img src='https://image.tmdb.org/t/p/w185/" + sortedPopularity[i].poster_path + "'></figure></a><div class='title-wrapper'><a href='movieDetails.html?" + sortedPopularity[i].id + "'><h3 class='card-title'>" + (sortedPopularity[i].media_type == "tv" ? sortedPopularity[i].original_name : sortedPopularity[i].original_title) + "</h3></a></div></div></li>";
        }
    } else {
        for (var i = 0; i < sortedPopularity.length; i++) {    
            document.getElementById('knownForList').innerHTML += "<li><div class='movie-card'><a href='movieDetails.html?" + sortedPopularity[i].id + "'><figure class='card-banner'><img src='https://image.tmdb.org/t/p/w185/" + sortedPopularity[i].poster_path + "'></figure></a><div class='title-wrapper'><a href='movieDetails?.html" + sortedPopularity[i].id + "'><h3 class='card-title'>" + (sortedPopularity[i].media_type == "tv" ? sortedPopularity[i].original_name : sortedPopularity[i].original_title) + "</h3></a></div></div></li>";
        }
    }
    
}

function age(birthday) { // birthday is a date
    var date = new Date(birthday);
    var ageDifMs = Date.now() - date.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function deathAge(birthday, deathday) { // birthday is a date
    var roden = new Date(birthday);
    var umro = new Date(deathday);
    var ageDifMs = umro - roden.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function genres() {
    fetch(genresURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        genresView(data.genres);
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function genresView(genres){
    var link = "";
    for (var i = 0; i < genres.length; i++) {
        link = link + "<div onclick='addToElements(\"" + genres[i].id + "\", \"" + genres[i].name + "\")'>" + genres[i].name + "</div>";
    }
    document.getElementById('zanrovi').innerHTML += link;
}

function addToElements(id, name){
    if(document.getElementById('zanrElements').querySelector("[id='" + id + "']") == null){
        document.getElementById('zanrElements').innerHTML += "<button class='genre' id='"+ id + "' onclick='removeFromElements(\"" + id + "\")'>" + name + "</button>";
    }
}

function removeFromElements(id){
    document.getElementById(id).remove();
}

function browseMovie(){
    var zanr = "";
    for (var i = 0; i < document.getElementById('zanrElements').childElementCount; i++) {
        if(i == document.getElementById('zanrElements').childElementCount - 1){
            zanr = zanr + document.getElementById('zanrElements').childNodes[i].id;
        } else {
            zanr = zanr + document.getElementById('zanrElements').childNodes[i].id + ',';
        }
    }

    var select = document.getElementById('year');
    var year = select.options[select.selectedIndex];

    var URL = '';
    if(year.text === 'Odaberite godinu' && zanr === ''){
        URL = browseMovieURL + '&page=1&sort_by=popularity.desc'
    } else if (year.text === 'Odaberite godinu' && zanr !== '') {
        URL = browseMovieURL + '&with_genres=' + zanr + '&page=1&sort_by=popularity.desc';
    } else if (year.text !== 'Odaberite godinu' && zanr === '') {
        URL = browseMovieURL + '&primary_release_year=' + year.text + '&page=1&sort_by=popularity.desc';
    } else {
        URL = browseMovieURL + '&primary_release_year=' + year.text + '&with_genres=' + zanr + '&page=1&sort_by=popularity.desc';
    }

    console.log(URL);

    fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
        filtriraniFilmovi(data.results)
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function filtriraniFilmovi(filmovi){
    var link = "";
    document.getElementById('browse_list').innerHTML = link;
    for (var i = 0; i < filmovi.length; i++) {
        link = link + "<li><div class='movie-card'><a href='movieDetails.html?" + filmovi[i].id + "'><figure class='card-banner'><img src='https://image.tmdb.org/t/p/w185/" + filmovi[i].poster_path + "'></figure></a><div class='title-wrapper'><a href='movieDetails.html?" + filmovi[i].id + "'><h3 class='card-title'>" + filmovi[i].title + "</h3></a><div class='badge'>" + filmovi[i].release_date.split("-")[0] + "</div></div></div></li>";
    }
    document.getElementById('browse_list').innerHTML += link;
}