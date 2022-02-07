let data;
let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQdEm098t17R9Lo2gZ6B79D3ZLyFhaFzYnc5raBnnaUePmRNxuYLGg2HJHkrvtbdMhNju0N34wBM2Uh/pub?gid=1258603964&single=true&output=csv";

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

    Texts[i].display(p);

    Texts[i].line(p);
    Texts[i].fontanim(p);
    Texts[i].move(p);
   }
}


function Animation(p) {
  this.x = random(200,width-200);
  this.y = random(100,height-100);

  //this.x = 300;
  //this.y = 100;
  let words = [BOLD, NORMAL];
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
  this.fontsize = random(10,40);
  this.fontopasity = random(0,255);
  this.bright = 0.1;
  this.big = 0.01;
  this.random = random(1,10);
  this.cut = 0;
  this.fontcolor = 255;
  //this.tw = 0;
  //this.randomop = random(0.01,0.1);



  this.move = function(p) {
    this.t = p;
    //this.tw = textWidth(this.t);

    if(this.random > 5) {
      this.vx += this.gravity2;
      this.vy += this.gravity2;
      // this.big = 0.01;
    } else if (this.random <= 5) {
      this.gravity2 * -1;
      this.vx -= this.gravity2;
      this.vy -= this.gravity2;
      // this.big = -0.01;
    }

    this.x += this.vx;
    this.y += this.vy;

    if (this.x > width + this.trw+this.fontsize*2-10) {
      this.x = 0 - this.trw+this.fontsize*2;
      this.vx *= this.friction;
    } else if (this.x <= 0 - this.trw+this.fontsize*2) {
      this.x = width + this.trw+this.fontsize*2 +10;
      this.vx *= this.friction;
    }
    if (this.y> height+this.rectheight+this.fontsize*3) {
      //this.y = height - (this.rectheight+this.fontsize*3)/2;
      this.vy *= this.friction2;
    } else if (this.y < 0-this.rectheight+this.fontsize*3) {
      //this.y = (this.rectheight+this.fontsize*3)/2;
      this.vy *= this.friction2;
    }

  };

  this.line = function(p) {
    this.t = p;
    this.linecolor = 0;
    this.ntw = textWidth(this.t);
    this.nntw = this.ntw/this.fontsize;

    if (this.nntw <= 10){
      this.cut = 1;
      //this.fontcolor = 255;
    }else if (this.nntw < 25){
      this.cut = 2;
      //this.fontcolor = 0;
      //this.fontsize = 10;
    } else if (this.nntw < 50) {
      this.cut = 3;
      //this.fontcolor = 150;
      //this.fontsize = 50;
    };

    //this.cut = map(this.nntw,0,50,1,5);
    this.trw = this.ntw/this.cut;
    // const blink = map(millis() % 2000, 0, 300, this.newopasity, 0);
    // stroke(255,blink);
    // strokeCap(SQUARE);
    // strokeWeight(3);
    // line(this.x + this.tw/2+10, this.y-this.fontsize/2,
    //   this.tw/2 + this.x+10, this.y+this.fontsize/2);

    noStroke();
    stroke(255, this.newopasity-10);
    fill(0,this.rectopasity);
    this.stw = map(this.fontsize,20,50,1,3);
    strokeWeight(this.stw);
    rectMode(CENTER)
    rect(this.x,this.y+this.rectheight/2-this.fontsize/this.cut,
        this.trw+40*2,this.rectheight+40*this.cut,
        this.fontsize/2);
    noStroke();
    fill(this.fontcolor,255,255,this.newopasity);
    textSize(this.fontsize);

    textStyle(this.rs);
    text(this.t, this.x, this.y,this.trw+15);


  };

  this.display = function(p) {
    this.t = p;
    //textWrap(CHAR);
    //this.ntw = textWidth(this.t);
    //this.trw = this.ntw/3;
    //this.tl = this.t.length;
    this.rectheight = (this.cut+1)*this.fontsize;
    //this.newt = splitTokens(this.t, '\n');
    noStroke();
    //fill(300,this.newopasity);
    textSize(this.fontsize);


  };

  this.fontanim = function() {
    this.rectopasity = map(this.fontsize,20,40,100,200);
    this.newopasity = map(this.fontsize,20,40,50,255);
    this.fontsize += this.big;
    this.newopasity += this.bright;
    this.rectopasity += this.bright;
    if (this.fontsize > 40 ) {
      this.big = -0.01;
      this.bright = -0.01;
    } else if (this.fontsize <= 10) {
      this.big = 0.01;
      this.bright = 0.01;
    }


    // if (this.fontopasity > 255) {
    //   this.bright = -(this.randomop);
    // } else if (this.fontopasity < 10) {
    //   this.bright = this.randomop;
    // }
  };

}
