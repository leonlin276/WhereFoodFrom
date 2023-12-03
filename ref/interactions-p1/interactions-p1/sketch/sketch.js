// Dataset https://www.kaggle.com/datasets/nationalparkservice/park-biodiversity/?select=parks.csv
// https://p5js.org/reference/

// Delare variable table, with global scope
let table;
let firstFive = 5;
let parks = [];
let button;
start = 1;

function preload() {
  // my table is comma separated value "csv"
  // and has a header specifying the columns labels
  table = loadTable('assets/parks.csv', 'csv', 'header');
}

function setup() {
  // Get width of center column
  var width = document.getElementById('column_width').offsetWidth;
  let myCanvas1 = createCanvas(width, 500);
  myCanvas1.parent('mySketch');

  // Create Button
  button = createButton('Add Park');
  //button.position(0, 0);
  button.parent('button');
  button.mousePressed(addPark);

  // loop through table object
  for (let r = 0; r < table.getRowCount(); r++) {
    let name = table.getString(r, 'Park Name');
    let acres = table.getNum(r, 'Acres');
    let x = random(0, width);
    let y = random(0, 450);

    //print(name, acres, x, y)
    // Create new instance of park
    let park = new Park(x, y, name, acres);
    // Create a list of park objects
    parks.push(park);
    }
}

function draw() {
    // print(name) // print to console, console.log(name) will do the same thing
    
    clear();
    textSize(11);
    fill('#05601d');
    noStroke();
    textAlign(CENTER,TOP);

    for (let i = 0; i < start; i++){
      parks[i].display()
    }
    //print(parks);
    //parks[0].display();
    //parks[1].display();
    //parks[2].display();
    //parks[3].display();
    //parks[4].display();

}

function addPark() {
  clear();
  start++;
}

