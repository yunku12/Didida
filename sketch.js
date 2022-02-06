let data;
let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRAJzSZF_ucL_xSIjc8-pRxdDVbwF-40EjgGfa3D_Y47csUndfX__85Lwb7CTZoth_WpDEZnW2bpxLe/pub?gid=415352174&single=true&output=csv";

let font;
let fontsize;
let p,h;
let numRows, Gomin;
var Texts = [];
let rs;


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
  frameRate(30);

  textAlign(CENTER, CENTER);

    if(data){
    numRows = data.getRowCount();
    Gomin = data.getColumn('WhatisyourGOMIN');
      for (let i=0; i<numRows; i++) {
    Texts.push(new Animation());
     }
    }

}


function mousePressed() {
 redraw();
}

//-----------------------------------------------------------------
// Our main program loop
function draw() {
  // put code here
  background('black');
  textAlign(LEFT);
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
    //Texts[i].collide();
    Texts[i].move(p);
    Texts[i].display(p);

    //Texts[i].line(p);
    Texts[i].fontanim();
   }
}


function Animation(p) {
  this.x = random(0,width-200);
  this.y = random(100,height-100);
  let words = [BOLD, NORMAL, ITALIC, BOLDITALIC];
  this.rs = random(words);
  this.speed = 1;
  this.vx = 0;
  this.vy = 0;
  this.diameter = 40;
  this.id = numRows;
  this.spring = 0;
  this.gravity = random(-0.01,0.01);
  this.gravity2 = random(0.0001,0.001);
  this.friction = 0.9;
  this.friction2 = -1;
  this.fontsize = random(20,50);
  this.fontopasity = random(100,255);
  this.bright = 0.1;
  this.big = 0.01;
  this.random = random(1,10);
  //this.randomop = random(0.01,0.1);



  this.move = function(p) {
    this.t = p;
    this.tw = textWidth(this.t);

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

    if (this.x > width + this.tw/2 +10) {
      this.x = 0 - this.tw/2 -10;
      this.vx *= this.friction;
    } else if (this.x <= 0 - this.tw/2 -10) {
      this.x = width + this.tw/2 +10;
      this.vx *= this.friction;
    }
    if (this.y + this.fontsize / 2 > height) {
      this.y = height - this.fontsize / 2;
      this.vy *= this.friction2;
    } else if (this.y - this.fontsize / 2 < 0) {
      this.y = this.fontsize / 2;
      this.vy *= this.friction2;
    }
  };

  this.line = function(p) {
    this.t = p;
    this.tw = textWidth(this.t);
    this.linecolor = 0;

    const blink = map(millis() % 2000, 0, 300, this.newopasity, 0);
    stroke(255,blink);
    strokeCap(SQUARE);
    strokeWeight(3);
    line(this.x + this.tw/2+10, this.y-this.fontsize/2,
      this.tw/2 + this.x+10, this.y+this.fontsize/2);

      //noStroke();
    // stroke(255,this.newopasity/2);
    // fill(0,this.rectopasity);
    // this.stw = map(this.fontsize,20,50,1,3);
    // //strokeWeight(this.stw);
    // rect(this.x-this.tw/2-30,this.y-this.fontsize/2-20,
    //     this.tw+60,this.fontsize+40,this.fontsize/2);
    // noStroke();
    //fill(300,this.newopasity);
    // textSize(this.fontsize);
    //


  };

  this.display = function(p) {

    this.t = p;
    //this.newt = splitTokens(this.t, '\n');
    noStroke();
    //fill(300,this.newopasity);
    textSize(this.fontsize);
    fill(300,this.newopasity);
    textStyle(this.rs);
    text(this.t, this.x, this.y);

  };

  this.fontanim = function() {
    this.rectopasity = map(this.fontsize,20,50,100,230);
    this.newopasity = map(this.fontsize,20,50,0,255);
    this.fontsize += this.big;
    this.newopasity += this.bright*10;
    this.rectopasity += this.bright*10;
    if (this.fontsize > 50 ) {
      this.big = -0.01;
      this.bright = -0.1;
    } else if (this.fontsize < 20) {
      this.big = 0.01;
      this.bright = 0.1;
    }


    // if (this.fontopasity > 255) {
    //   this.bright = -(this.randomop);
    // } else if (this.fontopasity < 10) {
    //   this.bright = this.randomop;
    // }
  };

}
