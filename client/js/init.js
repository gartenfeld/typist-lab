soundManager.setup({
  url: '../swf/',
  flashVersion: 9,
  preferFlash: false,
  onready: function() {
    $(function(){
      if (isDesktop()) {
        initSound();
        loadAnother();
      }
    });
  }
});
