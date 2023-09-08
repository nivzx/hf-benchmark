'use strict';

module.exports.info = 'writing signal data';
const { v1: uuidv4 } = require('uuid');

let bc, contx;
var txnPerBatch = 1;

module.exports.init = function (blockchain, context, args) {
    if (!args.hasOwnProperty('txnPerBatch')) {
        args.txnPerBatch = 1;
    }
    txnPerBatch = args.txnPerBatch;
    bc = blockchain;
    contx = context;

    return Promise.resolve();
};

function generateWorkload() {
    let workload = [];
    for (let i = 0; i < txnPerBatch; i++) {
        const location = 'Location_' + uuidv4();
        const level = Math.random() * 100;

        workload.push({
            chaincodeFunction: 'writeLevel',
            chaincodeArguments: [location, level.toString()],
        });
    }
    return workload;
}

module.exports.run = function () {
    let args = generateWorkload();
    return bc.invokeSmartContract(contx, 'level', '1', args); // Replace with actual contract ID and version
};

module.exports.end = function () {
    return Promise.resolve();
};
