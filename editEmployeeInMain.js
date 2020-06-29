function editEmployeeInMain(){
    console.log("edit employee")
    webix.ui({
        view:"popup",
        modeless:true,
        width:100,
        height:100,
        top: 50,
        left: 50,
        rows:[{view:"text",value:"wewewewew"}]
    }).show()

}
function deleteCandidateFromWindow() {
    refreshTable("dataCols",DataAssessment);
    let candidateId = $$("dataCols").getItem($$("dataCols").getSelectedId().id)
    let isInCandidate = findInd(candidateId,DataAssessment)
    console.log("candidate id = ",candidateId)
    DataAssessment.splice(isInCandidate,1)
    refreshTable("dataCols",DataAssessment);


}