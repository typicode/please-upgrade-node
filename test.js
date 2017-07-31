const assert = require("assert");
const mock = require('mock-require')
const pleaseUpgrade = require("./");

Object.defineProperty(process, "version", { value: "v4.0.0" });

const count = 0;
const name = 'Lorem Ipsum'

process.exit = function (code) {
  count = count + 1;
};

function countShouldBe(expected) {
  assert.equal(count, expected);
}

// Should not call process.exit
mock('./package.json', {
  name: name,
  engines: {
    node: ">=1.2.0"
  }
})
pleaseUpgrade();
countShouldBe(0);

mock('./package.json', {
  name: name,
  engines: {
    node: ">=4.0.0"
  }
});
pleaseUpgrade();
countShouldBe(0);

mock('./package.json', {
  name: name,
  engines: {
    node: ">=4"
  }
});
pleaseUpgrade();
countShouldBe(0);

// Should call process.exit

mock('./package.json', {
  name: name,
  engines: {
    node: ">=4.0.1"
  }
});
pleaseUpgrade();
countShouldBe(1);

mock('./package.json', {
  name: name,
  engines: {
    node: ">=6.0.0"
  }
});
pleaseUpgrade();
countShouldBe(2);

mock('./package.json', {
  name: name,
  engines: {
    node: ">=8"
  }
});
pleaseUpgrade();
countShouldBe(3);

// Should support pkgDir

mock('../package.json', {
  name: name,
  engines: {
    node: ">=8"
  }
});
pleaseUpgrade('..');
countShouldBe(4);
