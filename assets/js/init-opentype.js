console.log('init-opentype.js');

// --- Functions

function init_character_map(font){
  var main = $('main').first();
  if(main.length > 0){
    var newSection = $('<section class="character-map"/>');
    var newTitle = $('<h2>Character Map</h2>')
    var newContainer = $('<div class="content"/>');

    newSection.appendTo(main);
    newTitle.appendTo(newSection);
    newContainer.appendTo(newSection);

    newContainer.css({
      'word-break':'break-all',
      'white-space':'normal',
      'overflow-x':'hidden',
    });
    var myGlyphs = font.glyphs.glyphs; //[1].unicode
    console.log({myGlyphs});
    var myGlyphsLength = Object.keys(myGlyphs).length;
    console.log({myGlyphsLength});

    $.each( myGlyphs, function( i, value ) {

      var myUnicode = myGlyphs[i].unicode;
      if ( myUnicode > 0 ) {
        var res = String.fromCharCode( myUnicode );
        newContainer.append( '<span data-uc="' + myUnicode + '">' + res + '</span>' );
      }
    });
  }
}

// --- Execute

$(function() {

  var body = $('body');
  if(body.length >  0){
    var fontBaseUrl = body.data('font-base-url'); // get font url from data attribute data-font-base-url
    var fonts = body.data('fonts'); // get font url from data attribute data-fonts

    if(fontBaseUrl.length && fonts.length){

      var fontUrl = fontBaseUrl + '/' + fonts + '.otf';
      console.log({fontUrl});

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
