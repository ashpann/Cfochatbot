const header = require('./header')

module.exports.detailCard = (data, labels, source, logo, cardTitle, buttonLabel) => {
    try {
        if (source === 'opportunity') {
            var valueofId = `[${data[labels[0].columnValue]}](https://ap8.salesforce.com/${data[labels[0].columnValue]})`
        } else {
            valueofId = data[labels[0].columnValue]
        }
        let color = "Default";
        if ((data[labels[4].columnValue].toLowerCase().trim() === 'won') || (data[labels[4].columnValue].toLowerCase().trim() === 'new') || (data[labels[4].columnValue].toLowerCase().trim() === 'delivered') || (data[labels[4].columnValue].toLowerCase().trim() === 'paid') || (data[labels[4].columnValue].toLowerCase().trim() === 'approved')) {
            color = "Good"
        }
        else if ((data[labels[4].columnValue].toLowerCase().trim() === 'lost') || (data[labels[4].columnValue].toLowerCase().trim() === 'cancelled') || (data[labels[4].columnValue].toLowerCase().trim() === 'held')) {
            color = "Attention"
        }
        else if ((data[labels[4].columnValue].toLowerCase().trim() === 'open') || (data[labels[4].columnValue].toLowerCase().trim() === 'existing') || (data[labels[4].columnValue].toLowerCase().trim() === 'active') || (data[labels[4].columnValue].toLowerCase().trim() === 'posted')) {
            color = "Warning"
        }
        var card = header.headerWithoutAccountName(logo, cardTitle);
        card['body'].push({
            "type": "Container",
            "separator": true,
            "items": [
                {
                    "type": "TextBlock",
                    "text": `${data[labels[2].columnValue]}`,
                    "spacing": "Default",
                    "wrap": true,
                    "size": "Medium"
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "verticalContentAlignment": "Center",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${labels[0].lableValue}`,
                                    "horizontalAlignment": "Left",
                                    "wrap": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": `${valueofId}`,
                                    "horizontalAlignment": "Left",
                                    "wrap": true,
                                    "spacing": "Small",
                                    "weight": "Bolder"
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "spacing": "Large",
                            "verticalContentAlignment": "Center",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${labels[1].lableValue}`,
                                    "horizontalAlignment": "Left",
                                    "wrap": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": `${data[labels[1].columnValue]}`,
                                    "horizontalAlignment": "Left",
                                    "wrap": true,
                                    "spacing": "Small",
                                    "weight": "Bolder"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "verticalContentAlignment": "Center",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${labels[3].lableValue}`,
                                    "horizontalAlignment": "Left",
                                    "wrap": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": `${data[labels[3].columnValue]}`,
                                    "horizontalAlignment": "Left",
                                    "wrap": true,
                                    "spacing": "Small",
                                    "weight": "Bolder"
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "spacing": "Large",
                            "verticalContentAlignment": "Center",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${labels[4].lableValue}`,
                                    "horizontalAlignment": "Left",
                                    "wrap": true
                                },
                                {
                                    "type": "TextBlock",
                                    "text": `${data[labels[4].columnValue]}`,
                                    "horizontalAlignment": "Left",
                                    "wrap": true,
                                    "color": `${color}`,
                                    "spacing": "Small",
                                    "weight": "Bolder"
                                }
                            ]
                        }
                    ]
                }
            ]
        })
        var length = labels.length - 5;
        if (length % 2 !== 0) {
            length = length - 1;
        }
        let i = 5;
        for (i = 5; i < labels.length; i++) {
            card['body'][2]["items"].push({
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "verticalContentAlignment": "Center",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": `${labels[i].lableValue}`,
                                "horizontalAlignment": "Left",
                                "wrap": true
                            },
                            {
                                "type": "TextBlock",
                                "text": `${data[labels[i].columnValue]}`,
                                "horizontalAlignment": "Left",
                                "wrap": true,
                                "spacing": "Small",
                                "weight": "Bolder"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "spacing": "Large",
                        "verticalContentAlignment": "Center",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": `${labels[++i].lableValue}`,
                                "horizontalAlignment": "Left",
                                "wrap": true
                            },
                            {
                                "type": "TextBlock",
                                "text": `${data[labels[i].columnValue]}`,
                                "horizontalAlignment": "Left",
                                "wrap": true,
                                "spacing": "Small",
                                "weight": "Bolder"
                            }
                        ]
                    }
                ]
            })
        }
        if ((labels.length - 5) % 2 !== 0) {
            card['body'][2]["items"].push({
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "verticalContentAlignment": "Center",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": `${labels[i].lableValue}`,
                                "horizontalAlignment": "Left",
                                "wrap": true
                            },
                            {
                                "type": "TextBlock",
                                "text": `${data[labels[i].columnValue]}`,
                                "horizontalAlignment": "Left",
                                "wrap": true,
                                "spacing": "Small",
                                "weight": "Bolder"
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "spacing": "Large",
                        "verticalContentAlignment": "Center",
                        "width": "stretch",
                        "items": [
                        ]
                    }
                ]
            })
        }
        if (buttonLabel) {
            card['body'].push({
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
                                        "title": `${buttonLabel}`,
                                        "id": `${buttonLabel}`,
                                        "data": {
                                            "action": `${buttonLabel}`,
                                            "id": `${valueofId}`
                                        }
                                    }
                                ]
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
