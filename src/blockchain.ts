import { hash, isHashProofed } from './helpers';
import { Block } from './types';

export class Blockchain {
   #chains: Block[] = [];
   private powPrefix = '0';

   constructor(private readonly difficulty: number = 4) {
      this.#chains.push(this.createGenesisBlock())
   }

   private createGenesisBlock(): Block {
      const header = {
         nonce: 0,
         blockHash: '',
      }
      const payload = {
         sequence: 0,
         timestamp: +new Date(),
         data: 'Genesis block',
         previousHash: ''
      };

      return { header, payload }
   }

   private get lastBlock(): Block {
      const chains = this.#chains;
      return chains[chains.length - 1]
   }

   get chains(): Block[] {
      return this.#chains
   }

   private getPreviousBlockHash(): string {
      return this.lastBlock.header.blockHash
   }

   createBlock(data: any): Block['payload'] {
      const newBlock: Block['payload'] = {
         sequence: this.lastBlock.payload.sequence + 1,
         timestamp: +new Date(),
         data,
         previousHash: this.getPreviousBlockHash()
      };

      console.log(`Created block ${newBlock.sequence}: ${JSON.stringify(newBlock, null, 3)}`);
      return newBlock;
   }

   mineBlock(block: Block['payload']) {
      let nonce = 0;
      let startTime = +new Date();

      while (true) {
         const blockHash = hash(JSON.stringify(block));
         const proofingHash = hash(blockHash + nonce);
         const isHashProofOfWork = isHashProofed({
            hash: proofingHash,
            difficulty: this.difficulty,
            prefix: this.powPrefix
         });

         if (isHashProofOfWork) {
            const endTime = +new Date();
            const shortHash = blockHash.slice(0, 12);
            const mineTime = (endTime - startTime) / 1000;

            console.log(`Mined block ${block.sequence} in ${mineTime} seconds. Hash: ${shortHash} (${nonce} attempts)`)
            return {
               minedBlock: {
                  header: {
                     nonce,
                     blockHash
                  },
                  payload: { ...block }
               },
               minedHash: proofingHash,
               shortHash,
               mineTime
            }
         }

         nonce++;
      }
   }

   verifyBlock(block: Block): true | undefined {
      if (block.payload.previousHash !== this.getPreviousBlockHash()) {
         console.error(`Invalid block #${block.payload.sequence}: Previous block hash is "${this.getPreviousBlockHash().slice(0, 12)}" not "${block.payload.previousHash.slice(0, 12)}"`)
         return;
      }

      const isHashProofOfWork = isHashProofed({
         hash: hash(hash(JSON.stringify(block.payload)) + block.header.nonce),
         difficulty: this.difficulty,
         prefix: this.powPrefix
      });
      if (!isHashProofOfWork) {
         console.error(`Invalid block #${block.payload.sequence}: Hash is not proofed, nonce ${block.header.nonce} is not valid`)
         return;
      }

      return true
   }

   pushBlock(block: Block): Block[] {
      if (this.verifyBlock(block)) this.#chains.push(block);

      console.log(`Pushed block #${JSON.stringify(block, null, 3)}`)
      return this.#chains;
   }
}
