const request = require('request')
const cfoData = require('../database/cfo/cfoData')
const async = require('async')
module.exports.generateCFODashboard = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let images = [];
            for (let i = 0; i < 5; i++) {
                let trend = [];
                trend.push(20);
                var body = JSON.stringify(
                    {
                        "metadata": { "X": "XLabel", "Y": "YLabel" },
                        "data": {
                            "title": 'cfo',
                            "measure": '30',
                            "change": '10',
                            "trend": trend,
                            "yoyComparison": '11'
                        }
                    })
                var options = {
                    'method': 'POST',
                    'url': 'https://visualsmicroservice.azurewebsites.net/trendtile2',
                    'headers': {
                        'Content-Type': 'application/json'
                    },
                    body: body
                };

                request(options, function (error, response) {
                    if (error) {
                        console.error(error);
                        if (images.length === 6) {
                            resolve(images);
                        }
                    } else {
                        images.push(response.body)
                        if (images.length === 6) {
                            resolve(images);
                        }
                    }
                });
            }
        } catch (error) {
            console.error(error);
            reject("error occured")
        }
    })
}