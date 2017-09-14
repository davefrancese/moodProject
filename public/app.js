// JAVASCRIPT FOR MOOD. APP
// Last saved repl.it (Sept. 14 3:35pm)

var weatherForm = document.getElementById('weather-form');
var promises = [];
var happyBands = [
  'https://itunes.apple.com/search?term=lcdsoundsystem',
  'https://itunes.apple.com/search?term=arcadefire', 'https://itunes.apple.com/search?term=foals',
  'https://itunes.apple.com/search?term=menomena', 'https://itunes.apple.com/search?term=altj',
  'https://itunes.apple.com/search?term=animalcollective',
  'https://itunes.apple.com/search?term=gorillaz',
  'https://itunes.apple.com/search?term=futureislands',
  'https://itunes.apple.com/search?term=tvontheradio',
  'https://itunes.apple.com/search?term=rac'
]

var sadBands = [
  'https://itunes.apple.com/search?term=damienjurado', 'https://itunes.apple.com/search?term=sigurros', 'https://itunes.apple.com/search?term=avettbrothers', 'https://itunes.apple.com/search?term=brighteyes', 'https://itunes.apple.com/search?term=norahjones', 'https://itunes.apple.com/search?term=louisarmstrong', 'https://itunes.apple.com/search?term=ettajames', 'https://itunes.apple.com/search?term=anathallo', 'https://itunes.apple.com/search?term=beirut', 'https://itunes.apple.com/search?term=danieljohnston'
]

var angryBands = [
  'https://itunes.apple.com/search?term=thechariot',
  'https://itunes.apple.com/search?term=underoath',
  'https://itunes.apple.com/search?term=motorhead',
  'https://itunes.apple.com/search?term=paramore',
  'https://itunes.apple.com/search?term=foofighters',
  'https://itunes.apple.com/search?term=beastieboys',
  'https://itunes.apple.com/search?term=rageagainstthemachine',
  'https://itunes.apple.com/search?term=kendricklamar',
  'https://itunes.apple.com/search?term=sisyphus',
  'https://itunes.apple.com/search?term=pedrothelion'
]

var sexyBands = [
  'https://itunes.apple.com/search?term=smoothjazz',
  'https://itunes.apple.com/search?term=groverwashington',
  'https://itunes.apple.com/search?term=johncoltrane',
  'https://itunes.apple.com/search?term=johnlegend',
  'https://itunes.apple.com/search?term=sufjanstevens',
  'https://itunes.apple.com/search?term=sisyphus-takeme',
  'https://itunes.apple.com/search?term=beachhouse',
  'https://itunes.apple.com/search?term=allisfulloflove',
  'https://itunes.apple.com/search?term=littledragon',
  'https://itunes.apple.com/search?term=sleepingatlast'
]

