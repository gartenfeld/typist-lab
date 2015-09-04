soundManager.setup({
  url: '../swf/',
  flashVersion: 9,
  preferFlash: false,
  onready: function() {
    $(function(){
      splash();
      loadSentence(init);
    });
  }
});


function splash() {
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

