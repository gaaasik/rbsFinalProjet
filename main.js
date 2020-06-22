let assessment = [
    {numberAssessment: 1, nameAssessment: "Собеседование раз", currentState: "Создано",dateAssessment:"",timeAssessment:""}
]
let DataAssessment=[
    {nameMan:"Иван",secondNameMan:"Иванов",resultAssessment:"Ответил на 20 вопросов",numberAssessment: 1}
    ]

let Emploee =[
    {nameEmploee:"",secondNameEmploee:"",experienceEmploee:"",positionEmploee:""}
]
let viewIS = true;


function viewResults() {
console.log("View Result")
}

function deleteActivity() {
    console.log("dellllll")
}

webix.ready(function () {
    webix.ui({
            rows: [{
                view: "toolbar", id: "myToolbar",
                cols: [
                    {view: "template", type: "header", height: 100, template: "шапка "},
                    {
                        view: "template",
                        id: "delBtn",
                        hidden: true,
                        template: "Удалить Мероприятие",
                        css: "delActivityClass",
                        width: 100,

                        onClick: {
                            "delActivityClass": function () {
                                deleteActivity();

                            }
                        }
                    }

                    , {
                        view: "template",
                        select: "view",
                        width: 150,
                        template: "Добавить мероприятие",
                        css: "addActivityClass",
                        id: "addActivity",
                        onClick: {
                            "addActivityClass": function () {
                                console.log("adddddddddddd")
                                viewModel();

                            }
                        }
                    }

                ]

            },
                {
                    rows: [{
                        cols: [{
                            view: "datatable",
                            id: "asesTable",
                            select: "row",
                            data: assessment,
                            width: 430,


                            columns: [{id: "numberAssessment", header: "№", width: 30},
                                {id: "nameAssessment", width: 200, header: "Название мероприятия"},
                                {id: "currentState", width: 200, header: "Статус"},

                            ],
                            on: {
                                onitemclick: function () {
                                    viewResults();
                                    console.log("clickrow")

                                    let delButn = $$("delBtn");

                                    delButn.show();

                                }
                            },
                        }, {view: "resizer"},
                            {
                                cols: [{
                                    view: "datatable",
                                    id: "resultPath",
                                    columns: [{header: "Результат собеседования"}]

                                }]
                            }]
                    }]
                }

            ]
        }
    )
})
/*{cols:[{view: "template",  width:100,type: "header", template: "Номер"},
                  {view: "template", width:150,type: "header", template: "Название"},
                    {view: "template", width:150,type: "header",template: "Дата"},
                    {view: "template", width:150,type: "header",template: "Состояние"},
                  {view: "template",type: "header",template: "Результат собеседования      "}
                  ]}*/
