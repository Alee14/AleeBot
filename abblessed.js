var blessed = require('blessed');
var abversion = "1.0.9 Beta";
//Some of this code was made by vicr123
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

var logBox = blessed.log({

    top: 1,

    left: 0,

    width: "100%",

    height: "100%-4",

    tags: true,

    style: {

        fg: 'white',

        bg: 'black',

        scrollbar: {

            bg: 'white'

        }

    },

    padding: {

        left: 1 // ,

        // bottom: 2

    },

    scrollable: true,

    alwaysScroll: true,

    scrollOnInput: true,

    scrollbar: true //,

    //clickable: true

});

screen.append(logBox);



function clearBoxes() {

    while (lockBox.length > 0) {

        var box = lockBox.pop();

        box.hide();

        box.destroy();

    }



}

logBox.on('click', function(mouse) {

    var x = mouse.x;

    var y = mouse.y;



    //var line = logBox.getScreenLines()[y + 1];

    var line = logBox.getBaseLine(y - 1);



    //Remove escapes

    while (line.indexOf("\x1b") != -1) {

        var removeStart = line.indexOf("\x1b");

        var removeEnd = line.indexOf("m", removeStart);

        line = line.replace(line.slice(removeStart, removeEnd + 1), "");

    }

    //logBox.log(line);



    //Get word around line

    var previousSpace = line.lastIndexOf(" ", x - 2);

    var nextSpace = line.indexOf(" ", x - 2);



    previousSpace++;



    if (nextSpace == -1) {

        nextSpace = line.length;// - previousSpace;

    }

    var word = line.substring(previousSpace, nextSpace);



    if (word.startsWith("[")) word = word.substr(1);

    if (word.endsWith("]")) word = word.substr(0, word.length - 2);



    var goUpwards = false;

    var top = y + 1;

    if (top + 7 > screen.height) {

        top = y - 7;

        goUpwards = true;

    }



    var left = x - 10;

    if (left + 50 > screen.width) {

        left = screen.width - 50;

    } else if (left < 0) {

        left = 0;

    }



    var boxOptions = {

        top: top,

        left: left,

        width: 50,

        style: {

            fg: "black",

            bg: "white",

            border: {

                fg: 'white',

                bg: 'black'

            }

        },

        border: {

            type: "line"

        },

        padding: {

            left: 2,

            top: 1,

            right: 2,

            bottom: 1

        }

    };



    clearBoxes();

// Quit on Escape, q, or Control-C.
screen.key(['q', 'C-c'], function(ch, key) {
  return process.exit(0);
});



// Render the screen.
screen.render();
