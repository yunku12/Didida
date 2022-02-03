let data;
let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRAJzSZF_ucL_xSIjc8-pRxdDVbwF-40EjgGfa3D_Y47csUndfX__85Lwb7CTZoth_WpDEZnW2bpxLe/pub?gid=415352174&single=true&output=csv";

let font;
let fontsize;
let p,h;
let numRows, Gomin;
var Texts = [];
let textwidth;


function preload() {
  // Ensure the .ttf or .otf font stored in the assets directory
  // is loaded before setup() and draw() are called
  font = loadFont('assets/SourceSansPro-Regular.otf');
}

function preload() {
  data = loadTable(url, 'csv', 'header');

}

//-----------------------------------------------------------------
// This runs once in the beginning
function setup() {
  createCanvas(windowWidth, windowHeight);


  textAlign(CENTER, CENTER);

    if(data){
    numRows = data.getRowCount();
    Gomin = data.getColumn('WhatisyourGOMIN');
      for (let i=0; i<numRows; i++) {
    Texts.push(new Animation());
     }
    }

}


//-----------------------------------------------------------------
// Our main program loop
function draw() {
  // put code here
  background('black');
  textAlign(CENTER);
  //frameRate(1);
  //typeWriter(p, 0, width/2, h/2, 100);

    // print(numRows);
    // print(Gomin);

 for (let i=0; i < numRows; i++) {
    let row = data.getRow(i);
    p = row.getString('WhatisyourGOMIN');
    // textwidth = textWidth(p);

    //print(Texts);
    //text(p, width/2, h/2);
    Texts[i].collide();
    Texts[i].move();
    Texts[i].display(p);
    Texts[i].fontanim();
   }

}


function Animation() {
  this.x = random(width);
  this.y = random(height);
  this.speed = 1;
  this.vx = 0;
  this.vy = 0;
  this.diameter = 40;
  this.id = numRows;
  this.spring = 0;
  this.gravity = random(-0.01,0.01);
  this.gravity2 = random(0.0001,0.001);
  this.friction = -1;
  this.fontsize = random(20,50);
  this.fontopasity = random(10,300);
  this.bright = 0.1;
  this.big = 0.1;
  this.random = random(1,10);
  this.randomop = random(0.01,0.1);



this.collide = function() {
    for (let i = this.id + 1; i < this.id; i++) {
      // console.log(others[i]);
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter / 2 + this.diameter / 2;
      //   console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * this.spring;
        let ay = (targetY - this.others[i].y) * this.spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  };

  this.move = function() {

    if(this.random > 5) {
      this.vx += this.gravity2;
      this.vy += this.gravity2;
    } else if (this.random <= 5) {
      this.gravity2 * -1;
      this.vx -= this.gravity2;
      this.vy -= this.gravity2;
    }

    this.x += this.vx;
    this.y += this.vy;

    if (this.x + this.textwidth > width) {
      this.x = width - this.textwidth;
      this.vx *= this.friction;
    } else if (this.x - this.textwidth < 0) {
      this.x = this.textwidth;
      this.vx *= this.friction;
    }
    if (this.y + this.fontsize / 2 > height) {
      this.y = height - this.fontsize / 2;
      this.vy *= this.friction;
    } else if (this.y - this.fontsize / 2 < 0) {
      this.y = this.fontsize / 2;
      this.vy *= this.friction;
    }
  };



  this.display = function(p) {

    this.t = p;

    fill(300,this.fontopasity);
    textSize(this.fontsize);
    noStroke();
    text(this.t, this.x, this.y);
    stroke(300);
    strokeWeight(3);
    this.tw = textWidth(this.t);
    line(this.x + this.tw/2+10, this.y-this.fontsize/2,
      this.tw/2 + this.x+10, this.y+this.fontsize/2);
  };

  this.fontanim = function() {

    this.fontsize += this.big;
    if (this.fontsize > 50 ) {
      this.big = -0.1;
    } else if (this.fontsize < 20) {
      this.big = 0.1;
    }

    this.fontopasity += this.bright*10;
    if (this.fontopasity > 300) {
      this.bright = -(this.randomop);
    } else if (this.fontopasity < 10) {
      this.bright = this.randomop;
    }

  };


}
