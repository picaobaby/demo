var btnBackward = document.querySelector('.btn-backward');
var btnExpand = document.querySelector('.btn-expand');
var btnMute = document.querySelector('.btn-mute');
var btnMuteIcon = btnMute.querySelector('.fa');
var btnPlay = document.querySelector('.btn-play');
var btnPlayIcon = btnPlay.querySelector('.fa');
var btnForward = document.querySelector('.btn-forward');
var btnReset = document.querySelector('.btn-reset');
var btnStop = document.querySelector('.btn-stop');
var progressBar = document.querySelector('.progress-bar');
var progressBarFill = document.querySelector('.progress-bar-fill');
var videoElement = document.querySelector('.video-element');

// Toggle full-screen mode
var expandVideo = function expandVideo() {
  if (videoElement.requestFullscreen) {
    videoElement.requestFullscreen();
  } else if (videoElement.mozRequestFullScreen) {
    // Version for Firefox
    videoElement.mozRequestFullScreen();
  } else if (videoElement.webkitRequestFullscreen) {
    // Version for Chrome and Safari
    videoElement.webkitRequestFullscreen();
  }
};

// Move the video backward for 5 seconds
var moveBackward = function moveBackward() {
  videoElement.currentTime -= 5;
};

// Move the video forward for 5 seconds
var moveForward = function moveForward() {
  videoElement.currentTime += 5;
};

// Mute the video
var muteVideo = function muteVideo() {
  if (videoElement.muted) {
    videoElement.muted = false;

    btnMuteIcon.classList.remove('fa-volume-up');
    btnMuteIcon.classList.add('fa-volume-off');
  } else {
    videoElement.muted = true;

    btnMuteIcon.classList.remove('fa-volume-off');
    btnMuteIcon.classList.add('fa-volume-up');
  }
};

// Play / Pause the video
var playPauseVideo = function playPauseVideo() {
  if (videoElement.paused) {
    videoElement.play();

    btnPlayIcon.classList.remove('fa-play');
    btnPlayIcon.classList.add('fa-pause');
  } else {
    videoElement.pause();

    btnPlayIcon.classList.remove('fa-pause');
    btnPlayIcon.classList.add('fa-play');
  }
};

// Restart the video
var restartVideo = function restartVideo() {
  videoElement.currentTime = 0;

  btnPlay.removeAttribute('hidden');
  btnReset.setAttribute('hidden', 'true');
};

// Stop the video
var stopVideo = function stopVideo() {
  videoElement.pause();
  videoElement.currentTime = 0;
  btnPlayIcon.classList.remove('fa-pause');
  btnPlayIcon.classList.add('fa-play');
};

// Update progress bar as the video plays
var updateProgress = function updateProgress() {
  // Calculate current progress
  var value = 100 / videoElement.duration * videoElement.currentTime;

  // Update the slider value
  progressBarFill.style.width = value + '%';
};

// Event listeners
btnBackward.addEventListener('click', moveBackward, false);
btnExpand.addEventListener('click', expandVideo, false);
btnMute.addEventListener('click', muteVideo, false);
btnPlay.addEventListener('click', playPauseVideo, false);
btnForward.addEventListener('click', moveForward, false);
btnReset.addEventListener('click', restartVideo, false);
btnStop.addEventListener('click', stopVideo, false);
videoElement.addEventListener('ended', function () {
  btnPlay.setAttribute('hidden', 'true');
  btnReset.removeAttribute('hidden');
}, false);
videoElement.addEventListener('timeupdate', updateProgress, false);











===============================




/* VARIABLES 
------------------------------------------------------- */

// Video
var $video = $("#video");
var $videoContainer = $("#videoContainer");

// Video Control s
var $videoControls = $("#videoControls");
var $buttonControls = $("#buttonControls");
var $progressBar = $("#progressBar");
var $progress = $("#progress");
var $playButton = $("#play");
var $muteButton = $("#mute");
var $volumeSlider = $("#volumeSlider");
var $fullScreenBtn = $("#fullScreen");
var $duration = $("#duration");
var $fastFwd = $("#fastFwd");
   
/* VIDEO PLAYER 
------------------------------------------------------- */

// Toggles play/pause for the video
function playVideo() {      
	if($video[0].paused) {
		$video[0].play();
		$playButton.find("img").attr("src", "icons/pause-icon.png"); 
		$buttonControls.hide();
		$videoControls.css("margin-top", "5%");	     	
	} else {
		$video[0].pause();
		$playButton.find("img").attr("src", "icons/play-icon.png");			
	}		
}

