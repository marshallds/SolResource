function is_touch_device() {
  return !!('ontouchstart' in window);
}

var touchEvent = 'click';
if (is_touch_device())
  {
    touchEvent = 'touchend';
  }

var sysDiagTime = 5; //seconds

var disableRunDiagnostic = function() {
	$('#runsysdiag').addClass('disabled').off(touchEvent)
}
var enableRunDiagnostic = function() {
	$('#runsysdiag').on(touchEvent,function() {
		// playAudio(buttonSound, eventPlayer);
		runDiagnostic();
  	}).removeClass('disabled');
}
var runDiagnostic = function() {
	disableRunDiagnostic();
	$('#systemsDisplay>p').show()
	$('#repairbutton').hide()
	$('#systemsDisplay>p').html('system diagnostic in progress... <span id="sysdiagcountdown">' + formatTime(sysDiagTime) + '</span> remaining')
	countdown(sysDiagTime-1,'#sysdiagcountdown',function() {
		if(getSensorStatus()) {
			$('#systemsDisplay>p').html('all systems functional');
			$('#statusbox').addClass('statusGreen');
		}
		else {
			$('#systemsDisplay>p').hide()
			$('#repairbutton').fadeIn()
		}
	})

}

var setFuel = function(newValue) { // newValue is between 0 and 1
	if (newValue <=1 && newValue >=0) {
		var newValuePercent = Math.floor(newValue*100) + '%';
		var scaledValue = newValue*646;
		$('#fuelLabel').text(newValuePercent); //floor or round?
		if (scaledValue > 140) $('#fuelLabel').css("left", scaledValue + 40)
	else $('#fuelLabel').css("left", 140)
		$('#fuelbar img').css("left", scaledValue - 40)
		if (newValue >0.15) $('#fuelbar').css({"background":"-webkit-linear-gradient(left,rgba(255,255,255,0.45) " + scaledValue + ",rgba(255,255,255,0.2) " + scaledValue + ")"})
	else $('#fuelbar').css({"background":"-webkit-linear-gradient(left,rgba(255,100,100,0.6) " + scaledValue + ",rgba(255,150,150,0.2) " + scaledValue + ")"})
	}

}
// var setFuel = function(newValue) { // newValue is between 0 and 1
// 	if (newValue <=1 && newValue >=0) {
// 		var newValuePercent = Math.floor(newValue*100) + '%';
// 		var scaledValue = newValue*650;
// 		$('#fuelLabel').text(newValuePercent); //floor or round?
// 		if (scaledValue > (140-50)) $('#fuelLabel').css("left", scaledValue + 50)
// 	else $('#fuelLabel').css("left", 140)
// 		$('#fuelbar img').css("left", scaledValue + 44)
// 		if (newValue >0.15) $('#fuelbar').css({"background":"-webkit-linear-gradient(left,rgba(255,255,255,0.6) " + (scaledValue+67) + ",rgba(255,255,255,0.2) " + (scaledValue+71) + ")"})
// 	else $('#fuelbar').css({"background":"-webkit-linear-gradient(left,rgba(255,100,100,0.6) " + (scaledValue+67) + ",rgba(255,150,150,0.2) " + (scaledValue+71) + ")"})
// 	}

// }
var formatTime = function(seconds) {
	return Math.floor(seconds/60) + ':' + ('0'+ (seconds % 60)).slice(-2);
}
var countdown = function(time,target,callback){
  var countdownloop = setInterval(function(){
    $(target).html(formatTime(time));
    if (time <= 0) {
      callback();
    }
    time--;
  }, 1000);
};

var zoomOut = function() {

		$('#map').animate({svgTransform:'scale(1) translate(0,0)'},3000,'swing')
  		$('#asteroidinfo').animate({svgOpacity:0},600,'swing',function() {
  			$('#asteroidinfo').animate({svgTransform:'translate(0,1000)'},0)
  		})
  		if($('#rangering').attr('transform')==" scale(1,1)") $('#blips use').animate({svgOpacity:1},1200)
		$('#zoomoutButton').fadeOut();
}

var getSensorStatus = function() {
	return false;
}
var updateResources = function(H2O,Fe,Pt) {
	$('#h2ohex .hexValue').text(H2O);
	$('#fehex .hexValue').text(Fe);
	$('#pthex .hexValue').text(Pt);
}
// var retrieveResources = function() {
// 	updateResources(40,10,8)
// 	setFuel(.78)
// 	return true;
// }
var updatePlayerResources = function(H,O,Fe,Pt) {
	$('.resourceBar p').eq(0).text(H)
	$('.resourceBar p').eq(1).text(O)
	$('.resourceBar p').eq(2).text(Fe)
	$('.resourceBar p').eq(3).text(Pt)
}

var gatherResourcesAnimation = function(duration) {
	$('#clockmask rect').animate({svgY:-50},duration*1000,'linear',function() {
		$('#resourcesAvailable').animate({svgOpacity:1},200)
		$('#resourcesReady').bind(touchEvent, function() {
			// retrieveResources();
			$('#resourcesAvailable').animate({svgOpacity:0},0)
			$('#clockmask rect').animate({svgY:50},0,'linear',function(){})
			$(this).unbind()
			if(retrieveResources()) gatherResourcesAnimation(duration);
		})
	})
}