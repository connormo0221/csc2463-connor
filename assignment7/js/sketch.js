let ring;

// creating a new FMSynth
const synth = new Tone.FMSynth({
  "harmonicity" : 8,
  "modulationIndex" : 8,
  "oscillator" : { "type" : "sawtooth" },
  "envelope": {
    "attack" : 0.001,
    "decay" : 2,
    "sustain" : 0.1,
    "release" : 2
  },
  "modulation" : { "type" : "square" },
  "modulationEnvelope" : {
    "attack" : 0.002,
    "decay" : 0.2,
    "sustain" : 0,
    "release" : 0.2
  }
});

// creating a new Freeverb effect for the reverb
const reverb = new Tone.Freeverb({
	"roomSize": 0.8,
	"dampening": 1800,
  "wet": 0.5
});

// creating a new BitCrusher for the retro effect
const bit = new Tone.BitCrusher(8);

// setting a volume constant to keep my speakers from breaking
const vol = new Tone.Volume(-18);

function preload() {
  // loading the image
  ring = loadImage("assets/ring.png");
}

function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);
  textAlign(CENTER);

  // connecting the sound nodes
  synth.connect(reverb);
  reverb.connect(bit);
  bit.connect(vol);
  vol.toDestination();
}

function draw() {
  background(220);
  textSize(24);
  text('Click the canvas to play a sound effect!', 300, 570);
  if (mouseIsPressed == true) {
    // when the mouse is pressed, display an image of a ring from Sonic 1
    image(ring, 300, 300);
  }
}

function mousePressed() {
  // when the mouse is pressed, play a series of three notes
  synth.triggerAttackRelease('E6', '4n')
  synth.triggerAttackRelease('G6', '4n', '+0.1')
  synth.triggerAttackRelease('C7', '8n', '+0.2')
}