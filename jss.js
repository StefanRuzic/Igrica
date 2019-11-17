var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var score = 0; 

// kocka atributi
var x = 50; 
var y = 100; 
var speed = 3; 
var sideLength = 25; 

// promjenljive za kretanje
var down = false;
var up = false;
var right = false;
var left = false;

//Ucitavanje zvukova
let pocetak_igre = new Audio();
let time = new Audio();
let end = new Audio();

pocetak_igre.src = "pocetak_igre.mp3";
time.src = "remainding.mp3";
end.src = "end_game.mp3";

// kocka za hvatanje
var targetX = 0;
var targetY = 0;
var targetLength = 25;

// Tajmer
var countdown = 30;
var id = null;

function isWithin(a, b, c) {
    return (a > b && a < c);
  }

// pritisak dolje
canvas.addEventListener('keydown', function(event) {
  event.preventDefault();
  console.log(event.key, event.keyCode);
  if (event.keyCode === 40) { // DOWN
    down = true;
  }
  if (event.keyCode === 38) { // UP
    up = true;
  }
  if (event.keyCode === 37) { // LEFT
    left = true;
  }
  if (event.keyCode === 39) { // RIGHT
    right = true;
  }
});

// pritisak gore
canvas.addEventListener('keyup', function(event) {
  event.preventDefault();
  console.log(event.key, event.keyCode);
  if (event.keyCode === 40) { // DOWN
    down = false;
  }
  if (event.keyCode === 38) { // UP
    up = false;
  }
  if (event.keyCode === 37) { // LEFT
    left = false;
  }
  if (event.keyCode === 39) { // RIGHT
    right = false;
  }
});

// Prikaz Start menu-a
function menu() {
  erase();
  context.fillStyle = '#FF0000';
  context.font = '90px Copperplate Gothic Bold';
  context.textAlign = 'center';
  context.fillText('Igrica', canvas.width / 2, canvas.height / 4);
  context.font = '50px Copperplate Gothic Bold';
  context.fillText('Start', canvas.width / 2, canvas.height / 2);
  context.font = '18px Copperplate Gothic Bolde'

  // Start igirce na pritisak
  canvas.addEventListener('click', startGame);
}

// Start igice
function startGame() {
  pocetak_igre.play();
	// Smanjuj countdown svake sekunde
  id = setInterval(function() {
    countdown--;
  }, 1000)
  // Blokiranje Click
  canvas.removeEventListener('click', startGame);
  // poziv funkcij move target(random spavn kocke)
	moveTarget();
  // poziv funkcije draw
  draw();

}

// Prikaz Game Over-a
function endGame() {
  end.play();
	// Zaustavi tajmer
  clearInterval(id);
  // Prikazi rezultat
  erase();
  context.fillStyle = '#FF0000';
  context.font = '100px Copperplate Gothic Bold';
  context.textAlign = 'center';
  context.fillText('Rezultat: ' + score, canvas.width / 2, canvas.height / 2);
}

// random pozicija kockice
function moveTarget() {
  targetX = Math.round(Math.random() * canvas.width - targetLength);
  targetY = Math.round(Math.random() * canvas.height - targetLength)
}

// Ocistiti canvas
function erase() {
  context.fillStyle = '#000000';
  context.fillRect(0, 0, 650, 400);
}

// Funkcija za crtanje
function draw() {
  erase();
  // Pomjeranje kocke
  if (down) {
    y += speed;
  }
  if (up) {
    y -= speed;
  }
  if (right) {
    x += speed;
  }
  if (left) {
    x -= speed;
  }
  // Drzi kvadrat unutar canvasa
  if (y + sideLength > canvas.height) {
    y = canvas.height - sideLength;
  }
  if (y < 0) {
    y = 0;
  }
  if (x < 0) {
    x = 0;
  }
  if (x + sideLength > canvas.width) {
    x = canvas.width - sideLength;
  }
  // Sudaranje sa drugom kockom
  if (isWithin(targetX, x, x + sideLength) || isWithin(targetX + targetLength, x, x + sideLength)) { // Poklapanje x
    if (isWithin(targetY, y, y + sideLength) || isWithin(targetY + targetLength, y, y + sideLength)) { // Poklapanje y
      //povecavanje
      sideLength=sideLength + 2;
      // Ponovno kreiranje random kocke
      moveTarget();
      // Povecati score
      score++;
    }
  }
  // Nacrtati kocku
  context.fillStyle = '#F200FE';
  context.fillRect(x, y, sideLength, sideLength);
  // Nacrtati random kocku 
  context.fillStyle = '#4DFE00';
  context.fillRect(targetX, targetY, targetLength, targetLength);
  // Prikazivanje scor-a i preostalog vremenaa
  context.fillStyle = '#FE0400';
  context.font = '15px Copperplate Gothic Bold';
  context.textAlign = 'left';
  context.fillText('Rezultat: ' + score, 10, 24);
  context.fillText('Preostalo vremena: ' + countdown, 10, 50);
  if(countdown<=5){
    time.play();
  }

  // Zavrsavanje igre 
  if (countdown <= 0) {
    endGame();
  } else {
    window.requestAnimationFrame(draw);
  }
}

// Start igre
menu();
canvas.focus();