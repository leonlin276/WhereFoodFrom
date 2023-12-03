// Dataset https://www.kaggle.com/datasets/nationalparkservice/park-biodiversity/?select=parks.csv
// https://p5js.org/reference/

// Delare variable table, with global scope
let table;

function preload() {
  // my table is comma separated value "csv"
  // and has a header specifying the columns labels
  table = loadTable('assets/parks.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // print object to table
  // print(table)
}

function draw() {
  // print(name) // print to console, console.log(name) will do the same thing
  textSize(11);
  fill('blue');
  textAlign(CENTER, TOP);

  // get first park
  acadiaName = table.getString(0, 'Park Name');
  acadiaAcres = table.getNum(0, 'Acres');

  // get second park
  archesName = table.getString(14, 'Park Name');
  archesAcres = table.getNum(14, 'Acres');

  displayPark(900, 230, acadiaName, acadiaAcres);
  displayPark(600, 600, archesName, archesAcres);

  print(acadiaName, acadiaAcres);
  print(archesName, archesAcres);
  noLoop();
}

function displayPark (x, y, name, acres) {
    // use map to scale output size
    let circle_size = map(acres, 1000, 8500000, 0, 500);
    noStroke();
    fill('green');
    circle(x, y, circle_size);
    textSize(11);
    fill('black');
    text(name + '\n' + acres +' Acres' , x, y + circle_size/2 + 8);
  }


