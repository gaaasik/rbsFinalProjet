function refreshTable() {
    $$("dataCols").clearAll();
    $$("dataCols").define("data",DataAssessment)
    $$("dataCols").refresh();

}
function AddMan(){

     DataAssessment.push(
         {  nameMan:"Имя",
             secondNameMan: "фамилия",
            resultAssessment: "Результат"
        })
    refreshTable();



}
function closeWindow() {
    $$("pop1").close();
}
//
// function getVal(){
//     addCandidate();
//     console.log(DataAssessment)
//     console.log($$("nameAssessment").getValue())
//     console.log(($$("dateAses").getValue()))
//     let infoMan =[ {nameMan:"",secondName:"",result:""}]
//         for (let i = 0;i<DataAssessment.length;i++){
//         infoMan[i].nameMan = DataAssessment[i].nameMan;
//         infoMan[i].secondName=DataAssessment[i].secondNameMan;
//         infoMan[i].result =DataAssessment[i].resultAssessment;
//         console.log(infoMan[i].nameMan)
//     }
//
//     let allInfo = [{nameAssess:$$("nameAssessment").getValue(),
//         dateAssess: $$("dateAses").getValue(),
//         info:infoMan
//         } ]
//     console.log("All Info = ",allInfo)}
    function addCandidate() {
    let candidate = new Candidate(DataAssessment)
       candidate.inputData("DataAssessment");
    console.log("candidate = ",candidate);
}





function viewModel() {
 var popup = webix.ready(function () {webix.ui({
        view: "window",
        modal:true,
        id: "pop1",
         fullscreen:true,
        body: { id:"mylayout",
            rows: [{  //id:"dataCols",
                cols: [{ view:"text",id:"nameAssessment", placeholder :"Название",width: 200},
                    {   id: "dateAses",
                        view: "datepicker",
                        value: new Date(2020,6,22),
                        label: "Date",
                        timepicker: true,
                        width: 300,
                        left:10,
                    },
                ]
            }, {  id:"dataCols",
                view:"datatable",
                editable:true,
                editaction:"dblclick",
                navigation:true,
                select:"cell",
                autoheight:true,
                autowidth:true,
                data:DataAssessment,
                autoConfig:true,
                    columns:[{id:"nameMan",header:"Имя",editor:"text",},
                        {id:"secondNameMan",header:"Фамилия",editor:"text",},
                        {id:"resultAssessment",header:"Результат",width:300,editor:"text",},
                    ],


            }, {view:"button",value:"Добавить человека", click:"AddMan()", width: 200},
                {view:"button",value: "Добавить мероприятие",click: "getVal()",width: 200,height:100},
                {view: "button",value:"Закрыть окно", click:"closeWindow()", width: 400}
                ],  }} ).show();
 })}