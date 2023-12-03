
class Country {
    constructor(x, y, name, production) {
      this.x = x;
      this.y = y;
      this.name = name;
      this.production = production;

    }

    display(){
      var scale = 1;
      // let circleSize = map(this.production,1000,8500000,20,500);
      let circleSize = sqrt(this.production);
      // 计算气泡的位置，根据螺旋的角度和半径
      let r = scale*plotradius*angle;
      this.x = r*cos(angle);
      this.y = r*sin(angle);
      angle += angledelta;
      push();
      stroke('black');
      circle(this.x, this.y, circleSize);
      pop();
      push ();
      textAlign(CENTER,CENTER);
      fill("orange");
      textSize(11);
      // text(this.name + '\n' + this.production +'Production', this.x, this.y);
      text(this.name, this.x, this.y);
      pop ();
    }
}