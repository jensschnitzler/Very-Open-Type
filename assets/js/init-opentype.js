console.log('hello');

opentype.load('/Very-Open-Type/typefaces/Trace/fonts/Trace-Regular.otf', function(err, font) {
  if (err) {
    console.log('Font could not be loaded: ' + err);
  } else {
    console.log({font});
  }
});
