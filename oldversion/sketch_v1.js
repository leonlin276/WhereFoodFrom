// https://p5js.org/reference/

// Delare variable table, with global scope
let table;
let counts = 47;
let countries = [];
let slider;
var T = 150;
var t = 0;
var tdelta = T/5;
var Ascale = -280;
var CircleSizeScale = 1/2;
let yearnow = 1978;
let input_csvfile_food = "milk";
let input_csvfile_element = "Production";
let input_csvfile = input_csvfile_food + input_csvfile_element + ".csv";


function preload() {
  // my table is comma separated value "csv"
  // and has a header specifying the columns labels
  table = loadTable('fooddata/dataprocessed/'+ input_csvfile, 'csv', 'header');
  // console.log(table);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  slider = createSlider(1973, 2019, yearnow);
  slider.position(windowWidth/2-250, 4/5*windowHeight);
  slider.style('width', '500px');
  
  // counts = table.getRowCount()-10;
  // loop through table object
  // tableprdt2019.sort(Value);
  // console.log(table2);

  let table2 = table.matchRows(yearnow, 'Year');

  t = 0;
  for (let r = 0; r < counts; r++) {
    let name = table2[r].getString('CountryorArea');
    let production = table2[r].getNum('Value');

    let x = t;
    let y = Ascale*sin(360/T*t);

    // let x = random(100, windowWidth-100);
    // let y = random(100, windowHeight-100);

    // Create new instance of country
    let country = new Country(x, y, name, production);
    // country.display();

    // Create a list of country objects
    countries.push(country);
    t += tdelta;
  }
}

function draw() {
  createCanvas(windowWidth, windowHeight);
  
  let yearget = slider.value();
  
  if (yearget == yearnow) {
    text("Nochange",120,120);
  } else {
    text("Changing",120,120);

    countries = [];

    let table2 = table.matchRows(yearget, 'Year');

    t = 0;
    for (let r = 0; r < counts; r++) {
      let name = table2[r].getString('CountryorArea');
      let production = table2[r].getNum('Value');

      let x = t;
      let y = Ascale*sin(360/T*t);

      // let x = random(100, windowWidth-100);
      // let y = random(100, windowHeight-100);

      // Create new instance of country
      let country = new Country(x, y, name, production);
      // country.display();

      // Create a list of country objects
      countries.push(country);
      t += tdelta;
    }
    yearnow = yearget;
  }

  text (yearget, 50,50);
  translate(windowWidth/13, windowHeight/2);
  for (let i = 0; i < counts; i++) {
    countries[i].display();
  }
  // noLoop();
}
