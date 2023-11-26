import { Block } from './types';
export declare class Blockchain {
    #private;
    private readonly difficulty;
    private powPrefix;
    constructor(difficulty?: number);
    private createGenesisBlock;
    private get lastBlock();
    get chains(): Block[];
    private getPreviousBlockHash;
    createBlock(data: any): Block['payload'];
    mineBlock(block: Block['payload']): {
        minedBlock: {
            header: {
                nonce: number;
                blockHash: string;
            };
            payload: {
                sequence: number;
                timestamp: number;
                data: any;
                previousHash: string;
            };
        };
        minedHash: string;
        shortHash: string;
        mineTime: number;
    };
    verifyBlock(block: Block): true | undefined;
    pushBlock(block: Block): Block[];
}
//# sourceMappingURL=blockchain.d.ts.map