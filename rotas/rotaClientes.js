import express from 'express';
import ClienteDB from '../persistencia/clienteDB.js';
import Cliente from '../modelo/cliente.js';

const rotaCliente = express.Router();
//permite que dados sejam recuperados com comando req body
rotaCliente.use(express.json());
const clienteDB = new ClienteDB();

rotaCliente.route('/:id?')
.get((req, resp) => {
    if (req.params.id)
    {
       
        clienteDB.consultarPorID(req.params.id).then((cliente)=>{
            resp.statusCode=200;    //sucesso
            resp.setHeader("Content-Type","application/json");
            resp.json(cliente.toJSON());
        })
       
    }
    else
    {
        clienteDB.consultarPorNome("").then((clientes)=>{
            resp.statusCode=200;
            resp.setHeader("Content-Type","application/json");
            resp.json(clientes.map((cliente)=>{
                return cliente.toJSON();
            }));

        })
        
    }
})
.post((req,resp) =>{
    if (req.params.id){
        resp.statusCode = 405;
        resp.setHeader("Content-Type","application/json");
        resp.json('status 405 - não permitido , para cadastro de clientes não especifique ID');
    }
   else{
       const dados = req.body;
       const cpf = dados.cpf;
       const nome = dados.nome;
       const cidade = dados.cidade;
       if (cpf && nome && cidade){
           const cliente = new Cliente(0,cpf,nome,cidade);
           clienteDB.incluir(cliente).then(()=>{
               resp.statusCode =200;
               resp.setHeader("Content-Type","application/json");
               resp.json({
                   "status":"200 - incluido com sucesso",
                   "id":cliente.id
               })

           })
       }
       else{
        resp.statusCode = 405;
        resp.setHeader("Content-Type","application/json");
        resp.json('status 405 - Para cadastrar um cliente informa cpf, nome e cidade corretamente');

    }




   }
})
.put((req,resp) => {
    if (req.params.id){
       const dados = req.body;
        const cpf = dados.cpf;
        const nome = dados.nome;
        const cidade = dados.cidade;
       if (cpf && nome && cidade)
        {const cliente = new Cliente(req.params.id,cpf,nome,cidade)
            clienteDB.atualizar(cliente).then((resultado) =>{
                resp.statusCode=200;
                resp.setHeader("Content-type", "application/json");
                resp.json(resultado)

            });
        }
        else{
            resp.statusCode = 405;
            resp.setHeader("Content-Type","application/json");
            resp.end('status 405 - Para Atualizar um cliente informa cpf, nome e cidade corretamente');
        }
    
    }
    else{
    resp.statusCode=405;
    resp.setHeader("Content-Type","text/html");
    resp.json('statur 405 não é Método permitido!',
    'para atualizar informa o id na requisição ');
    }
})
.delete((req,resp)=>{
    if (req.params.id){
       const cliente = new Cliente(req.params.id,"","","");
       clienteDB.excluir(cliente).then((resultado)=>{
        resp.statusCode=200;
        resp.setHeader("Content-type", "application/json");
        resp.json(resultado)


       })

    }
    else{
        resp.statusCode = 405;
        resp.setHeader("Content-Type","application/json");
        resp.end('status 405 - Para Excluir um cliente informa cpf, nome e cidade corretamente');

    }
    
});

export default rotaCliente;