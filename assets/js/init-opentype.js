console.log('init-opentype.js');

// --- Functions

function init_character_map(font){
  var containers = $('.character-map');
  //console.log({containers});
  if(containers.length >  0){
    //console.log('init_character_map');
    containers.each(function(){
      var container = $(this);
      container.html('I am a container!<br>');
      //container.append(fontUrl);

      var glyphs = font.glyphs.glyphs;
      console.log({glyphs});

      $.each( glyphs, function( key, value ) {
        container.append(key + ": " + value + "<br>");
      });

    });
  }
}

// --- Execute

$(function() {

  var body = $('body');
  if(body.length >  0){
    var fontUrl = body.data('font-url'); // get font url from data attribute data-font-url
    console.log({fontUrl});
    if(fontUrl.length){

      opentype.load(fontUrl, function(err, font) { // load font
        if (err) {
          console.log('Font could not be loaded: ' + err);
        } else {
          init_character_map(font);
        }
      });
    }
  }


  /*
  var hostname = $(location).attr('hostname');                //origin URL
  console.log({hostname});
  var pathname = $(location).attr('pathname');                // path name
  console.log({pathname});
  var hash = $(location).attr('hash');                    // everything comes after hash
  console.log({hash});
  */

});
