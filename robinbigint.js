var reverseString = function(s) {
	return s.split("").reverse().join("");
};

var complement = function(n) {
	var digits = n;
	
	var result = "";

	var parsedFirstDigit = false;
	for(var i =0; i < digits.length; i++) {
		var currentDigit = parseInt(digits[i]);
		if (currentDigit === 0 && !parsedFirstDigit) {
			result += currentDigit;
			continue;
		}
		if (!parsedFirstDigit) {
			result += 10 - currentDigit;
			parsedFirstDigit = true;
		}
		else {
			result += 9 - currentDigit;
		}
	}

	return result;
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
	return this;
};

BigInt.prototype.getDigits = function() {
	return this.digits;
};

BigInt.prototype.human = function() {
	this.reduce();
	return reverseString(this.digits);
};

//Remove un-needed zeroes
BigInt.prototype.reduce = function() {
	var firstRealDigitPos = 0;
	for(var i = this.digits.length - 1; i >= 1; i--) {
		if (this.digits[i] !== "0") {
			firstRealDigitPos = i;
			break;
		}
	}
	this.digits = this.digits.substring(0, firstRealDigitPos + 1);
	return this;
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

	var newSign = 1;
	var tmpBigInput = new BigInt("");
	tmpBigInput.setDigits(nInput);
	if (tmpBigInput.human() === "0") {
		return this;
	}

	if ( this.lessthan(tmpBigInput) ) {
		newSign = -1; //Subtraction will yield negative number.
	}

	if (newSign > 0) {
		numTop = this.getDigits();
		numBtm = nInput;
	}
	else {
		numTop = nInput;
		numBtm = this.getDigits();
	}

	numBtm = complement(numBtm);
	
	var digitDiff = numTop.length - numBtm.length;
	for(var i =0; i < digitDiff; i++) {
		numBtm += "9"; //Pad with 9's
	}


	var bTop = (new BigInt("")).setDigits(numTop);
	var bBtm = (new BigInt("")).setDigits(numBtm);
	var bSum = bTop.add(bBtm);

	//Remove the trailing '1'
	var bSumDigits = bSum.getDigits();
	var bSumTrimmed = bSumDigits.substring(0, bSumDigits.length - 1);
	bSum.setDigits(bSumTrimmed);
	return bSum;

};

//Multiplication using recursive Karatsuba Algorithm.
BigInt.prototype.multiply = function(n) {
	var nInput, currentDigits;
	if (n instanceof BigInt) {
		nInput = n.getDigits();
	}
	else {
		nInput = reverseString(n);
	}
	
	currentDigits = this.getDigits();
	var maxLength = Math.max(nInput.length,currentDigits.length);
	if (maxLength <= 2) {
		var a = parseInt(reverseString(currentDigits));
		var b = parseInt(reverseString(nInput));
		if (isNaN(a)) a = 0;
		if (isNaN(b)) b = 0;

		var product = a * b;
		return new BigInt(product.toString());
	}

	var halfLength = Math.floor(maxLength / 2);
	var mPower = maxLength - halfLength;

	var x1,x0, y1,y0;
	x0 = (new BigInt("")).setDigits(currentDigits.substring(0, mPower));
	x1 = (new BigInt("")).setDigits(currentDigits.substring(mPower));
	y0 = (new BigInt("")).setDigits(nInput.substring(0,mPower));
	y1 = (new BigInt("")).setDigits(nInput.substring(mPower));

	var z0,z1,z2, xSum, ySum;
	z2 = x1.multiply(y1);
	z0 = x0.multiply(y0);

	xSum = x0.add(x1);
	ySum = y0.add(y1);
	z1 = xSum.multiply(ySum).subtract(z0).subtract(z2);

	//Pad with zeroes
	var z1Digits = z1.getDigits();
	var z2Digits = z2.getDigits();
	for(var i =0; i < mPower; i++) {
		z1Digits = "0" + z1Digits;
	}
	for(var i=0; i < mPower *2; i++) {
		z2Digits = "0" + z2Digits;
	}

	z1.setDigits(z1Digits);
	z2.setDigits(z2Digits);

	return z2.add(z1).add(z0).reduce();
	
};

