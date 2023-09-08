'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class SignalDataWorkload extends WorkloadModuleBase {
    constructor() {
        super();
        this.txIndex = 0;
    }

    async submitTransaction() {
        this.txIndex++;

        const location = 'Location' + this.txIndex;
        const level = Math.random() * -100; // Generate a random level value

        const args = {
            contractId: 'level', // Replace with your chaincode's contract ID
            contractVersion: 'v1', // Replace with your chaincode's version
            contractFunction: 'writeLevel', // The function to call
            contractArguments: [location, level.toString()], // Arguments for the function
            timeout: 30
        };

        await this.sutAdapter.sendRequests(args);
    }
}

function createWorkloadModule() {
    return new SignalDataWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
