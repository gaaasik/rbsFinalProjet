let Assessment = []
let selectAssessment = [{}]
let DataAssessment = [
    {nameMan: "Первый", secondNameMan: "Человек", patronymic: "На земле", }
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
{
    let is;
    let iter
    for (let i = 0; i < table.length; i++) {
        if (table[i].id === it) {
            is = true;
            iter = i
        }
    }
    if (is) {
        console.log("iter = ", iter)
        return iter
    } else {
        return -1;
    }


}

function findInd(table, it) //поиск индекса строки на которую кликнули
{
    for (let i = 0; i < table.length; i++) {
        if (table[i].id === it) {

            return i;

        }

    }
    return -1;


}

function findIndex(table, it,) //поиск индекса строки на которую кликнули
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

function refreshEditor(assesLength,data,employees) {

    //название
    $$("nameAssessmentSelect").define("value", selectAssessment[0].nameAssessmentSelect)
    $$("nameAssessmentSelect").refresh();
    //дата

       let date = selectAssessment[0].dateAssessmentSelect
    console.log("data = ",date)
    webix.message(webix.Date.dateToStr("%Y-%m-%d")(date));
    $$("dateSelectAsess").define("value", date);
     $$("dateSelectAsess").refresh();


    console.log("data = ",data)
    $$("dataAssessmentSelect").clearAll()
    $$("dataAssessmentSelect").define("data",data);
    $$("dataAssessmentSelect").refresh();

    console.log("data = ",employees)
    $$("semployeeTable").clearAll()
    $$("semployeeTable").define("data",employees);
    $$("semployeeTable").refresh();
    // $$("").define("value",);
    // $$("").refresh();
}

webix.ready(function (message) {
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
                        class: "btn",
                        template: "Удалить Мероприятие",
                        css: "delActivityClass",
                        width: 100,
                        onClick: {
                            "delActivityClass": function () {
                                if (confirm("Вы уверены что хотите удалить это мероприятие?", selectAssessment[0].nameAssessmentSelect)) {
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
                        class: "btn",
                        width: 150,
                        template: "Добавить мероприятие",
                        css: "addActivityClass",
                        id: "addActivity",
                        onClick: {
                            "addActivityClass": function () {
                                viewModel();

                            }
                        }
                    },
                    {
                        view: "template",
                        select: "view",
                        class: "btn",
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
                    rows: [
                        {
                        cols: [{
                            view: "datatable",
                            id: "asesTable",
                            select: "row",
                            data: Assessment,
                            width: 430,
                            height: 500,


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
                                        nameAssessmentSelect: Assessment[isInAses].nameAssessment,
                                        dateAssessmentSelect: Assessment[isInAses].dateAssessment,
                                        dataAssessmentSelect:Assessment[isInAses].dataAssessment,

                                    })
                                    let data=Assessment[isInAses].dataAssessment
                                    console.log("data",data.dataAssessment[0].nameMan)
                                    console.log("Assessment[]., = " ,Assessment,)


                                    refreshEditor(isInAses,data.dataAssessment,Assessment[isInAses].employeeAssessment.employeeAssessment)
                                    clickRow(isInAses)


                                }
                            }

                        }
                            , {view: "resizer"},
                            {
                                data: selectAssessment,
                                id: "smallAdd",
                                height: 500,
                                rows: [{ //
                                    cols: [
                                        {
                                            view: "text",
                                            id: "nameAssessmentSelect",
                                            width: 200
                                        },

                                        {
                                            id: "dateSelectAsess",
                                            view: "datepicker",
                                            label: "Дата",
                                            //value:1,
                                            timepicker: true,
                                            width: 300,
                                            left: 10,

                                        },{cols:[{
                                                view: "template",
                                                template:"Статус:",
                                                id: "current", width: 200,


                                            },{view: "template", //////////тут должен быть статус
                                                 }]}
                                    ]
    //|||
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
                                                id: "dataAssessmentSelect",
                                                view: "datatable",
                                                editable: true,
                                                editaction: "dblclick",
                                                navigation: true,
                                                select: "cell",
                                                autoheight: true,
                                                autowidth: true,
                                                //
                                                data: DataAssessment,

                                                autoConfig: true,
                                                columns: [{id: "nameMan", header: "Имя", value:"Начало",editor: "text", },
                                                    {id: "secondNameMan", header: "Фамилия", editor: "text",},
                                                    {id: "patronymic", header: "Отчество",editor: "text", },
                                                    {id: "birthday",header: "Дата Рождения",editor: "text",}
                                                        ],

                                            }, {view: "resizer"},
                                            { //работники
                                                id: "semployeeTable",
                                                view: "datatable",
                                                select: "row",
                                                navigation: true,
                                                autoheight: true,
                                                autowidth: true,
                                                data: Assessment,
                                                autoConfig: true,
                                                columns: [{id: "nameEmployee", header: "Имя"},
                                                    {id: "secondNameEmployee", header: "Фамилия"},
                                                    {id: "experienceEmployee", header: "Опыт работы(лет)", width: 40},
                                                    {id: "positionEmployee", header: "Должность", width: 200}

                                                ],


                                            }
                                        ]
                                    },
                                    {
                                        cols: [{
                                            view: "button",
                                            class: "btn",
                                            value: "Добавить человека",
                                            click: "",
                                            width: 200
                                        },
                                            {
                                                view: "button",
                                                class: "btn",
                                                value: "Добавить сотрудника",
                                                click: "",
                                                width: 200
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
