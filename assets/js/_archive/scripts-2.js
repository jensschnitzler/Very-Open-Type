/* Style Injection */

function addFontFaces() {
  var myDiv = $("<div />").appendTo("body");

  var myStyles = $('ul.webfont-files');
  myStyles.each(function(j){

    var myStyle = $(this).attr('data-style');
    var mySources = "";
    var myFiles = $(this).children('li.file');
    myFiles.each(function(i){
      $(this).css('color','red');
      var myRef = $(this).attr('data-ref');
      var myName = $(this).attr('data-name');
      var myFormat = $(this).attr('data-format');
      //console.log(i + ': ' + myRef + ': ' + myName + ': ' + myFormat);
      mySources += "url('" + myRef + "') format('" + myFormat + "')";
      if( i + 1 < myFiles.length ) {
        mySources += ", ";
      }
    });
    console.log(j + ': ' + myStyle);
    var myCSS = "<style>@font-face {font-family: '" + myStyle + "'; src: " + mySources + "; font-display: swap;}</style>";
    $(myDiv).append( myCSS );
    //$('.type-show').addClass('new-font');
    //$('.type-show').css('font-family','"MyStyle", serif');
  });
}



$(document).ready(function(){
  console.log('Ready!');
  addFontFaces();
});


/* Light Switch */

function toggleLight(){
  var mySite = $('html').first();
  mySite.toggleClass('light');
  var myBody = $('body').first();
  myBody.toggleClass('light');
}

$(document).ready(function(){
  var random_boolean = Math.random() >= 0.5;
  if (random_boolean == true) {
    toggleLight();
  }
});

$(document).on("click",".slider",function() {
  toggleLight();
});


/* Type Size Labels */

$('.label').html('-');

/* get font family name */

var myTitle = $('h1.title');

function checkFontname( element ){
  var myFontfamily = element.css('font-family');
  element.html(myFontfamily);
}

checkFontname( myTitle );

/* get font sizes */

function checkFontsize( element ){
  var myFontsize = Math.round( parseInt( element.css('font-size') ) );
  var myFontfamily = element.css('font-family');
  element.attr('data-fs', myFontsize);
  element.find('.label').first().html(myFontsize); // + '&thinsp;px'
}

$(window).on('load resize', function () {
  $('.container').each(function(){
    var myContainer = $(this);
    checkFontsize( myContainer );
  });
});



/* Glyphs Set */

$(document).ready(function(){

  /*
  var i;
  var limit = 3000;
  for (i = 0; i < limit; i++) {
    var res = String.fromCharCode(i);
    $('.glyphset').append( '<span>' + res + '</span>' );
  }
  */

  var myContainer = $('.glyphset-preview'); /* .hide() */

  $('.glyphset').on('mouseenter','span',function() {
    //mouseenter
    var mySpan = $(this).clone();
    myContainer.show().html( mySpan );
  });

  $('.glyphset').on('mouseleave','span',function(){
    //mouseleave
    //myContainer.hide();
  });

});

/* Typeface Subpage: Style Selection */

function styleSelect( myStyleSelect ){
  if( myStyleSelect ){
    myNewStyleSlug = myStyleSelect.val();

    $('.type-show').css('font-family', myNewStyleSlug + ', sans-serif' );

    /* replace dash with space */
    myNewStyleName = myNewStyleSlug.replace(/-/g, ' ');
    /* Capitalise the first letter of each word in the sentence or the heading for title case. */
    myNewStyleName = myNewStyleName.toLowerCase().replace(/\b[a-z]/g, function(txtVal) {
      return txtVal.toUpperCase();
    });

    console.log('Style Select: ' + myNewStyleName );

    if( $('.type-show .hero .hero-content') ){
      var myHeroContent = $('.type-show .hero .hero-content');
      myHeroContent.html( myNewStyleName );
    }
  }
}

$(document).ready(function(){
  var myStyleSelect = $('.style-select select')
  myStyleSelect.change( function(){
    styleSelect( myStyleSelect );
    var myOtfRef = select2otf();
    makeGlyphSet( myOtfRef );
  });
});

/* Zipper */

$(document).ready(function(){
  $('.zipper').click(function(){
    $(this).parent().toggleClass('zip');
  })
});

/* Open Type js stuff */

