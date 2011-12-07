var win = Ti.UI.createWindow({
	backgroundImage: 'Default.png',
	fullscreen:true
});

win.orientationModes = [Ti.UI.PORTRAIT];

var scoreContainer = Ti.UI.createView({
	top:10,
	left:10,
	right:10,
	height:50,
	borderRadius:5,
	backgroundColor:'#ffffff'
});
win.add(scoreContainer);

var score = 0;
var scoreLabel = Ti.UI.createLabel({
	width:'auto',
	left:10,
	color:'#000',
	text:'Current Score: 0',
	font: {
		fontWeight:'bold',
		fontSize:22,
		fontFamily:'Marker Felt'
	}
});
scoreContainer.add(scoreLabel);

var time = 30;
var timeLabel = Ti.UI.createLabel({
	width:'auto',
	right:10,
	color:'#ff0000',
	text:'30',
	font: {
		fontWeight:'bold',
		fontSize:22,
		fontFamily:'Marker Felt'
	}
});
scoreContainer.add(timeLabel);

//add business logic
function random(minVal,maxVal) {
	return Math.floor(minVal+(Math.random()*(maxVal-minVal)));
}

function Target() {
	var self = Ti.UI.createView({
		height:70,
		width:70,
		borderRadius:5,
		backgroundColor:'#ffffff',
		top:random(65,370),
		left:random(5,220)
	});
	
	self.add(Ti.UI.createImageView({
		image:'appc.png'
	}));
	
	self.addEventListener('click', function() {
		self.top = random(65,370);
		self.left = random(5,220);
		score++;
		scoreLabel.text = 'Current Score: '+score;
	});
	
	return self;
}

//add Nolan
var t = new Target();
win.add(t);

function runGame() {
	//reset game
	score = 0;
	time = 30;
	scoreLabel.text = 'Current Score: 0';
	timeLabel.text = '30';
	
	function runTimer() {
		if (time > 0) {
			time--;
			timeLabel.text = time;
			setTimeout(runTimer,1000);
		}
		else {
			var b = Ti.UI.createAlertDialog({
				buttonNames:["I can do better!"],
				title:'That was awesome!',
				message:'You whacked the logo '+score+' times - not too shabby.  Try again?'
			});
			b.show();
			
			b.addEventListener('click', function() {
				runGame();
			});
		}
	}
	
	setTimeout(runTimer,1000);
}

//initialize app
win.open();
var a = Ti.UI.createAlertDialog({
	buttonNames:["Let's See!"],
	title:'Whacktanium',
	message:'How many times can you whack the Appcelerator "A" before time runs out?'
});
a.show();

a.addEventListener('click', function() {
	runGame();
});
