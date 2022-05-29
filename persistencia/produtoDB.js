import {MongoClient, ObjectId} from 'mongodb';

import Produto from '../modelo/produto.js';

const uriBancoDados = "mongodb://localhost:27017";
const baseDados = 'AulaLP1';
const colecao = "Produtos";

export default class ProdutoDB{

    constructor(){
        this.ProdutoMongo = new MongoClient(uriBancoDados);
    }

    async incluir(produto){
        if (produto instanceof Produto){
            try{ 
                await this.ProdutoMongo.connect();
                const resultado = await this.ProdutoMongo.db(baseDados).collection(colecao)
                .insertOne({"nome":produto.nome,"quantidade":produto.quantidade,"marca":produto.marca,"descricao":produto.descricao});
                produto.id = resultado.insertedId.toString();

            }catch(e){
                console.error(e);
            }
            finally{
               await this.ProdutoMongo.close();
            }
        }
    }

    async atualizar(produto){
        if (produto instanceof Produto){
            try{
                await this.ProdutoMongo.connect();
                const identificador = new ObjectId(produto.id);
                const resultado = await this.ProdutoMongo.db(baseDados).collection(colecao)
                .updateOne({'_id':identificador},{"$set":{"nome":produto.nome,"quantidade":produto.quantidade,"marca":produto.marca,"descricao":produto.descricao}});
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
                await this.ProdutoMongo.close(); //este comando será sempre executado
            }

        }
    }

    async excluir(produto){
        if (produto instanceof Produto){
            try{
                await this.ProdutoMongo.connect();
                const identificador = new ObjectId(produto.id);
                const resultado = await this.ProdutoMongo.db(baseDados).collection(colecao)
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
                await this.ProdutoMongo.close(); //este comando será sempre executado
            }

        }

    }

    async consultarPorID(id){
        try{
            await this.ProdutoMongo.connect();
            const identificador = new ObjectId(id);
            const resultadoBusca = await this.ProdutoMongo.db(baseDados).collection(colecao)
            .findOne({"_id":identificador});
            if (resultadoBusca){
                const produtoBuscado = new Produto(resultadoBusca._id,
                                                   resultadoBusca.nome,
                                                   resultadoBusca.quantidade,
                                                   resultadoBusca.marca,
                                                   resultadoBusca.descricao,);
                return produtoBuscado;
            } 
        }catch(e){
            console.error(e);
        }finally{
            this.ProdutoMongo.close();
        }

    }

    //recupera mais de um cliente
    async consultarPorNome(nome){
        try{
            await this.ProdutoMongo.connect();
            const cursor = this.ProdutoMongo.db(baseDados).collection(colecao)
            .find({"nome":{"$regex":nome}});
            const resultados = await cursor.toArray();
            let listaProdutos = [];
            if (resultados){
                resultados.forEach((resultado) => {
                    const produto = new Produto(resultado._id,
                                                resultado.nome,
                                                resultado.quantidade,
                                                resultado.marca,
                                                resultado.descricao);
                    listaProdutos.push(produto);
                });
            }
            return listaProdutos;

        }catch(e){
            console.error(e);
        }finally{
            this.ProdutoMongo.close();
        }
    }
}


