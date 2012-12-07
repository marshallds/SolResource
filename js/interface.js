
var setFuel = function(newValue) { // newValue is between 0 and 1
	if (newValue <=1 && newValue >=0) {
		var newValuePercent = Math.floor(newValue*100) + '%';
		var scaledValue = newValue*650;
		$('#fuelLabel').text(newValuePercent); //floor or round?
		if (scaledValue > (140-50)) $('#fuelLabel').css("left", scaledValue + 50)
	else $('#fuelLabel').css("left", 140)
		$('#fuelbar img').css("left", scaledValue + 44)
		if (newValue >0.15) $('#fuelbar').css({"background":"-webkit-linear-gradient(left,rgba(255,255,255,0.6) " + (scaledValue+67) + ",rgba(255,255,255,0.2) " + (scaledValue+71) + ")"})
	else $('#fuelbar').css({"background":"-webkit-linear-gradient(left,rgba(255,100,100,0.6) " + (scaledValue+67) + ",rgba(255,150,150,0.2) " + (scaledValue+71) + ")"})
	}

}
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

var getSensorStatus = function() {
	return false;
}