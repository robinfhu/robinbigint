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

b = new BigInt("0");
b = b.add(new BigInt("000"));
ASSERT("Test add 5", b.human(), "0");


var d = complement("274201");
ASSERT("Test comp", d, "825798");
d = complement("0");
ASSERT("Test comp 2", d, "0");
d = complement("0071");
ASSERT("Test comp 3", d, "0038");

var comp = c.equals("102472");
ASSERT("Test equals", comp, true);

comp = c.lessthan("102500");
ASSERT("Test less than", comp, true);

comp = c.lessthan("456");
ASSERT("Test less than 2", comp, false);

comp = c.greaterthan("102471");
ASSERT("Test greater than", comp, true);

b = new BigInt("450098");
c = new BigInt("98");
d = b.subtract(c);
ASSERT("Test subtraction 1", d.human(), "450000");
d = b.subtract(new BigInt("0"));
ASSERT("Test subtraction 2", d.human(), "450098");
d = b.subtract(new BigInt("450098"));
ASSERT("Test subtraction 3", d.human(), "0");
d = b.subtract(new BigInt("350100"));
ASSERT("Test subtraction 4", d.human(), "99998");

