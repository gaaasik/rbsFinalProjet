function refreshTable(IdTable,table) {
    $$(IdTable).clearAll();
    $$(IdTable).define("data", table)
    $$(IdTable).refresh();

}

function AddMan() {

    DataAssessment.push(
        {
            nameMan: "Имя",
            secondNameMan: "фамилия",
            resultAssessment: "Результат"
        })
    refreshTable("dataCols",DataAssessment);


}
function AddEmployee() {

}
function closeWindow() {
    $$("pop1").close();
}


function AddInMainPage() {
    console.log("log = ", $$("nameAssessment").getValue())

    let candidate = new Candidate(DataAssessment)
    let assessment = new Assesment($$("nameAssessment").getValue(), $$("dateAses").getValue())
   // let employee = new Employee($$("Employee").getValue())
    //console.log("Employee = ",employee.getEmployee())
    console.log(candidate)
    Assessment.push({
            nameAssessment: assessment.name,
             dateAssessment: assessment.date,
            currentState:"Создано",
    }

    )
    closeWindow()
    refreshTable("asesTable",Assessment)

//     console.log(DataAssessment)
//     console.log($$("nameAssessment").getValue())
//     console.log(($$("dateAses").getValue()))
//     let infoMan =[ {nameMan:"",secondName:"",result:""}]
//         for (let i = 0;i<DataAssessment.length;i++){
//         infoMan[i].nameMan = DataAssessment[i].nameMan;
//         infoMan[i].secondName=DataAssessment[i].secondNameMan;
//         infoMan[i].result =DataAssessment[i].resultAssessment;
//         console.log(infoMan[i].nameMan)
//     }
//
//     let allInfo = [{nameAssess:$$("nameAssessment").getValue(),
//         dateAssess: $$("dateAses").getValue(),
//         info:infoMan
//         } ]
//     console.log("All Info = ",allInfo)
}






function viewModel() {
    var popup = webix.ready(function () {
        webix.ui({
            view: "window",
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
                ,{rows:[{cols:[{ view:"template",width:500,
                                type:"header", template:"Кандидаты" },{ view:"template",
                                type:"header", template:"Сотрудники" }]}]},

                    {cols:[
                    { //кандидаты
                        id: "dataCols",
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
                        columns: [{id: "nameMan", header: "Имя", editor: "text",},
                            {id: "secondNameMan", header: "Фамилия", editor: "text",},
                            {id: "resultAssessment", header: "Результат", width: 300, editor: "text",},
                        ],


                    },{view: "resizer"},
                        { //работники
                            id: "employeeTable",
                            view: "datatable",
                            select: "row",
                            navigation: true,
                            autoheight: true,
                            autowidth: true,
                            data: Employee,
                            autoConfig: true,
                            columns: [{id: "nameEmployee", header: "Имя"},
                                {id: "secondNameEmployee", header: "Фамилия"},
                                {id: "experienceEmployee", header: "Опыт работы(лет)" },
                                {id: "positionEmployee", header: "Должность", width: 300}

                            ],


                        }
                       ]},
                    {cols:[{view: "button", value: "Добавить человека", click: "AddMan()", width: 200},
                            {view: "button", value: "Добавить сотрудника", click: "AddEmployee()", width: 200
                            }]
                    },
                    {view: "button", value: "Добавить мероприятие", click: "AddInMainPage()", width: 200, height: 100},
                    {view: "button", value: "Закрыть окно", click: "closeWindow()", width: 400}
                ],
            }
        }).show();
    })
}