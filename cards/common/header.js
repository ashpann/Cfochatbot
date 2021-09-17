const logos = require('../../utility/logos')

exports.headerWithAccountName = (logoToDisplay, text, accountName) => {
    var card = {
        "type": "AdaptiveCard",
        "version": "1.0",
        "body": [
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "Image",
                                "altText": "Logo of Celebal Technologies",
                                "horizontalAlignment": "Left",
                                "url": `${logos.CelebalTech}`,
                                "size": "Small"
                            }
                        ],
                        "verticalContentAlignment": "Center"
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "Image",
                                "altText": "logo of SAP",
                                "horizontalAlignment": "Right",
                                "url": `${logos[logoToDisplay]}`,
                                "size": "Small"
                            }
                        ],
                        "verticalContentAlignment": "Center"
                    }
                ]
            },
            {
                "type": "Container",
                "items": [
                    {
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
                                                "type": "TextBlock",
                                                "text": `${text}`,
                                                "wrap": true,
                                                "weight": "Bolder",
                                                "size": "Large",
                                                "color": "Dark",

                                            }
                                        ]
                                    },
                                    {
                                        "type": "Column",
                                        "width": "stretch",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "text": `[${accountName}]`,
                                                "wrap": true,
                                                "color": "Accent",
                                                "height": "stretch",
                                                "weight": "Bolder",
                                                "size": 'Large',
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
    }
    return card;
}

exports.headerWithoutAccountName = (logoToDisplay, text) => {
    var card = {
        "type": "AdaptiveCard",
        "version": "1.1",
        "body": [
            {
                "type": "ColumnSet",
                "columns": [
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "Image",
                                "altText": "Logo of Celebal Technologies",
                                "horizontalAlignment": "Left",
                                "url": `${logos.CelebalTech}`,
                                "size": "Small"
                            }
                        ],
                        "verticalContentAlignment": "Center"
                    },
                    {
                        "type": "Column",
                        "width": "stretch",
                        "items": [
                            {
                                "type": "Image",
                                "altText": "logo of SAP",
                                "horizontalAlignment": "Right",
                                "url": `${logos[logoToDisplay]}`,
                                "size": "Small"
                            }
                        ],
                        "verticalContentAlignment": "Center"
                    }
                ]
            },
            {
                "type": "Container",
                "items": [
                    {
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
                                                "type": "TextBlock",
                                                "text": `${text}`,
                                                "wrap": true,
                                                "weight": "Bolder",
                                                "size": "Large",
                                                "color": "Dark",

                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
    }
    return card;
}