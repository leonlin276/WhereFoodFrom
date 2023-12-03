
function setup() {
  // Create canvas (set to size of windowWidth and windowHeight), you can also specify pixel resolution x and y
  createCanvas(windowWidth, windowHeight);
  // Set color of background (RGB), this can also be a single number (Greyscale)
  background(255, 204, 0);
}

function draw() {
  // Make a line: line(20, 50, 420, 110); specify x1, y1, x2, y2)
  // Make an ellipse: ellipse(10,10,20,20). Put an ellipse at the coordinate (10,10) and give a height and width of 20

  // Make a large circle
  ellipse(800,500,100,100)

  // Create a variable called size and give it the value 20
  let size = 20;
 
  // Create 10 randomly placed circles
  for (let i = 0; i < 10; i++) {
    // Sets color rmode to Hex value: "#0c02c7"
    colorMode(HSB)
    fill('#0c02c7');
    ellipse(random(0,windowWidth), random(0,windowHeight), size, size);
  }

  // No loop (only go through draw function once)
  noLoop();
}

// Resizes canvas to new window width and height  
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }