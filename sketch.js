// https://p5js.org/reference/

// Delare variable table, with global scope
let counts = 300; // number of countries to display
let countries = [];
let countriessorted = [];
var T = 150; // period of sine
var t = 0; // country's x position on sine
var tdelta = T/5; // space of x axis between two countries
var Ascale = -280; // height of sine
let move = 0; // parameter for moving display position of countries by mouse position
let movewhenclick = 0; 
var CircleSizeScale = 1; // parameter for controling size of cirle and scale of units
var unitdefault = 1000; // tonnses
var unitfoodcapita = 1; // kg/capita/year
let year_now = 1978; // year of default
let year_get = year_now; 
let foodName_now = 'apples'; // food of default
let foodName_get = foodName_now; 
let selectedCountry = null;
let display_countries_translate_x = 0;
let display_countries_translate_y = 0;

// let input_csvfile_food = "milk";
// let input_csvfile_element = "Production";
// let input_csvfile = input_csvfile_food + ".csv";
let FoodNames_list = ['apples', 'bananas', 'beer', 'bovine_meat', 'cocoa_beans', 'coconut_oil', 'coffee', 'eggs', 'fish_seafood', 'maize', 'milk', 'oats', 'offals_edible', 'oliver_oil', 'pepper', 'pigmeat', 'plantains', 'potatoes', 'rice', 'sorghum', 'sweet_potatoes', 'tea', 'tomatoes', 'wheat'];



function preload() {
  // my table is comma separated value "csv"
  // and has a header specifying the columns labels
  table_apples= loadTable('fooddata/dataprocessed3/apples.csv', 'csv', 'header');
  table_bananas= loadTable('fooddata/dataprocessed3/bananas.csv', 'csv', 'header');
  table_beer= loadTable('fooddata/dataprocessed3/beer.csv', 'csv', 'header');
  table_bovine_meat= loadTable('fooddata/dataprocessed3/bovine_meat.csv', 'csv', 'header');
  table_cocoa_beans= loadTable('fooddata/dataprocessed3/cocoa_beans.csv', 'csv', 'header');
  table_coconut_oil= loadTable('fooddata/dataprocessed3/coconut_oil.csv', 'csv', 'header');
  table_coffee= loadTable('fooddata/dataprocessed3/coffee.csv', 'csv', 'header');
  table_eggs= loadTable('fooddata/dataprocessed3/eggs.csv', 'csv', 'header');
  table_fish_seafood= loadTable('fooddata/dataprocessed3/fish_seafood.csv', 'csv', 'header');
  table_maize= loadTable('fooddata/dataprocessed3/maize.csv', 'csv', 'header');
  table_milk= loadTable('fooddata/dataprocessed3/milk.csv', 'csv', 'header');
  table_oats= loadTable('fooddata/dataprocessed3/oats.csv', 'csv', 'header');
  table_offals_edible= loadTable('fooddata/dataprocessed3/offals_edible.csv', 'csv', 'header');
  table_oliver_oil= loadTable('fooddata/dataprocessed3/oliver_oil.csv', 'csv', 'header');
  table_pepper= loadTable('fooddata/dataprocessed3/pepper.csv', 'csv', 'header');
  table_pigmeat= loadTable('fooddata/dataprocessed3/pigmeat.csv', 'csv', 'header');
  table_plantains= loadTable('fooddata/dataprocessed3/plantains.csv', 'csv', 'header');
  table_potatoes= loadTable('fooddata/dataprocessed3/potatoes.csv', 'csv', 'header');
  table_rice= loadTable('fooddata/dataprocessed3/rice.csv', 'csv', 'header');
  table_sorghum= loadTable('fooddata/dataprocessed3/sorghum.csv', 'csv', 'header');
  table_sweet_potatoes= loadTable('fooddata/dataprocessed3/sweet_potatoes.csv', 'csv', 'header');
  table_tea= loadTable('fooddata/dataprocessed3/tea.csv', 'csv', 'header');
  table_tomatoes= loadTable('fooddata/dataprocessed3/tomatoes.csv', 'csv', 'header');
  table_wheat= loadTable('fooddata/dataprocessed3/wheat.csv', 'csv', 'header');  
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight*1.1);
  background(0, 0, 0, 255*0.8);
  canvas.parent('p5canvas');
  angleMode(DEGREES);

  display_countries_translate_x = windowWidth/13;
  display_countries_translate_y = windowHeight/2+50;

  slider = createSlider(1960, 2019, year_now);
  slider.position(windowWidth/2-250, 655-148);
  slider.style('width', '500px');
  slider.parent('p5canvas');

  sliderscaleadjust = createSlider(0, 2000, CircleSizeScale*100);
  sliderscaleadjust.position(windowWidth/2+140, 20);
  sliderscaleadjust.style('width', '550px');
  sliderscaleadjust.parent('p5canvas');

  // create select box
  sel = createSelect();
  sel.position(windowWidth/2-60,-24);
  sel.id('foodName');
  sel.parent('p5canvas');
  // create select box options
  for(let i=0; i<FoodNames_list.length; i++) {
    sel.option(FoodNames_list[i]);
  }
}

