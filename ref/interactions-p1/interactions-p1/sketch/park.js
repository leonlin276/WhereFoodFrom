
class Park {
    constructor(x, y, name, acres) {
      this.x = x;
      this.y = y;
      this.name = name;
      this.acres = acres;
    }

    display(){
      let circleSize = map(this.acres,1000,8500000,20,500);
      circle(this.x, this.y, circleSize);
      text(this.name + '\n' + this.acres +' Acres' , this.x, this.y + 30);
    }
}