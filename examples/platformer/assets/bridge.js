/**
 * Send message to the parent frame if this is an iframe (specifically for embedded preview).
 * @param {any} data
 */
function postParentMessage(data) {
  if (window.parent !== window) {
    window.parent.postMessage(data, '*')
  }
}

/**
 * Helper function to insert a `postParentMesssage` call into console function calls.
 * This will also send the printed information to the output channel if in embedded preview.
 * @param {string} type the type of console log (e.g. info, warn, error, etc.).
 */
function createConsoleOverride(type) {
  // Override console messages to allow the user to see console messages in the output channel (embedded preview only).
  const consoleOverrides = {
    ERROR: console.error,
    LOG: console.log,
    WARN: console.warn,
    INFO: console.info,
    CLEAR: console.clear,
  }
  return function (msg) {
    let stringifiedMsg = 'undefined'

    try {
      stringifiedMsg = JSON.stringify(msg)
      if (!stringifiedMsg) throw new Error('message is not in JSON format')
    } catch (err) {
      try {
        stringifiedMsg = msg.toString()
      } catch (err) {
        // noop
      }
    }

    const messagePayload = {
      type: type,
      data: stringifiedMsg,
    }
    postParentMessage({
      command: 'console',
      text: JSON.stringify(messagePayload),
    })
    // consoleOverrides[type].apply(console, arguments)
  }
}

/**
 * window load handler...
 */
const windowLoadHandler = () => {
  // postParentMessage('*** Hello from game bridge! ***')

  console.error = createConsoleOverride('ERROR')
  console.log = createConsoleOverride('LOG')
  console.warn = createConsoleOverride('WARN')
  console.info = createConsoleOverride('INFO')
  console.clear = createConsoleOverride('CLEAR')

  console.info({ message: 'GW rocks!' })
  // console.warn('>>> init as esm ..')
  // console.error('### error happened!')
}

// listen load event ...
windowLoadHandler()
