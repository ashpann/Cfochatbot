const logos = require('../utility/logos')
const personaList = require('../utility/config').personaList
module.exports.cardToDisplay = (userName) => {
    try {
        var card = {
            "type": "AdaptiveCard",
            "version": "1.0",
            "body": [
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "auto",
                            "horizontalAlignment": "Right",
                            "verticalContentAlignment": "Center",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": "Hello ",
                                    "wrap": true,
                                    "weight": "Bolder"
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": "auto",
                            "spacing": "small",
                            "horizontalAlignment": "Right",
                            "verticalContentAlignment": "Center",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "size": "Medium",
                                    "text": `${userName}`,
                                    "wrap": true,
                                    "weight": "Bolder",
                                    "color": "Accent"
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "spacing": "none",
                            "verticalContentAlignment": "Center",
                            "horizontalAlignment": "Left",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": ", Please select a persona",
                                    "wrap": true,
                                    "weight": "Bolder"
                                }
                            ]
                        }
                    ]
                }
            ],
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
        }
        for (let i = 0; i < personaList.length; i++) {
            card['body'].push({
                "type": "Container",
                "items": [
                    {
                        "type": "ColumnSet",
                        "columns": [
                            {
                                "type": "Column",
                                "width": "auto",
                                "items": [
                                    {
                                        "type": "Image",
                                        "altText": "",
                                        "url": `${logos[personaList[i].logo]}`,
                                        "size": "Small",
                                        "style": "Person",
                                        "backgroundColor": "white"
                                    }
                                ],
                                "verticalContentAlignment": "Center"
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
                                                "title": `${personaList[i].nameToDisplay}`,
                                                "data": {
                                                    "action": `${personaList[i].nameToDisplay}`
                                                }
                                            }
                                        ]
                                    }
                                ],
                                "verticalContentAlignment": "Center"
                            }
                        ]
                    }
                ]
            })
        }
        return card
    } catch (error) {
        console.error(error);
        return "error occured"
    }
}