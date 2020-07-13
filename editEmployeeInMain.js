function editEmployeeInMain() {
    webix.ui({
            view: "window",

            modal: true,
            id: "modalWindowEmployee",
            width: 700,
            height: 500,
            position: "center",
            head: "Работники",
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
                    on: {
                        onitemclick: function () {
                            $$("deleteEmployee").show()
                        }
                    }

                }, {
                    cols: [{
                        view: "button",
                        css: "btnDelete",
                        hidden: true,
                        id: "deleteEmployee",
                        value: "убрать сотрудника",
                        on: {
                            onitemclick: function () {
                                let employee = new EmployeeClass(Employee)
                                employee.deleteEmployeeFromTable()

                            }
                        }
                    }, {
                        view: "button", css: "btnAdd", value: "Внести сотрудника в таблицу",
                        click: "addEmployeeInTable()" //view

                    }]

                }, {
                    view: "button", css: "btnSave", value: "Выйти", click: "    $$(\"modalWindowEmployee\").close();"
                }]
            }

        }
    ).show()

} //view

function addEmployeeInTable() //view
{
    webix.ui({
        head: "Заполните данные о сотруднике",
        view: "window",
        modal: true,
        id: "editEmployee",
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
                }, {
                    view: "button", id: "addEmployee", value: "Добавить", on: {
                        onitemclick: function () {
                            let employee = new EmployeeClass(Employee)
                            employee.AddNewEmployee()
                        }
                    }
                },
                {
                    view: "button", css: "btnSave", value: "Закрыть", click: "$$(\"editEmployee\").close();"
                }

            ]
        }


    }).show()
}

