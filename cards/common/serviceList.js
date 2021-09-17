const config = require('../../utility/config')

module.exports.cardToDisplay = (serviceList) => {
    try {
        var length = serviceList.length;

        if (length % 2 !== 0) {
            length = length - 1
        }
        var card = {
            "type": "AdaptiveCard",
            "version": "1.0",
            "body": [
                {
                    "type": "TextBlock",
                    "text": `${config.cardTitle.accountManagerServiceList}`,
                    "horizontalAlignment": "Left",
                    "weight": "Bolder"
                }
            ],
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
        }
        let i = 0;
        for (i = 0; i < length; i += 2) {
            card['body'].push({
                "type": "Container",
                "items": [
                    {
                        "type": "ColumnSet",
                        "columns": [
                            {
                                "type": "Column",
                                "width": "stretch",
                                "items": [
                                    {
                                        "type": "ActionSet",
                                        "actions": [
                                            {
                                                "type": "Action.Submit",
                                                "title": `${serviceList[i]}`,
                                                "data": {
                                                    "action": `${serviceList[i]}`
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "Column",
                                "width": "stretch",
                                "items": [
                                    {
                                        "type": "ActionSet",
                                        "actions": [
                                            {
                                                "type": "Action.Submit",
                                                "title": `${serviceList[i + 1]}`,
                                                "data": {
                                                    "action": `${serviceList[i + 1]}`
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            })
        }
        if (serviceList.length % 2 !== 0) {
            card['body'].push(
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "ActionSet",
                                    "actions": [
                                        {
                                            "type": "Action.Submit",
                                            "title": `${serviceList[i]}`,
                                            "data": {
                                                "action": `${serviceList[i]}`
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            )
        }
        return card
    } catch (error) {
        console.error(error);
        return "error occured"
    }

}