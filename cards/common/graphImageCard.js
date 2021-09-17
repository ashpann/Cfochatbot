var header = require('./header')
var graphData = require('../../data/database/common/graphData')
var imageApi = require('../../data/api/graphApi')
const config = require('../../utility/config')
const genImage = require('./generateSpendbyGraphImage')
module.exports.graphImage = async (logo, cardTitle) => {
    try {
        var card = header.headerWithoutAccountName(logo, cardTitle)
        if (cardTitle === config.purchaseManagerServiceList[0]) {
            var data = await graphData.getSpendByHeadData();
            // var image = await imageApi.spendByHeadImage(data);
            return genImage.generateImage(data, card)
        }
        else if (cardTitle === config.purchaseManagerServiceList[1]) {
            var data = await graphData.getDirectIndirect();
            var image = await imageApi.directIndirectImage(data);
        }
        else if (cardTitle === config.purchaseManagerServiceList[2]) {
            var data = await graphData.getplannedActual();
            var image = await imageApi.plannedActualImage(data);
        }
        card['body'].push({
            "type": "Image",
            "altText": "Spend by Heads",
            "url": `data:image/png;base64,${image}`
        })
        return card;
    } catch (error) {
        console.error(error);
    }
}
