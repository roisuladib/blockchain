export interface Block {
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
}
//# sourceMappingURL=types.d.ts.map