function getOTFeatures( myOtfRef ){
  opentype.load( myOtfRef , function(err, font) {
    if (err) {
      console.log('Font could not be loaded: ' + err);
    } else {

      $('.otfeatures').html('<span>Open Type Features</span>');
      var myFeatures = font.tables.gsub.features;
      console.log( myFeatures.tag );
      var myFeaturesLength = Object.keys(myFeatures).length;
      console.log( 'myFeaturesLength: ' + myFeaturesLength );

      var myFeature = '';

      for( var i = 0; i < myFeaturesLength; i++ ) {
        if( myFeature != myFeatures[i].tag ){
          var myFeature = myFeatures[i].tag;
          console.log( myFeature );
          var myCode = '<a data-feat="' + myFeature + '">' + myFeature + '</a>';

          if( i + 1 < myFeaturesLength ) {
            //myCode += ".";
          }
          $('.otfeatures').append( myCode );
        }
      }
    }
  });
}

$(document).ready(function(){
  $('.otfeatures').on('click','a',function(){
    var myClassName = $(this).attr('data-feat');
    $(this).toggleClass('active');
    $(this).parents('.type-show').toggleClass( myClassName );
  });
});

function makeGlyphSet( myOtfRef ){
  opentype.load( myOtfRef , function(err, font) {
    if (err) {
      console.log('Font could not be loaded: ' + err);
    } else {
      $('.glyphset').html('');
      //var myCharset = font.cffEncoding.charset;
      var myGlyphs = font.glyphs.glyphs; //[1].unicode
      var myGlyphsLength = Object.keys(myGlyphs).length;
      console.log( font );
      console.log( 'myGlyphs.length: ' + Object.keys(myGlyphs).length );
      for( var i = 0; i < myGlyphsLength; i++ ) {
        var myUnicode = myGlyphs[i].unicode;
        if ( myUnicode > 0 ) {
          var res = String.fromCharCode( myUnicode );
          $('.glyphset').append( '<span>' + res + '</span>' );
        }
      }
    }
  });
}

function select2otf(){
  var mySelectedStyle = $('.style-select select').val();
  console.log('mySelectedStyle: ' + mySelectedStyle);
  var myStyleElement = $('body').find("[data-style='" + mySelectedStyle + "']").first();
  var myOtfElement = myStyleElement.find("[data-format='otf']").first();
  var myOtfRef = myOtfElement.attr('data-ref');
  return myOtfRef;
}

$(document).ready(function(){
  if( $('.page').is('.typeface') ){
    var myOtfRef = select2otf();
    makeGlyphSet( myOtfRef );
    getOTFeatures( myOtfRef );
  };
});


/* home page: fade in font menu */

//$('.font-menu').children().hide();

document.fonts.ready.then(function () {

  console.log('All fonts in use by visible text have loaded.');
  var myPage = $('.page').first();
  if ( myPage.is('.home') ) {
    $('.font-menu').children().each(function(){

      var min = 600;
      var max = 1700;
      var randomSpeed = Math.floor(Math.random() * (max - min + 1)) + min;
      var randomDelay = Math.floor(Math.random() * (max - min + 1)) + min;


      $(this).delay(randomDelay).animate({
        opacity: 1
      }, randomSpeed, function() {
        // Animation complete.
      });

    })
  }
});

/* show imprint */

$(document).ready(function(){
  $('a[data-ref="imprint"]').click(function(){
    console.log('imprint!');
    var myElement = $('.imprint').first();
    //myElement.css('top', '0')
    /*
    myElement.animate({
      top: 0
    }, 400, function() {
      // Animation complete.
    });
    */

    myElement.toggleClass('present');

  });
});


/* toggle option container */

$(document).ready(function(){
  /* apply hidden */
  $('.license-options .option-container').addClass('hidden');
  $('.license-options .option-container').hide();

  $('.license-options .option-container').siblings('.button').click(function(){
    var myButton = $(this);
    var myContainer = myButton.siblings('.option-container');
    console.log('toggle option container!');
    console.log(myButton);

    if( myContainer.is('.hidden') ){

      myContainer.slideDown();

    } else {

      myContainer.slideUp();

    }

    myContainer.toggleClass('hidden');
  });
});


/* minimize-button slide in/out info-container */

$(document).ready(function(){
  $('.minimize-button').click(function(){
    var myButton = $(this);
    var myContainer = myButton.parents('.info-container').first();
    myContainer.toggleClass('slide-out');
  });
});
