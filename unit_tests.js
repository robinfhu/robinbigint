//Unit tests for the BigInt class.
// By Robin Hu
// March 11, 2013
//

var ASSERT = function(name, actual, expected) {
	if (actual === expected) {
		console.log("Test: " + name + " passed.");
	}
	else {
		console.log("Test: " + name + " failed. Expected: " + expected + ". Actual: " + actual);
	}
};

var b = new BigInt("");
ASSERT("Test1", b.human(), "0");
b = new BigInt("1234");
ASSERT("Test2", b.human(), "1234");
var c = b.add("1234");
ASSERT("Test Basic Add", c.human(), "2468");
c = c.add("3");
ASSERT("Test Add 2", c.human(), "2471");
c = c.add(new BigInt("20000"));
ASSERT("Test Add 3", c.human(), "22471");
c = c.add(new BigInt("80001"));
ASSERT("Test Add 4", c.human(), "102472");
var d = complement(c.getDigits());
ASSERT("Test comp", d.human(), "897528");

var comp = c.equals("102472");
ASSERT("Test equals", comp, true);

comp = c.lessthan("102500");
ASSERT("Test less than", comp, true);

comp = c.lessthan("456");
ASSERT("Test less than 2", comp, false);

comp = c.greaterthan("102471");
ASSERT("Test greater than", comp, true);
