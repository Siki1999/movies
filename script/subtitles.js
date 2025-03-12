const apiKey = subAPI();
const loginURL = 'https://api.opensubtitles.com/api/v1/login'
const logoutURL = 'https://api.opensubtitles.com/api/v1/logout'
const searchURL = 'https://api.opensubtitles.com/api/v1/subtitles'
const downloadURL = 'https://api.opensubtitles.com/api/v1/download'

function loginSubtitles(movieId) {
    fetch(loginURL, {
      method: 'POST',
      headers: {
        'Api-Key': apiKey,
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        var links = [];
        var linkName = [];
        searchSubsHR(movieId, data.token, links, linkName);
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function loginSubtitlesSeries(movieId, episode, season) {
  fetch(loginURL, {
    method: 'POST',
    headers: {
      'Api-Key': apiKey,
      'Content-Type': 'application/json'
    }
  }).then(function(response) {
      return response.json();
  }).then(function(data) {
      var links = [];
      var linkName = [];
      searchSubsSeriesHR(movieId, data.token, links, linkName, episode, season);
  }).catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

function searchSubsSeriesHR(movieId, token, links, linkName, episode, season) {
	fetch(searchURL + '?imdb_id=' + movieId + '&episode_number=' + episode + '&languages=hr', {
      method: 'GET',
      headers: {
        'Api-Key': apiKey,
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        if(data.data.length >= 3){
          addSeries(token, data.data[0].attributes.files[0].file_id, links, linkName, 'hr', '1', episode, season);
          addSeries(token, data.data[1].attributes.files[0].file_id, links, linkName, 'hr', '2', episode, season);
          addSeries(token, data.data[2].attributes.files[0].file_id, links, linkName, 'hr', '3', episode, season);
        } else if (data.data.length == 2){
          addSeries(token, data.data[0].attributes.files[0].file_id, links, linkName, 'hr', '1', episode, season);
          addSeries(token, data.data[1].attributes.files[0].file_id, links, linkName, 'hr', '2', episode, season);
          searchSubsSeriesSR(movieId, token, links, linkName, '2', episode, season);
        } else if (data.data.length == 1){
          addSeries(token, data.data[0].attributes.files[0].file_id, links, linkName, 'hr', '1', episode, season);
          searchSubsSeriesSR(movieId, token, links, linkName, '1', episode, season);
        } else {
          searchSubsSeriesSR(movieId, token, links, linkName, '0', episode, season);
        }
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function searchSubsSeriesSR(movieId, token, links, linkName, downloaded, episode, season) {
  fetch(searchURL + '?imdb_id=' + movieId + '&episode_number=' + episode + '&languages=sr', {
      headers: {
        'Api-Key': apiKey,
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        if(downloaded == '2'){
          if(data.data.length >= 1){
            addSeries(token, data.data[0].attributes.files[0].file_id, links, linkName, 'sr', '1', episode, season);
          } else {
            searchSubsSeriesBS(movieId, token, links, linkName, '2', episode, season);
          }
        } else if(downloaded == '1'){
          if(data.data.length >= 2){
            addSeries(token, data.data[0].attributes.files[0].file_id, links, linkName, 'sr', '1', episode, season);
            addSeries(token, data.data[1].attributes.files[0].file_id, links, linkName, 'sr', '2', episode, season);
          } else if(data.data.length == 1){
            addSeries(token, data.data[0].attributes.files[0].file_id, links, linkName, 'sr', '1', episode, season);
            searchSubsSeriesBS(movieId, token, links, linkName, '2', episode, season);
          } else {
            searchSubsSeriesBS(movieId, token, links, linkName, '1', episode, season);
          }
        } else {
          if(data.data.length >= 3){
            addSeries(token, data.data[0].attributes.files[0].file_id, links, linkName, 'sr', '1', episode, season);
            addSeries(token, data.data[1].attributes.files[0].file_id, links, linkName, 'sr', '2', episode, season);
            addSeries(token, data.data[2].attributes.files[0].file_id, links, linkName, 'sr', '3', episode, season);
          } else if (data.data.length == 2){
            addSeries(token, data.data[0].attributes.files[0].file_id, links, linkName, 'sr', '1', episode, season);
            addSeries(token, data.data[1].attributes.files[0].file_id, links, linkName, 'sr', '2', episode, season);
            searchSubsSeriesBS(movieId, token, links, linkName, '2', episode, season);
          } else if (data.data.length == 1){
            addSeries(token, data.data[0].attributes.files[0].file_id, links, linkName, 'sr', '1', episode, season);
            searchSubsSeriesBS(movieId, token, links, linkName, '1', episode, season);
          } else {
            searchSubsSeriesBS(movieId, token, links, linkName, '0', episode, season);
          }
        }
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function searchSubsSeriesBS(movieId, token, links, linkName, downloaded, episode, season) {
  fetch(searchURL + '?imdb_id=' + movieId + '&episode_number=' + episode + '&languages=bs', {
      headers: {
        'Api-Key': apiKey,
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        if(downloaded == '2'){
          if(data.data.length >= 1){
            addSeries(token, data.data[0].attributes.files[0].file_id, links, linkName, 'bs', '1', episode, season);
          } else {
            searchSubsSeriesEN(movieId, token, links, linkName, '2', episode, season);
          }
        } else if(downloaded == '1'){
          if(data.data.length >= 2){
            addSeries(token, data.data[0].attributes.files[0].file_id, links, linkName, 'bs', '1', episode, season);
            addSeries(token, data.data[1].attributes.files[0].file_id, links, linkName, 'bs', '2', episode, season);
          } else if(data.data.length == 1){
            addSeries(token, data.data[0].attributes.files[0].file_id, links, linkName, 'bs', '1', episode, season);
            searchSubsSeriesEN(movieId, token, links, linkName, '2', episode, season);
          } else {
            searchSubsSeriesEN(movieId, token, links, linkName, '1', episode, season);
          }
        } else {
          if(data.data.length >= 3){
            addSeries(token, data.data[0].attributes.files[0].file_id, links, linkName, 'bs', '1', episode, season);
            addSeries(token, data.data[1].attributes.files[0].file_id, links, linkName, 'bs', '2', episode, season);
            addSeries(token, data.data[2].attributes.files[0].file_id, links, linkName, 'bs', '3', episode, season);
          } else if (data.data.length == 2){
            addSeries(token, data.data[0].attributes.files[0].file_id, links, linkName, 'bs', '1', episode, season);
            addSeries(token, data.data[1].attributes.files[0].file_id, links, linkName, 'bs', '2', episode, season);
            searchSubsSeriesEN(movieId, token, links, linkName, '2', episode, season);
          } else if (data.data.length == 1){
            addSeries(token, data.data[0].attributes.files[0].file_id, links, linkName, 'bs', '1', episode, season);
            searchSubsSeriesEN(movieId, token, links, linkName, '1', episode, season);
          } else {
            searchSubsSeriesEN(movieId, token, links, linkName, '0', episode, season);
          }
        }
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function searchSubsSeriesEN(movieId, token, links, linkName, downloaded, episode, season) {
  fetch(searchURL + '?imdb_id=' + movieId + '&episode_number=' + episode + '&languages=en', {
      headers: {
        'Api-Key': apiKey,
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        if(downloaded == '2'){
          if(data.data.length >= 1){
            addSeries(token, data.data[0].attributes.files[0].file_id, links, linkName, 'en', '1', episode, season);
          } else {
            dodajTitloveSeriesHTML(links, linkName, episode, season);
          }
        } else if(downloaded == '1'){
          if(data.data.length >= 2){
            addSeries(token, data.data[0].attributes.files[0].file_id, links, linkName, 'en', '1', episode, season);
            addSeries(token, data.data[1].attributes.files[0].file_id, links, linkName, 'en', '2', episode, season);
          } else if(data.data.length == 1){
            addSeries(token, data.data[0].attributes.files[0].file_id, links, linkName, 'en', '1', episode, season);
            dodajTitloveSeriesHTML(links, linkName, episode, season);
          } else {
            dodajTitloveSeriesHTML(links, linkName, episode, season);
          }
        } else {
          if(data.data.length >= 3){
            addSeries(token, data.data[0].attributes.files[0].file_id, links, linkName, 'en', '1', episode, season);
            addSeries(token, data.data[1].attributes.files[0].file_id, links, linkName, 'en', '2', episode, season);
            addSeries(token, data.data[2].attributes.files[0].file_id, links, linkName, 'en', '3', episode, season);
          } else if (data.data.length == 2){
            addSeries(token, data.data[0].attributes.files[0].file_id, links, linkName, 'en', '1', episode, season);
            addSeries(token, data.data[1].attributes.files[0].file_id, links, linkName, 'en', '2', episode, season);
            dodajTitloveSeriesHTML(links, linkName, episode, season);
          } else if (data.data.length == 1){
            addSeries(token, data.data[0].attributes.files[0].file_id, links, linkName, 'en', '1', episode, season);
            dodajTitloveSeriesHTML(links, linkName, episode, season);
          } else {
            dodajTitloveSeriesHTML(links, linkName, episode, season);
          }
        }
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function searchSubsHR(movieId, token, links, linkName) {
	fetch(searchURL + '?imdb_id=' + movieId + '&languages=hr', {
      method: 'GET',
      headers: {
        'Api-Key': apiKey,
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        if(data.data.length >= 3){
          add(token, data.data[0].attributes.files[0].file_id, links, linkName, 'hr', '1');
          add(token, data.data[1].attributes.files[0].file_id, links, linkName, 'hr', '2');
          add(token, data.data[2].attributes.files[0].file_id, links, linkName, 'hr', '3');
        } else if (data.data.length == 2){
          add(token, data.data[0].attributes.files[0].file_id, links, linkName, 'hr', '1');
          add(token, data.data[1].attributes.files[0].file_id, links, linkName, 'hr', '2');
          searchSubsSR(movieId, token, links, linkName, '2');
        } else if (data.data.length == 1){
          add(token, data.data[0].attributes.files[0].file_id, links, linkName, 'hr', '1');
          searchSubsSR(movieId, token, links, linkName, '1');
        } else {
          searchSubsSR(movieId, token, links, linkName, '0');
        }
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function searchSubsSR(movieId, token, links, linkName, downloaded) {
  fetch(searchURL + '?imdb_id=' + movieId + '&languages=sr', {
      headers: {
        'Api-Key': apiKey,
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        if(downloaded == '2'){
          if(data.data.length >= 1){
            add(token, data.data[0].attributes.files[0].file_id, links, linkName, 'sr', '1');
          } else {
            searchSubsBS(movieId, token, links, linkName, '2');
          }
        } else if(downloaded == '1'){
          if(data.data.length >= 2){
            add(token, data.data[0].attributes.files[0].file_id, links, linkName, 'sr', '1');
            add(token, data.data[1].attributes.files[0].file_id, links, linkName, 'sr', '2');
          } else if(data.data.length == 1){
            add(token, data.data[0].attributes.files[0].file_id, links, linkName, 'sr', '1');
            searchSubsBS(movieId, token, links, linkName, '2');
          } else {
            searchSubsBS(movieId, token, links, linkName, '1');
          }
        } else {
          if(data.data.length >= 3){
            add(token, data.data[0].attributes.files[0].file_id, links, linkName, 'sr', '1');
            add(token, data.data[1].attributes.files[0].file_id, links, linkName, 'sr', '2');
            add(token, data.data[2].attributes.files[0].file_id, links, linkName, 'sr', '3');
          } else if (data.data.length == 2){
            add(token, data.data[0].attributes.files[0].file_id, links, linkName, 'sr', '1');
            add(token, data.data[1].attributes.files[0].file_id, links, linkName, 'sr', '2');
            searchSubsBS(movieId, token, links, linkName, '2');
          } else if (data.data.length == 1){
            add(token, data.data[0].attributes.files[0].file_id, links, linkName, 'sr', '1');
            searchSubsBS(movieId, token, links, linkName, '1');
          } else {
            searchSubsBS(movieId, token, links, linkName, '0');
          }
        }
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function searchSubsBS(movieId, token, links, linkName, downloaded) {
  fetch(searchURL + '?imdb_id=' + movieId + '&languages=bs', {
      headers: {
        'Api-Key': apiKey,
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        if(downloaded == '2'){
          if(data.data.length >= 1){
            add(token, data.data[0].attributes.files[0].file_id, links, linkName, 'bs', '1');
          } else {
            searchSubsEN(movieId, token, links, linkName, '2');
          }
        } else if(downloaded == '1'){
          if(data.data.length >= 2){
            add(token, data.data[0].attributes.files[0].file_id, links, linkName, 'bs', '1');
            add(token, data.data[1].attributes.files[0].file_id, links, linkName, 'bs', '2');
          } else if(data.data.length == 1){
            add(token, data.data[0].attributes.files[0].file_id, links, linkName, 'bs', '1');
            searchSubsEN(movieId, token, links, linkName, '2');
          } else {
            searchSubsEN(movieId, token, links, linkName, '1');
          }
        } else {
          if(data.data.length >= 3){
            add(token, data.data[0].attributes.files[0].file_id, links, linkName, 'bs', '1');
            add(token, data.data[1].attributes.files[0].file_id, links, linkName, 'bs', '2');
            add(token, data.data[2].attributes.files[0].file_id, links, linkName, 'bs', '3');
          } else if (data.data.length == 2){
            add(token, data.data[0].attributes.files[0].file_id, links, linkName, 'bs', '1');
            add(token, data.data[1].attributes.files[0].file_id, links, linkName, 'bs', '2');
            searchSubsEN(movieId, token, links, linkName, '2');
          } else if (data.data.length == 1){
            add(token, data.data[0].attributes.files[0].file_id, links, linkName, 'bs', '1');
            searchSubsEN(movieId, token, links, linkName, '1');
          } else {
            searchSubsEN(movieId, token, links, linkName, '0');
          }
        }
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function searchSubsEN(movieId, token, links, linkName, downloaded) {
  fetch(searchURL + '?imdb_id=' + movieId + '&languages=en', {
      headers: {
        'Api-Key': apiKey,
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        if(downloaded == '2'){
          if(data.data.length >= 1){
            add(token, data.data[0].attributes.files[0].file_id, links, linkName, 'en', '1');
          } else {
            dodajTitloveHTML(links, linkName);
          }
        } else if(downloaded == '1'){
          if(data.data.length >= 2){
            add(token, data.data[0].attributes.files[0].file_id, links, linkName, 'en', '1');
            add(token, data.data[1].attributes.files[0].file_id, links, linkName, 'en', '2');
          } else if(data.data.length == 1){
            add(token, data.data[0].attributes.files[0].file_id, links, linkName, 'en', '1');
            dodajTitloveHTML(links, linkName);
          } else {
            dodajTitloveHTML(links, linkName);
          }
        } else {
          if(data.data.length >= 3){
            add(token, data.data[0].attributes.files[0].file_id, links, linkName, 'en', '1');
            add(token, data.data[1].attributes.files[0].file_id, links, linkName, 'en', '2');
            add(token, data.data[2].attributes.files[0].file_id, links, linkName, 'en', '3');
          } else if (data.data.length == 2){
            add(token, data.data[0].attributes.files[0].file_id, links, linkName, 'en', '1');
            add(token, data.data[1].attributes.files[0].file_id, links, linkName, 'en', '2');
            dodajTitloveHTML(links, linkName);
          } else if (data.data.length == 1){
            add(token, data.data[0].attributes.files[0].file_id, links, linkName, 'en', '1');
            dodajTitloveHTML(links, linkName);
          } else {
            dodajTitloveHTML(links, linkName);
          }
        }
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function logout(token) {
	fetch(logoutURL, {
	  method: 'DELETE',
	  headers: {
	    Authorization: 'Bearer ' + token,
	    'Api-Key': apiKey,
	    'Content-Type': 'application/json'
	  }
	}).then(function(response) {
        return response.json();
    }).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function dodajTitloveHTML(titloviID, opis){
    var link = "";
    for (var i = 0; i < titloviID.length; i++) {
      link = link + "<li><div style='color: var(--white);display: flex;justify-content: center;padding-bottom: 5%;'>" + opis[i] + "</div><button class='btn btn-primary' onclick='download(\"" + titloviID[i] + "\", \"" + opis[i] + "\")'><ion-icon name='cloud-download'></ion-icon><span>Download</span></button></li>"
    }
    document.getElementById('titloviHTML').innerHTML += link;
    document.getElementById("iframe").src = "https://multiembed.mov/?video_id=tt" + movieID;
    document.getElementById("iframe").style.visibility = "visible"
}

function dodajTitloveSeriesHTML(titloviID, opis, episode, season){
  var link = "";
  for (var i = 0; i < titloviID.length; i++) {
    link = link + "<li><div style='color: var(--white);display: flex;justify-content: center;padding-bottom: 5%;'>" + opis[i] + "</div><button class='btn btn-primary' onclick='download(\"" + titloviID[i] + "\", \"" + opis[i] + "\")'><ion-icon name='cloud-download'></ion-icon><span>Download</span></button></li>"
  }
  document.getElementById('titloviHTML').innerHTML += link;
  document.getElementById("iframe").src = "https://multiembed.mov/?video_id=tt" + movieID + '&s=' + season + '&e=' + episode;
  document.getElementById("iframe").style.visibility = "visible"
}

function server1(){
  document.getElementById("iframe").src = "https://multiembed.mov/?video_id=tt" + movieID;
  document.getElementById('server1').classList.add("serverActive");
  document.getElementById('server2').classList.remove("serverActive");
  document.getElementById('server3').classList.remove("serverActive");
  document.getElementById('server4').classList.remove("serverActive");
  document.getElementById('server5').classList.remove("serverActive");
}

function server2(){
  document.getElementById("iframe").src = "https://player.autoembed.cc/embed/movie/tt" + movieID;
  document.getElementById('server2').classList.add("serverActive");
  document.getElementById('server1').classList.remove("serverActive");
  document.getElementById('server3').classList.remove("serverActive");
  document.getElementById('server4').classList.remove("serverActive");
  document.getElementById('server5').classList.remove("serverActive");
}

function server3(){
  document.getElementById("iframe").src = "https://vidsrc.cc/v2/embed/movie/tt" + movieID + "?autoPlay=false"
  document.getElementById('server3').classList.add("serverActive");
  document.getElementById('server1').classList.remove("serverActive");
  document.getElementById('server2').classList.remove("serverActive");
  document.getElementById('server4').classList.remove("serverActive");
  document.getElementById('server5').classList.remove("serverActive");
}

function server4(){
    document.getElementById("iframe").src = "https://vidsrc.xyz/embed/movie/tt" + movieID;
    document.getElementById('server4').classList.add("serverActive");
    document.getElementById('server1').classList.remove("serverActive");
    document.getElementById('server2').classList.remove("serverActive");
    document.getElementById('server3').classList.remove("serverActive");
    document.getElementById('server5').classList.remove("serverActive");
}

function server5(){
    document.getElementById("iframe").src = "https://gomo.to/movie/tt" + movieID;
    document.getElementById('server5').classList.add("serverActive");
    document.getElementById('server1').classList.remove("serverActive");
    document.getElementById('server2').classList.remove("serverActive");
    document.getElementById('server3').classList.remove("serverActive");
    document.getElementById('server4').classList.remove("serverActive");
}

function seriesServer1(){
  var selectedSeason = document.getElementById("sezone").options[document.getElementById("sezone").selectedIndex].value;
  var season = selectedSeason.split(' ');
  var episode = document.getElementById("epizode").getElementsByClassName("serverActive")[0].id;

  document.getElementById("iframe").src = "https://multiembed.mov/?video_id=tt" + movieID + '&s=' + season[1] + '&e=' + episode;
  document.getElementById('server1').classList.add("serverActive");
  document.getElementById('server2').classList.remove("serverActive");
  document.getElementById('server3').classList.remove("serverActive");
  document.getElementById('server4').classList.remove("serverActive");
  document.getElementById('server5').classList.remove("serverActive");
}

function seriesServer2(){
  var selectedSeason = document.getElementById("sezone").options[document.getElementById("sezone").selectedIndex].value;
  var season = selectedSeason.split(' ');
  var episode = document.getElementById("epizode").getElementsByClassName("serverActive")[0].id;

  document.getElementById("iframe").src = "https://player.autoembed.cc/embed/tv/tt" + movieID + '/' + season[1] + '/' + episode;
  document.getElementById('server2').classList.add("serverActive");
  document.getElementById('server1').classList.remove("serverActive");
  document.getElementById('server3').classList.remove("serverActive");
  document.getElementById('server4').classList.remove("serverActive");
  document.getElementById('server5').classList.remove("serverActive");
}

function seriesServer3(){
  var selectedSeason = document.getElementById("sezone").options[document.getElementById("sezone").selectedIndex].value;
  var season = selectedSeason.split(' ');
  var episode = document.getElementById("epizode").getElementsByClassName("serverActive")[0].id;
  
  document.getElementById("iframe").src = "https://vidsrc.cc/v2/embed/tv/tt" + movieID + '/' + season[1] + '/' + episode + "?autoPlay=false"
  document.getElementById('server3').classList.add("serverActive");
  document.getElementById('server1').classList.remove("serverActive");
  document.getElementById('server2').classList.remove("serverActive");
  document.getElementById('server4').classList.remove("serverActive");
  document.getElementById('server5').classList.remove("serverActive");
}

function seriesServer4(){
    var selectedSeason = document.getElementById("sezone").options[document.getElementById("sezone").selectedIndex].value;
    var season = selectedSeason.split(' ');
    var episode = document.getElementById("epizode").getElementsByClassName("serverActive")[0].id;

    document.getElementById("iframe").src = "https://vidsrc.xyz/embed/tv/tt" + movieID + "/" + season[1] + '-' + episode;
    document.getElementById('server4').classList.add("serverActive");
    document.getElementById('server1').classList.remove("serverActive");
    document.getElementById('server2').classList.remove("serverActive");
    document.getElementById('server3').classList.remove("serverActive");
    document.getElementById('server5').classList.remove("serverActive");
}


function downloadFile(url, fileName) {
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName + ".srt";
      link.click();
  })
  .catch(console.error);
};

function download(fileID, opis) {
  fetch(downloadURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Api-Key': apiKey,
      'Content-Type': 'application/json',
      'User-Agent': 'MyGreatApp v0.1'
    },
    body: JSON.stringify({
      'file_id': fileID
    })
  }).then(function(response) {
        return response.json();
    }).then(function(data) {
        downloadFile(data.link, opis);
    }).catch(function(err) {
      console.log('Fetch Error : %s', err);
    });
}

function add(token, fileID, links, linkName, language, number){
  links.push(fileID);
  if(language == 'hr'){
    linkName.push('Hrvatski ' + number);
  } else if(language == 'sr'){
    linkName.push('Srpski ' + number);
  } else if(language == 'bs'){
    linkName.push('Bosanski ' + number);
  } else {
    linkName.push('Engleski ' + number);
  }

  if(links.length == 3){
    dodajTitloveHTML(links, linkName);
  }
}

function addSeries(token, fileID, links, linkName, language, number, episode, season){
  links.push(fileID);
  if(language == 'hr'){
    linkName.push('Hrvatski ' + number);
  } else if(language == 'sr'){
    linkName.push('Srpski ' + number);
  } else if(language == 'bs'){
    linkName.push('Bosanski ' + number);
  } else {
    linkName.push('Engleski ' + number);
  }

  if(links.length == 3){
    dodajTitloveSeriesHTML(links, linkName, episode, season);
  }
}