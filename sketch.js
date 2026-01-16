let table;
let phrases = [];
let state = 0;
let currentPhrase = "";

let counter = 0;

let paperWidth = 600;
let paperHeight = 200;
let paperY, paperX;

let imgWhole, imgLeft, imgRight;

let crackSound;

function preload() {
  table = loadTable("assets/phrases.csv", "csv", "header");

  imgWhole = loadImage('assets/cookie_whole.png');
  imgLeft = loadImage('assets/cookie_left.png');
  imgRight = loadImage('assets/cookie_right.png');

  soundFormats('mp3', 'ogg');
  crackSound = loadSound('/assets/crackSound.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  fill(255, 200, 0);
  noStroke();

  textFont("Comic Sans MS");
  textAlign(CENTER, CENTER);

  rectMode(CENTER);
  ellipseMode(CENTER);

  imageMode(CENTER);

  for (let r = 0; r < table.getRowCount(); r++) {
    let frase = table.getString(r, "frase");
    if (frase && frase.length > 0) {
      phrases.push(frase);
    }
  }

  paperY = height / 2;
  paperX = width / 2;
}

function draw() {
  background(0, 0, 255);

  textSize(48);
  text("ACCookie", width/2, height/2 -350);

  if (state === 0) {
    //fill(255, 200, 0);
    //ellipse(width / 2, height / 2, 300);

    image(imgWhole, width/2, height/2);

    fill(255);
    textSize(24);
    text("Clicca per aprire il biscotto", width / 2, height / 2 + 200);
  } else if (state === 1) {
    //fill(255, 200, 0);
    //arc(width / 2 - 150, height / 2, 300, 300, HALF_PI, PI + HALF_PI, CHORD);
    //arc(width / 2 + 150, height / 2, 300, 300, PI + HALF_PI, HALF_PI, CHORD);

    image(imgLeft, width / 2 - 300, height/2);
    image(imgRight, width / 2 + 300, height/2);

    fill(255);
    rect(paperX, paperY, paperWidth, paperHeight);

    fill(0);
    textSize(24);
    textWrap(WORD);
    text(currentPhrase, width / 2, height / 2, paperWidth - 50);

    fill(255);
    textSize(24);
    text("Clicca per aprire un nuovo biscotto", width / 2, height / 2 + 200);

    if (counter % 10 === 0) {
      fill('#fac912')
      textSize(96);
      text("ACCUR/AI", width/2, height/2);
    }
  }
  console.log(counter);
}

function mousePressed() {
  if (state === 0) {
    crackCookie();
    crackSound.play();
    counter = counter +1;
  } else {
    state = 0;
  }
}

function touchStarted() {
  if (value === 0) {
    value = 255;
  } else {
    value = 0;
  }
}

function crackCookie() {
  if (phrases.length > 0) {
    let randomIndex = floor(random(phrases.length));
    currentPhrase = phrases[randomIndex];
  } else {
    currentPhrase = "Nessuna frase trovata nel CSV!";
  }
  state = 1;
}