// Mutes the video
function muteVideo() {
	if ($video[0].muted === false) {
		$video[0].muted = true;
		$muteButton.find("img").attr("src", "icons/volume-off-icon.png");
	} else {
		$video[0].muted = false;
		$muteButton.find("img").attr("src", "icons/volume-on-icon.png");				
	}	
}

// Changes video playback rate
function changeSpeed() {
	if($video[0].playbackRate === 1) {
		$video[0].playbackRate = 2;
		$fastFwd.text("2x Speed");
	} else if ($video[0].playbackRate === 2) {
		$video[0].playbackRate = 1;
		$fastFwd.text("1x Speed");				
	}
}

function launchFullscreen() {
  if($video[0].requestFullscreen) {
    $video[0].requestFullscreen();
  } else if($video[0].mozRequestFullScreen) {
    $video[0].mozRequestFullScreen();
  } else if($video[0].webkitRequestFullscreen) {
    $video[0].webkitRequestFullscreen();
  } else if($video[0].msRequestFullscreen) {
    $video[0].msRequestFullscreen();
  }
}


// Play/pause on video click
$video.click(function() {
	playVideo();
});

// Play/pause on spacebar 
$("body").on("keydown", function(e) {
	if(e.keyCode === 32 ) {	
		e.preventDefault();		
		playVideo();     
	}
});

// Mute/sound on m key
$("body").on("keydown", function(e) {
	if(e.keyCode === 77 ) {
		e.preventDefault();		
		muteVideo();
	}
});

// Video duration timer
$video.on("timeupdate", function() {
	var $videoTime = $video[0].currentTime;
	if ($videoTime < 9.5) {
		$duration.html("00:0" + Math.round($videoTime) + " / 01:00");		
	} else {
		$duration.html("00:" + Math.round($videoTime) + " / 01:00");			
	}
});

/* VIDEO CONTROLS
------------------------------------------------------- */

// Hide button controls when video is playing 
$videoContainer.on("mouseleave", function() {
	if($video[0].paused === false) {
		$buttonControls.hide();
		$videoControls.css("margin-top", "5%");	  
	}
});

// Show button controls on hover
$videoContainer.on("mouseover", function() {
		$buttonControls.show();
		$videoControls.css("margin-top", "0");	  
});

// Progress bar
$progressBar[0].addEventListener("change", function() {
	var time = $video[0].duration * ($progressBar[0].value / 100);
	$video[0].currentTime = time;
}); 

// Update progress bar as video plays
$video[0].addEventListener("timeupdate", function() { 
	var value = (100 / $video[0].duration) * $video[0].currentTime;
	$progress.css("width", value+"%");	
}); 

// Play/pause on button click
$playButton.click(function() {
	playVideo();
});

// 2x speed with right arrow
$("body").on("keydown", function(e) {
	if(e.keyCode === 39) {	
		e.preventDefault();		
		changeSpeed();
	}
});
// Normal Speed
$("body").on("keydown", function(e) {
	if(e.keyCode === 37) {	
		e.preventDefault();		
		changeSpeed();
	}
});

// Fast Forward Button 
$fastFwd.click(function() {
	changeSpeed();
});

// Mute video on button click
$muteButton.click(function() {
	muteVideo();
});

// Volue slider
$volumeSlider.on("change", function(){ 
	$video[0].volume = $volumeSlider[0].value;
});

/* Fullscreen on button click
$fullScreenBtn.click(function() {
	if ($video[0].webkitRequestFullscreen()) {
		$video[0].webkitRequestFullscreen();
	} else if ($video[0].mozRequestFullScreen()) {
		$video[0].mozRequestFullScreen();
	} else if ($video[0].msRequestFullScreen()) {
		$video[0].msRequestFullScreen();
	}
}); */

$fullScreenBtn.click(function() {
	launchFullscreen();
}); 

/* VIDEO TRANSCRIPT 
------------------------------------------------------- */

