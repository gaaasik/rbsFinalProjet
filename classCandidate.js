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

    logDataCandidate() {
        console.log("candidate = ", this.dataAssessment)
    }

    DeleteCandidate(textIdTable) {
        let Id = $$(textIdTable).getItem($$(textIdTable).getSelectedId()).id
        let isInTable = findInd(this.dataAssessment, Id)
        this.dataAssessment.splice(isInTable, 1)
        refreshTable(textIdTable, this.dataAssessment)

    }

    AddCandidate(idTable) {

        let validate = true
        for (let i = 0; i < this.dataAssessment.length; i++) {
            if (this.dataAssessment[i].nameMan === "" || this.dataAssessment[i].secondNameMan === "" || this.dataAssessment[i].patronymic === "") {
                alert("Заполните все поля!")
                validate = false
            } else {
                validate = true;
            }
        }
        if (validate) {
            this.dataAssessment.push(
                {
                    nameMan: "",
                    secondNameMan: "",
                    resultAssessment: ""
                })
            refreshTable(idTable, this.dataAssessment);
        }
    }


}

