import {MongoClient, ObjectId} from 'mongodb';

import Cliente from '../modelo/cliente.js';
import Pet from '../modelo/Pet.js';


const uriBancoDados = "mongodb://localhost:27017";
const baseDados = 'AulaLP1';
const colecao = "Clientes";

export default class ClienteDB{

    constructor(){
        this.clienteMongo = new MongoClient(uriBancoDados);
    }

    async incluir(cliente){
        if (cliente instanceof Cliente){
            try{ //tentar
                //deve aguardar (await) a conexão ser estabelecida
                await this.clienteMongo.connect();
                const resultado = await this.clienteMongo.db(baseDados).collection(colecao)
                .insertOne({"cpf":cliente.cpf,"nome":cliente.nome,"cidade":cliente.cidade});
                cliente.id = resultado.insertedId.toString();

            }catch(e){
                console.error(e);
            }
            finally{
               await this.clienteMongo.close();
            }
        }
    }

    async atualizar(cliente){
        if (cliente instanceof Cliente){
            try{
                await this.clienteMongo.connect();
                const identificador = new ObjectId(cliente.id);
                const resultado = await this.clienteMongo.db(baseDados).collection(colecao)
                .updateOne({'_id':identificador},{"$set":{"cpf":cliente.cpf,"nome":cliente.nome,"cidade":cliente.cidade}});
                if (resultado.modifiedCount > 0){
                    return {
                        "resultado":true
                    }
                }
                else{
                    return {
                        "resultado":false
                    }
                }
            }catch(e){
                console.error(e);
            }finally{
                await this.clienteMongo.close(); //este comando será sempre executado
            }

        }
    }

    async excluir(cliente){
        if (cliente instanceof Cliente){
            try{
                await this.clienteMongo.connect();
                const identificador = new ObjectId(cliente.id);
                const resultado = await this.clienteMongo.db(baseDados).collection(colecao)
                .deleteOne({'_id':identificador});
                if (resultado.deletedCount > 0){
                    return {
                        "resultado":true
                    }
                }
                else{
                    return {
                        "resultado":false
                    }
                }
            }catch(e){
                console.error(e);
            }finally{
                await this.clienteMongo.close(); //este comando será sempre executado
            }

        }

    }

    async consultarPorID(id){
        try{
            await this.clienteMongo.connect();
            const identificador = new ObjectId(id);
            const resultadoBusca = await this.clienteMongo.db(baseDados).collection(colecao)
            .findOne({"_id":identificador});
            if (resultadoBusca){
                const clienteBuscado = new Cliente(resultadoBusca._id,
                                                   resultadoBusca.cpf,
                                                   resultadoBusca.nome,
                                                   resultadoBusca.cidade);
                return clienteBuscado;
            } 
        }catch(e){
            console.error(e);
        }finally{
            this.clienteMongo.close();
        }

    }

    //recupera mais de um cliente
    async consultarPorNome(nome){
        try{
            await this.clienteMongo.connect();
            const cursor = this.clienteMongo.db(baseDados).collection(colecao)
            .find({"nome":{"$regex":nome}});
            const resultados = await cursor.toArray();
            let listaClientes = [];
            if (resultados){
                //for resultados.forEach((resultado) => {
                    for (const resultado of resultados){
                    const documentosPets =await this.clienteMongo.db(baseDados).collection("Pet").find({"codProprietario":resultado._id.toString()}).toArray()
                    let listaPets=documentosPets.map((docPet)=>{
                        return new Pet(docPet._id.toString(),docPet.nome, docPet.especie,docPet.cor, docPet.codProprietario)
                    })
                    const cliente = new Cliente(resultado._id,
                                                resultado.cpf,
                                                resultado.nome,
                                                resultado.cidade,
                                                listaPets);
                    listaClientes.push(cliente);
                };
            }
            return listaClientes;

        }catch(e){
            console.error(e);
        }finally{
            this.clienteMongo.close();
        }
    }
}


