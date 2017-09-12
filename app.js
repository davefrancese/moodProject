// JAVASCRIPT FOR MOOD. APP

var weatherForm = document.getElementById('weather-form');

weatherForm.addEventListener('submit', function(event) {
  event.preventDefault();
  // clear field at each event
  document.getElementsByClassName('weather-radar')[0].innerHTML = '';
  document.getElementsByClassName('mood-image')[0].innerHTML = '';
  document.getElementsByClassName('playlist')[0].innerHTML = '';
  var citySearchValue = document.getElementById('cityInput').value;
  var stateSearchValue = document.getElementById('stateInput').value.toUpperCase();

  var weatherEndpoint = 'https://galvanize-cors-proxy.herokuapp.com/http://api.wunderground.com/api/8f425deadec4abd7/conditions/q/';
  var weatherAPI = weatherEndpoint + stateSearchValue + "/" + citySearchValue + ".json";
  fetch(weatherAPI)
    .then((response) => {
      return response.json()
        .then ((weatherSearchData) => {
          var weatherStatus = weatherSearchData.current_observation.weather;
          var weatherRadar = document.getElementsByClassName('weather-radar')[0];
          var cloudCoverage = weatherSearchData.current_observation.weather;
          var temperature = Math.round(weatherSearchData.current_observation.temp_f) + '˚F';
          var weatherImage = weatherSearchData.current_observation.icon_url;
          // ADD WEATHER TO HTML PAGE
          // adding weather image
          var eImg = document.createElement('img');
          eImg.setAttribute('src', weatherImage);
          weatherRadar.append(eImg)
          // adding temperature
          var eH5 = document.createElement('h5');
          eH5.innerHTML = temperature;
          weatherRadar.append(eH5);
          //ADD MOOD EMOJI TO HTML PAGE
          var moodImage = document.getElementsByClassName('mood-image')[0];
          var happy = document.getElementById('moodChoice1')
          var sad = document.getElementById('moodChoice2')
          var angry = document.getElementById('moodChoice3')
          var sexy = document.getElementById('moodChoice4')
          var goofy = document.getElementById('moodChoice5')
          if (happy.checked) {
            var emoImg = document.createElement('img');
            emoImg.setAttribute('src', 'emotions/happy.png')
            moodImage.append(emoImg);
            var emoChoice = 'happy';
          } else if (sad.checked) {
            var emoImg = document.createElement('img');
            emoImg.setAttribute('src', 'emotions/sad.png')
            moodImage.append(emoImg);
            var emoChoice = 'sad';
          } else if (angry.checked) {
            var emoImg = document.createElement('img');
            emoImg.setAttribute('src', 'emotions/angry.png')
            moodImage.append(emoImg);
            var emoChoice = 'angry';
          } else if (sexy.checked) {
            var emoImg = document.createElement('img');
            emoImg.setAttribute('src', 'emotions/sexy.png')
            moodImage.append(emoImg);
            var emoChoice = 'sexy';
          } else if (goofy.checked) {
            var emoImg = document.createElement('img');
            emoImg.setAttribute('src', 'emotions/goofy.png')
            moodImage.append(emoImg);
            var emoChoice = 'goofy';
          } else {
            var nothing = document.createElement('h5');
            nothing.innerHTML = 'Pick an Emotion';
            moodImage.append(nothing);
            var emoChoice = 'nothing';
          }

          // FETCH ITUNES MUSIC API
          if (emoChoice === 'happy' && weatherStatus === 'Clear') {
            var emoAPI = 'https://itunes.apple.com/search?term=lcdsoundsystem'
          } else {
            var emoAPI = 'https://itunes.apple.com/search?term=radiohead'
          }

          // CREATE EMPTY ARRAY FOR FETCHING PROMISES (PUSH)
          // ARRAY OF BAND NAMES
          // LOOP THROU ARRAY
            //  GEN. URL (ENDPOINT)
            //  FETCH URL
            //  PUSH RESULT=(promise) OF FETCH TO EMPTY ARRAY
          // PROMISE.ALL ON EMPTY ARRAY

          var iTunesEndpoint = 'https://itunes.apple.com/search?term=lcdsoundsystem';
          fetch(emoAPI)
            .then((response) => {
              return response.json()
                .then((iTunesData) => {
                  console.log(iTunesData);
                  var playlist = document.getElementsByClassName('playlist')[0];
                  // adding song image
                  var songImgURL = iTunesData.results["0"].artworkUrl60;
                  var songImg = document.createElement('img');
                  songImg.setAttribute('src', songImgURL);
                  playlist.append(songImg);
                  // adding song title
                  var songName = iTunesData.results["0"].trackName;
                  var songTitle = document.createElement('h5');
                  // adding artist name
                  var artistName = iTunesData.results["0"].artistName;
                  songTitle.innerHTML = artistName + " - " + songName;
                  playlist.append(songTitle);
                  // adding audio player sampler
                  var songPreURL = iTunesData.results["0"].previewUrl;
                  var songPlayer = document.createElement('video');
                  songPlayer.setAttribute('controls', 'controls')
                  songPlayer.setAttribute('name', 'media');
                  var source = document.createElement('source');
                  source.setAttribute('src', songPreURL);
                  source.setAttribute('type', 'audio/x-m4a');
                  songPlayer.append(source);
                  playlist.append(songPlayer)
                })
            })
        })
    })
})
