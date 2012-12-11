var fuel = 0.70;

var hydrogen = 20;
var oxygen = 30;
var iron = 40;
var platinum = 10;

var asteroidH2O = 60;
var asteroidIron = 40;
var asteroidPlatinum = 10;

//DO INITIAL VARIABLE SHOWING
setFuel(fuel);
updatePlayerResources(hydrogen, oxygen, iron, platinum);

function getAsteroidDetails() {
	asteroidH2O = 60;
	asteroidIron = 40;
	asteroidPlatinum = 10;
	
	updateResources(60,40,10);
}

function retrieveResources() {
	if (fuel > 0.01 && asteroidH2O >= 12)
	{		
		fuel = fuel - 0.01;
		setFuel(fuel);
		
		hydrogen = hydrogen + 8;
		oxygen = oxygen + 4;
		iron = iron + 8;
		platinum = platinum + 2;
		
		updatePlayerResources(hydrogen, oxygen, iron, platinum);
		
		asteroidH2O -= 12;
		asteroidIron -= 8;
		asteroidPlatinum -= 2;
		updateResources(asteroidH2O, asteroidIron, asteroidPlatinum);
		
		if(asteroidH2O >= 12) {
			return true;
		}
		else {
			return false;
		}
	}	
	else {
		return false;
	}
}

function refuel() {
	if (hydrogen >= 20 && fuel <= 0.90) {
		fuel = fuel + 0.10;
		hydrogen = hydrogen - 20;
		
		setFuel(fuel);
		updatePlayerResources(hydrogen, oxygen, iron, platinum);
	}
}

function useFuel(amount) {
	if (fuel >= amount) {
		fuel -= amount;
		setFuel(fuel);
		return true;
	}
	else {
		return false;
	}
}