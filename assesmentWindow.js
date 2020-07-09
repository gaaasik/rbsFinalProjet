function refreshTable(IdTable, table) {
    $$(IdTable).clearAll();
    $$(IdTable).define("data", table)
    $$(IdTable).refresh();

}

function AddCandidate(idTable,DataAssessmen) {
    console.log("DataAssaes = ",)
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

function delRowFromTable(table, textIdTable,employeeArrr) {

    let Id = $$(textIdTable).getItem($$(textIdTable).getSelectedId()).id
    let isInTable = findInd(table, Id)
    if (textIdTable ==="employeeTable"){
    employeeArrr.push({
        nameEmployee: table[isInTable].nameEmployee,
        secondNameEmployee: table[isInTable].secondNameEmployee,
        experienceEmployee: table[isInTable].experienceEmployee,
        positionEmployee: table[isInTable].positionEmployee
    })}
    table.splice(isInTable, 1)
    refreshTable(textIdTable, table)

}

function AddEmployee(choseEmploye,idTabel,employeeArr) {
    var addEmpl = webix.ready(function () {
        webix.ui(
            {
            id: "addEmpl",
            view: "window",
            head: false,
            modal: true,
            left: 200,
            top: 50,
            css: "main",
            body: {
                rows: [{
                    view: "button", value: "Закрыть окно",css:"btnDelete",
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
                                let isInChoseEmploeyy = findI(choseEmploye,employeeId)
                                if (isInChoseEmploeyy>-1){
                                    alert("Этот сотрудник уже в списке")
                                }
                                else{


                                choseEmployee.push({
                                    nameEmployee: Employee[isInEmployee].nameEmployee,
                                    secondNameEmployee: Employee[isInEmployee].secondNameEmployee,
                                    experienceEmployee: Employee[isInEmployee].experienceEmployee,
                                    positionEmployee: Employee[isInEmployee].positionEmployee

                                })
                                   employeeArr.splice(isInEmployee,1)
                                    //  refreshTable("employeeTable", choseEmployee)
                                    console.log("choseEmploye = ",choseEmploye)
                                    refreshTable(idTabel, choseEmploye)

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
                employeeAssessment: employee,
            }
        )
        closeWindow()
        refreshTable("asesTable", Assessment)
    }
}

function viewModel(employeeArr) {
    var popup = webix.ready(function () {
        webix.ui({
            view: "window",
            head:{view:"template",
                template:"Введите данные о мероприятии",
                css:"windowTemplate"},
            //close: true,
            modal: true,
            id: "pop1",
            css:"main",
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
                            stringResult:true
                           // format:webix.Date.dateToStr("%d/%m/%y")
                        }, {view: "button", value: "Закрыть окно", click: "closeWindow()",css:"btnDeleteWindow"}
                    ]
                }
                    , {
                        rows: [{
                            cols: [{
                                css:"nameAses",
                                view: "template", width: 500,
                                type: "header", template: "Кандидаты"
                            }, {
                                css:"nameAses",
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
                                    css:"dataTable",
                                    //select: "row",
                                    editaction: "click",
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
                                    columns: [{id: "nameMan", header: "Имя", editor: "text"},
                                        {id: "secondNameMan", header: "Фамилия", editor: "text",},
                                        {id: "patronymic", header: "Отчество", width: 300, editor: "text",},
                                    ],


                                }, {
                                    cols: [
                                        {
                                            view: "button",
                                            id: "delCand",
                                            css:"btnDelete",

                                            value: "Убрать человека",
                                            on: {
                                                onItemClick: function () {
                                                    //  let candidateId = $$("dataCols").getItem($$("dataCols").getSelectedId()).id
                                                    delRowFromTable(DataAssessment, "dataCols")

                                                }
                                            },
                                            width: 200
                                        },{
                                            view: "button",
                                            css:"btnAdd",
                                            value: "Добавить человека",
                                            on: {onItemClick:function ()
                                                {
                                                    AddCandidate("dataCols",DataAssessment);
                                                }

                                                } ,
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
                                    data: choseEmployee,
                                    autoConfig: true,
                                    columns: [{id: "nameEmployee", header: "Имя"},
                                        {id: "secondNameEmployee", header: "Фамилия"},
                                        {id: "experienceEmployee", header: "Опыт работы(лет)"},
                                        {id: "positionEmployee", header: "Должность", width: 300}

                                    ],

                                }, {
                                    cols: [{
                                        view: "button", value: "убрать сотрудника",
                                        css:"btnDelete",
                                        on: {
                                            onItemClick: function () {

                                                delRowFromTable(choseEmployee, "employeeTable",employeeArr)

                                            }
                                        },
                                    }, {
                                        view: "button", value: "Добавить сотрудника", width: 300,
                                        css:"btnAdd",
                                        on: {
                                            onItemClick: function () {


                                                AddEmployee(choseEmployee, "employeeTable",employeeArr)

                                            }}
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
                            click: "AddInMainPage()",
                            width: 300,
                            height: 100
                        },

                        ]
                    }],
            }
        }).show();
    })
}