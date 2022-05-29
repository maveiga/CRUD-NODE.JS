import express from 'express';
import Produto from '../modelo/produto.js';
import ProdutoDB from '../persistencia/produtoDB.js';

const rotaProduto = express.Router();
//permite que dados sejam recuperados com comando req body
rotaProduto.use(express.json());
const produtoDB = new ProdutoDB();

rotaProduto.route('/:id?')
.get((req, resp) => {
    if (req.params.id)
    {
       
        produtoDB.consultarPorID(req.params.id).then((produto)=>{
            resp.statusCode=200;    //sucesso
            resp.setHeader("Content-Type","application/json");
            resp.json(produto.toJSON());
        })
       
    }
    else
    {
        produtoDB.consultarPorNome("").then((produtos)=>{
            resp.statusCode=200;
            resp.setHeader("Content-Type","application/json");
            resp.json(produtos.map((produto)=>{
                return produto.toJSON();
            }));

        })
        
    }
})
.post((req,resp) =>{
    if (req.params.id){
        resp.statusCode = 405;
        resp.setHeader("Content-Type","application/json");
        resp.json('status 405 - não permitido , para cadastro de Produtos não especifique ID');
    }
   else{
       const dados = req.body;
       const nome = dados.nome;
       const quantidade = dados.quantidade;
       const marca = dados.marca;
       const descricao = dados.descricao
       if (nome && quantidade && marca && descricao){
           const produto = new Produto(0,nome,quantidade,marca,descricao);
           produtoDB.incluir(produto).then(()=>{
               resp.statusCode =200;
               resp.setHeader("Content-Type","application/json");
               resp.json({
                   "status":"200 - incluido com sucesso",
                   "id":produto.id
               })

           })
       }
       else{
        resp.statusCode = 405;
        resp.setHeader("Content-Type","application/json");
        resp.json('status 405 - Para cadastrar um Produto informa Nome, Quantidade, Marca e Descrição');

    }




   }
})
.put((req,resp) => {
    if (req.params.id){
       const dados = req.body;
        const nome = dados.nome;
        const quantidade = dados.quantidade;
        const marca = dados.marca;
        const descricao = dados.descricao;

       if (nome && quantidade && marca && descricao)
        {const produto = new Produto(req.params.id,nome,quantidade,marca,descricao)
            produtoDB.atualizar(produto).then((resultado) =>{
                resp.statusCode=200;
                resp.setHeader("Content-type", "application/json");
                resp.json(resultado)

            });
        }
        else{
            resp.statusCode = 405;
            resp.setHeader("Content-Type","application/json");
            resp.end('status 405 - Para Atualizar um Produto informa Nome, Quantidade, Marca e Descrição');
        }
    
    }
    else{
    resp.statusCode = 405;
    resp.setHeader("Content-Type","text/html");
    resp.json('status 405 não é Método permitido! Para atualizar produto informa o id na requisição ');
    }
})
.delete((req,resp)=>{
    if (req.params.id){
       const produto = new Produto(req.params.id,"","","","");
       produtoDB.excluir(produto).then((resultado)=>{
        resp.statusCode=200;
        resp.setHeader("Content-type", "application/json");
        resp.json(resultado)


       })

    }
    else{
        resp.statusCode = 405;
        resp.setHeader("Content-Type","application/json");
        resp.end('status 405 - Para Excluir um Produto ID');

    }
    
});

export default rotaProduto;