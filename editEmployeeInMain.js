function editEmployeeInMain() {
    console.log("chose Employee = ", Employee)
    webix.ui({
            view: "window",
            close: true,
            modal: true,
            id:"modalWindowEmployee",
            width: 700,
            height: 500,
            position: "center",
            head:"Работники",
            body: {
                rows: [{
                    id: "editEmployeeTable",
                    view: "datatable",
                    position: "center",
                    navigation: true,
                    editable: true,

                    select: "row",
                    editaction: "dblclick",


                    data: Employee,
                    autoConfig: true,
                    columns: [{id: "nameEmployee", header: "Имя", editor: "text"},
                        {id: "secondNameEmployee", header: "Фамилия", editor: "text"},
                        {id: "experienceEmployee", header: "Опыт работы(лет)", editor: "text"},
                        {id: "positionEmployee", header: "Должность", editor: "text", width: 300}

                    ],
                    on:{onitemclick: function () {
                        $$("deleteEmployee").show()
                        }}

                }, {
                    cols: [{view: "button",hidden:true, id: "deleteEmployee",value: "убрать сотрудника", click:"deleteEmployee()"}, {
                        view: "button", value: "Внести сотрудника в таблицу", click: "addEmployeeInTable()",

                    }]

                },{
                    view: "button", value: "Сохранить изменения и выйти", click: "pushAllChangeEmployee()"}]}

        }
    ).show()

}

function pushAllChangeEmployee() {
    $$("modalWindowEmployee").close();
   // refreshTable("editEmployeeTable",Employee)
}

function deleteEmployee() {
    let employeeId = $$("editEmployeeTable").getItem($$("editEmployeeTable").getSelectedId()).id
    let isInEmployee = findInd(Employee,employeeId)
    if ((confirm("Вы уверены что хотите удалить этого сотрудника??"))){
        Employee.splice(isInEmployee, 1)
        refreshTable("editEmployeeTable", Employee);
    }}

function addEmployeeInTable() {
     webix.ui({
         head:"Заполните данные о сотруднике",
        view: "window",
        close: true,
        id:"editEmployee",
        width: 400,
        height: 400,
        position: "center",
        body: {
            rows: [
                {
                    view: "text", id: "nameNewEmployee", placeholder: "Имя", width: 200
                }, {
                    view: "text", id: "secondNameNewEmployee", placeholder: "Фамилия", width: 200
                }, {
                    view: "text", id: "experienceNewEmployee", placeholder: "Опыт", width: 200
                }, {
                    view: "text", id: "positionNewEmployee", placeholder: "Должность", width: 200
                },{view: "button", id:"addEmployee", value: "Добавить",click:"pushEmployee()"}

            ]
        }


    }).show()
}

function pushEmployee() {
    console.log("name = ", $$("nameNewEmployee").getValue())
    if(($$("nameNewEmployee").getValue()==="")||($$("secondNameNewEmployee").getValue()==="")||($$("experienceNewEmployee").getValue()==="")||($$("positionNewEmployee").getValue()===""))
    { alert("Заполнены не все поля")}
    else {
        Employee.push(
            {
                nameEmployee: $$("nameNewEmployee").getValue(),
                secondNameEmployee :$$("secondNameNewEmployee").getValue(),
                experienceEmployee: $$("experienceNewEmployee").getValue(),
                positionEmployee: $$("positionNewEmployee").getValue()



            }
        )
        refreshTable("editEmployeeTable",Employee)
        $$("editEmployee").close()
       // add.close();
    }

}

function deleteCandidateFromWindow() {
    refreshTable("dataCols", DataAssessment);
    let candidateId = $$("dataCols").getItem($$("dataCols").getSelectedId().id)
    let isInCandidate = findInd(candidateId, DataAssessment)
    console.log("candidate id = ", candidateId)
    DataAssessment.splice(isInCandidate, 1)
    refreshTable("dataCols", DataAssessment);


}