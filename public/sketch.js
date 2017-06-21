var socket = io.connect(window.location.origin);

var img,img1,img2,img3,img4; //Images
var offset_x, offset_y; //Window Offset
var rot = 1; //Rotation factor
var show = false; //Toggle threshold
var horz = true; //Flip sizing
var curr = 1; //Current displayed image
var t = 0.35; //Threshold 0-1
var a,d; //Objects
var posx, posy, c = false, t = false, b = false, r = false, l = false; //Move place holders

function preload() {
   img1 = loadImage("img/stair1.JPG", (err) => {
      console.log(err);
   });
   img2 = loadImage("img/stair2.JPG", (err) => {
      console.log(err);
   });
   img3 = loadImage("img/stair3.JPG", (err) => {
      console.log(err);
   });
   img4 = loadImage("img/stair4.JPG", (err) => {
      console.log(err);
   });
   
}

function setup() {
   var ratio = windowHeight * 0.75;
   var cnv = createCanvas(ratio * 0.75, ratio); //4:3
   var x = (windowWidth - width) / 2;
   var y = (windowHeight - height) / 2;
   //cnv.position(x, y);
   background(0,0,0);
   cnv.parent("canvas");
   img = img1;
   loadPixels();
   a = new IntBox();
   offset_y = windowHeight * 0.06;
   offset_x = 0;
}


function draw() {
   background(0);
   line(0,height / 2,width,height / 2);
   push();
   translate(width/2, height/2);
   rotate(rot*PI/2);
   if(horz) {
      image(img,-height/2,-width/2,height,width);
   } else {
      image(img,-height/2,-width/2,width,height);
   }
   
   if(show) {
      filter(THRESHOLD, t);
   }
   pop();
   a.display();
}

function mousePressed() {
      var tt,bt,rt,lt;
      var mx = pmouseX,my = pmouseY-offset_y;
      console.log(mx,my);

      if(a.activated) {
            tt = a.top();
            bt = a.bottom();
            rt = a.right();
            lt = a.left();
            if(a.check()) {
                  posx = mx;
                  posy = my;
                  a.calc();
                  c = true;
            } else if(mx >= tt.x - tt.r && mx <= tt.x + tt.r && my >= tt.y - tt.r && my <= tt.y + tt.r) { //Top
                  posx = mx;
                  posy = my;
                  a.calc();
                  t = true;
            } else if(mx >= bt.x - bt.r && mx <= bt.x + bt.r && my >= bt.y - bt.r && my <= bt.y + bt.r) { //Bottom
                  posx = mx;
                  posy = my;
                  a.calc();
                  b = true;
            } else if(mx >= rt.x - rt.r && mx <= rt.x + rt.r && my >= rt.y - rt.r && my <= rt.y + rt.r) { //Right
                  posx = mx;
                  posy = my;
                  a.calc();
                  r = true;
            } else if(mx >= lt.x - lt.r && mx <= lt.x + lt.r && my >= lt.y - lt.r && my <= lt.y + lt.r) { //Left
                  posx = mx;
                  posy = my;
                  a.calc();
                  l = true;
            }
      }
      

      return false;
}

function mouseReleased() {
      c = false;
      t = false;
      b = false;
      r = false;
      l = false;

      return false;
}

function mouseDragged() {
      
      if(c) {
            a.move();
      } else if(t) {

      } else if(b) {
            
      } else if(r) {
            
      } else if(l) {
            
      }

      return false;
}



//=============== Functions =================

function rotateA() {
   rot++;
}

function selectA() {
   show = !show;
   t = select('#threshold').value();
   console.log(t);
   if(!t) {
      t = 0.35;
   }
}

function change() {
   curr++;
   switch(curr) {
      case 1:
         img = img1;
         loadPixels();
         break;
      case 2:
         img = img2;
         loadPixels();
         break;
      case 3:
         img = img3;
         loadPixels();
         break;
      case 4:
         img = img4;
         loadPixels();
         break;
      case 5:
         img = img1;
         loadPixels();
         curr = 1;
         break;
   }
}

function flip() {
   horz = !horz;
}

function IntBox() {
      this.x = width / 2;
      this.y = height / 2;
      this.w = 50;
      this.h = this.w * 54 / 86;
      this.activated = true;
      this.dx = 0;
      this.dy = 0;
      this.r = width / 25;

      this.display = function() {
            rect(this.x,this.y,this.w,this.h);
            if(this.activated) {
                  ellipse(this.x+this.w / 2,this.y-this.r,this.r); //Top
                  ellipse(this.x+this.w / 2,this.y+this.r+this.h,this.r); //Bottom
                  ellipse(this.x+this.w+this.r,this.y+this.h / 2,this.r); //Right
                  ellipse(this.x-this.r,this.y+this.h / 2,this.r); //Left
            }
            

      }

      this.check = function() {
            console.log(this.x,this.x+this.w,this.y,this.y+this.h);
            if(pmouseX-offset_x >= this.x && pmouseX-offset_x <= this.x + this.w && pmouseY-offset_y >= this.y && pmouseY-offset_y <= this.y + this.h) {
                 
                 return true;
            //} else if() {

            } else {
                  return false;
            }
      }

      this.calc = function() {
            this.dx = posx - this.x;
            this.dy = posy - this.y;
      }

      this.move = function() {
            this.x = pmouseX - this.dx;
            this.y = pmouseY - offset_y - this.dy;
      }

      this.reratio = function() {
            this.x = pmouseX - this.dx;
            this.y = pmouseY - offset_y - this.dy;
            this.w = pmouseX - this.dx;
            this.h = pmouseY - offset_y - this.dy;
      }

      this.top = function() {
            var tx, ty;

            tx = this.x+this.w / 2;
            ty = this.y-this.r;

            return {
                  x:tx,
                  y:ty,
                  r:this.r
            };
      }

      this.bottom = function() {
            var tx, ty;
            
            tx = this.x+this.w / 2;
            ty = this.y+this.r+this.h;

            return {
                  x:tx,
                  y:ty,
                  r:this.r
            };
      }

      this.right = function() {
            var tx, ty;
            
            tx = this.x+this.w+this.r;
            ty = this.y+this.h / 2;

            return {
                  x:tx,
                  y:ty,
                  r:this.r
            };
      }

      this.left = function() {
            var tx, ty;
            
            tx = this.x-this.r;
            ty = this.y+this.h / 2;

            return {
                  x:tx,
                  y:ty,
                  r:this.r
            };
      }
}

// function ReTouch() {
//       this.x = width / 2;
//       this.y = height / 2;
//       this.r = width / 20;
//       this.dir = null;


// }