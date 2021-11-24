console.log('init-opentype.js');

opentype.load('/Very-Open-Type/typefaces/Trace/fonts/Trace-Regular.otf', function(err, font) {
  if (err) {
    console.log('Font could not be loaded: ' + err);
  } else {
    console.log({font});
  }
});

// --- Functions

function init_character_map(){
  var containers = $('.character-map');
  console.log({containers});
  if(containers.length >  0){
    console.log('init_character_map');
    containers.each(function(){
      var container = $(this);
      container.html('I am a container!');
    });
  }
}

// --- Execute

$(function() {
  init_character_map()
});
