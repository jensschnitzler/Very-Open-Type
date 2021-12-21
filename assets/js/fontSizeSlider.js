console.log('fontSizeSlider.js');

function setSliderFontSize($slider){
  var val = $slider.val() || 40;
  var $wrapper = $slider.closest('.wrapper');
  var $editor = $wrapper.find('.editor').first();
  $editor.css({
    'fontSize':val + 'px',
  });
}

$(function(){
  var $body = $('body');
  var $sliders = $body.find('.fontSizeSlider');
  $sliders.each(function(){
    console.log('slider changed');
    var $slider = $(this);
    setSliderFontSize($slider);
    $slider.change(function(){
      setSliderFontSize($slider);
    });
  });
});
