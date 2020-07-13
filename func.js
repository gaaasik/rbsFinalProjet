function deleteFromTabel(data, tabelId) {
    let Id = $$(tabelId).getItem($$(tabelId).getSelectedId()).id
    let isInTabel = findInd(data, Id)
    data.splice(isInTabel, 1)
    refreshTable("dataAssessmentSelect", data)
}
function changeState(state) {
    if (confirm("Вы уверены что хотите поменять статус?")) {
        if (state === "Завершено") {
            $$("currentStateSelect").define("on", "")
            checkState(state);

        }
        if (state === "В процессе") {
            state = "Завершено"
            $$("currentStateSelect").define("value", state)
            $$("currentStateSelect").refresh();

            checkState(state);

        }
        if (state === "Создано") {

            state = "В процессе"
            $$("currentStateSelect").define("value", state)
            $$("currentStateSelect").refresh();
            // $$("currentState").refresh();
            checkState(state);

        }
    }
    selectAssessment[0].currentStateSelect = state;
    Assessment[selectAssessment[0].isInAssess].currentState = state
    $$("asesTable").refresh();
}
function checkState(chState) {
    if ((chState === "В процессе") || (chState === "Завершено")) {
        // $$("dataAssessmentSelect").define("editable", false)
        $$("dataAssessmentSelect").config.columns[0].editor = ""
        $$("dataAssessmentSelect").config.columns[1].editor = ""
        $$("dataAssessmentSelect").config.columns[2].editor = ""
        $$("dataAssessmentSelect").config.columns[3].editor = "text"
        $$("nameAssessmentSelect").disable()
        $$("nameAssessmentSelect").refresh();

        $$("dateAssessmentSelect").disable()
        $$("dateAssessmentSelect").refresh();

        $$("btnAddCandidate").define("hidden", true)
        $$("btnAddCandidate").refresh()

        $$("btnDeleteCandidate").define("hidden", true)
        $$("btnDeleteCandidate").refresh()

        $$("btnAddEmployee").define("hidden", true)
        $$("btnAddEmployee").refresh()

        $$("btnDeleteEmployee").define("hidden", true)
        $$("btnDeleteEmployee").refresh()
        // $$("dataAssessmentSelect").getItem( $$("ResultAssessment").define("editor","text"))
        $$("dataAssessmentSelect").refresh()

    }

    if (chState === "Создано") {
        $$("dataAssessmentSelect").define("editable", true)
        $$("nameAssessmentSelect").enable()
        $$("nameAssessmentSelect").refresh();
        $$("dateAssessmentSelect").enable()
        $$("dateAssessmentSelect").refresh();
        $$("btnAddCandidate").show()
        $$("btnAddCandidate").refresh()
    }

    if (chState === "Завершено") {
        $$("dataAssessmentSelect").config.columns[3].editor = ""
        $$("dataAssessmentSelect").refresh()
    }
}


