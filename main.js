let Assessment = [
    {numberAssessment: "", nameAssessment: "", currentState: "",dateAssessment:"",timeAssessment:"",dataAssessment:""}
]
let DataAssessment=[
    {nameMan:"Иван",secondNameMan:"Иванов",resultAssessment:"Ответил на 20 вопросов",numberAssessment: 1}
    ]


let Employee =[
    {nameEmployee:"Анатолий",secondNameEmployee:"Куценко",experienceEmployee:2, positionEmployee:"Руководитель отдела"},
    {nameEmployee:"Дмитрий",secondNameEmployee:"Сычев",experienceEmployee:3, positionEmployee:"Помощник руководителя"},
    {nameEmployee:"Екатерина",secondNameEmployee:"Трамовна",experienceEmployee:4, positionEmployee:"Уборщица"},
    {nameEmployee:"Глеб",secondNameEmployee:"Мяленко",experienceEmployee:5, positionEmployee:"Рабочий"}
]
let viewIS = true;

function clickRow() {

        viewResults();
        console.log("clickrow")

        //let delButn = $$("delBtn");

        //delButn.show();



}
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
                            data: Assessment,
                            width: 430,


                            columns: [{id: "numberAssessment", header: "№", width: 30},
                                {id: "nameAssessment", width: 200, header: "Название мероприятия"},
                                {id: "currentState", width: 200, header: "Статус"},

                            ],
                            // on: {
                            //     onitemclick: clickRow()
                            // },
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