// Highlight current span when video plays 
	$video.on("timeupdate", function() {
		var $videoTime = $video[0].currentTime;
		function addHighlight(n) {
			$('span[data-start]').removeClass("highlight");
			$('span[data-start="' + n + '"]').addClass("highlight");
		}

			if ($videoTime > -1 && $videoTime < 4.130) {
				addHighlight(0);
			} else if ($videoTime > 4.13 && $videoTime < 7.535) {
				addHighlight(4.13);
			} else if ($videoTime > 7.535 && $videoTime < 11.27) {
				addHighlight(7.535);
			} else if ($videoTime > 11.27 && $videoTime < 13.96) {
				addHighlight(11.27);
			} else if ($videoTime > 13.96 && $videoTime < 17.94) {
				addHighlight(13.96);
			} else if ($videoTime > 17.94 && $videoTime < 22.37) {
				addHighlight(17.94);
			} else if ($videoTime > 22.37 && $videoTime < 26.88) {
				addHighlight(22.37);
			} else if ($videoTime > 26.88 && $videoTime < 30.92) {
				addHighlight(26.88);
			} else if ($videoTime > 32.1 && $videoTime < 34.73) {
				addHighlight(32.1);
			} else if ($videoTime > 34.73 && $videoTime < 39.43) {
				addHighlight(34.73 );
			} else if ($videoTime > 39.43 && $videoTime < 41.19) {
				addHighlight(39.43);
			} else if ($videoTime > 42.35 && $videoTime < 46.3) {
				addHighlight(42.35);
			} else if ($videoTime > 46.3 && $videoTime < 49.27) {
				addHighlight(46.3);
			} else if ($videoTime > 49.27 && $videoTime < 53.76) {
				addHighlight(49.27);
			} else if ($videoTime > 53.76 && $videoTime < 57.78 ) {
				addHighlight(53.76);
			} else if ($videoTime > 57.78) {
				addHighlight(57.78);
			}

	});

// Click on transcript to be taken to that time in the video
$("span").click(function() {
	var transcriptTime = $(this).attr("data-start");
	$video[0].currentTime = transcriptTime;
});







====================



var player = document.getElementById("player");

var fadeTime;
var over = false;

var full = false;

var loadCheck;

$("#player").on("loadeddata", updateTime);

loadCheck = setInterval(function(){
	if($("#player").get(0).duration > 0){
		$("#player, #controls").css("pointer-events", "auto");
		clearInterval(loadCheck);
	}
}, 100);

$("#player").click(toggleVideo);
$("#playpause").click(toggleVideo);

$("#playercontainer").mousemove(function() {
	$("#controls").show();
	$("#player").css("cursor", "pointer");
	clearTimeout(fadeTime);
	if(!player.paused) {
		fadeTime = setTimeout(function() {
			$("#controls").fadeOut("medium");
			$("#player").css("cursor", "none");
		}, 3000);
	}
});

$("#progressholder").hover(function(e) { over = true; }, function() { over = false; });

$("#progressholder").click(function(e) {
	var pos = e.pageX - 25;
	var prop = (pos + 1) / $("#progressholder").width();
	var prog = prop * player.duration;
	player.currentTime = prog;
	updateProgress();
});

$("#fullscreen").click(function() {
	if(!full) launchIntoFullscreen(document.getElementById("playercontainer"));
	else exitFullscreen(document.getElementById("playercontainer"));
	full = !full;
});

function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

$("#progressholder").mousemove(function(e) { updateOrb(e); });

function toggleVideo() {
	//We're playing
	if(!player.paused) {
		$("#controls").show();
		$("#player").css("cursor", "pointer");
		$("#playpause").attr("class", "fa fa-play");
		player.pause();
	} else {
		$("#controls").fadeOut("medium");
		$("#player").css("cursor", "none");
		$("#playpause").attr("class", "fa fa-pause");
		player.play();
	}
}

function updateProgress() {
	var bp = player.buffered.end(player.buffered.length-1) / player.duration;
	var bw = bp * 100;
	$("#buffered").css("width", bw + "%");
	
	var p = player.currentTime / player.duration;
	var w = p * 100;
	$("#progress").css("width", w + "%");
	
	updateTime();
	
	if(player.ended) {
		$("#playpause").attr("class", "fa fa-repeat");
		$("#controls").show();
		$("#player").css("cursor", "pointer");
		clearTimeout(fadeTime);
	}
}

function updateOrb(e) {
	var pos = e.pageX - 25;
	var prop = pos / $("#progressholder").width();
	var prog = prop * player.duration;
	$("#progressorb").css("margin-left", pos + "px");
}

function updateTime() {
	$("#progresstime").text(player.currentTime.toString().toHHMMSS() + " / " + player.duration.toString().toHHMMSS());
}

setInterval(updateProgress, 100);

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10);
    var minutes = Math.floor(sec_num / 60);
    var seconds = sec_num - (minutes * 60);
	
    if (seconds < 10) {seconds = "0"+seconds;}
    var time = minutes + ':' + seconds;
    return time;
};








