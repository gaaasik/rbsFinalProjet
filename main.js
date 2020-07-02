let Assessment = [
    {
        numberAssessment: "",
        nameAssessment: "asasdasd",
        currentState: "",
        dateAssessment: "",
        timeAssessment: "",
        dataAssessment: ""
    }
]
let selectAssessment = [{}]
let DataAssessment = [
      {nameMan: "", secondNameMan: "", resultAssessment: "", numberAssessment: 1}
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
function findI(table, it) //поиск индекса строки на которую кликнули
{  let is;
    let iter
    for (let i = 0; i < table.length; i++)
    {
        if (table[i].id === it) {
            is = true;
            iter = i
        }
    }
    if (is){
        console.log("iter = ",iter)
         return iter
    }
    else {return -1;}


}
function findInd(table, it) //поиск индекса строки на которую кликнули
{
    for (let i = 0; i < table.length; i++)
    {
        if (table[i].id === it) {

            return i;

        }

    }
    return -1;



}

function findIndex(table, it, length) //поиск индекса строки на которую кликнули
{
    for (let i = 1; i < length; i++) {
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
    $$("smallAdd").show();
    // $$("smallAdd").define("data", Assessment[id])
    // $$("selectAssessment").define("data", selectAssessment[0].dataAssessmentSelect)
    // $$("selectAssessment").refresh()


}


function deleteActivity(id, isIn, idTable, data) {
    Assessment.splice(isIn, 1)
    refreshTable(idTable, data);


    // $$("smallAdd").close();
}

webix.ready(function () {
    webix.ui({
            rows: [{
                view: "toolbar", id: "myToolbar",
                cols: [
                    {
                        view: "template",
                        type: "header",
                        height: 100,
                        template: "Assessment Manager",
                    },

                    {
                        view: "template",
                        id: "delBtn",
                        hidden: true,
                        template: "Удалить Мероприятие",
                        css: "delActivityClass",
                        width: 100,
                        onClick: {
                            "delActivityClass": function () {
                                if (confirm("Вы уверены что хотите удалить это мероприятие?")) {
                                    $$("delBtn").define("hidden", true)
                                    $$("smallAdd").define("hidden", true)
                                    if (($$("asesTable").getItem($$("asesTable").getSelectedId())) !== undefined) {
                                        let selectedId = $$("asesTable").getItem($$("asesTable").getSelectedId()).id;
                                        let isInTable = findInd(Assessment, selectedId);
                                        deleteActivity(selectedId, isInTable, "asesTable", Assessment);
                                    } else {
                                        alert("Удалять нечего.")
                                    }
                                }
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
                                viewModel();

                            }
                        }
                    }, {
                        view: "template",
                        select: "view",
                        width: 150,
                        template: "Редактировать сотрудников",
                        css: "addEmployeeClass",
                        id: "addEmployeeInMain",
                        onClick: {
                            "addEmployeeClass": function () {
                                editEmployeeInMain();

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
                                    let isInAses = findInd(Assessment, selectedId)
                                    selectAssessment = [];
                                    selectAssessment.push({
                                        numberAssessmentSelect: "",
                                        nameAssessmentSelect: Assessment[isInAses].nameAssessment,
                                        currentStateSelect: Assessment[isInAses].currentState,
                                        dateAssessmentSelect: Assessment[isInAses].dateAssessment,
                                        timeAssessmentSelect: Assessment[isInAses].timeAssessment,
                                        dataAssessmentSelect: Assessment[isInAses].dataAssessment
                                    })
                                    //refreshTable("selectAssessment",selectAssessment[0].dataAssessmentSelect)
                                    let candidate = new Candidate(selectAssessment[0].dataAssessmentSelect)
                                    refreshTable("selectAssessment", candidate)
                                    clickRow(isInAses)

                                    }
                            }

                        }
                            , {view: "resizer"},
                            {
                                data: selectAssessment,
                                id: "smallAdd",
                                rows: [{
                                    cols: [
                                        {
                                            view: "text",
                                            id: "selectNameAssessment",
                                            value: selectAssessment[0].nameAssessmentSelect,
                                            width: 200
                                        },

                                        {
                                            id: "dateSelectAsess",
                                            view: "datepicker",
                                            label: "Date",
                                            value: selectAssessment[0].dateAssessmentSelect,
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
                                                //data: Assessment,
                                                data: selectAssessment[0].dataAssessmentSelect,

                                                autoConfig: true,
                                                columns: [{id: "nameMan", header: "Имя", editor: "text",},
                                                    {id: "secondNameMan", header: "Фамилия", editor: "text",},
                                                    {
                                                        id: "resultAssessment",
                                                        header: "Результат",
                                                        width: 200,
                                                        editor: "text",
                                                    },
                                                ],


                                            }, {view: "resizer"},
                                            { //работники
                                                id: "semployeeTable",
                                                view: "datatable",
                                                select: "row",
                                                navigation: true,
                                                autoheight: true,
                                                autowidth: true,
                                                data: Assessment.dataAssessment,
                                                autoConfig: true,
                                                columns: [{id: "snameEmployee", header: "Имя"},
                                                    {id: "ssecondNameEmployee", header: "Фамилия"},
                                                    {id: "sexperienceEmployee", header: "Опыт работы(лет)", width: 40},
                                                    {id: "spositionEmployee", header: "Должность", width: 200}

                                                ],


                                            }
                                        ]
                                    },
                                    {
                                        cols: [{view: "button", value: "Добавить человека", click: "", width: 200},
                                            {
                                                view: "button", value: "Добавить сотрудника", click: "", width: 200
                                            }]
                                    },
                                ]
                            }]
                    }]
                }

            ]
        }
    )
})
