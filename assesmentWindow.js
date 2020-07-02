let choseEmployee = [{
    nameEmployee: "Анатолий",
    secondNameEmployee: "Куценко",
    experienceEmployee: 2,
    positionEmployee: "Руководитель отдела"
}]

function refreshTable(IdTable, table) {
    $$(IdTable).clearAll();
    $$(IdTable).define("data", table)
    $$(IdTable).refresh();

}

function AddMan() {
    let validate = true
    for (let i = 0; i < DataAssessment.length; i++) {
        if (DataAssessment[i].nameMan === "" || DataAssessment[i].secondNameMan === "" || DataAssessment[i].resultAssessment === "") {
            alert("Заполните все поля!")
            validate = false
        } else {
            validate = true;
        }
    }
    if (validate) {
        DataAssessment.push(
            {
                nameMan: "",
                secondNameMan: "",
                resultAssessment: ""
            })
        refreshTable("dataCols", DataAssessment);
    }


}

function delRowFromTable(table, textIdTable) {
    let Id = $$(textIdTable).getItem($$(textIdTable).getSelectedId()).id
    let isInTable = findInd(table, Id)
    table.splice(isInTable, 1)
    refreshTable(textIdTable, table)

}

function AddEmployee() {
    var addEmpl = webix.ready(function () {
        webix.ui({
            id: "addEmpl",
            view: "window",
            modeless: true,
            left: 200,
            top: 50,
            body: {
                rows: [{
                    view: "button", value: "Close Window",
                    on: {
                        onItemClick: function () {
                            $$("addEmpl").close()
                        }
                    }
                },
                    {
                        id: "choseEmployeeTable",
                        view: "datatable",
                        select: "row",
                        navigation: true,
                        autoheight: true,
                        autowidth: true,
                        data: Employee,
                        autoConfig: true,

                        columns: [{id: "nameEmployee", header: "Имя"},
                            {id: "secondNameEmployee", header: "Фамилия"},
                            {id: "experienceEmployee", header: "Опыт работы(лет)"},
                            {id: "positionEmployee", header: "Должность", width: 300}

                        ],

                        on: {
                            onItemClick: function () {
                                let employeeId = $$("choseEmployeeTable").getItem($$("choseEmployeeTable").getSelectedId()).id
                                let isInEmployee = findI(Employee,employeeId)
                                let isInChoseEmploeyy = findI(choseEmployee,employeeId)
                                if (isInChoseEmploeyy>-1){
                                    alert("Этот сотрудник уже в списке")
                                }
                                else{
                                    console.log("is in chose = ", isInChoseEmploeyy)
                                choseEmployee.push({
                                    nameEmployee: Employee[isInEmployee].nameEmployee,
                                    secondNameEmployee: Employee[isInEmployee].secondNameEmployee,
                                    experienceEmployee: Employee[isInEmployee].experienceEmployee,
                                    positionEmployee: Employee[isInEmployee].positionEmployee

                                })

                                refreshTable("employeeTable", choseEmployee)

                                $$("addEmpl").close()

                            }}


                        }


                    }]
                //работники

            }
        }).show()

    })

}

function closeWindow() {
    DataAssessment = [{}]
    choseEmployee = [{}]
    $$("pop1").close();
}

function AddInMainPage() {
    let validate = true;
    let candidate = new Candidate(DataAssessment)
    let assessment = new Assesment($$("nameAssessment").getValue(), $$("dateAses").getValue())
    let employee = new EmployeeClass(choseEmployee)
    for (let i = 0; i < DataAssessment.length; i++) {
        if (DataAssessment[i].nameMan === "" || DataAssessment[i].secondNameMan === "" || DataAssessment[i].resultAssessment === "") {
            alert("Заполните все поля кандидатов!");
            validate = false
        } else {
            validate = true;
            if (assessment.name === "") {
                alert("Введите название мероприятия!");
                validate = false
            } else {
                validate = true
            }

        }
    }
    if (validate) {
        Assessment.push({
                nameAssessment: assessment.name,
                dateAssessment: assessment.date,
                dataAssessment: candidate,
                currentState: "Создано",
                employeeAssessment: employee,
            }
        )
        closeWindow()
        refreshTable("asesTable", Assessment)
    }
}

function viewModel() {
    var popup = webix.ready(function () {
        webix.ui({
            view: "window",
            close: true,
            modal: true,
            id: "pop1",
            fullscreen: true,
            body: {
                id: "mylayout",
                rows: [{
                    cols: [{view: "text", id: "nameAssessment", placeholder: "Название", width: 200},
                        {
                            id: "dateAses",
                            view: "datepicker",
                            value: new Date(2020, 6, 22),
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
                                rows: [{
                                    id: "dataCols",
                                    view: "datatable",
                                    editable: true,
                                    //select: "row",
                                    editaction: "dblclick",
                                    navigation: true,
                                    select: "cell",
                                    autoheight: true,
                                    autowidth: true,
                                    data: DataAssessment,
                                    // onDbClick:{select:"row"},
                                    autoConfig: true,
                                    on: {
                                        onItemClick: function () {
                                            // let candidateId = $$("dataCols").getItem($$("dataCols").getSelectedId()).id
                                            // let isInCandidate = findInd(candidateId, DataAssessment)
                                            $$("delCand").define("hidden", false)
                                            let candidateId = $$("dataCols").getItem($$("dataCols").getSelectedId()).id
                                            let isInCandidate = findInd(candidateId, DataAssessment)

                                        }
                                    },
                                    columns: [{id: "nameMan", header: "Имя", editor: "text",},
                                        {id: "secondNameMan", header: "Фамилия", editor: "text",},
                                        {id: "resultAssessment", header: "Результат", width: 300, editor: "text",},
                                    ],


                                }, {
                                    cols: [{
                                        view: "button",

                                        value: "Добавить человека",
                                        click: "AddMan()",
                                        width: 200
                                    },
                                        {
                                            view: "button",
                                            id: "delCand",

                                            value: "Убрать человека",
                                            on: {
                                                onItemClick: function () {
                                                    //  let candidateId = $$("dataCols").getItem($$("dataCols").getSelectedId()).id
                                                    delRowFromTable(DataAssessment, "dataCols")

                                                }
                                            },
                                            width: 200
                                        }

                                    ]
                                }
                                ]
                            }, {view: "resizer"},
                            { //работники
                                rows: [{
                                    id: "employeeTable",
                                    view: "datatable",
                                    select: "row",
                                    navigation: true,
                                    autoheight: true,
                                    autowidth: true,
                                    data: choseEmployee,
                                    autoConfig: true,
                                    columns: [{id: "nameEmployee", header: "Имя"},
                                        {id: "secondNameEmployee", header: "Фамилия"},
                                        {id: "experienceEmployee", header: "Опыт работы(лет)"},
                                        {id: "positionEmployee", header: "Должность", width: 300}

                                    ],

                                }, {
                                    cols: [{
                                        view: "button", value: "убрать сотрудника", on: {
                                            onItemClick: function () {

                                                delRowFromTable(choseEmployee, "employeeTable")

                                            }
                                        },
                                    }, {
                                        view: "button", value: "Добавить сотрудника", click: "AddEmployee()", width: 200
                                    }]
                                }]

                            }
                        ]
                    },

                    {
                        cols: [{
                            view: "button",
                            value: "Добавить мероприятие",
                            click: "AddInMainPage()",
                            width: 200,
                            height: 100
                        },
                            {view: "button", value: "Закрыть окно", click: "closeWindow()", width: 200}
                        ]
                    }],
            }
        }).show();
    })
}