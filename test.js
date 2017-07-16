var assert = require("assert");
var pleaseUpgrade = require("./");

Object.defineProperty(process, "version", { value: "v4.3.2" });

var count = 0;

process.exit = function(code) {
  count = count + 1;
};

function countShouldBe(expected) {
  assert.equal(count, expected);
}

// Should not call process.exit
pleaseUpgrade({
  name: "PKG_NAME",
  engines: {
    node: ">=1.2.0"
  }
});
countShouldBe(0);

pleaseUpgrade({
  name: "PKG_NAME",
  engines: {
    node: ">=4.3.2"
  }
});
countShouldBe(0);

pleaseUpgrade({
  name: "PKG_NAME",
  engines: {
    node: ">=4"
  }
});
countShouldBe(0);

pleaseUpgrade({
  name: "PKG_NAME",
  engines: {
    node: "^4.3.0"
  }
});
countShouldBe(0);

pleaseUpgrade({
  name: "PKG_NAME",
  engines: {
    node: "~4.3.2"
  }
});
countShouldBe(0);

// Should call process.exit

pleaseUpgrade({
  name: "PKG_NAME",
  engines: {
    node: ">=4.3.3"
  }
});
countShouldBe(1);

pleaseUpgrade({
  name: "PKG_NAME",
  engines: {
    node: ">=6.0.0"
  }
});
countShouldBe(2);

pleaseUpgrade({
  name: "PKG_NAME",
  engines: {
    node: ">=8"
  }
});
countShouldBe(3);

pleaseUpgrade({
  name: "PKG_NAME",
  engines: {
    node: "^4.4.0"
  }
});
countShouldBe(4);

pleaseUpgrade({
  name: "PKG_NAME",
  engines: {
    node: "~4.3.3"
  }
});
countShouldBe(5);
