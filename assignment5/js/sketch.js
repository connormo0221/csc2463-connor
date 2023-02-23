// loading the sounds into Tone.js
let sounds = new Tone.Players({
  "sound1" : "sounds/sound1.wav",
  "sound2" : "sounds/sound2.wav",
  "sound3" : "sounds/sound3.wav",
  "sound4" : "sounds/sound4.wav"
});

// making arrays for the names of the sounds & buttons
let soundNames = ["sound1", "sound2", "sound3", "sound4"];
let buttons = [];

// creating a pitch modifier
const pitchShift = new Tone.PitchShift();
let pitchSlider;

function setup() {
  createCanvas(800, 600);

  // routing the sounds through the pitch const
  sounds.connect(pitchShift);
  pitchShift.toDestination();

  // creating a # of buttons equal to the # of sounds +
  // adding the sound names to the buttons & playing them upon a mouse press
  soundNames.forEach((word, index) => {
    buttons[index] = createButton(word);
    buttons[index].size(100);
    buttons[index].position(350, 200 + (index * 50));
    buttons[index].mousePressed( () => buttonSound(word));
  });

  // creating a slider to control the pitch of the sounds in increments of 1 semi-tone
  pitchSlider = createSlider(-10, 10, 0, 1);
  pitchSlider.style('width', '300px');
  pitchSlider.position(250, 500);
  pitchSlider.mouseReleased( () => pitchShift.pitch = pitchSlider.value());
}

function draw() {
  background(220);
  textAlign(CENTER);

  // displaying text to explain the buttons & slider
  push();
  textSize(32);
  text('Press a button to play the corresponding sound!', 400, 65);

  textSize(18);
  text('To modulate the pitch of the sounds, use the slider at the bottom of the page.', 400, 100);
  text('-10', 250, 490);
  text('0', 400, 490);
  text('10', 550, 490);
  text('Tip: The intervals are measured in semi-tones.', 400, 550);
  pop();
}