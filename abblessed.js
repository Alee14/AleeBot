var blessed = require('blessed');
var abversion = "1.0.9 Beta";

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'AleeBot '+ abversion +' Console';



var titleBox = blessed.text({

    top: "0",

    left: "0",

    width: "100%",

    height: "1",

    content: "AleeBot " + abversion + " Console",

    tags: true,

    style: {

        fg: 'black',

        bg: 'white'

    },

    padding: {

        left: 1

    }

});

screen.append(titleBox);

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});



// Render the screen.
screen.render();
