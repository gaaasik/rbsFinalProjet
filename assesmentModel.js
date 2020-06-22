function refreshTable() {
    $$("dataCols").clearAll();
    $$("dataCols").define("data",DataAssessment)
    $$("dataCols").refresh();

}
function AddMan(){

    // DataAssessment.push(
    //     {   nameMan: { view:"text", placeholder :"Имя",width: 200},
    //         secondNameMan: { view:"text", placeholder :"Фамилия",width: 200},
    //         resultAssessment: { view:"text", placeholder :"Результат",width: 200}
    //
    //     }
   // )
    refreshTable();



}
function closeWindow() {
    $$("pop1").close();

}

function viewModel() {
 var popup = webix.ui({
        view: "window",
        modal:true,
        id: "pop1",
         fullscreen:true,
        body: { id:"mylayout",
            rows: [{  //id:"dataCols",
                cols: [{ view:"text",id:"nameAssessment", placeholder :"Название",width: 200},
                    {
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
                        {id:"SecondName",header:"Фамилия",editor:"text",},
                        {id:"resultAssessment",header:"Результат",width:300,editor:"text",},
                    ],


            }, {view:"button",value:"Добавить человека", click:"AddMan()", width: 200},
                {view: "button",value:"Закрыть окно", click:"closeWindow()"}
                ],  }} ).show();
    console.log("pop")

}