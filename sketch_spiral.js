// https://p5js.org/reference/

// Delare variable table, with global scope
let table;
let counts = 100;
let countries = [];
var angle = 0;
var angledelta = 30;
var plotradius = 0.3;
let slider;


function preload() {
  // my table is comma separated value "csv"
  // and has a header specifying the columns labels
  table = loadTable('appleeditedfilteredproduction2019.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // counts = table.getRowCount()-10;
  // loop through table object
  // let tableproduction = table. findRows('Production', 'Element');
  // let tableprdt2019 = tableproduction. findRows('2019','Year');
  // tableprdt2019.sort(Value);

  slider = createSlider(0, 500, 30);
  slider.position(windowWidth/2-250, 4/5*windowHeight);
  slider.style('width', '500px');

  // translate(windowWidth/2, windowHeight/2);
  angleMode(DEGREES);
  for (let r = 0; r < counts; r++) {
    let name = table.getString(r, 'CountryorArea');
    let production = table.getNum(r, 'Value');
    let x = 0;
    let y = 0;
    // let x = random(100, windowWidth-100);
    // let y = random(100, windowHeight-100);

    //print(name, production, x, y)
    // Create new instance of country
    let country = new Country(x, y, name, production);
    // country.display();
    // Create a list of country objects
    countries.push(country);
    }
}

function draw() {
  angle = 0;
  createCanvas(windowWidth, windowHeight);
    // print(name) // print to console, console.log(name) will do the same thing
    // print(countries);

    valueslider = slider.value();
    plotradius = map(valueslider,0,500,0,5);
    angledelta = map(valueslider,0,500,0,180);


    text(plotradius,50,50);

    translate(windowWidth/2, windowHeight/2);
    for (let i = 0; i < counts; i++) {
      countries[i].display();
    }
    // noLoop();
}

