var socket = io.connect(window.location.origin);

var img,img1,img2,img3,img4; //Images
var rot = 1; //Rotation factor
var show = false; //Toggle threshold
var horz = true; //Flip sizing
var curr = 1; //Current displayed image
var t = 0.35; //Threshold 0-1

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
}


function draw() {
   background(0);
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