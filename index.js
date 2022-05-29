import http, { METHODS } from 'http';
import express from 'express';
import rotaCliente from './rotas/rotaClientes.js';
import rotaProduto from './rotas/rotaProdutos.js';
//import cors from 'cors';

const hostname = "localhost";
const porta = 3000;

const app = express();
app.use(express.static('./public'))
/*app.use(cors({
    origin:"*",
    methods:["GET","POST","PUT","DELETE"]
}))*/
app.use('/clientes',rotaCliente);
app.use('/produtos',rotaProduto);


const servidor = http.createServer(app);

servidor.listen(porta,hostname,()=>{
    console.log('Servidor escutando em http://'+hostname+":"+porta);
});