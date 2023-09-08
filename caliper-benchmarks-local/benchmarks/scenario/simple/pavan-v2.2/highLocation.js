'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class HighLevelWorkload extends WorkloadModuleBase {
    constructor() {
        super();
        this.txIndex = 0;
    }

    async submitTransaction() {
        this.txIndex++;

        const args = {
            contractId: 'level', // Replace with your chaincode's contract ID
            contractVersion: '1', // Replace with your chaincode's version
            contractFunction: 'getHighLocations', // The function to call
            contractArguments: ['-30'], // Arguments for the function
            timeout: 30
        };

        await this.sutAdapter.sendRequests(args);
    }
}

function createWorkloadModule() {
    return new HighLevelWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
