    var correctKey = "", 
        timer,
        myAudio,
        twice,
        repeated = 0,
        init = "Yes, please.";

    function loadSM(){
      soundManager.setup({
        url: 'swf/',
        onready: function() {
          soundManager.createSound({
              id: 'mySound',
              url: 'audio/NCE/C021_09.mp3',
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
      });
    }

    function loadSentence(sentence) {
      
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

    function getFirstCharacter() {
      $firstChar = $('.character.hidden').first();

      if ($firstChar.length > 0) {
        $firstChar.attr('class','character current');
        correctKey = $firstChar.text().toLowerCase();
        timer = setInterval(function() {blinker($firstChar);},2000);
      } else {
        soundManager.stop('mySound');
        soundManager.play('mySound', {onfinish: loadAnother});
        
      }
    }

    function loadAnother() {

      if (repeated === 0) {
        var new_entry = items[Math.floor(Math.random()*items.length)];
        twice = new_entry;
        // repeated += 1;
      } else {
        repeated = 0;
      }
      entry = twice;
      mp3 = entry.mp3;
      en = entry.en;
      cn = entry.cn;
      $('.line').remove();
      $('div.translation').text(cn);
      soundManager.load('mySound',{url:'audio/NCE/'+mp3});
      loadSentence(en);

    }

    function blinker(elem) {
        elem.fadeOut(400);
        elem.fadeIn(400);
    }

    function loadLetters(content) {

      for (var l=0; l < content.length; l++) {
        var charSet = content[l].chars;
          $newLine = $('<div></div>', {class: "line"});
          $('div.sentence').append($newLine);

        // insert DIV for line and set it to a variable
        for (var c=0; c < charSet.length; c++) {
          var oneChar = charSet[c];

          $newChar = $('<div></div>', {
            text: oneChar,
            class: checkAlpha(oneChar)
          });

          $newChar.appendTo($newLine);
          $newChar.hide().delay(((10*l)+c)*5).fadeIn(200); 
        } // char loop
      } // line loop
    }

    function checkAlpha(char) {
      return /^[a-zA-Z]$/.test(char) ? "character hidden" : "character apparent";
    }

    function wrapString(str, limit, lineBreak) {
      if (str.length>limit) {
          var p=limit;
          while (p>0 && str[p]!=' ') {p--;} // find first space within limit
          if (p>0) {
              var left = str.substring(0, p); // a compliant line
              var right = str.substring(p+1); // the remainder
              return left + lineBreak + wrapString(right, limit, lineBreak); // recursively solve the remainder
          }
      }
      return str;
    }

    function flashScreen () {
      $('html').animate({backgroundColor: "#FFC2D6"}, 50)
               .animate({backgroundColor: "transparent"}, 50);
    }

    $(document).unbind('keydown').bind('keydown', function (event) {
      if (event.keyCode === 8) {
        event.preventDefault(); // This is a jQuery method, remember to load jQuery first!
      }
    });

    window.onkeyup = function(e) {

      var key = e.keyCode ? e.keyCode : e.which;
  
      var pressed = String.fromCharCode(key).toLowerCase();

      if (pressed == correctKey) {
        clearInterval(timer);
        $firstChar.attr('class', 'character apparent');
        getFirstCharacter();
      } else {
          if (key != 32) {flashScreen();}
      }
    };