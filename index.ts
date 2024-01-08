/*
    +Sistema de gerenciamento de inventário de lojas+

    *FUNCIONALIDADES A CUMPRIR:

        - Controle de estoque (verificação de estoque após cada operação - imprimir resultados na tela);
        - Relatório de vendas (opção "show all" - apresentar todos os dados);
        - Alertas de estoque baixo (após toda venda, checar limite);

    *OBRIGATORIEDADE:
        
        - Classe para produtos[FEITO], transações e relatórios
        - Subclasses para diferentes categorias de produtos [FEITO]
        - Diferentes implementações de estoque
        - Tratamento de casos como falta de estoque ou erros de entrada de dados

    *É Necessário criar o atributo limite e elaborar meio de utilizá-lo
*/

//Implementação da classe Produto
class Produto{
    protected _codigo:number; //PK
    protected _nome:string;
    protected _quantidade:number;
    protected _limite:number;

    constructor(codigo:number, nome:string, quantidade:number, limite:number){
        this._codigo = codigo;
        this._nome = nome;
        this._quantidade = quantidade;
        this._limite = limite;
    }

    //Getters da classe Produto
    public getCodigo():number{
        return this._codigo;
    }

    public getNome():string{
        return this._nome;
    }

    public getQuantidade():number{
        return this._quantidade;
    }

    public getLimite():number{
        return this._limite;
    }

    //Setters da classe Produto
    public setQuantidade(NovaQuantidade:number){
        if(NovaQuantidade>0){
            this._quantidade = NovaQuantidade;
            console.log("Quantidade atualizada");
        }else{
            console.error("Quantidade inválida");
        }
    }


}

//Implementação de subclasses
class Informatica extends Produto{
    constructor(codigo:number, nome:string, quantidade:number, limite:number){
        super(codigo,nome,quantidade,limite);
    } 
}

class Eletrodomesticos extends Produto{
    constructor(codigo:number, nome:string, quantidade:number, limite:number){
        super(codigo,nome,quantidade,limite);
    }   
}

/*TESTE
const pc = new Informatica(123, "Positivo", 12);
pc.setQuantidade(-11);
console.log(pc.getQuantidade());
*/