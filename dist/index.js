"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockchain_1 = require("./blockchain");
const blockchain = new blockchain_1.Blockchain(Number(process.argv[2] || 4));
const blockNumber = +process.argv[3] || 10;
let chains = blockchain.chains;
for (let i = 1; i <= blockNumber; i++) {
    const block = blockchain.createBlock(`Block ${i}`);
    const mineInfo = blockchain.mineBlock(block);
    chains = blockchain.pushBlock(mineInfo.minedBlock);
}
console.log('--- GENERATED CHAIN ---\n');
console.log(chains);
//# sourceMappingURL=index.js.map