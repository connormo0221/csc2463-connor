// creating a new FMSynth
const synth = new Tone.FMSynth({
  "harmonicity" : 8,
  "modulationIndex" : 4
});

// creating a new Freeverb effect
const reverbEffect = new Tone.Freeverb({
  "roomSize": 0.50,
	"dampening": 1200,
  "wet": 0.5
});

// setting a volume constant to keep my ears from hurting
const vol = new Tone.Volume(-18);

// creating variables for the sliders
let reverbSlider;
let volumeSlider;

// setting the key/note pairings
let notes = {
  'a' : 'C4',
  's' : 'D4',
  'd' : 'E4',
  'f' : 'F4',
  'g' : 'G4',
  'h' : 'A4',
  'j' : 'B4',
  'k' : 'C5',
}

function setup() {
  createCanvas(800, 600);

  // creating a slider to control the roomSize of the reverb
  reverbSlider = createSlider(0.00, 0.90, 0.50, 0.05);
  reverbSlider.style('width', '300px');
  reverbSlider.position(250, 390);
  reverbSlider.mouseReleased( () => reverbEffect.roomSize.value = reverbSlider.value());

  // creating a slider to control the volume of Tone.js
  volumeSlider = createSlider(-25, 0, -18, 1);
  volumeSlider.style('width', '300px');
  volumeSlider.position(250, 520);
  volumeSlider.mouseReleased( () => vol.volume.value = volumeSlider.value());

  // connecting the synth to the reverb & then the volume
  synth.connect(reverbEffect);
  reverbEffect.connect(vol);
  vol.toDestination();
}

function draw() {
  background(220);
  textAlign(CENTER);

  // displaying text to explain the keyboard & sliders
  push();
  textSize(32);
  text('Press a key on your keyboard to play a note!', 400, 70);

  textSize(22);
  text('Keyboard keys:', 400, 150);
  text('A, S, D, F, G, H, J, K', 400, 190);
  text('The corresponding notes:', 400, 250);
  text('C4, D4, E4, F4, G4, A4, B4, C5', 400, 290);
  
  textSize(18);
  text('0.00', 250, 380);
  text('0.90', 550, 380);
  text('To change the reverb decay, adjust this slider!', 400, 440);
  text('-25', 250, 510);
  text('0', 550, 510);
  text('To change the volume of this page, adjust this slider!', 400, 570);
  pop();
}

// upon pressing a key that is within the notes array, a note with a duration of 8n is played
function keyPressed() {
  synth.triggerAttackRelease(notes[key], "8n");
}