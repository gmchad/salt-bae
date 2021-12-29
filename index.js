// Inspiration: https://hackernoon.com/using-ethereums-create2-nw2137q7

const eth = require('ethereumjs-util')

const args = process.argv.slice(2)
var deployAddress = args[0]
var byteCode = args[1]
var start = args[2]
var target = args[3]

if (!deployAddress || !byteCode || !start || !target) {
   console.log("usage: [deployAddress] [byteCode] [start] [target]")
   return
}

console.log("deployAddress: " + deployAddress)
console.log("byteCode: " + byteCode)
console.log("start: " + start)
console.log("target: " + target)

// split off the 0x
deployAddress = "ff".concat(deployAddress.slice(2))
byteCode = byteCode.slice(2)

console.log("deployAddress: " + deployAddress)
console.log("byteCode: " + byteCode)

var start = new Date()

// Let's hope we find a salt quick :)
for (var i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
   // 1. Convert i to hex, and it pad to 32 bytes:
   var salt = i.toString(16).padStart(64, '0')

   // 2. Concatenate this between the other 2 strings
   var concatString = deployAddress.concat(salt).concat(byteCode)

   // 3. Hash the resulting string
   var hash = eth.keccak256(Buffer.from(concatString, "hex"))
   var hexhash = eth.bufferToHex(hash)

   // 4. Remove leading 0x and 12 bytes to get address
   var address = hexhash.substring(26);

   // 5. Check if the result contains target at position
   if (address.substring(0, target.length) === target) {
      console.info('Total Execution time: %dms', new Date() - start)
      console.log("🧂 Found Salt: " + "0x"+salt)
      console.log("Address: " + "0x"+address)
      break
   }

   if (i % 100000 == 0) {
      console.log('Iteration: %d \t Total Execution time: %dms', i, new Date() - start)
   }
}