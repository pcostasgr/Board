export function getComponentDb() {
    return {
        lists: [
            {
                listid: 1,
                listTitle: "List 1",
                userid:1,
                cardData: [
                    {
                        id: 1,
                        title: "title1",
                        cardDate: "2017-6-15",
                        listItems: [
                            {
                                item: "1",
                                description: "list item 1",
                                done: 0
                            }, {
                                item: "2",
                                dsecription: "list item 2",
                                done: 1
                            }
                        ],
                        labelItems: []
                    }, {
                        id: 2,
                        title: "title2",
                        cardDate: "2017-5-21",
                        listItems: [
                            {
                                item: "1",
                                description: "list item 1",
                                done: 0
                            }, {
                                item: "2",
                                description: "list item 2",
                                done: 1
                            }, {
                                item: "3",
                                description: "list item 3",
                                done: 0
                            }
                        ],
                        labelItems: [
                            {
                                rows: [
                                    {
                                        labelitemid:1,
                                        color: "#9c0000",
                                        width: 50,
                                        height: 10,
                                        cardid:2
                                    }, {
                                        labelitemid:2,
                                        color: "#9c0000",
                                        width: 50,
                                        height: 10,
                                        cardid:2,
                                    }, {
                                        labelitemid:3,
                                        color: "#9c0000",
                                        width: 50,
                                        height: 10,
                                        cardid:2
                                    }, {
                                        labelitemid:4,
                                        color: "#9c0000",
                                        width: 50,
                                        height: 10,
                                        cardid:2
                                    }
                                ]
                            }, {
                                rows: [
                                    {
                                        labelitemid:5,
                                        color: "#9c0000",
                                        width: 50,
                                        height: 10,
                                        cardid:2
                                    }, {
                                        labelitemid:6,
                                        color: "#9c0000",
                                        width: 50,
                                        height: 10,
                                        cardid:2
                                    }, {
                                        labelitemid:7,
                                        color: "#9c0000",
                                        width: 50,
                                        height: 10,
                                        cardid:2
                                    }, {
                                        labelitemid:8,
                                        color: "#9c0000",
                                        width: 50,
                                        height: 10,
                                        cardid:2
                                    }
                                ]
                            }, {
                                rows: [
                                    {
                                        labelitemid:9,
                                        color: "#9c0000",
                                        width: 50,
                                        height: 10,
                                        cardid:2
                                    }
                                ]
                            }
                        ]
                    }, {
                        id: 3,
                        title: "title3",
                        cardDate: "2017-8-01",
                        listItems: [],
                        labelItems: [
                            {
                                rows: [
                                    {
                                        labelitemid:10,
                                        color: "#9c0000",
                                        width: 50,
                                        height: 10,
                                        cardid:2
                                    }, {
                                        labelitemid:11,
                                        color: "#9c0000",
                                        width: 50,
                                        height: 10,
                                        cardid:2
                                    }, {
                                        labelitemid:12,
                                        color: "#9c0000",
                                        width: 50,
                                        height: 10,
                                        cardid:2
                                    }, {
                                        labelitemid:13,
                                        color: "#9c0000",
                                        width: 50,
                                        height: 10,
                                        cardid:2
                                    }
                                ]
                            }, {
                                rows: [
                                    {
                                        labelitemid:14,
                                        color: "#9c0000",
                                        width: 50,
                                        height: 10,
                                        cardid:2
                                    }, {
                                        labelitemid:15,
                                        color: "#9c0000",
                                        width: 50,
                                        height: 10,
                                        cardid:2
                                    }, {
                                        labelitemid:16,
                                        color: "#9c0000",
                                        width: 50,
                                        height: 10,
                                        cardid:2
                                    }, {
                                        labelitemid:17,
                                        color: "#9c0000",
                                        width: 50,
                                        height: 10,
                                        cardid:2
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }, {
                listid: 2,
                listTitle: "List 2",
                userid:1,
                cardData: [
                    {
                        id: 4,
                        title: "title4",
                        cardDate: null,
                        listItems: [],
                        labelItems: []
                    }, {
                        id: 5,
                        title: "title5",
                        cardDate: "2017-5-15",
                        listItems: [
                            {
                                item: "1",
                                description: "list item 1",
                                done: 0
                            }, {
                                item: "2",
                                description: "list item 2",
                                done: 1
                            }, {
                                item: "3",
                                description: "list item 3",
                                done: 0
                            }
                        ],
                        labelItems: []
                    }, {
                        id: 6,
                        title: "title6",
                        cardDate: "2017-6-6",
                        listItems: [
                            {
                                item: "1",
                                description: "list item 1",
                                done: 0
                            }
                        ],
                        labelItems: [
                            {
                                rows: [
                                    {
                                        labelitemid:18,
                                        color: "#9c0000",
                                        width: 50,
                                        height: 10,
                                        cardid:2
                                    }, {
                                        labelitemid:19,
                                        color: "#9c0000",
                                        width: 50,
                                        height: 10,
                                        cardid:2
                                    }, {
                                        labelitemid:20,
                                        color: "#9c0000",
                                        width: 50,
                                        height: 10,
                                        cardid:2
                                    }, {
                                        labelitemid:21,
                                        color: "#9c0000",
                                        width: 50,
                                        height: 10,
                                        cardid:2
                                    }
                                ]
                            }
                        ]
                    }

                ]
            }

        ]
        ,
        cardData:{
            id:-1,
            title:"",
            cardDate:"",
            listItems:[],
            labelItems:[]
        }

    };
}

export function getCheckListsDb(cardid){
    return [{
            checkListId:1000,
            checkListTitle:"List Title",
            cardId:cardid,
            items:[
                {
                    itemListId:1
                    ,itemTitle:"Title 1"
                    ,ischecked:false
                    ,checkListId:1000
                },
                {
                    itemListId:2
                    ,itemTitle:"Title 2"
                    ,ischecked:true
                    ,checkListId:1000
                },
                {
                    itemListId:3
                    ,itemTitle:"Title 3"
                    ,ischecked:false
                    ,checkListId:1000
                }
            ]
        }];
}

export function getLabelItemsDb(cardId){
    return  [{
        labelitemid: 1,
        color: "#9c0000",
        width: 50,
        height: 10,
        cardid:2,
    }, {
        labelitemid: 2,
        color: "#9c0000",
        width: 50,
        height: 10,
        cardid:2,
    }, {
        labelitemid: 3,
        color: "#9c0000",
        width: 50,
        height: 10,
        cardid:2,
    }, {
        labelitemid: 4,
        color: "#9c0000",
        width: 50,
        height: 10,
        cardid:2,
    }, {
        labelitemid: 5,
        color: "#9c0000",
        width: 50,
        height: 10,
        cardid:2,
    }, {
        labelitemid: 6,
        color: "#9c0000",
        width: 50,
        height: 10,
        cardid:2
    }];
}

export function getComponentDb2() {
    return {
        listHeaders: [
            {
                listid: 1,
                listTitle: "List 1",
                CardDataIds: [1, 2, 3]
            }, {
                listid: 2,
                listTitle: "List 2",
                CardDataIds: [4, 5, 6]
            }
        ],
        cardData: [
            {
                id: 1,
                title: "title1",
                cardDate: "2017-6-15",
                listItems: [
                    1, 2
                ],
                labelItems: []
            }, {
                id: 2,
                title: "title2",
                cardDate: "2017-5-21",
                listItems: [
                    3, 4, 5
                ],
                labelItems: [
                    {
                        rows: [1, 2, 3, 4]
                    }, {
                        rows: [5, 6, 7, 8]
                    }, {
                        rows: [9]
                    }
                ]
            }, {
                id: 3,
                title: "title3",
                cardDate: "2017-8-01",
                listItems: [],
                labelItems: [
                    {
                        rows: [10, 11, 12, 13]
                    }, {
                        rows: [14, 15, 16, 17]
                    }
                ]
            }, {
                id: 4,
                title: "title4",
                cardDate: null,
                listItems: [],
                labelItems: []
            }, {
                id: 5,
                title: "title5",
                cardDate: "2017-5-15",
                listItems: [
                    6, 7, 8
                ],
                labelItems: [18,19,20,21]
            }, {
                id: 6,
                title: "title6",
                cardDate: "2017-6-6",
                listItems: [9],
                labelItems: []
            }
        ],
        listItems: [
            {
                item: 1,
                description: "list item 1",
                done: 0
            }, {
                item: 2,
                dsecription: "list item 2",
                done: 1
            }, {
                item: 3,
                description: "list item 1",
                done: 0
            }, {
                item: 4,
                description: "list item 2",
                done: 1
            }, {
                item: 5,
                description: "list item 3",
                done: 0
            }, {
                item: 6,
                description: "list item 1",
                done: 0
            }, {
                item: 7,
                description: "list item 2",
                done: 1
            }, {
                item: 8,
                description: "list item 3",
                done: 0
            }, {
                item: 9,
                description: "list item 1",
                done: 0
            }
        ],
        labelItemsRows: [
            {
                id: 1,
                color: "#9c0000",
                width: 50,
                height: 10
            }, {
                id: 2,
                color: "#9c0000",
                width: 50,
                height: 10
            }, {
                id: 3,
                color: "#9c0000",
                width: 50,
                height: 10
            }, {
                id: 4,
                color: "#9c0000",
                width: 50,
                height: 10
            }, {
                id: 5,
                color: "#9c0000",
                width: 50,
                height: 10
            }, {
                id: 6,
                color: "#9c0000",
                width: 50,
                height: 10
            }, {
                id: 7,
                color: "#9c0000",
                width: 50,
                height: 10
            }, {
                id: 8,
                color: "#9c0000",
                width: 50,
                height: 10
            }, {
                id: 9,
                color: "#9c0000",
                width: 50,
                height: 10
            }, {
                id: 10,
                color: "#9c0000",
                width: 50,
                height: 10
            }, {
                id: 11,
                color: "#9c0000",
                width: 50,
                height: 10
            }, {
                id: 12,
                color: "#9c0000",
                width: 50,
                height: 10
            }, {
                id: 13,
                color: "#9c0000",
                width: 50,
                height: 10
            }, {
                id: 14,
                color: "#9c0000",
                width: 50,
                height: 10
            }, {
                id: 15,
                color: "#9c0000",
                width: 50,
                height: 10
            }, {
                id: 16,
                color: "#9c0000",
                width: 50,
                height: 10
            }, {
                id: 17 ,
                color: "#9c0000",
                width: 50,
                height: 10
            },
            {
                id:18,
                color: "#9c0000",
                width: 50,
                height: 10
            }, {
                id:19,
                color: "#9c0000",
                width: 50,
                height: 10
            }, {
                id:20,
                color: "#9c0000",
                width: 50,
                height: 10
            }, {
                id:21,
                color: "#9c0000",
                width: 50,
                height: 10
            }
        ]
    };
}