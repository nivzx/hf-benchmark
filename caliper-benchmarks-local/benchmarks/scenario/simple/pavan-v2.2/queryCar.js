'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class ReadLevelWorkload extends WorkloadModuleBase {
    constructor() {
        super();
        this.txIndex = 0;
    }

    async submitTransaction() {
        this.txIndex++;

        const location = 'Location' + this.txIndex;

        const args = {
            contractId: 'level', // Replace with your chaincode's contract ID
            contractVersion: '1', // Replace with your chaincode's version
            contractFunction: 'readLevel', // The function to call
            contractArguments: [location], // Arguments for the function
            timeout: 30,
            readOnly: true
        };

        await this.sutAdapter.sendRequests(args);
    }
}

function createWorkloadModule() {
    return new ReadLevelWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
