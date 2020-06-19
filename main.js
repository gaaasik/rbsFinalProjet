let asesTable = [
    {number: 1, name: "Собеседование раз", state: "Создано"}
]
function addActivity() {
    var popup = webix.ui({
    view:"popup",
   // id:"my_popup",
    height:250,
    width:300,
    body:{
        template:"Some text"
    }
}).show();
    console.log("pop")

}
function deleteActivity(){
    console.log("dellllll")
}
webix.ready(function () {
    webix.ui({
            rows: [{
                view: "toolbar", id: "myToolbar",
                cols: [
                    {view: "template", type: "header", height: 100, template: "шапка "},
                    {view:"template",select:"view",template: "Удалить Мероприятие", css:"delActivityClass",id:"deleteActivity", width:100,
                        onClick:{"delActivityClass":function () {
                                deleteActivity();
                                }}}

                    ,{view:"template",select:"view", width:100,template: "Добавить мероприятие",css:"addActivityClass",id:"addActivity",
                        onClick:{"addActivityClass":function () {
                            console.log("adddddddddddd")
                                addActivityPop();

                            } }}

                ]

            },
                {
                    rows: [{
                        cols: [{
                            view: "datatable",
                            id: "asesTable",
                            select: "row",
                            data: asesTable,
                            width:430,


                            columns: [{id: "number", header: "№", width: 30},
                                {id: "name", width: 200, header: "Название мероприятия"},
                                {id: "state",width: 200, header: "Статус"},

                            ] ,
                            on: { onitemclick: function(){
                                console.log("clickrow")

                                }},
                        }, {view: "resizer"},
                            {cols:[{
                                view:"datatable",
                                    id:"resultPath",
                                    columns: [{header:"Результат собеседования"}]

                                }]}]
                    }]
                }

            ]
        }
    )
})
/*{cols:[{view: "template",  width:100,type: "header", template: "Номер"},
                  {view: "template", width:150,type: "header", template: "Название"},
                    {view: "template", width:150,type: "header",template: "Дата"},
                    {view: "template", width:150,type: "header",template: "Состояние"},
                  {view: "template",type: "header",template: "Результат собеседования      "}
                  ]}*/
