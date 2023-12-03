var canvas;
var h1;
let bgcolor;

function setup() {
    // create canvas

    bgcolor = color(random(180));

    canvas = createCanvas(300, 300);
    canvas.parent('container');

    // create button
    let col = color(25, 23, 200, 50);
    let button = createButton('Random Color');
    button.style('background-color', col);
    button.parent('container');
    button.mouseClicked(changeColor);
    //button.mouseOut(resetColor);

     // create headert
    h1 = createElement('h1', 'waiting for press');
    h1.parent('container');
    h1.mousePressed(clickText);
}

function clickText() {
    p = createP("my favourite number is " + random(0, 100));
    p.parent('container');
    // change header text
    h1.html("Now I am going to show you my favourite number");
}

function changeColor(){
    bgcolor = color(random(255), random(255), random(255))
}

//function resetColor(){
//    bgcolor = color('red')
//}

function draw() {
    //clear();
    background('black');
    fill(bgcolor);
    rect(170, 170, 80, 80);
}


// https://stackoverflow.com/questions/880512/prevent-text-selection-after-double-click
// prevent text selection after a double click
document.addEventListener('mousedown', function (event) {
    if (event.detail > 1) {
        event.preventDefault();
    }
}, false);