let asesTable = [
    {number: 1, name: "Собеседование раз", state: "Создано"}
]
let viewIS = true;
function addActivity() {
    var popup = webix.ui({
                        view:"popup",
                        id:"pop1",
                        height:450,
                        width:1000,modal:true,
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        margin_right: "-50%",
                        body:{

                                cols:[{ view:"template"}],
                                view:"button",value:"Закрыть", css:"closePop", click:function(){
                                    $$("pop1").hide();
                                    console.log("Нажали")
                                }}



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
                    {view:"template",id:"delBtn" , hidden:true , template: "Удалить Мероприятие", css:"delActivityClass", width:100,

                        onClick:{"delActivityClass":function () {
                                deleteActivity();

                                }}}

                    ,{view:"template",select:"view", width:150,template: "Добавить мероприятие",css:"addActivityClass",id:"addActivity",
                        onClick:{"addActivityClass":function () {
                            console.log("adddddddddddd")
                                addActivity();

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

                                    let delButn = $$("delBtn");

                                    delButn.show();

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
