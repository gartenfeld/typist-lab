
    function loadSentence() {
      
      var sentence = "He fumbled for the little phrase book he carried with him but then suddenly remembered the word.";
      var wrappedText = wrapString(sentence, 36, "\n");
      var lines = wrappedText.split('\n');

      var textLines = [];
      for (var i = 0; i < lines.length; i++) {
        lineChars = lines[i].split('');
        dict = { "chars" : lineChars };
        textLines.push(dict);
      };

      loadLetters(textLines);
      getFirstCharacter();

    };

    function getFirstCharacter() {
      $firstChar = $('.character.hidden').first();
      $firstChar.attr('class','character current');
      correctKey = $firstChar.text().toLowerCase();
      timer = setInterval(function() {blinker($firstChar);},2000)
    };

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

        };
      };
    };

    function checkAlpha(char) {
      return /^[a-zA-Z]$/.test(char) ? "character hidden" : "character apparent";
    };

    function wrapString(str, limit, lineBreak) {
      if (str.length>limit) {
          var p=limit;
          while (p>0 && str[p]!=' ') {p--;}; // find first space within limit
          if (p>0) {
              var left = str.substring(0, p); // a compliant line
              var right = str.substring(p+1); // the remainder
              return left + lineBreak + wrapString(right, limit, lineBreak); // recursively solve the remainder
          };
      }
      return str;
    };



    window.onkeyup = function(e) {

    var key = e.keyCode ? e.keyCode : e.which;
    
      var pressed = String.fromCharCode(key).toLowerCase();

      if (pressed == correctKey) {
        clearInterval(timer);
        $firstChar.attr('class', 'character apparent');
        getFirstCharacter();
      } else {
          flashScreen();
      }
    
    }

    function flashScreen () {
      $('html').animate({backgroundColor: "#FFC2D6"}, 50)
               .animate({backgroundColor: "transparent"}, 50);
    }