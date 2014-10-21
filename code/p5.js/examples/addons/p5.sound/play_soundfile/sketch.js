// ====================
// DEMO: play a sound at a random speed/pitch when the ball hits the edge
// ====================

// create a variable for the sound file
var soundFile;

function setup() {
  createCanvas(400, 400);
  background(0);

  // create a SoundFile
  soundFile = loadSound( ['beatbox.ogg', 'beatbox.mp3'] );

  createP('Press any key to play the sound');
}

// when a key is pressed...
function keyPressed() {

  // play the sound file
  soundFile.play();

  // also make the background yellow
  background(255, 255, 0);
}

function keyReleased() {
  // make the background black again when the key is released
  background(0);
}
