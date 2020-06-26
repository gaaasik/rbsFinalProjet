let Assessment = [
    {
        numberAssessment: "",
        nameAssessment: "",
        currentState: "",
        dateAssessment: "",
        timeAssessment: "",
        dataAssessment: ""
    }
]
let selectAssessment=[{}]
let DataAssessment = [
    {nameMan: "Иван", secondNameMan: "Иванов", resultAssessment: "Ответил на 20 вопросов", numberAssessment: 1}
]


let Employee = [
    {
        nameEmployee: "Анатолий",
        secondNameEmployee: "Куценко",
        experienceEmployee: 2,
        positionEmployee: "Руководитель отдела"
    },
    {
        nameEmployee: "Дмитрий",
        secondNameEmployee: "Сычев",
        experienceEmployee: 3,
        positionEmployee: "Помощник руководителя"
    },
    {nameEmployee: "Екатерина", secondNameEmployee: "Трамовна", experienceEmployee: 4, positionEmployee: "Уборщица"},
    {nameEmployee: "Глеб", secondNameEmployee: "Мяленко", experienceEmployee: 5, positionEmployee: "Рабочий"}
]
let viewIS = true;

function findInd(table, it) //поиск индекса строки на которую кликнули
{
    for (let i = 0; i < table.length; i++) {
        if (table[i].id === it) {
            return i;
        }
    }

    return -1;


}

function clickRow(id) {
    let delButn = $$("delBtn");
    delButn.show();
    let k = 1;

}

function viewResults() {
}

function deleteActivity(id, isIn, idTable, data) {
    Assessment.splice(isIn, 1) //пытаемся удалить из таблицы и получается
    refreshTable(idTable, data);
    console.log("dellllll = ", id)
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
                                let selectedId = $$("asesTable").getItem($$("asesTable").getSelectedId()).id;
                                let isInTable = findInd(Assessment, selectedId);
                                deleteActivity(selectedId, isInTable, "asesTable", Assessment);
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
                            on: {
                                onitemclick: function () {
                                    let selectedId = $$("asesTable").getItem($$("asesTable").getSelectedId()).id;
                                    let isInAses = findInd(Assessment,selectedId)
                                    selectAssessment = [];
                                    selectAssessment.push({
                                        numberAssessmentSelect: "",
                                        nameAssessmentSelect: Assessment[isInAses].nameAssessment,
                                        currentStateSelect: Assessment[isInAses].currentState,
                                        dateAssessmentSelect: Assessment[isInAses].dateAssessment,
                                        timeAssessmentSelect: Assessment[isInAses].timeAssessment,
                                        dataAssessmentSelect: Assessment[isInAses].dataAssessment
                                    })
                                    console.log("data = ",Assessment[isInAses].dataAssessment)
                                    refreshTable("selectAssessm",selectAssessment)
                                    clickRow(selectedId)
                                    console.log()
                                }
                            }

                        }, {view: "resizer"},
                            {
                                //here
                                rows: [{ id:"selectAssessm",
                                    data:selectAssessment,
                                    cols: [{view: "text", id: "selectNameAssessment",value:"" , width: 200},
                                        {
                                            id: "dateSelectAsess",
                                            view: "datepicker",
                                           // value: $$("dateAssessmentSelect").getValue(selectAssessment),
                                            label: "Date",
                                            timepicker: true,
                                            width: 300,
                                            left: 10,
                                        },
                                    ]
                                }
                                    , {
                                        rows: [{
                                            cols: [{
                                                view: "template", width: 500,
                                                type: "header", template: "Кандидаты"
                                            }, {
                                                view: "template",
                                                type: "header", template: "Сотрудники"
                                            }]
                                        }]
                                    },

                                    {
                                        cols: [
                                            { //кандидаты
                                                id: "selectAssessment",
                                                view: "datatable",
                                                editable: true,
                                                select: "row",
                                                editaction: "dblclick",
                                                navigation: true,
                                                select: "cell",
                                                autoheight: true,
                                                autowidth: true,
                                                data: DataAssessment,
                                                autoConfig: true,
                                                columns: [{id: "snameMan", header: "Имя", editor: "text",},
                                                    {id: "ssecondNameMan", header: "Фамилия", editor: "text",},
                                                    {id: "sresultAssessment", header: "Результат", width: 200, editor: "text",},
                                                ],


                                            }, {view: "resizer"},
                                            { //работники
                                                id: "semployeeTable",
                                                view: "datatable",
                                                select: "row",
                                                navigation: true,
                                                autoheight: true,
                                                autowidth: true,
                                                data: choseEmployee,
                                                autoConfig: true,
                                                columns: [{id: "snameEmployee", header: "Имя"},
                                                    {id: "ssecondNameEmployee", header: "Фамилия"},
                                                    {id: "sexperienceEmployee", header: "Опыт работы(лет)",width:40},
                                                    {id: "spositionEmployee", header: "Должность", width: 200}

                                                ],


                                            }
                                        ]
                                    },
                                    {
                                        cols: [{view: "button", value: "Добавить человека", click: "AddMan()", width: 200},
                                            {
                                                view: "button", value: "Добавить сотрудника", click: "AddEmployee()", width: 200
                                            }]
                                    },
                                    {view: "button", value: "Добавить мероприятие", click: "AddInMainPage()", width: 200, height: 100},
                                    {view: "button", value: "Закрыть окно", click: "closeWindow()", width: 400}
                                ]
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
