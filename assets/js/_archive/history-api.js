console.log('history-api.js');

var container = document.querySelector('.header-container');

container.addEventListener('click', function(e) {
  if (e.target != e.currentTarget) {
    e.preventDefault();
    // e.target is the image inside the link we just clicked.

    var data = e.target.getAttribute('data-name'),
      url = data + ".html";
      history.pushState(null, null, url);

      // here we can fix the current classes
      // and update text with the data variable
      // and make an Ajax request for the .content element
      // finally we can manually update the document’s title
  }
  e.stopPropagation();
}, false);
