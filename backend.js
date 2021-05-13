var content = [];
var counter = 0;

function getSite(){
    var busca = document.getElementById("search_bar").value;
    $("#list_table").html("");
    $("#list_table").html(
        "<thead>"+
        "   <tr>"+
        "   <th style=\"width: 39%;\">Titulo</th>"+
        "   <th style=\"width: 39%;\">Veículo</th>"+
        "   <th style=\"width: 11%;\">Fake news?</th>"+
        "   <th style=\"width: 11%;\">Ação</th>"+
        "   </tr>"+
        "</thead>"+
        "<tbody>"+
        "</tbody>"
        );
    for(var i = 0; i <= localStorage.length; i++){
        if(localStorage.getItem(i) !== null){
            var storage = JSON.parse(localStorage.getItem(i));
            if(
                storage.link.includes(busca) ||
                storage.titulo.includes(busca) ||
                storage.veiculo.includes(busca) ||
                storage.texto.includes(busca)
            ){
                $("#list_table tbody").append("<tr>");
                $("#list_table tbody").append("<td>"+storage.titulo+"</td>");
                $("#list_table tbody").append("<td>"+storage.veiculo+"</td>");
                if(storage.isFake == 0){
                    $("#list_table tbody").append("<td><i class=\"fa fa-check\"></i></td>");
                }else{
                    $("#list_table tbody").append("<td><i class=\"fa fa-times\"></i></td>");
                }
                $("#list_table tbody").append("<td><i class=\"fa fa-pencil\" style=\"margin-right:10px;\" onClick=\"pencil("+i+")\"></i><i class=\"fa fa-trash-o\" onClick=\"trash("+i+")\"></i></td>");
        
            }
        }
    }

}

function trash(key){
    localStorage.removeItem(key);
    getSite();

}

function pencil(key){
    localStorage.setItem("to_edit", key);
    window.open("edit.html", "_self"); 
}

function edit(){
    let key = localStorage.getItem("to_edit");
    let to_edit = JSON.parse(localStorage.getItem(key));

    document.getElementById("link").value = to_edit.link;
    document.getElementById("titulo").value = to_edit.titulo;
    document.getElementById("texto").value = to_edit.texto;
    document.getElementById("veiculo").value = to_edit.veiculo;
    document.getElementById("isFake").checked = to_edit.checked;
}


function save() {

    let link = document.getElementById("link").value
    let titulo = document.getElementById("titulo").value
    let texto = document.getElementById("texto").value
    let veiculo = document.getElementById("veiculo").value
    let fake = document.getElementById("isFake").checked

    var values_json = {
        'link': link,
        'titulo': titulo, 
        'texto': texto, 
        'isFake': fake,
        'veiculo': veiculo
    }

    this.content.push(values_json);

    localStorage.setItem(this.counter, JSON.stringify(values_json));
    this.counter++;
    clearFields();
}

function saveOnEdit(){
    let key = localStorage.getItem("to_edit");

    let link = document.getElementById("link").value
    let titulo = document.getElementById("titulo").value
    let texto = document.getElementById("texto").value
    let veiculo = document.getElementById("veiculo").value
    let fake = document.getElementById("isFake").checked

    var values_json = {
        'link': link,
        'titulo': titulo, 
        'texto': texto, 
        'isFake': fake,
        'veiculo': veiculo
    }

    localStorage.setItem(key, JSON.stringify(values_json));
    let tam = localStorage.length-1;
    localStorage.setItem("length",tam);
    clearFields();
}

function Listar(){
    $("#list_table").html("");
    $("#list_table").html(
        "<thead>"+
        "   <tr>"+
        "   <th style=\"width: 39%;\">Titulo</th>"+
        "   <th style=\"width: 39%;\">Veículo</th>"+
        "   <th style=\"width: 11%;\">Fake news?</th>"+
        "   <th style=\"width: 11%;\">Ação</th>"+
        "   </tr>"+
        "</thead>"+
        "<tbody>"+
        "</tbody>"
        );
    for(var i = 0; i <= localStorage.length; i++){
        if(localStorage.getItem(i) !== null){
            var storage = JSON.parse(localStorage.getItem(i));
            $("#list_table tbody").append("<tr>");
            $("#list_table tbody").append("<td>"+storage.titulo+"</td>");
            $("#list_table tbody").append("<td>"+storage.veiculo+"</td>");
            if(storage.isFake == 0){
                $("#list_table tbody").append("<td><i class=\"fa fa-check\"></i></td>");
            }else{
                $("#list_table tbody").append("<td><i class=\"fa fa-times\"></i></td>");
            }
            $("#list_table tbody").append("<td><i class=\"fa fa-pencil\" style=\"margin-right:10px;\" onClick=\"pencil("+i+")\"></i><i class=\"fa fa-trash-o\" onClick=\"trash("+i+")\"></i></td>");
        }
    }
}



function clearFields(){
    document.getElementById("link").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("texto").value = "";
    document.getElementById("veiculo").value = "";
    document.getElementById("isFake").checked = true;
}
