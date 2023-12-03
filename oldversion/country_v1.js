
class Country {
    constructor(x, y, name, production) {
      this.x = x;
      this.y = y;
      this.name = name;
      this.production = production;

    }

    display(){
      // let circleSize = map(this.production,1000,8500000,20,500);
      let circleSize = sqrt(this.production)*CircleSizeScale;
      // 计算气泡的位置，根据螺旋的角度和半径
      // this.x = t;
      // this.y = Ascale*sin(360/T*this.x);
      // t += tdelta;
      push();
      stroke('black');
      fill(255, 255, 255, 150);
      circle(this.x, this.y, circleSize);
      pop();
      push ();
      textAlign(CENTER,CENTER);
      fill("orange");
      textSize(11);
      rectMode(CENTER);
      // text(this.name + '\n' + this.production +'Production', this.x, this.y);
      text(this.name, this.x, this.y, 120);
      pop ();
    }
}