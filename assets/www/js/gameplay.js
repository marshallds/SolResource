var fuel = 0.70;

var hydrogen = 20;
var oxygen = 30;
var iron = 40;
var platinum = 10;

//DO INITIAL VARIABLE SHOWING
setFuel(fuel);
updatePlayerResources(hydrogen, oxygen, iron, platinum);

function getAsteroidDetails() {
	updateResources(60,40,10);
}

function retrieveResources() {
	if (fuel > 0.01)
	{		
		fuel = fuel - 0.01;
		setFuel(fuel);
		
		hydrogen = hydrogen + 40;
		oxygen = oxygen + 20;
		iron = iron + 40;
		platinum = platinum + 10;
		
		updatePlayerResources(hydrogen, oxygen, iron, platinum);
		
		updateResources(0,0,0);
		return true;
	}	
	else {
		return false;
	}
}

function refuel() {
	if (hydrogen <= 20 && fuel <= 0.90) {
		fuel = fuel = 0.01;
		hydrogen = hydrogen - 20;
		
		setFuel(fuel);
		updatePlayerResources(hydrogen, oxygen, iron, platinum);
	}
}