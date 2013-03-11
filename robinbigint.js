var reverseString = function(s) {
	return s.split("").reverse().join("");
};

var complement = function(n) {
	var digits = n;
	
	var result = "";

	for(var i =0; i < digits.length; i++) {
		if (i === 0) {
			result += 10 - parseInt(digits[i]);
		}
		else {
			result += 9 - parseInt(digits[i]);
		}
	}

	var rval = new BigInt("");
	rval.setDigits(result);
	return rval;
};

function BigInt(n) {
	if (n.length === 0) {
		this.digits = "0";
	}
	else {
		this.digits = reverseString(n);
	}
	this.sign = 1;
}

BigInt.prototype.setDigits = function(n) {
	this.digits = n;
};

BigInt.prototype.getDigits = function() {
	return this.digits;
};

BigInt.prototype.human = function() {
	return reverseString(this.digits);
};


BigInt.prototype.compare = function(n) {
	var nInput;
	if (n instanceof BigInt) {
		nInput = n.getDigits();
	}
	else {
		nInput = reverseString(n);
	}

	var currentDigits = this.getDigits();
	var maxLength = Math.max(currentDigits.length, nInput.length);
	var result = 0;
	for(var i = maxLength - 1; i >= 0; i--) {
		var a = (currentDigits[i]) ? parseInt(currentDigits[i]) : 0;
		var b = (nInput[i]) ? parseInt(nInput[i]) : 0;
		if ( a < b ) {
			return -1;
		}
		else if (a > b) {
			return 1;
		}
		else {
			continue;
		}
	}
	return result;
};

BigInt.prototype.equals = function(n) {
	return 0 === this.compare(n);
};

BigInt.prototype.lessthan = function(n) {
	return this.compare(n) < 0;
};

BigInt.prototype.greaterthan = function(n) {
	return this.compare(n) > 0;
};

BigInt.prototype.add = function(n) {
	var numTop, numBtm, nInput;

	if (n instanceof BigInt) {
		nInput = n.getDigits();
	}
	else {
		nInput = reverseString(n);
	}

	numTop = this.getDigits();
	numBtm = nInput;

	var maxLength = Math.max(numTop.length,numBtm.length);

	var carryDigit = 0;
	var finalSum = "";

	for(var i=0; i < maxLength; i++) {
		var topDigit = (numTop[i]) ? parseInt(numTop[i]) : 0;
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

BigInt.prototype.subtract = function(n) {
	var numTop, numBtm, nInput;

	if (n instanceof BigInt) {
		nInput = n.getDigits();
	}
	else {
		nInput = reverseString(n);
	}

	
};

