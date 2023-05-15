var tape = require('tape')
var pleaseUpgrade = require('./')

// Change process.version value
Object.defineProperty(process, 'version', { value: 'v10.0.0' })

// Mock process.exit and console.error
var exitCode = null
process.exit = function(code) {
  exitCode = code
}

var errorMessage = null
consoleError = console.error
console.error = function(msg) {
  errorMessage = msg
  consoleError(msg)
}

function test(name, cb) {
  // Before each
  exitCode = null
  errorMessage = null
  // Test
  tape(name, cb)
}

// Actual tests
test('>=1.2.0 should not exit', function(t) {
  pleaseUpgrade({
    name: 'Lorem Ipsum',
    engines: {
      node: '>=1.2.0'
    }
  })
  t.equal(exitCode, null)
  t.equal(errorMessage, null)
  t.end()
})

test('>=4 should not exit', function(t) {
  pleaseUpgrade({
    name: 'Lorem Ipsum',
    engines: {
      node: '>=4'
    }
  })
  t.equal(exitCode, null)
  t.equal(errorMessage, null)
  t.end()
})

test('>=4.0.0 should not exit', function(t) {
  pleaseUpgrade({
    name: 'Lorem Ipsum',
    engines: {
      node: '>=4.0.0'
    }
  })
  t.equal(exitCode, null)
  t.equal(errorMessage, null)
  t.end()
})

test('>=10.0.1 (patch) should exit', function(t) {
  pleaseUpgrade({
    name: 'Lorem Ipsum',
    engines: {
      node: '>=10.0.1'
    }
  })
  t.equal(exitCode, 1)
  t.equal(
    errorMessage,
    'Lorem Ipsum requires at least version 10.0.1 of Node, please upgrade'
  )
  t.end()
})

test('>=12 should exit', function(t) {
  pleaseUpgrade({
    name: 'Lorem Ipsum',
    engines: {
      node: '>=12'
    }
  })
  t.equal(exitCode, 1)
  t.equal(
    errorMessage,
    'Lorem Ipsum requires at least version 12.0.0 of Node, please upgrade'
  )
  t.end()
})

test('<1 should exit', function(t) {
  pleaseUpgrade({
    name: 'Lorem Ipsum',
    engines: {
      node: '<1'
    }
  })
  t.equal(exitCode, 1)
  t.equal(
    errorMessage,
    'Lorem Ipsum requires version range "<1" of Node, while currently on v10.0.0'
  )
  t.end()
})

test('>10 should exit', function(t) {
  pleaseUpgrade({
    name: 'Lorem Ipsum',
    engines: {
      node: '>10'
    }
  })
  t.equal(exitCode, 1)
  t.equal(
    errorMessage,
    'Lorem Ipsum requires at least version 11.0.0 of Node, please upgrade'
  )
  t.end()
})

test('>=12.0.0 should exit', function(t) {
  pleaseUpgrade({
    name: 'Lorem Ipsum',
    engines: {
      node: '>=12.0.0'
    }
  })
  t.equal(exitCode, 1)
  t.equal(
    errorMessage,
    'Lorem Ipsum requires at least version 12.0.0 of Node, please upgrade'
  )
  t.end()
})

test('should exit with custom code 0', function(t) {
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
  t.equal(exitCode, 0)
  t.equal(
    errorMessage,
    'Lorem Ipsum requires at least version 12.0.0 of Node, please upgrade'
  )
  t.end()
})

test('should exit with custom code 2', function(t) {
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
  t.equal(exitCode, 2)
  t.equal(
    errorMessage,
    'Lorem Ipsum requires at least version 12.0.0 of Node, please upgrade'
  )
  t.end()
})

test('should display custom message', function(t) {
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
  t.equal(exitCode, 1)
  t.equal(errorMessage, 'Required version is 12.0.0')
  t.end()
})
