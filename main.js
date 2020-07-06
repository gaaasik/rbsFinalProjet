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

function refreshEditor(assesLength, data, employees) {

    //название
    $$("nameAssessmentSelect").define("value", selectAssessment[0].nameAssessmentSelect)
    $$("nameAssessmentSelect").refresh();

    //дата
    let date = selectAssessment[0].dateAssessmentSelect

   // webix.message(webix.Date.dateToStr("%Y-%m-%d")(date));
    $$("dateSelectAsess").define("value", date);
    $$("dateSelectAsess").refresh();


    $$("dataAssessmentSelect").clearAll()
    $$("dataAssessmentSelect").define("data", data);
    $$("dataAssessmentSelect").refresh();

    $$("semployeeTable").clearAll()
    $$("semployeeTable").define("data", employees);
    $$("semployeeTable").refresh();
}

webix.ready(function (message) {
    webix.ui(
        {
            css: "main",
            rows: [{
                view: "toolbar", id: "myToolbar", css: "headerMain",
                cols: [
                    {
                        css: "headerMain",
                        view: "template",
                        type: "header",
                        height: 50,
                        template: "Assessment Manager",
                    },

                    {
                        view: "button",
                        value: "Удалить Мероприятие",
                        id: "delBtn",
                        hidden: true,
                        class: "btn",
                        css: "btnDelete",
                        width: 150,
                        on: {
                            onitemclick: function () {
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
                        view: "button",
                        select: "view",
                        class: "btnAdd",
                        width: 150,
                        value: "Добавить мероприятие",
                        css: "btnAdd",
                        id: "addActivity",
                        on: {
                            onitemclick: function () {

                                employeeArr = Employee;
                                choseEmployee = [];
                                viewModel(employeeArr);

                            }
                        }
                    },
                    {
                        view: "button",
                        select: "view",
                        class: "btn",
                        width: 150,
                        value: "Редактировать сотрудников",
                        css: "btnEdit",
                        id: "addEmployeeInMain",
                        on: {
                            onitemclick: function () {
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
                                css: "dataTable",
                                select: "row",
                                data: Assessment,
                                width: 430,
                                height: 500,


                                columns: [{id: "numberAssessment", header: "№", width: 30},
                                    {id: "nameAssessment", width: 200, header: "Название мероприятия"},
                                    {id: "currentState", width: 180, header: "Статус"},

                                ],
                                on: {
                                    onitemclick: function () {

                                        let selectedId = $$("asesTable").getItem($$("asesTable").getSelectedId()).id;
                                        let isInAses = findInd(Assessment, selectedId)
                                        selectAssessment = [];
                                        selectAssessment.push({
                                            nameAssessmentSelect: Assessment[isInAses].nameAssessment,
                                            dateAssessmentSelect: Assessment[isInAses].dateAssessment,
                                            dataAssessmentSelect: Assessment[isInAses].dataAssessment,
                                            currentStateSelect: Assessment[isInAses].currentState,


                                        })
                                        let data = Assessment[isInAses].dataAssessment
                                        console.log("currentState = ", selectAssessment[0].currentStateSelect)

                                        refreshEditor(isInAses, data.dataAssessment, Assessment[isInAses].employeeAssessment.employeeAssessment)
                                        clickRow(isInAses)


                                    }
                                }

                            }
                                ,
                                {
                                    hidden: true,
                                    data: selectAssessment,
                                    id: "smallAdd",
                                    height: 500,
                                    rows: [{ //
                                        cols: [
                                            {
                                                view: "text",
                                                css: "nameAses",
                                                placeholder: "Введите название",
                                                id: "nameAssessmentSelect",
                                                width: 200,

                                            },

                                            {
                                                id: "dateSelectAsess",
                                                view: "datepicker",
                                                label: "Дата",
                                                //value:1,
                                                timepicker: true,
                                                width: 300,
                                                left: 10,

                                            }, {
                                                    view: "button",
                                                    select: "view",
                                                     template:"",/////////тут должен быть статус
                                                    id: "currentStateSelect",
                                                    width: 100,
                                                    css:"btnAdd",
                                                    on: {onItemClick:function () {
                                                            console.log("current vaslue = ",$$("currentStateSelect").getValue())
                                                        }}
                                            }
                                        ]

                                    } //////////////
                                        , {
                                            rows: [{
                                                cols: [{
                                                    view: "template", width: 500,
                                                    type: "header", template: "Кандидаты",
                                                    css:"nameAses"
                                                }, {
                                                    view: "template",
                                                    type: "header", template: "Сотрудники",
                                                    css:"nameAses"
                                                }]
                                            }]
                                        },
                                        {
                                            cols: [
                                                { //кандидаты
                                                    id: "dataAssessmentSelect",
                                                    view: "datatable",
                                                    css:"dataTable",
                                                    editable: true,
                                                    editaction: "dblclick",
                                                    navigation: true,
                                                    select: "cell",
                                                    autoheight: true,
                                                    autowidth: true,
                                                    //
                                                    data: selectAssessment,

                                                    autoConfig: true,
                                                    columns: [{
                                                        id: "nameMan",
                                                        header: "Имя",
                                                        value: "Начало",
                                                        editor: "text",
                                                    },
                                                        {id: "secondNameMan", header: "Фамилия", editor: "text",},
                                                        {id: "patronymic", header: "Отчество", editor: "text",},
                                                        {id: "birthday", header: "Результат", editor: "text",}
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
                                                    css: "dataTable",
                                                    autoConfig: true,
                                                    columns: [{id: "nameEmployee", header: "Имя"},
                                                        {id: "secondNameEmployee", header: "Фамилия"},
                                                        {
                                                            id: "experienceEmployee",
                                                            header: "Опыт работы(лет)",
                                                            width: 40
                                                        },
                                                        {id: "positionEmployee", header: "Должность", width: 200}

                                                    ],


                                                }
                                            ]
                                        },
                                        {
                                            cols: [{
                                                data: selectAssessment,
                                                view: "button",
                                                class: "btnAdd",
                                                value: "Добавить человека",
                                                on: {
                                                    onItemClick: function () {
                                                        AddCandidate("dataAssessmentSelect",selectAssessment[0].dataAssessmentSelect.dataAssessment)
                                                        console.log("Select ases = jr",)
                                                    }},
                                                width: 200
                                            },
                                                {   data: selectAssessment,
                                                    view: "button",
                                                    class: "btnAdd",
                                                    value: "Добавить сотрудника",
                                                    width: 200, on: {
                                                        onItemClick: function () {
//////////////
                                                            AddEmployee(choseEmployee, "semployeeTable", employeeArr)
                                                            console.log( "Assessment = ",Assessment)
                                                            console.log( "Assessment = ",Assessment)

                                                        }
                                                    }
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
