function showHighscores() {
    // getItem "highscores" from localStorage or set to an empty array
    var highscore = JSON.parse(window.localStorage.getItem('highscores')) || [];
  
    // sorts highscores from highest to lowest
    highscore.sort(function (a, b) {
      return b.score - a.score;
    });
  
    for (var i = 0; i < highscore.length; i += 1) {
      // create li for each highscore
      var liEl = document.createElement('li');
      liEl.textContent = highscore[i].initials + ' - ' + highscore[i].score;
  
      // display highscores to the page
      var olEl = document.querySelector('#highscore-list');
      olEl.appendChild(liEl);
    }
  }
  
  // removes highscores from local storage and reloads the page
  function clearHighscores() {
    window.localStorage.removeItem('highscores');
    window.location.reload();
  }
  
  // runs function upon button "click" action
  document.querySelector('#clear').onclick = clearHighscores;
  
  // runs function upon page load
  showHighscores();
