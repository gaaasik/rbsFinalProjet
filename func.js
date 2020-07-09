function deleteFromTabel(data, tabelId) {
    let Id = $$(tabelId).getItem($$(tabelId).getSelectedId()).id
    let isInTabel = findInd(data, Id)
    data.splice(isInTabel, 1)
    refreshTable("dataAssessmentSelect", data)

}

function changeState(state) {
    if (confirm("Вы уверены что хотите поменять статус?"))
    {
        if (state === "Создано") {
            state = "В процессе"
            $$("currentStateSelect").define("value", state)
            $$("currentStateSelect").refresh();
        }
        // if (state === "Завершено") {
        //       $$("currentStateSelect").define("on","")
        // }
        // if (state === "В процессе") {
        //     state = "Завершено"
        // }


        checkState(state);
        console.log("")
        selectAssessment[0].currentStateSelect = state;
        Assessment[selectAssessment[0].isInAssess].currentState = state

    }
}

    function checkState(chState) {

        if ((chState === "В процессе")||(chState ==="Завершено")) {
            $$("dataAssessmentSelect").define("editable", false)
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
            //  $$("dataAssessmentSelect").refresh()

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
            console.log("")
        }

    }