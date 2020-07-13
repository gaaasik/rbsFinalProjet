class EmployeeClass {
    constructor(employeeAssessment) {
        this.employeeAssessment = employeeAssessment;
    }

    get getEmployee() {
        return `${this.employeeAssessment}`
    }

    set Employee(employee) {
        this.employeeAssessment = employee;
    }

    returnEmployee(dataMain) {
        dataMain.push({
            nameEmployee: this.employeeAssessment.nameEmployee,
            secondNameEmployee: this.employeeAssessment.secondNameEmployee,
            experienceEmployee: this.employeeAssessment.experienceEmployee,
            positionEmployee: this.employeeAssessment.positionEmployee

        })

    }


    deleteEmployeeFromTable() {
        let employeeId = $$("editEmployeeTable").getItem($$("editEmployeeTable").getSelectedId()).id
        let isInEmployee = findInd(this.employeeAssessment, employeeId)
        if ((confirm("Вы уверены что хотите удалить этого сотрудника??"))) {
            this.employeeAssessment.splice(isInEmployee, 1)
            refreshTable("editEmployeeTable", this.employeeAssessment);
        }
    } // удалить насовсем
    AddNewEmployee() {

        if (($$("nameNewEmployee").getValue() === "") || ($$("secondNameNewEmployee").getValue() === "") || ($$("experienceNewEmployee").getValue() === "") || ($$("positionNewEmployee").getValue() === "")) {
            alert("Заполнены не все поля")
        } else {
            this.employeeAssessment.push(
                {
                    nameEmployee: $$("nameNewEmployee").getValue(),
                    secondNameEmployee: $$("secondNameNewEmployee").getValue(),
                    experienceEmployee: $$("experienceNewEmployee").getValue(),
                    positionEmployee: $$("positionNewEmployee").getValue()


                }
            )
            refreshTable("editEmployeeTable", this.employeeAssessment)
            $$("editEmployee").close()

        }

    } // добавить с клавиатуры


    AddEmployee(EmployeeAssessmentt, idTabel, employee) {

        webix.ready(function () {
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
                            view: "button", value: "Закрыть окно", css: "btnDelete",
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
                                data: employee,
                                autoConfig: true,

                                columns: [{id: "nameEmployee", header: "Имя"},
                                    {id: "secondNameEmployee", header: "Фамилия"},
                                    {id: "experienceEmployee", header: "Опыт работы(лет)"},
                                    {id: "positionEmployee", header: "Должность", width: 300}

                                ],

                                on: {
                                    onItemClick: function () {
                                        let employeeId = $$("choseEmployeeTable").getItem($$("choseEmployeeTable").getSelectedId()).id
                                        let isInEmployee = findI(employee, employeeId)
                                        let isInChoseEmploeyy = findI(EmployeeAssessmentt, employeeId)
                                        if (isInChoseEmploeyy > -1) {
                                            alert("Этот сотрудник уже в списке")
                                        } else {

                                             EmployeeAssessmentt.push({
                                                nameEmployee: employee[isInEmployee].nameEmployee,
                                                secondNameEmployee: employee[isInEmployee].secondNameEmployee,
                                                experienceEmployee: employee[isInEmployee].experienceEmployee,
                                                positionEmployee: employee[isInEmployee].positionEmployee

                                            })
                                            employee.splice(isInEmployee, 1)
                                            refreshTable(idTabel, EmployeeAssessmentt)

                                            $$("addEmpl").close()

                                        }
                                    }


                                }


                            }]
                        //работники

                    }
                }).show()


        })
    }


    deleteEmployee(table, textIdTable) {

        let Id = $$(textIdTable).getItem($$(textIdTable).getSelectedId()).id
        let isInTable = findInd(table, Id)

            Employee.push({
                nameEmployee: table[isInTable].nameEmployee,
                secondNameEmployee: table[isInTable].secondNameEmployee,
                experienceEmployee: table[isInTable].experienceEmployee,
                positionEmployee: table[isInTable].positionEmployee
            })

        table.splice(isInTable, 1)
        refreshTable(textIdTable, table)

    }
}





