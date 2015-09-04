var AUDIO_DIR = 'audio/NCE/';
window.answer = "";

function initSound () {
  soundManager.createSound({
    id: 'voice',
    flashVersion: 9,
    stream: true,
    autoLoad: false,
    autoPlay: false,
    volume: 60,
    onload: function() {
      this.stop();
      this.play({loops:200});
    }
  }).load();
}

function loadSentence (sentence) {
  var wrappedText = wrapString(sentence, 36, "\n"); 
  var lines = wrappedText.split('\n');
  var textLines = [];
  for (var i = 0; i < lines.length; i++) {
    lineChars = lines[i].split('');
    dict = { "chars" : lineChars };
    textLines.push(dict);
  }
  loadLetters(textLines);
  getFirstCharacter();
}

function getFirstCharacter () {
  $firstChar = $('.character.hidden').first();
  if ($firstChar.length > 0) {
    $firstChar.attr('class','character current');
    window.answer = $firstChar.text().toLowerCase();
    window.timer = setInterval(function(){
      blinker($firstChar);
    }, 2000);
  } else {
    soundManager.stop('voice');
    soundManager.play('voice', { onfinish: loadAnother });
  }
}

function loadAnother () {
  entry = items[Math.floor(Math.random() * items.length)];
  mp3 = entry.mp3;
  en = entry.en;
  cn = entry.cn;
  $('.line').remove();
  $('.translation').text(cn);
  soundManager.load('voice', { url: AUDIO_DIR + mp3 });
  loadSentence(en);
}

function blinker (elem) {
  elem.fadeOut(400);
  elem.fadeIn(400);
}

function loadLetters (content) {
  for (var l = 0; l < content.length; l++) {
    var charSet = content[l].chars;
      $newLine = $('<div></div>', {class: "line"});
      $('.sentence').append($newLine);
    // insert DIV for line and capture it in a variable
    for (var c = 0; c < charSet.length; c++) {
      var oneChar = charSet[c];
      $newChar = $('<div></div>', { class: checkAlpha(oneChar) }).text(oneChar);
      $newChar.appendTo($newLine);
      $newChar.hide().delay(((10 * l) + c) * 5).fadeIn(200); 
    } // char loop
  } // line loop
}

function checkAlpha (char) {
  return /^[a-zA-Z]$/.test(char) ? "character hidden" : "character apparent";
}

function wrapString (str, limit, lineBreak) {
  if (str.length > limit) {
    var p = limit;
    while (p > 0 && str[p] !== ' ') { p--; } // find first space within limit
    if (p > 0) {
      var left = str.substring(0, p); // a compliant line
      var right = str.substring(p + 1); // the remainder
      return left + lineBreak + wrapString(right, limit, lineBreak);
    }
  }
  return str;
}

function flashScreen () {
  $('#warning')
    .animate({ opacity: 0.5 }, 50)
    .animate({ opacity: 0 }, 50);
}

$(document).unbind('keydown')
  .bind('keydown', function (e) {
    if (e.keyCode === 8) {
      e.preventDefault();
    }
});

window.onkeyup = function(e) {
  var key = e.keyCode ? e.keyCode : e.which;

  var pressed = String.fromCharCode(key).toLowerCase();

  if (pressed === window.answer) {
    clearInterval(window.timer);
    $firstChar.attr('class', 'character apparent');
    getFirstCharacter();
  } else {
    if (key !== 32) { flashScreen(); }
  }
};