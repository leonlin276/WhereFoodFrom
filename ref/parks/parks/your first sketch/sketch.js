// Dataset https://www.kaggle.com/datasets/nationalparkservice/park-biodiversity/?select=parks.csv
// https://p5js.org/reference/

// Delare variable table, with global scope
let table

function preload() {
  // my table is comma separated value "csv"
  // and has a header specifying the columns labels
  table = loadTable('assets/parks.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('white')
  // print object to table
  print(table)
}

function draw() {
  // loop through table object
  for (let r = 0; r < table.getRowCount(); r++) {
    let name = table.getString(r, 'Park Name');
    let acres = table.getNum(r, 'Acres');

    // declare local scope variable
    let x = random(0, width);
    let y = random(0, height);

    // use map to scale output size
    let circle_size = map(acres,1000,8500000,0,250)

    textAlign(CENTER,TOP)
    noStroke();
    fill('green');
    circle(x, y, circle_size)
    textSize(11);
    fill('black');
    text(name, x, y + circle_size/2 + 8);
  }
    // print(name) // print to console, console.log(name) will do the same thing

  noLoop()
}

// Resizes canvas to new window width and height  
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }