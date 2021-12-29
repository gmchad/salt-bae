# salt-bae

### Background
Ever wanted to deploy a smart contract that had a cool address like `0xDEADBEEF...` in it? This is possible with the [CREATE2](https://eips.ethereum.org/EIPS/eip-1014) EVM opcode.

The formula follows: 
```
address = keccak256( 0xff ++ address ++ salt ++ keccak256(init_code))[12:]
```
**address** - deployer factory contract address  
**salt** - random 32 byte string (what this code finds for you  
**init code** - bytecode of contract to be deployed by factory  

### Usage
```
node index.js [deployAddress] [byteCodeHash] [start] [target]
```

**[deployAddress]** -  deployer factory contract address   
**[byteCodeHash]** - hashed bytecode  
**[start]** - target start index  
**[target]** - hex substring the address should contain  

### Example
```
node index.js 0xEd2cf286D2DaA16cE4B34b6029F805647309426C 0x3d62012120f6a3aa34878aa91e0c7cf72d5ffc0e8f46cceebef78f45d05844f2 0 c0de42
```
This will generate address `0xc0De423eA0845A6a4216A4462C89CFb7e7C6345e` with a salt of `0x0000000000000000000000000000000000000000000000000000000001b5ac6b` at the 
`28683371`th iteration
