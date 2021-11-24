console.log('init-opentype.js');



// --- Functions

function loadFont(url){

  opentype.load(url, function(err, font) {
    if (err) {
      console.log('Font could not be loaded: ' + err);
    } else {
      //console.log({font});
      return font;
    }
  });

}

function init_character_map(){
  var containers = $('.character-map');
  console.log({containers});
  if(containers.length >  0){
    console.log('init_character_map');
    containers.each(function(){
      var container = $(this);
      var fontUrl = container.data('font-url');
      console.log({fontUrl});

      if( fontUrl.length ){
        container.html('I am a container!<br>');
        container.append(fontUrl);
        var font = loadFont(fontUrl);

        var glyphs1 = font.glyphs;
        console.log({glyphs1});

        var glyphs2 = font.glyphs();
        console.log({glyphs2});

        var glyphs3 = font['glyphs'];
        console.log({glyphs3});
      }

    });
  }
}

// --- Execute

$(function() {
  init_character_map()
});