var goofyBands = [
  'https://itunes.apple.com/search?term=wolfparade',
  'https://itunes.apple.com/search?term=clapyourhandssayyeah',
  'https://itunes.apple.com/search?term=modestmouse',
  'https://itunes.apple.com/search?term=talkingheads',
  'https://itunes.apple.com/search?term=yacht',
  'https://itunes.apple.com/search?term=tokyopoliceclub',
  'https://itunes.apple.com/search?term=jamaicanqueens',
  'https://itunes.apple.com/search?term=devo',
  'https://itunes.apple.com/search?term=sbtrkt',
  'https://itunes.apple.com/search?term=djshadow'
]

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
          console.log(cloudCoverage);
          var temperature = Math.round(weatherSearchData.current_observation.temp_f) + '˚F';
          var weatherImage = weatherSearchData.current_observation.icon_url;
          // ADD WEATHER TO HTML PAGE
          // adding weather image
          var eImg = document.createElement('img');
          eImg.setAttribute('src', weatherImage);
          weatherRadar.append(eImg)
          eImg.className += "image-adj"
          // adding temperature
          var eH5 = document.createElement('h5');
          eH5.innerHTML = temperature;
          weatherRadar.append(eH5);
          eH5.className += "font-adj"
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
            emoImg.className += "image-adj";
            var emoChoice = 'happy';
            getBands(happyBands);
          } else if (sad.checked) {
            var emoImg = document.createElement('img');
            emoImg.setAttribute('src', 'emotions/sad.png')
            moodImage.append(emoImg);
            emoImg.className += "image-adj";
            var emoChoice = 'sad';
            getBands(sadBands);
          } else if (angry.checked) {
            var emoImg = document.createElement('img');
            emoImg.setAttribute('src', 'emotions/angry.png')
            moodImage.append(emoImg);
            emoImg.className += "image-adj";
            var emoChoice = 'angry';
            getBands(angryBands);
          } else if (sexy.checked) {
            var emoImg = document.createElement('img');
            emoImg.setAttribute('src', 'emotions/sexy.png')
            moodImage.append(emoImg);
            emoImg.className += "image-adj";
            var emoChoice = 'sexy';
            getBands(sexyBands);
          } else if (goofy.checked) {
            var emoImg = document.createElement('img');
            emoImg.setAttribute('src', 'emotions/goofy.png')
            moodImage.append(emoImg);
            emoImg.className += "image-adj";
            var emoChoice = 'goofy';
            getBands(goofyBands)
          } else {
            var nothing = document.createElement('h5');
            nothing.innerHTML = 'Pick an Emotion';
            moodImage.append(nothing);
            var emoChoice = 'nothing';
          }



          function getBands(emotionBandArray) {
            for (i = 0; i < emotionBandArray.length; i++) {
              fetch(emotionBandArray[i])
                .then((response) => {
                  return response.json()
                  }).then((data) => {
                    promises.push(data);
                    var playlist = document.getElementsByClassName('playlist')[0];
                    for (var i = 0; i < promises.length; i++) {
                      // SONG IMAGE
                      var songImgURL = promises[i].results["0"].artworkUrl100;
                      var songImg = document.createElement('img');
                      songImg.setAttribute('src', songImgURL);
                      songImg.className += "song-img-head-room";
                      // ARTIST NAME and SONG NAME
                      var artistSongTitle = document.createElement('p')
                      var artistName = promises[i].results["0"].artistName;
                      var songName = promises[i].results["0"].trackName;
                      artistSongTitle.innerHTML = artistName + ' - ' + songName;
                      // SONG PLAYER
                      var songPreURL = promises[i].results["0"].previewUrl;
                      var songPlayer = document.createElement('video');
                      songPlayer.setAttribute('controls', 'controls');
                      songPlayer.setAttribute('name', 'media');
                      // SET SOURCE INSIDE VIDEO TAG
                      var source = document.createElement('source');
                      source.setAttribute('src', songPreURL);
                      source.setAttribute('type', 'audio/x-m4a');
                      songPlayer.append(source);
                      // PAGE BREAK AFTER EACH PLAYLIST ITEM
                      var pageBreak = document.createElement('br');
                    }
                    playlist.append(songImg, artistSongTitle, songPlayer, pageBreak);
              })
            }
        }


          // CREATE EMPTY ARRAY FOR FETCHING PROMISES (PUSH)
          // ARRAY OF BAND NAMES
          // LOOP THROU ARRAY
            //  GEN. URL (ENDPOINT)
            //  FETCH URL
            //  PUSH RESULT=(promise) OF FETCH TO EMPTY ARRAY
          // PROMISE.ALL ON EMPTY ARRAY

          //Promise.all(happyPromises).then((values) => {

            // var table = document.getElementsByClassName('playlist-table')[0];
            // for (var i = 0; i < happyPromises.length; i++) {
            //   //adding song IMAGE
            //   console.log(happyPromises[i]);
            //   // var songImgURL = values["0"].results[i].artworkUrl30;
            //
            // }
          //})
        })
    })
})
