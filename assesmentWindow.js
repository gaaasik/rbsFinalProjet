function refreshTable(IdTable, table) {
    $$(IdTable).clearAll();
    $$(IdTable).define("data", table)
    $$(IdTable).refresh();

}

function AddCandidate(idTable, DataAssessmen) {
    let validate = true
    for (let i = 0; i < DataAssessmen.length; i++) {
        if (DataAssessmen[i].nameMan === "" || DataAssessmen[i].secondNameMan === "" || DataAssessmen[i].patronymic === "") {
            alert("Заполните все поля!")
            validate = false
        } else {
            validate = true;
        }
    }
    if (validate) {
        DataAssessmen.push(
            {
                nameMan: "",
                secondNameMan: "",
                resultAssessment: ""
            })
        refreshTable(idTable, DataAssessmen);
    }


}

function delRowFromTable(table, textIdTable, employeeArrr) {

    let Id = $$(textIdTable).getItem($$(textIdTable).getSelectedId()).id
    let isInTable = findInd(table, Id)
    if (textIdTable === "employeeTable") {
        employeeArrr.push({
            nameEmployee: table[isInTable].nameEmployee,
            secondNameEmployee: table[isInTable].secondNameEmployee,
            experienceEmployee: table[isInTable].experienceEmployee,
            positionEmployee: table[isInTable].positionEmployee
        })
    }
    table.splice(isInTable, 1)
    refreshTable(textIdTable, table)

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
    console.log("дата = ", assessment.date)
    let employee = new EmployeeClass(choseEmployee)
    for (let i = 0; i < DataAssessment.length; i++) {
        if (DataAssessment[i].nameMan === "" || DataAssessment[i].secondNameMan === "" || DataAssessment[i].patronymic === "") {
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
                employeeAssessment: EmployeeAssessment,

            }
        )
        closeWindow()
        refreshTable("asesTable", Assessment)
    }
}

function AddAssessment(Assessment, employeee)
{
    var popup = webix.ready(function () {
        webix.ui({
            view: "window", height: 100,
            head: {
                view: "template",
                template: "Введите данные о мероприятии",
                css: "windowTemplate"
            },

            modal: true,
            id: "pop1",
            css: "main",
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
                            format:webix.Date.dateToStr("%d.%m. %Y"),
                            stringResult: true
                        }, {view: "button", value: "Закрыть окно", click: "closeWindow()", css: "btnDeleteWindow"}
                    ]
                }
                    , {
                        rows: [{
                            cols: [{
                                css: "nameAses",
                                view: "template", width: 500,
                                type: "header", template: "Кандидаты"
                            }, {
                                css: "nameAses", width: 608,
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
                                    css: "dataTable",
                                    editaction: "click",
                                    navigation: true,
                                    select: "cell",
                                    autoheight: true,
                                    autowidth: true,
                                    data: DataAssessment,
                                    autoConfig: true,
                                    on: {
                                        onItemClick: function () {
                                            $$("delCand").define("hidden", false)
                                            let candidateId = $$("dataCols").getItem($$("dataCols").getSelectedId()).id
                                            let isInCandidate = findInd(candidateId, DataAssessment)

                                        }
                                    },
                                    columns: [{id: "nameMan", header: "Имя", editor: "text"},
                                        {id: "secondNameMan", header: "Фамилия", editor: "text",},
                                        {id: "patronymic", header: "Отчество", width: 300, editor: "text",},
                                    ],


                                }, {
                                    cols: [
                                        {
                                            view: "button",
                                            id: "delCand",
                                            css: "btnDelete",

                                            value: "Убрать человека",
                                            on: {
                                                onItemClick: function () {
                                                    let candidate = new Candidate(DataAssessment)
                                                    candidate.DeleteCandidate("dataCols")


                                                }
                                            },
                                            width: 200
                                        }, {
                                            view: "button",
                                            css: "btnAdd",
                                            value: "Добавить человека",
                                            on: {
                                                onItemClick: function () {
                                                    let candidate = new Candidate(DataAssessment)
                                                    candidate.AddCandidate("dataCols")

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
                                    css: "dataTable",
                                    select: "row",
                                    navigation: true,
                                    autoheight: true,
                                    autowidth: true,
                                    data: EmployeeAssessment,
                                    autoConfig: true,
                                    columns: [{id: "nameEmployee", header: "Имя"},
                                        {id: "secondNameEmployee", header: "Фамилия"},
                                        {id: "experienceEmployee", header: "Опыт работы(лет)"},
                                        {id: "positionEmployee", header: "Должность", width: 300}

                                    ],

                                }, {
                                    cols: [{
                                        view: "button", value: "убрать сотрудника",
                                        css: "btnDelete",
                                        on: {
                                            onItemClick: function () {
                                                let employee = new EmployeeClass(employeee.employeeAssessment)
                                                employee.deleteEmployee(EmployeeAssessment, "employeeTable")

                                            }
                                        },
                                    }, {
                                        view: "button", value: "Добавить сотрудника", width: 300,
                                        css: "btnAdd",
                                        on: {
                                            onItemClick: function () {
                                                let employee = new EmployeeClass(employeee.employeeAssessment)
                                                employee.AddEmployee(EmployeeAssessment, "employeeTable",employeee.employeeAssessment)

                                            }
                                        }
                                    }]
                                }]

                            }
                        ]
                    },

                    {
                        cols: [{
                            view: "button",
                            css: "btnAdd",
                            value: "Добавить мероприятие",
                            on: {
                                onItemClick: function () {
                                    AddInMainPage()
                                    employeeArr = Employee;

                                }
                            },
                            width: 300,
                            height: 100
                        },

                        ]
                    }],
            }
        }).show();
    })
}