function draw() {
  // createCanvas(windowWidth, windowHeight*1.4);
  clear();
  background(255, 255, 255, 255*0);

  let scale_get = sliderscaleadjust.value();
  CircleSizeScale = map(scale_get, 0, 2000, 0, 20);
  
  draw_mousecircle();

  move_countries_displayposition_bymouseonside(); 

  // draw_triangleforscale(); 

  
  // create countries: 
  year_get = slider.value();
  foodName_get = sel.value();
  countries = [];
  countriessorted = [];
  
  table_foodx = eval('table_' + foodName_get);
  let table_foodx_yearx = table_foodx.matchRows(year_get, 'Year');
  if (table_foodx_yearx.length == 0) {
    console.log('Opp..there is no data');
    let country = new Country(600, -100, "Opp..there is no data", 5000, 5000, 0, 0, 0, 0, 0);
    countriessorted.push(country);
  }
  if (table_foodx_yearx.length > counts) {
    for (let r = 0; r < counts; r++) {
      createCountries(table_foodx_yearx,r); 
    }
  }
  if (table_foodx_yearx.length <= counts) {
    for (let r = 0; r < table_foodx_yearx.length; r++) {
      createCountries(table_foodx_yearx,r); 
    }
  }

  year_now = year_get;
  foodName_now = foodName_get;

  // Show the year now
  push();
  textAlign(CENTER,CENTER);
  fill(0,0,0,255*0.8);
  textSize(36);
  rectMode(CENTER);
  text (year_get, windowWidth/2+310, 655-139);
  pop ();

  // Show the unit
  let unitnow = unitdefault/CircleSizeScale;
  let unitfoodcapitanow =unitfoodcapita/CircleSizeScale/20;
  push();
  textAlign(LEFT,TOP);
  fill(0,0,0);
  textSize(10);
  rectMode(CENTER);
  text("Unit of Food Production, Domestic Supply Quantity, Food Used for Processing and Food Used for Food is: "+unitnow+" tonnes",windowWidth/2+280,55,300);
  text("Unit of Food Supply Quantity is: "+unitfoodcapitanow+" kg/capita/year",windowWidth/2+280+310,55,300);
  pop();

  // sort countries
  if (countriessorted.length != 1) {
    countriessorted = sortx(countries);

    t = 0;
    let x = t+move;
    let y = Ascale*sin(360/T*t);
  
    for (let i = 0; i<countriessorted.length; i++) {
      t = tdelta*(countriessorted[i].seq-1);
      x = t+move;
      y = Ascale*sin(360/T*t);
      countriessorted[i].x = x;
      countriessorted[i].y = y;
    }
  }
  
  if_mouseon(); 

  // draw countries
  push();
  translate(display_countries_translate_x, display_countries_translate_y);
  if (selectedCountry != null) {
    if (selectedCountry.selected) {
      push();
      fill(71,165,119,50);
      noStroke();
      circle(selectedCountry.x+move+15-movewhenclick, selectedCountry.y, sqrt(selectedCountry.domsly*CircleSizeScale)+100);
      pop();
    } 
  }

  if (countriessorted.length > counts) {
    for (let i = 0; i < counts; i++) {
      countriessorted[i].display();
    }
  }
  else {
    for (let i = 0; i < countriessorted.length; i++) {
      countriessorted[i].display();
    }
  }
  pop();

  drawtooltip_if_mouseon(); 

  drawlegend();

  
  // noLoop();
}

