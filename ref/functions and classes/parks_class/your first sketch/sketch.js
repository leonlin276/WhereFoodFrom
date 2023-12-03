// Dataset https://www.kaggle.com/datasets/nationalparkservice/park-biodiversity/?select=parks.csv
// https://p5js.org/reference/

// Delare variable table, with global scope
let table;
let firstFive = 5;
let parks = [];

function preload() {
  // my table is comma separated value "csv"
  // and has a header specifying the columns labels
  table = loadTable('assets/parks.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // print object to table
  // print(table)

  // loop through table object
  for (let r = 0; r < firstFive; r++) {
    let name = table.getString(r, 'Park Name');
    let acres = table.getNum(r, 'Acres');
    let x = random(0, windowWidth);
    let y = random(0, windowHeight);

    //print(name, acres, x, y)
    // Create new instance of park
    let park = new Park(x, y, name, acres);
    // Create a list of park objects
    parks.push(park);
    }
}

function draw() {
    // print(name) // print to console, console.log(name) will do the same thing
    textSize(11);
    fill('blue');
    textAlign(CENTER,TOP);

    print(parks);
    parks[0].display();
    parks[1].display();
    parks[2].display();
    parks[3].display();
    parks[4].display();

    noLoop();
}
