canvas = document.getElementById("canvas");
html = document.getElementsByTagName("html");
canvas.width = 600
canvas.height = 600;
c = canvas.getContext("2d")
c.imageSmoothingEnabled = false


var spr_player = new Image();
var spr_spike = new Image();

spr_player.src = "Sprites/player.png"
spr_spike.src = "Sprites/spike.png"

var player = new create_player(50,0)
var jump = false
var acc = 10
var inair = false
var rate = 4
var spikeArray = []
var meters = 0
var spikespeed = 4
Update()

//c.drawImage(spr_spike,700,canvas.height-36)

function Update() {
	window.requestAnimationFrame(Update)
	c.clearRect(0,0,canvas.width,canvas.height)
	c.drawImage(spr_player,player.x,player.y,64,64)
	c.strokeRect(player.x,player.y,64,64)
	c.fillStyle = "black"
	c.font = "30px helvetica"
	c.textAlign = "left"
	c.fillText(Math.floor(meters)+"m",10,30)
	c.fillStyle = "ForestGreen";
	c.fillRect(0,canvas.height-100,canvas.width-1,99)
	gravity()
	jumping()
	countmeters()
	if (spikeArray.length > 0) {
		for (i = 0; i < spikeArray.length;i++) {
			c.drawImage(spr_spike,spikeArray[i].x,spikeArray[i].y,64,64)
			c.strokeRect(spikeArray[i].x,spikeArray[i].y+32,64,32)
			spikeArray[i].x -= spikespeed
		}
		checkEdge();
	} else {spawning();}
	console.log(jump)
}

function create_spike(x, y) {
	this.x = x
	this.y = y
}

function create_player(x, y) {
	this.x = x
	this.y = y
	this.speed = 0
	this.trys = 1
	this.jump = -1000
	this.accel = 1
}

document.onkeyup = function(event) {
	key = event.keyCode;
	if (key == 32) {
	}
}

document.onkeydown = function(event) {
	key = event.keyCode;
	if (key == 32) {
	if (!inair) {
		jump = true
	} 
	} else if (key == 39) {
		spikespeed++
	}
}

function jumping() {
	if (jump) {
	player.y -= 12
	window.setTimeout(function() {jump = false},200)
	}
}

function countmeters() {
	meters += spikespeed/80
}
function checkEdge() {
	for (i = 0; i < spikeArray.length; i++) {
		if (spikeArray[i].x <-64) {
			spikeArray.splice(i,1)
			console.log("Edge!")
		}
	}
}
function gravity() {
	if (player.y+5 >= (canvas.height-100 - 64) && !jump) {
		inair = false;
		player.y = canvas.height-100 - 64
		player.speed = 0
	} else if (!jump && player.y < (canvas.height-100 - 64)){
		inair = true
		player.y += player.speed 
		player.speed += player.accel
	}
}

function collision() {
	
}

function spawning() {
 for (var i = 0; i < rate;i ++) {
 	spikeArray.push(new create_spike((Math.floor(Math.random() * 10) * 200) + 700, canvas.height-164))
 }
}