var tag = document.createElement('script');
		tag.src = 'https://www.youtube.com/player_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var tv,
		playerDefaults = {autoplay: 0, autohide: 1, modestbranding: 1, rel: 0, showinfo: 0, controls: 0, disablekb: 1, enablejsapi: 0, iv_load_policy: 3};
var vid = [
			{'videoId': 'nTNBiBD6SxU', 'startSeconds': 0, 'endSeconds': 28, 'suggestedQuality': 'hd720'},
			{'videoId': 'XEPu6vOkMTI', 'startSeconds': 177, 'endSeconds': 321, 'suggestedQuality': 'hd720'},
			{'videoId': 'dU6MaQTqNd4', 'startSeconds': 0, 'endSeconds': 37, 'suggestedQuality': 'hd720'},
			{'videoId': '8XxE6j3JWSE', 'startSeconds': 0, 'endSeconds': 32, 'suggestedQuality': 'hd720'}
		],
		randomVid = Math.floor(Math.random() * vid.length),
    currVid = randomVid;

//$('.hi em:last-of-type').html(vid.length);

function onYouTubePlayerAPIReady(){
  tv = new YT.Player('tv', {events: {'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange}, playerVars: playerDefaults});
}

function onPlayerReady(){
  tv.loadVideoById(vid[currVid]);
  tv.mute();
  
 
}

function onPlayerStateChange(e) {
   if (e.data === 1){
    $('#tv').addClass('active');
	
   // $('.hi em:nth-of-type(2)').html(currVid + 1);
  } else if (e.data === 0){
    $('#tv').removeClass('active');
    if(currVid === vid.length - 1){
      currVid = 0;
    } else {
      currVid++;  
    }
	
	
    tv.loadVideoById(vid[currVid]);
	if(e.data === 1) {
		tv.seekTo(vid[currVid].startSeconds, true);
	}
	
  }
}

function vidRescale(){

  var w = $(window).width(),
    h = $(window).height();

  if (w/h > 16/9){
	tv.setSize(w, w/16*9);
    $('.tv .screen').css({'left': '0px'});
  } else {
    tv.setSize(h/9*16, h);
	var moveLeft = (((h/9*16)/2)-(w/2))*1.15;
	$('.tv').css({'left': -moveLeft});
	$('.tv').css({'width': w+moveLeft});
	$('.screen').css({'left': -moveLeft});
  }
}

$(window).on('load resize', function(){
  vidRescale();
  setTimeout(function(){
   if (tv.getCurrentTime() > 0 && !$('.collapsible').hasClass('active')) {
	   $('.tv').fadeTo(500,1);
   } else {
	   setTimeout(function(){
			if (tv.getCurrentTime() > 0 && !$('.collapsible').hasClass('active')) {
				$('.tv').fadeTo(500,1);
			} else {
				setTimeout(function(){
					if (tv.getCurrentTime() > 0 && !$('.collapsible').hasClass('active')) {
						$('.tv').fadeTo(500,1);
						
					} else if (!$('.collapsible').hasClass('active')) {
						$('.tv').css({'visibility': 'hidden'}); 
						tv.stopVideo();
						tv.destroy();
					}
				}, 1500);
			}
		}, 1000);
   }		
  }, 500);
  
	
   
  
});

$('.hi span:first-of-type').on('click', function(){
  $('#tv').toggleClass('mute');
  $('.hi em:first-of-type').toggleClass('hidden');
  if($('#tv').hasClass('mute')){
    tv.mute();
  } else {
    tv.unMute();
  }
});

$('.hi span:last-of-type').on('click', function(){
  $('.hi em:nth-of-type(2)').html('~');
  tv.pauseVideo();
});


$('.collapsible').on('click', function(){
	if (tv.getPlayerState() !== 2 && tv.getCurrentTime() > 0 && !$('.collapsible').hasClass('active')) {
		$('#gradient').fadeIn();
		$('.tv').fadeTo(500,0.5);
		$('.center').css({backgroundColor: "rgba(0, 0, 0, 0.5)"}); 
		setTimeout(function(){
			tv.pauseVideo();
		}, 300);
	} else if  (tv.getCurrentTime() > 0) {
		tv.playVideo();
		$('.center').css({backgroundColor: "rgba(0, 0, 0, 0.4)"}); 
		setTimeout(function(){
			$('.tv').fadeTo(500,1);
			$('#gradient').fadeOut();
		}, 200);
		
	
  }

});
