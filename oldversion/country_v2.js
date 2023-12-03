// arc: https://vimsky.com/examples/usage/p5-js-arc-function.html

class Country {
    constructor(x, y, name, processing, food, domsly, production, foodcapita) {
      this.x = x;
      this.y = y;
      this.name = name;
      this.processing = processing || 0;
      this.food = food || 0;
      this.domsly = domsly || 0;
      this.production = production || 0;
      this.foodcapita = foodcapita || 0;
    }

    display(){

      // 计算气泡的位置，根据螺旋的角度和半径
      // this.x = t;
      // this.y = Ascale*sin(360/T*this.x);
      // t += tdelta;

      // draw the country circle: 
      push();
      textAlign(CENTER,CENTER);
      fill("orange");
      textSize(11);
      rectMode(CENTER);
      // text(this.name + '\n' + this.production +'Production', this.x, this.y);
      text(this.name, this.x, this.y, 120);
      pop ();

      // circleSize_production: 
      // let circleSize_production = map(this.production,1000,8500000,20,500);
      let circleSize_production = sqrt(this.production)*CircleSizeScale;
      push();
      fill(10, 10, 10, 150);
      circle(this.x, this.y, circleSize_production);
      pop();

      // circleSize_domsly: 
      let circleSize_domsly = sqrt(this.domsly)*CircleSizeScale;
      push();
      fill(0, 0, 0, 100);
      circle(this.x, this.y, circleSize_domsly);
      pop();

      // arcAngle_food: 
      let arcAngle_food = map(this.food, 0, this.domsly, 0, 360);
      push();
      strokeWeight(20);
      stroke('green');
      arc(this.x, this.y, circleSize_domsly, circleSize_domsly, 0, arcAngle_food, OPEN);
      pop();

      // arcAngle_processing: 
      let arcAngle_processing = map(this.processing, 0, this.domsly, 0, 360);
      push();
      strokeWeight(20);
      stroke('yellow');
      arc(this.x, this.y, circleSize_domsly, circleSize_domsly, arcAngle_food, arcAngle_food + arcAngle_processing, OPEN);
      pop();
    }
}