export default class Pet{
    #id
    #nome
    #especie
    #cor
    #cordProprietario
    
    constructor(id, nome, especie, cor, cordProprietario){
        this.#id = id;
        this.#nome=nome;
        this.#especie=especie;
        this.#cor=cor;
        this.#cordProprietario=cordProprietario;
       
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

    get especie(){
        return this.#especie;
    }

    set especie(novoespecie){
        this.#especie = novoespecie;
    }

    get cor(){
        return this.#cor;
    }

    set cor(novacor){
        this.#cor = novacor;
    }

    get cordProprietario(){
        return this.#cordProprietario;
    }

    set cordProprietario(novacordProprietario){
        this.#cordProprietario = novacordProprietario
    }

   

    toJSON(){
        return {
            "id":this.#id,
            "nome":this.#nome,
            "especie":this.#especie,
            "cor":this.#cor,
            "cordProprietario":this.#cordProprietario     
              
        }
    }

}


    