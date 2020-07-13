class Assesment {
    constructor(nameAssessment, dateAssessment) {
        this.nameAssessment = nameAssessment;
        this.dateAssessment = dateAssessment;

    }

    get allInfo() {
        return `${this.nameAssessment} ${this.dateAssessment}`
    }

    get name() {
        return `${this.nameAssessment}`
    }

    get date() {
        return ` ${this.dateAssessment}`
    }

    set name(nameAssess) {
        this.nameAssessment = nameAssess;
    }

    set date(dateAssess) {
        this.dateAssessment = dateAssess;
    }



}
