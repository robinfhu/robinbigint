function BigInt(n) {
	
	this.digits = n.split("").reverse().join("");
}

BigInt.prototype.setDigits = function(n) {
	this.digits = n;
};

BigInt.prototype.human = function() {
	return this.digits.split("").reverse().join("");
};

BigInt.prototype.add = function(n) {
	var numTop, numBtm;

	if ( n.length > this.digits.length) {
		numTop = n;
		numBtm = this.digits;
	}
	else {
		numTop = this.digits;
		numBtm = n;
	}

	var carryDigit = 0;
	var finalSum = "";

	for(var i=0; i < numTop.length; i++) {
		var topDigit = parseInt(numTop[i]);
		var btmDigit = (numBtm[i]) ? parseInt(numBtm[i]) : 0;
		var digitSum = carryDigit + topDigit + btmDigit;

		carryDigit = (digitSum >= 10) ? 1 : 0;
		finalSum += (digitSum % 10);
	}
	if (carryDigit > 0)
		finalSum += carryDigit;

	var rval = new BigInt("");
	rval.setDigits(finalSum);
	return rval;
};
