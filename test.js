var tape = require('tape')
var pleaseUpgrade = require('./')

// Change process.version value
Object.defineProperty(process, 'version', { value: 'v10.0.0' })

var errorMessage = null
consoleError = console.error
console.error = function(msg) {
  errorMessage = msg
  consoleError(msg)
}

function test(name, cb) {
  // Before each
  process.exitCode = null
  errorMessage = null
  // Test
  tape(name, cb)
}

// Actual tests
test('>=1.2.0 should not throw', function(t) {
  pleaseUpgrade({
    name: 'Lorem Ipsum',
    engines: {
      node: '>=1.2.0'
    }
  })
  t.equal(process.exitCode, null)
  t.equal(errorMessage, null)
  t.end()
})

test('>=4 should not throw', function(t) {
  pleaseUpgrade({
    name: 'Lorem Ipsum',
    engines: {
      node: '>=4'
    }
  })
  t.equal(process.exitCode, null)
  t.equal(errorMessage, null)
  t.end()
})

test('>=4.0.0 should not throw', function(t) {
  pleaseUpgrade({
    name: 'Lorem Ipsum',
    engines: {
      node: '>=4.0.0'
    }
  })
  t.equal(process.exitCode, null)
  t.equal(errorMessage, null)
  t.end()
})

test('>=10.0.1 (patch) should throw', function(t) {
  t.throws(function() {
    pleaseUpgrade({
      name: 'Lorem Ipsum',
      engines: {
        node: '>=10.0.1'
      }
    })
  })

  t.equal(process.exitCode, 1)
  t.equal(
    errorMessage,
    'Lorem Ipsum requires at least version 10.0.1 of Node, please upgrade'
  )
  t.end()
})

test('>=12 should throw', function(t) {
  t.throws(function() {
    pleaseUpgrade({
      name: 'Lorem Ipsum',
      engines: {
        node: '>=12'
      }
    })
  })

  t.equal(process.exitCode, 1)
  t.equal(
    errorMessage,
    'Lorem Ipsum requires at least version 12 of Node, please upgrade'
  )
  t.end()
})

test('>=12.0.0 should throw', function(t) {
  t.throws(function() {
    pleaseUpgrade({
      name: 'Lorem Ipsum',
      engines: {
        node: '>=12.0.0'
      }
    })
  })

  t.equal(process.exitCode, 1)
  t.equal(
    errorMessage,
    'Lorem Ipsum requires at least version 12.0.0 of Node, please upgrade'
  )
  t.end()
})

test('should exit with custom code 0', function(t) {
  t.throws(function() {
    pleaseUpgrade(
      {
        name: 'Lorem Ipsum',
        engines: {
          node: '>=12.0.0'
        }
      },
      {
        exitCode: 0
      }
    )
  })

  t.equal(process.exitCode, 0)
  t.equal(
    errorMessage,
    'Lorem Ipsum requires at least version 12.0.0 of Node, please upgrade'
  )
  t.end()
})

test('should exit with custom code 2', function(t) {
  t.throws(function() {
    pleaseUpgrade(
      {
        name: 'Lorem Ipsum',
        engines: {
          node: '>=12.0.0'
        }
      },
      {
        exitCode: 2
      }
    )
  })

  t.equal(process.exitCode, 2)
  t.equal(
    errorMessage,
    'Lorem Ipsum requires at least version 12.0.0 of Node, please upgrade'
  )
  t.end()
})

test('should display custom message', function(t) {
  t.throws(function() {
    pleaseUpgrade(
      {
        name: 'Lorem Ipsum',
        engines: {
          node: '>=12.0.0'
        }
      },
      {
        message: function(requiredVersion) {
          return 'Required version is ' + requiredVersion
        }
      }
    )
  })

  t.equal(process.exitCode, 1)
  t.equal(errorMessage, 'Required version is 12.0.0')
  t.end()
})
