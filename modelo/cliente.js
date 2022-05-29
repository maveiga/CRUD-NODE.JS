export default class Cliente{
    //o caracter # define que os atributos dessa classe são privados
    #id
    #cpf
    #nome
    #cidade
    #pets

    constructor(id, cpf, nome, cidade,pets){
        this.#id = id;
        this.#cpf=cpf;
        this.#nome=nome;
        this.#cidade=cidade;
        this.#pets=pets
    }

    get id(){
        return this.#id;
    }
    
    set id(novoId){
        this.#id = novoId;
    }

    get cpf(){
        return this.#cpf;
    }

    set cpf(novoCpf){
        this.cpf = novoCpf;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome = novoNome;

    }

    get cidade(){
        return this.#cidade;
    }

    set cidade(novaCidade){
        this.#cidade = novaCidade;
    }

    get pets(){
        return this.#pets;
    }

    set pets(listaPets){
        this.#pets = listaPets
    }

    toJSON(){
        return {
            "id":this.#id,
            "cpf":this.#cpf,
            "nome":this.#nome,
            "cidade":this.#cidade,
            "pets":this.#pets.map((pet)=> { return pet.toJSON()})       
        }
    }

}