export default class Produto{
    #id
    #nome
    #quantidade
    #marca
    #descricao

    constructor(id, nome, quantidade, marca, descricao){
        this.#id = id;
        this.#nome=nome;
        this.#quantidade=quantidade;
        this.#marca=marca;
        this.#descricao=descricao;
    }

    get id(){
        return this.#id;
    }
    
    set id(novoId){
        this.#id = novoId;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome = novoNome;

    }

    get quantidade(){
        return this.#quantidade;
    }

    set quantidade(novoQuantidade){
        this.#quantidade = novoQuantidade;
    }

    get marca(){
        return this.#marca;
    }

    set marca(novaMarca){
        this.#marca = novaMarca;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(novaDescricao){
        this.#descricao = novaDescricao
    }

    toJSON(){
        return {
            "id":this.#id,
            "nome":this.#nome,
            "quantidade":this.#quantidade,
            "marca":this.#marca,
            "descricao":this.#descricao            
        }
    }

}


    