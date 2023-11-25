// arc: https://vimsky.com/examples/usage/p5-js-arc-function.html

class Country {
    constructor(x, y, Name, Production, Domsly, Food, FoodCapita, Processing) {
      this.x = x;
      this.y = y;
      this.name = Name;
      this.production = Production || 0;
      this.domsly = Domsly || 0;
      this.food = Food || 0;
      this.processing = Processing || 0;
      this.foodcapita = FoodCapita || 0;
    }

    getName(){
      return this.name;
    }

    display(){
      // circleSize_production: 
      // let circleSize_production = map(this.production,1000,8500000,20,500);
      let circleSize_production = sqrt(this.production*CircleSizeScale);
      push();
      fill(242,206,62,230);
      noStroke();
      circle(this.x+10, this.y+10, circleSize_production);
      pop();

      // circleSize_domsly: 
      let circleSize_domsly = sqrt(this.domsly*CircleSizeScale);
      push();
      fill(71,165,119,180);
      noStroke();
      circle(this.x, this.y, circleSize_domsly);
      pop();

      // arcAngle_food: 
      let arcAngle_food = map(this.food, 0, this.domsly, 0, 360);
      push();
      strokeWeight(5);
      stroke(252,103,49,230);
      fill(0, 0, 0, 0);
      arc(this.x, this.y, circleSize_domsly, circleSize_domsly, 0, arcAngle_food, OPEN);
      pop();

      // arcAngle_processing: 
      let arcAngle_processing = map(this.processing, 0, this.domsly, 0, 360);
      push();
      strokeWeight(5);
      stroke(0,255,130,230);
      fill(0, 0, 0, 0);
      arc(this.x, this.y, circleSize_domsly, circleSize_domsly, arcAngle_food, arcAngle_food + arcAngle_processing, OPEN);
      pop();

      // draw the country circle: 
      push();
      textAlign(CENTER,CENTER);
      fill(250,250,250);
      textSize(14);
      rectMode(CENTER);
      // text(this.name + '\n' + this.production +'Production', this.x, this.y);
      text(this.name, this.x+50, this.y+50, 150);
      pop ();
      
    }
}