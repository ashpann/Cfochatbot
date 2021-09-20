var sql = require('mssql')

async function getSpendByHeadData() {
    return new Promise((resolve, reject) => {
        try {
            var request = new sql.Request();
            request.query(`select Head as name,Actual as value from [vPurchaseSpendHead] order by Actual desc`, function (error, recordset) {
                if (error) {
                    console.error(error);
                    reject("error occured")
                }
                else {
                    resolve(recordset.recordset);
                }
            });
        } catch (error) {
            console.error(error);
            reject("error occured")
        }
    })
}

async function getDirectIndirect() {
    return new Promise((resolve, reject) => {
        try {
            var request = new sql.Request();
            request.query(`select Direct,Indirect as InDirect from vPurchaseDirectIndirect`, function (error, recordset) {
                if (error) {
                    console.error(error);
                    reject("error occured")
                }
                else {
                    resolve(recordset.recordset[0]);
                }
            });
        } catch (error) {
            console.error(error);
            reject("error occured")
        }
    })
}

async function getplannedActual() {
    return new Promise((resolve, reject) => {
        try {
            var request = new sql.Request();
            request.query(`SELECT  [Period]
            ,[FinYear]
            ,[BUDGET]
            ,[ACTUAL] FROM [vwSpendBudAct]`, function (error, recordset) {
                if (error) {
                    console.error(error);
                    reject("error occured")
                }
                else {
                    resolve(recordset.recordset);
                }
            });
        } catch (error) {
            console.error(error);
            reject("error occured")
        }
    })
}

async function getOppPipelineData() {
    return new Promise((resolve, reject) => {
        try {
            var request = new sql.Request();
            request.query(`SELECT  [Stage]
            ,[Revenue]
            ,[stageOrder] FROM [BI_CONTENT].[PIPELINE] order by StageOrder`, function (error, recordset) {
                if (error) {
                    console.error(error);
                    reject("error occured")
                }
                else {
                    resolve(recordset.recordset);
                }
            });
        } catch (error) {
            console.error(error);
            reject("error occured")
        }
    })
}
module.exports = { getSpendByHeadData, getDirectIndirect, getplannedActual, getOppPipelineData }