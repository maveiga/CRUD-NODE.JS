

var elementoMensagem = document.querySelector('[data-Mensagem]')
var botaoGravar = document.getElementById("botaoGravar")

botaoGravar.onclick = gravarCliente;
exibirTabelaClientes();

function dadosValidos(){
    const cpf = document.getElementById("cpf").value;
    const nome = document.getElementById("nome").value;
    const cidade = document.getElementById("cidade").value;
    

    if (cpf && nome &&  cidade)
        return true;
    else
        return false;


}

function gravarCliente(){
    if (dadosValidos())
    {
    const cpf = document.getElementById("cpf").value;
    const nome = document.getElementById("nome").value;
    const cidade = document.getElementById("cidade").value;
    const cliente = {
        "cpf":cpf,
        "nome":nome,
        "cidade":cidade
    };
        fetch('http://localhost:3000/clientes',
        {
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(cliente)
        }).then((resposta) => 
        {
            if (resposta.ok){
                return resposta.json();
            }
            else
            {
                elementoMensagem.className ="m-3 alert alert-warning";
                elementoMensagem.innerHTML = "<p> Não foi possivel processar as respostas vinda so sercidor</p>"
        
            }

        }).then((dados)=>{
            elementoMensagem.className ="m-3 alert alert-warning";
            elementoMensagem.innerHTML = "<p>"+ dados.status +" - Gerado o id " +dados.id + "</p>"
            exibirTabelaClientes();

        }).catch((erro)=>{
            elementoMensagem.className ="m-3 alert alert-danger";
            elementoMensagem.innerHTML = "<p>"+"Problema de comunicação com servidor("+erro.mensage + ")</p>"

        })
           
    }
    else
    {
        elementoMensagem.className ="m-3 alert alert-warning";
        elementoMensagem.innerHTML = "<p> Informe dos dados corretamentes</p>"

    }
}

function exibirTabelaClientes(){
    fetch('http://localhost:3000/clientes',{method:"GET"}).then((resposta)=>{
        if(resposta.ok){
            return resposta.json();

        }
    }).then((clientes) => {
        elementoVisualizacaoTabela = document.querySelector('[data-Tabela]');
        elementoVisualizacaoTabela.innerHTML = "";
        if (clientes.length == 0)
            elementoVisualizacaoTabela.innerHTML="<p> Não há clientes cadastrados</p>"
        else{
            let tabela = document.createElement('table');
            tabela.className ='table table-striped table-hover';
            let cabecalho = document.createElement('thead');
            cabecalho.innerHTML = "<tr>\
                            <th>ID</th>\
                            <th>CPF</th>\
                            <th>Nome</th>\
                            <th>Cidade</th>\
                            <th>Pet</th>\
                            <th>Ações</th>\
                            </tr>";

            tabela.appendChild(cabecalho);

            let corpo = document.createElement('tbody');
            for (const cliente of clientes){
                const linha = document.createElement('tr');
                linha.innerHTML =   "<td>" + cliente.id + "</td>" +
                                    "<td>" + cliente.cpf + "</td>" +
                                    "<td>" + cliente.nome + "</td>" +
                                    "<td>" + cliente.cidade + "</td>" +
                                    "<td>" + estilizaExibicaoPets(cliente.pets).outerHTML + "</td>" +
                                    "<td><button type='button' class = 'btn btn-danger' onclick='excluirCliente(\""+ cliente.id +"\")'>\
                                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-trash' viewBox='0 0 16 16'>\
                                    <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/>\
                                    <path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/>\
                                    </svg>\
                                    </button>\
                                    <button type='button' class = 'btn btn-warning' onclick='atualizarCliente(\""+ cliente.id+"\")'>\
                                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pencil-square' viewBox='0 0 16 16'>\
                                      <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z'/>\
                                      <path fill-rule='evenodd' d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'/>\
                                    </svg>\
                                    </button>"
                                        
                                    "</td>";
                                    
                corpo.appendChild(linha);
                                
            }
            tabela.appendChild(corpo);

            elementoVisualizacaoTabela.appendChild(tabela);
        }
    });

    

}



function estilizaExibicaoPets(listaPets){
    let divDropdown = document.createElement('div');
    divDropdown.className="btn-group"
    divDropdown.innerHTML='<button type="button" class="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" arial-expanded="false">Pets</button>'
    let lista = document.createElement('ul')
    lista.className="dropdown-menu";
    for (const pet of listaPets){
       let itemLista = document.createElement('li')
        itemLista.innerHTML='<a class="dropdown-item" href="#">' + pet.nome +'->'+ pet.especie + '</a>'
        lista.appendChild(itemLista);
    }

    divDropdown.appendChild(lista)
    return divDropdown;
}



function excluirCliente(id){
    fetch('http://localhost:3000/clientes/'+ id,{
        method:"DELETE"
    }).then((resposta) => 
            {
            if(resposta.ok){
                return resposta.json();
            }
            else{
                elementoMensagem.className ="m-3 alert alert-warning";
                elementoMensagem.innerHTML = "<p>Não foi possivel excluir o cliente</p>";

            }
        
 

    }).then((retorno) => {
        if(retorno){
            elementoMensagem.className ="m-3 alert alert-warning";
            elementoMensagem.innerHTML = "<p>elemento apagado da tabela</p>"
            exibirTabelaClientes();

        }
    }).catch((erro)=> {

        elementoMensagem.className ="m-3 alert alert-danger";
        elementoMensagem.innerHTML = "<p> Não foi possivel enviar a requisição de excluslão para servidor</p>"
    });

}

function atualizarCliente(id){
    const cpf = document.getElementById("cpf").value;
    const nome = document.getElementById("nome").value;
    const cidade = document.getElementById("cidade").value;
    const cliente = {
        "cpf":cpf,
        "nome":nome,
        "cidade":cidade
    };
        fetch('http://localhost:3000/clientes/'+id,
        {
        method:"PUT",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(cliente)
        }).then((resposta) => 
        {
            if (resposta.ok){
                return resposta.json();
            }
            else
            {
                elementoMensagem.className ="m-3 alert alert-warning";
                elementoMensagem.innerHTML = "<p> Não foi possivel processar as respostas vinda so sercidor</p>"
        
            }

        }).then((dados)=>{
            elementoMensagem.className ="m-3 alert alert-warning";
            elementoMensagem.innerHTML = "<p>Atualizado</p>"
            exibirTabelaClientes();

        }).catch((erro)=>{
            elementoMensagem.className ="m-3 alert alert-danger";
            elementoMensagem.innerHTML = "<p>"+"Problema de comunicação com servidor("+erro.mensage + ")</p>"

        })
           
    }
  
