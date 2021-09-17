const header = require('./header')
const errorMessage = require('../../utility/config').errorMessage
module.exports.itemListCard = (data, logo, cardTitle, action) => {

    try {
        var card = header.headerWithoutAccountName(logo, cardTitle);
        for (let i = 0; i < data.length; i++) {
            let color = "Default";
            if ((data[i].Status.toLowerCase().trim() === 'won') || (data[i].Status.toLowerCase().trim() === 'new') || (data[i].Status.toLowerCase().trim() === 'delivered') || (data[i].Status.toLowerCase().trim() === 'paid') || (data[i].Status.toLowerCase().trim() === 'approved')) {
                color = "Good"
            }
            else if ((data[i].Status.toLowerCase().trim() === 'lost') || (data[i].Status.toLowerCase().trim() === 'cancelled') || (data[i].Status.toLowerCase().trim() === 'held')) {
                color = "Attention"
            }
            else if ((data[i].Status.toLowerCase().trim() === 'open') || (data[i].Status.toLowerCase().trim() === 'existing') || (data[i].Status.toLowerCase().trim() === 'active') || (data[i].Status.toLowerCase().trim() === 'posted')) {
                color = "Warning"
            }
            card['body'].push(
                {
                    "type": "Container",
                    "separator": true,
                    "items": [
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "width": "stretch",
                                    "type": "Column",
                                    "items": [
                                        {
                                            "text": `${data[i].Description}`,
                                            "type": "TextBlock",
                                            "size": "Medium",
                                            "wrap": true
                                        },
                                        {
                                            "type": "ColumnSet",
                                            "columns": [
                                                {
                                                    "width": "stretch",
                                                    "type": "Column",
                                                    "items": [
                                                        {
                                                            "text": `${data[i].date}`,
                                                            "type": "TextBlock",
                                                            "wrap": true,
                                                            "size": "Small"
                                                        }
                                                    ],
                                                    "verticalContentAlignment": "Center",
                                                    "spacing": "Small"
                                                },
                                                {
                                                    "width": "stretch",
                                                    "type": "Column",
                                                    "verticalContentAlignment": "Center",
                                                    "items": [
                                                        {
                                                            "type": "TextBlock",
                                                            "wrap": true,
                                                            "size": "Small",
                                                            "text": `${data[i].Status}`,
                                                            "color": color,
                                                            "horizontalAlignment": "Center"
                                                        }
                                                    ],
                                                    "spacing": "Small"
                                                },
                                                {
                                                    "width": "stretch",
                                                    "type": "Column",
                                                    "verticalContentAlignment": "Center",
                                                    "spacing": "Small",
                                                    "items": [
                                                        {
                                                            "text": `${data[i].Amount}`,
                                                            "type": "TextBlock",
                                                            "wrap": true,
                                                            "weight": "Bolder",
                                                            "horizontalAlignment": "Right"
                                                        }
                                                    ]
                                                }
                                            ],
                                            "spacing": "Default"
                                        }
                                    ]
                                },
                                {
                                    "width": "auto",
                                    "type": "Column",
                                    "verticalContentAlignment": "Bottom",
                                    "spacing": "Medium",
                                    "items": [
                                        {
                                            "text": "\u27a4",
                                            "type": "TextBlock",
                                            "horizontalAlignment": "Right",
                                            "color": "Accent"
                                        }
                                    ]
                                }
                            ],
                            "selectAction": {
                                "type": "Action.Submit",
                                "data": {
                                    "id": `${data[i].id}`,
                                    "action": `${action}`
                                }
                            }
                        }
                    ]
                }
            )
        }
        return card;
    } catch (error) {
        console.error(error);
        return errorMessage
    }
}
