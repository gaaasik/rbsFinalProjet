class Employee {
    constructor(employeeAssessment) {
        this.employeeAssessment = employeeAssessment;
    }
    get getEmployee(){
        return `${this.employeeAssessment}`
    }

    set Employee(employee){
        this.employeeAssessment = employee;
    }
    inputData(smt){
        console.log("smt = ", smt)
    }
}

