class Candidate {
    constructor(dataAssessment) {
        this.dataAssessment = dataAssessment;
    }

    get dataAssess() {
        return `${this.dataAssessment}`
    }

    set data(dataAssess) {
        this.dataAssessment = dataAssess;
    }

    inputData(smt) {
        console.log("smt = ", smt)
    }


}

