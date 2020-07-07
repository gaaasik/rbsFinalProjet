function deleteFromTabel(data,tabelId) {
    let Id = $$(tabelId).getItem($$(tabelId).getSelectedId()).id
    let isInTabel = findInd(data,Id)
    data.splice(isInTabel,1)
    refreshTable("dataAssessmentSelect", data)

}
function changeState(state) {
    if(confirm("Вы уверены что хотите поменять статус?")){
        if(state==="Создано"){
            state = "В процессе"
            $$("currentStateSelect").define("value",state)
            $$("currentStateSelect").refresh();
    }
        checkState(state)
    }

}
function checkState(chState) {
    console.log("state = ", chState)
if(chState ==="В процессе"){
    $$("dataAssessmentSelect").define("editable",false)

    $$("nameAssessmentSelect").define("view", "template")
    $$("nameAssessmentSelect").refresh();

}
}