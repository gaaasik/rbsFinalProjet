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

function refreshEditor(assesLength, data, employees, mainData) {

    // mainData.currentState = selectAssessment[0].currentState
    //название
    $$("nameAssessmentSelect").define("value", selectAssessment[0].nameAssessmentSelect)
    $$("nameAssessmentSelect").refresh();

    //дата
    let date = selectAssessment[0].dateAssessmentSelect

    $$("dateAssessmentSelect").define("value", date);
    $$("dateAssessmentSelect").refresh();

    $$("currentStateSelect").define("value", selectAssessment[0].currentStateSelect);
    $$("currentStateSelect").refresh();

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
                                AddAssessment(employeeArr);

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
                                scroll: "auto",
                                select: "row",
                                data: Assessment,
                                width: 330,
                                height: 500,


                                columns: [{id: "numberAssessment", header: "№", width: 30},
                                    {id: "nameAssessment", width: 200, header: "Название мероприятия"},
                                    {id: "currentState", width: 100, header: "Статус"}

                                ],
                                on: {
                                    onitemclick: function () {

                                        let selectedId = $$("asesTable").getItem($$("asesTable").getSelectedId()).id;
                                        let isInAses = findInd(Assessment, selectedId)
                                        selectAssessment = [];
                                        console.log("Assessment[isInAses].employeeAssessment = ", Assessment[isInAses].employeeAssessment.employeeAssessment)
                                        let candidate = new Candidate(Assessment[isInAses].dataAssessment.dataAssessment)
                                        candidate.logDataCandidate()
                                        selectAssessment.push({
                                            nameAssessmentSelect: Assessment[isInAses].nameAssessment,
                                            dateAssessmentSelect: Assessment[isInAses].dateAssessment,
                                            dataAssessmentSelect: Assessment[isInAses].dataAssessment,
                                            currentStateSelect: Assessment[isInAses].currentState,
                                            employeeAssessment: Assessment[isInAses].employeeAssessment,
                                            isInAssess: isInAses
                                        })

                                        let data = Assessment[isInAses].dataAssessment
                                        checkState(Assessment[isInAses].currentState)
                                        console.log("state = ", candidate)
                                        refreshEditor(isInAses, candidate.dataAssessment, Assessment[isInAses].employeeAssessment.employeeAssessment, Assessment[isInAses])
                                        clickRow(isInAses)
                                        return (isInAses, candidate)


                                    }
                                }

                            }
                                ,
                                {
                                    hidden: true,
                                    data: selectAssessment,
                                    id: "smallAdd",
                                    height: 400,
                                    rows: [{ //
                                        cols: [
                                            {
                                                view: "text",
                                                // css: "nameAses",
                                                placeholder: "Введите название",
                                                id: "nameAssessmentSelect",
                                                width: 200,

                                            },

                                            {
                                                id: "dateAssessmentSelect",
                                                view: "datepicker",
                                                label: "Дата",
                                                //value:1,
                                                timepicker: true,
                                                width: 300,
                                                left: 10,

                                            }, {
                                                view: "button",
                                                id: "currentStateSelect",
                                                width: 150,
                                                css: "btnAdd",
                                                on: {
                                                    onItemClick: function () {
                                                        changeState(selectAssessment[0].currentStateSelect)
                                                    }
                                                }
                                            }
                                        ]

                                    } //////////////
                                        , {
                                            rows: [{
                                                cols: [{
                                                    view: "template", width: 500,
                                                    type: "header", template: "Кандидаты",
                                                    css: "nameAses"
                                                }, {
                                                    view: "template",
                                                    width: 400,
                                                    type: "header", template: "Сотрудники",
                                                    css: "nameAses"
                                                }]
                                            }]
                                        },
                                        {
                                            cols: [
                                                {
                                                    rows: [ //кандидаты
                                                        {
                                                            id: "dataAssessmentSelect",
                                                            view: "datatable",
                                                            css: "dataTable",
                                                            editable: true,
                                                            editaction: "dblclick",
                                                            autoConfig: true,
                                                            navigation: true,
                                                            select: "cell",
                                                            autoheight: true,
                                                            // autowidth: true,
                                                            width: 500,
                                                            //
                                                            data: selectAssessment,

                                                            on: {
                                                                onItemClick: function () {
                                                                    console.log("currentStateSelect", selectAssessment[0].currentStateSelect)
                                                                    if (selectAssessment[0].currentStateSelect === "Создано")
                                                                        $$("btnDeleteCandidate").show();

                                                                }
                                                            },
                                                            columns: [{
                                                                id: "nameMan",
                                                                header: "Имя",
                                                                value: "Начало",
                                                                editor: "text",
                                                            },
                                                                {
                                                                    id: "secondNameMan",
                                                                    header: "Фамилия",
                                                                    editor: "text",
                                                                    placeholder: "Введите Имя"
                                                                },
                                                                {id: "patronymic", header: "Отчество", editor: "text",},
                                                                {
                                                                    id: "ResultAssessment",
                                                                    header: "Результат",
                                                                    width: 300,
                                                                    editor: "text",
                                                                }
                                                                // {id:""}
                                                            ],
                                                        },
                                                        {
                                                            cols: [{

                                                                data: selectAssessment,
                                                                view: "button",
                                                                class: "btnAdd",
                                                                hidden: false,
                                                                id: "btnAddCandidate",
                                                                value: "Добавить человека",
                                                                width: 200,
                                                                on: {
                                                                    onItemClick: function () {
                                                                        let candidate = new Candidate(selectAssessment[0].dataAssessmentSelect.dataAssessment)
                                                                        candidate.AddCandidate("dataAssessmentSelect")
                                                                    }
                                                                },

                                                            },
                                                                {
                                                                    id: "btnDeleteCandidate",
                                                                    view: "button",
                                                                    width: 200,
                                                                    hidden: true,
                                                                    value: "Убрать человека",
                                                                    on: {
                                                                        onItemClick: function () {
                                                                            let candidate = new Candidate(selectAssessment[0].dataAssessmentSelect.dataAssessment)
                                                                            candidate.DeleteCandidate("dataAssessmentSelect")
                                                                            if (candidate.length === 0) {
                                                                                $$("btnDeleteCandidate").define("hidden", true)
                                                                                $$("btnDeleteCandidate").refresh()
                                                                            } //если кандидатов больше нет то прячем кнопку
                                                                        }
                                                                    }

                                                                }]
                                                        }
                                                    ]


                                                },

                                                {view: "resizer"},

                                                {
                                                    rows: [{ //работники
                                                        id: "semployeeTable",
                                                        view: "datatable",
                                                        select: "row",
                                                        navigation: true,
                                                        autoheight: true,
                                                        // autowidth: true,
                                                        width: 400,
                                                        data: selectAssessment,
                                                        css: "dataTable",
                                                        autoConfig: true,
                                                        on: {
                                                            onItemClick: function () {
                                                                if (selectAssessment[0].currentStateSelect === "Создано")
                                                                    $$("btnDeleteEmployee").show();

                                                            }
                                                        },
                                                        columns: [{id: "nameEmployee", header: "Имя"},
                                                            {id: "secondNameEmployee", header: "Фамилия"},
                                                            {
                                                                id: "experienceEmployee",
                                                                header: "Опыт работы(лет)",
                                                                width: 100
                                                            },
                                                            {id: "positionEmployee", header: "Должность", width: 200}

                                                        ],


                                                    },
                                                        {
                                                            cols: [{
                                                                data: selectAssessment,
                                                                view: "button",
                                                                class: "btnAdd",
                                                                width: 200,
                                                                right: 50,
                                                                id: "btnAddEmployee",
                                                                value: "Добавить сотрудника",

                                                                on: {
                                                                    onItemClick: function () {
                                                                        ///   AddEmployee(selectAssessment[0].employeeAssessment.employeeAssessment, "semployeeTable", employeeArr)
                                                                        console.log("Employee = ", Employee)
                                                                        console.log("chose employee  = ", choseEmployee)
                                                                        console.log("employee arr = ", employeeArr)
                                                                        console.log("selectAssessment[0].employeeAssessment.employeeAssessment = ", selectAssessment[0].employeeAssessment.employeeAssessment)
                                                                    }
                                                                }
                                                            },
                                                                {
                                                                    id: "btnDeleteEmployee",
                                                                    view: "button",
                                                                    hidden: true,
                                                                    width: 200,
                                                                    position: "absolute",
                                                                    value: "Убрать сотрудника",
                                                                    on: {
                                                                        onItemClick: function () {
                                                                            returnEmployee(selectAssessment[0].employeeAssessment.employeeAssessment, Employee)
                                                                            //  delRowFromTable(selectAssessment[0].employeeAssessment.employeeAssessment, "semployeeTable", "")


                                                                            if ((selectAssessment[0].employeeAssessment.employeeAssessment.length === 0)) {
                                                                                $$("btnDeleteEmployee").define("hidden", true)
                                                                                $$("btnDeleteEmployee").refresh()
                                                                            }
                                                                        }
                                                                    }

                                                                    ///
                                                                }, {
                                                                    id: "btnEndAssessment",
                                                                    view: "button",
                                                                    hidden: true,
                                                                    width: 200,
                                                                    position: "absolute",
                                                                    value: "Завершить Собеседование"
                                                                }]
                                                        }

                                                    ]
                                                }

                                            ]
                                        },

                                    ]
                                }]
                        }]
                }

            ]
        }
    )
})