function mousePressed() {
  console.log(selectedCountry);
  
  for (let i = 0; i < countriessorted.length; i++) {
    if (countriessorted[i].contains(mouseX-display_countries_translate_x, mouseY-display_countries_translate_y)) {
      console.log(countriessorted[i]);
      movewhenclick = move;

      if (selectedCountry == null) {
        selectedCountry = countriessorted[i];
        selectedCountry.select();
        console.log('select');
      }
      else if (selectedCountry.getName() != countriessorted[i].getName()) {
        selectedCountry.deselect();
        // selectedCountry = null;
        selectedCountry = countriessorted[i];
        selectedCountry.select();
        console.log('select2');
      }
      else if (selectedCountry.getName() == countriessorted[i].getName()) {
        if (selectedCountry.selected) {
          selectedCountry.deselect();
          // selectedCountry = null;
          console.log('deselect and clear');
        } else {
          selectedCountry = null;
          selectedCountry = countriessorted[i];
          selectedCountry.select();
          console.log('reset');
        }
      }
    }
  }
  if (selectedCountry != null) {
    if (selectedCountry.selected) {
      console.log("yesyes");
      console.log (selectedCountry.selected);
    } else {
      console.log("nono");
      console.log (selectedCountry.selected);
    }
  }
}

function draw_mousecircle() {
  // 使用鼠标的位置来设置圆的位置
  push();
  fill(255, 255, 255,30); 
  noStroke(); // 不绘制边框
  ellipse(mouseX, mouseY, CircleSizeScale*20, CircleSizeScale*20); // 在鼠标的位置画一个直径为50的圆
  pop();
}

function move_countries_displayposition_bymouseonside() {
  // 如果鼠标接近屏幕右侧，内容向左移动
  if (mouseX > width * 0.80 && mouseY > height*0.2 && mouseY < windowHeight*1) {
    move -= 3;
  }
  // 如果鼠标接近屏幕左侧，内容向右移动
  if (mouseX < width * 0.20 && mouseY > height*0.2 && mouseY < windowHeight*1) {
    move += 3;
  }

  if (mouseX > width * 0.90 && mouseY > height*0.2 && mouseY < windowHeight*1) {
    move -= 7;
  }
  // 如果鼠标接近屏幕左侧，内容向右移动
  if (mouseX < width * 0.10 && mouseY > height*0.2 && mouseY < windowHeight*1) {
    move += 7;
  }
}

// set to default size scale of circles: 
function doubleClicked() {
  CircleSizeScale = 1;
  sliderscaleadjust.value(100);
}

