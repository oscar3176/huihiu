score = 0;
smartScore = 0;
input = "";
rightWx = 0;
rightWy = 0;
youy = 300;
youx = 15;
oppy = 700;
oppx = 980;
gamemode = "";
oppup = false;
var opponent_name = [
	"Piro",
	"Hanzo",
	"Thompson",
	"Tayir",
	"Vasana",
	"Ha-yoon",
	"Boris",
	"Grim",
	"Gudrun",
	"Mei Fang",
	"Sigrid",
	"Ursa",
	"Azai",
	"Pierre Le Bēlier",
	"Tōmōr",
	"Coatl",
	"Treadwell",
	"Kadira",
	"Okoyo"
];

function preload() {
	red = loadImage("red.jpg");
	green = loadImage("green.jpg");

}

function setup() {
	canvas = createCanvas(1000,700);
	canvas.parent('canvas');
	canvas.background("black");

	video = createCapture(VIDEO);
	video.hide();
	
	//poseNet = ml5.poseNet(video, modelLoaded);
	//poseNet.on('pose', gotPoses);
	
}

function modelLoaded() {
	console.log("Pose Net has been initialized!");
}

function gotPoses(results) {
	if (results.length > 0) {
		console.log(results);
		rightWx = results[0].pose.rightWrist.x;
		rightWy = results[0].pose.rightWrist.y;
	}
}

function draw() {
	image(video, 250, 0, 500, 310);
	image(green, oppx, oppy, 10, 100);
	fill("green");
	stroke("green");
	rect(oppx, oppy, 10, 100);
	
}
}

function changeName() {
	input = document.getElementById("name").value;
	if (input != "") {
	document.getElementById("user").innerHTML = input + ": " + score;
	document.getElementById("confirm").style = "visibility:hidden";
	document.getElementById("name").style = "visibility:hidden";
	document.getElementById("status").innerHTML = "Status: Waiting for opponent to insert username...";

	setTimeout(function() {
	document.getElementById("start").style = "visibility:visible";
	document.getElementById("computer").innerHTML = opponent_name[Math.floor(Math.random() * 18)] + ": " + smartScore;
	document.getElementById("status").innerHTML = "Status: None";
	}, 3500);
  }
  else {
	document.getElementById("status").innerHTML = "Status: Warning! You cannot put an empty username.";
	setTimeout(function() {
		document.getElementById("status").innerHTML = "Status: None";
	}, 5000);
  }
}

function start_game() {
	gamemode = "initialized";
	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
	document.getElementById("status").innerHTML = "Loading Game...";
}