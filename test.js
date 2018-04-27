var assert = require('assert')
var pleaseUpgrade = require('./')

Object.defineProperty(process, 'version', { value: 'v10.0.0' })

var count = 0

// Mock process exit
process.exit = function(code) {
  count = count + 1
}

function countShouldBe(expected) {
  assert.equal(count, expected)
}

/**
 * Mocked process.exit SHOULD NOT be called in these cases
 */

pleaseUpgrade({
  name: 'Lorem Ipsum',
  engines: {
    node: '>=1.2.0'
  }
})
countShouldBe(0)

pleaseUpgrade({
  name: 'Lorem Ipsum',
  engines: {
    node: '>=4.0.0'
  }
})
countShouldBe(0)

pleaseUpgrade({
  name: 'Lorem Ipsum',
  engines: {
    node: '>=4'
  }
})
countShouldBe(0)

/**
 * Mocked process.exit SHOULD be called in these cases
 */

// patch upgrade
pleaseUpgrade({
  name: 'Lorem Ipsum',
  engines: {
    node: '>=10.0.1'
  }
})
countShouldBe(1)

// major version
pleaseUpgrade({
  name: 'Lorem Ipsum',
  engines: {
    node: '>=12.0.0'
  }
})
countShouldBe(2)

// major version with different syntax
pleaseUpgrade({
  name: 'Lorem Ipsum',
  engines: {
    node: '>=12'
  }
})
countShouldBe(3)
