
// .get method (https://www.w3schools.com/jquery/jquery_ajax_get_post.asp)
function getMe( targetFile, frameElement ){
  $.get( targetFile , function( data, status ){
    //alert("Data: " + data + "\nStatus: " + status);
    $( frameElement ).html( data );
  });
};

/* Jens Ajax Code */

function changeViewMode() {
  //$('.site-frame').first().css('background','red');
  $('.site-frame').toggleClass('project-view');
  $('html,body,.site-frame,.wrapper,.page').animate({ scrollTop: 0 }, 'slow');
}

/* Christophs Ajax Code */

function setupTitle(title) {
  document.title = title;
}

function allWait() {
  //console.log("wait");
  $("body").addClass("wait");
}

function allReady() {
  $("body").removeClass("wait");
}

function changeUrl(title, url) {
  //console.log("push url");
  //_paq.push(['setCustomUrl', url]);
  if (typeof (history.pushState) != "undefined") {
    var obj = { Title: title, Url: url };
    history.pushState(obj, obj.Title, obj.Url);
  } else {
    alert("Browser does not support HTML5.");
  }
}

allAjaxObjects = $('.ajax-ref');

$(document).ready(function(){

  allAjaxObjects.each(function(){

    $(this).click(function( event ) { //.off()
      event.preventDefault();
      //allWait();
      var myUrl = $(this).data("ref");
      console.log( myUrl );

      $("#ajax-content").hide();

      $.ajax({
        url: myUrl,
        success:function(data) {
          //allReady();
          changeUrl('',myUrl);
          var matches = data.match(/<title>(.*?)<\/title>/);
          var spUrlTitle = matches[1];
          setupTitle(spUrlTitle);

          console.log($(data));

          var myAjaxContainer = $(".ajax-content").first();
          myAjaxContainer.html( $(data).find(".ajax-target").first() );

          //addCloseButton( myAjaxContainer );

          myAjaxContainer.show();
          changeViewMode();

          myAjaxContainer.off().click(function(){
              //$("#ajax-content").hide();
          });

        }
      });
    })
  });
});
