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
var CircleSizeScale = 1.5;
let year_now = 1978;
let foodName_now = 'apples';
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
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  slider = createSlider(1973, 2019, year_now);
  slider.position(windowWidth/2-250, 4/5*windowHeight);
  slider.style('width', '500px');

  // create select box
  sel = createSelect();
  sel.position(windowWidth/2-50,windowHeight/64*9);
  sel.id('foodName');
  // create select box options
  for(let i=0; i<FoodNames_list.length; i++) {
    sel.option(FoodNames_list[i]);
  }

  creatCountries();
}

function draw() {
  createCanvas(windowWidth, windowHeight);
  background(26,26,26);

  let year_get = slider.value();
  let foodName_get = sel.value();
  
  if (year_get != year_now) {
    text("Changing",120,120);
    creatCountries();
  } 
  else {
    if (foodName_now != foodName_get) {
      creatCountries();
    }
    else {
      text("Nochange",120,120);
    }
    text("Nochange",120,120);
  }

  push();
  textAlign(CENTER,CENTER);
  fill(250,250,250);
  textSize(36);
  rectMode(CENTER);
  text (year_get, windowWidth/2, windowHeight/15);
  pop ();

  translate(windowWidth/13, windowHeight/2);
  if (countries.length > counts) {
    for (let i = 0; i < counts; i++) {
      countries[i].display();
    }
  }
  else {
    for (let i = 0; i < countries.length; i++) {
      countries[i].display();
    }
  }
  // noLoop();
}

function creatCountries() {
  let year_get = slider.value();
  let foodName_get = sel.value();

  countries = [];
  t = 0;
  
  tablex = eval('table_' + foodName_get);
  let table2 = tablex.matchRows(year_get, 'Year');
  if (table2.length == 0) {
    console.log('Opp..there is no data');
    let country = new Country(600, -100, "Opp..there is no data", 5000, 5000, 0, 0, 0);
    countries.push(country);
  }
  else{
    for (let r = 0; r < counts; r++) {
      let name = table2[r].getString('CountryorArea');
      var ifcellempty = table2[r].getString('Production');
      var production = ifcellempty ? table2[r].getNum('Production') : 0;
      var ifcellempty = table2[r].getString('Domestic supply quantity');
      var domsly = ifcellempty ? table2[r].getNum('Domestic supply quantity') : 0;
      var ifcellempty = table2[r].getString('Food');
      var food = ifcellempty ? table2[r].getNum('Food') : 0;
      var ifcellempty = table2[r].getString('Food supply quantity (kg/capita/yr)');
      var foodcapita = ifcellempty ? table2[r].getNum('Food supply quantity (kg/capita/yr)') : 0;
      var ifcellempty = table2[r].getString('Processing');
      var processing = ifcellempty ? table2[r].getNum('Processing') : 0;
  
      let x = t;
      let y = Ascale*sin(360/T*t);
  
      // Create new instance of country
      let country = new Country(x, y, name, production, domsly, food, foodcapita, processing);
  
      // Create a list of country objects
      countries.push(country);
      t += tdelta;
    }
  }
  year_now = year_get;
  foodName_now = foodName_get;
}