function createCountries(table_foodx_yearx_countires, countryx) {
  let name = table_foodx_yearx_countires[countryx].getString('CountryorArea');
  var ifcellempty = table_foodx_yearx_countires[countryx].getString('Production');
  var production = ifcellempty ? table_foodx_yearx_countires[countryx].getNum('Production') : 0;
  var ifcellempty = table_foodx_yearx_countires[countryx].getString('Domestic supply quantity');
  var domsly = ifcellempty ? table_foodx_yearx_countires[countryx].getNum('Domestic supply quantity') : 0;
  var ifcellempty = table_foodx_yearx_countires[countryx].getString('Food');
  var food = ifcellempty ? table_foodx_yearx_countires[countryx].getNum('Food') : 0;
  var ifcellempty = table_foodx_yearx_countires[countryx].getString('Food supply quantity (kg/capita/yr)');
  var foodcapita = ifcellempty ? table_foodx_yearx_countires[countryx].getNum('Food supply quantity (kg/capita/yr)') : 0;
  var ifcellempty = table_foodx_yearx_countires[countryx].getString('Processing');
  var processing = ifcellempty ? table_foodx_yearx_countires[countryx].getNum('Processing') : 0;
  var rank = countryx+1; 
  let seq = countryx+1; 
  let x = 0;
  let y = 0;

  // let x = t+move;
  // let y = Ascale*sin(360/T*t);

  if (selectedCountry != null && selectedCountry.selected) {
    if (seq > selectedCountry.seq-1 && name != selectedCountry.name) {
      seq +=1;
    }

    if (name == selectedCountry.name) {
      seq = selectedCountry.seq;
    }

    // if (rank == selectedCountry.rank && name != selectedCountry.name) {
    //   // t += tdelta;
    //   // x = t+move;
    //   // y = Ascale*sin(360/T*t);
    // }

    // if (name == selectedCountry.name) {
    //   x = selectedCountry.x+move-movewhenclick;
    //   y = selectedCountry.y;
    // }
  }
  // Create new instance of country
  let country = new Country(x, y, name, production, domsly, food, foodcapita, processing, rank, seq);

  // Create a list of country objects
  countries.push(country);

  // t += tdelta;
}

function drawlegend() {
  push();
  let x = 60;
  let y = 40;
  let name = 'Example Country';
  let production = 2500;
  let domsly = 2500; 
  let food = domsly *0.7;
  let processing = domsly *0.3;
  let foodcapita = 18; 
  countryexample = new Country (x, y, name, production, domsly, food, foodcapita, processing);
  countryexample.displaylegend();
  pop();
}

function if_mouseon() {
  for (let i = 0; i < countriessorted.length; i++) {
    if (countriessorted[i].contains(mouseX-display_countries_translate_x, mouseY-display_countries_translate_y)) {
      countriessorted[i].hightlight(); 
    }
  }
}

function drawtooltip_if_mouseon() {
  for (let i = 0; i < countriessorted.length; i++) {
    if (countriessorted[i].if_hightlight) {
      countriessorted[i].draw_tooltip(); 
    }
  }
}

function sortx(list) {
  let sortedlist = [];
  for (let i=1; i < list.length+1; i++) {
    for (let x = 0; x < list.length; x++) {
      if (list[x].seq == i) {
        sortedlist.push(list[x]);
      }
    }
  }
  return sortedlist;
}


// old version of adjusting size of circles: 

// function draw_triangleforscale() {
//   // triangle: 
//   push();
//   noStroke();
//   fill(255, 255, 255,50); 
//   // (righttop,Start,rightbtm);
//   let triangleStartX = windowWidth*0.7-120;
//   let triangleStartY = windowHeight*0.05;
//   let triangleSide12X = triangleStartX+500;
//   let triangleSide1Y = triangleStartY;
//   let triangleSide2Y = triangleStartY +30;  
//   triangle(triangleSide12X , triangleSide1Y, triangleStartX, triangleStartY, triangleSide12X , triangleSide2Y); 
//   pop();
// }

// function mousePressed() {
//   // 当鼠标按下时，记录y坐标
//   startX = mouseX;
// }

// function mouseDragged() {
//   draggedDistance = mouseX - startX;
//   // 使用鼠标的垂直位置来调整大小
//   if (mouseX > width*0.7 && mouseY < height*0.3) {
//     CircleSizeScale = map(draggedDistance, 0, 200, 0, 10);
//   }
// }
