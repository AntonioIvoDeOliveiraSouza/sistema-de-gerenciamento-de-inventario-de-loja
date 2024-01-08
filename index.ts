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

    //Função de venda de produtos
    public venda(venda:number){
        if(venda>this._quantidade){
            console.error("Erro: Venda é superior ao estoque");
        }else{
            this._quantidade-=venda;
            console.log(`Venda realizada com sucesso: Quantidade:${venda} ${this._nome}`);
            this.setQuantidade(this._quantidade);
            if(this._quantidade == this._limite){
                console.log("ATENÇÃO: Quantidade chegou ao limite minimo de estoque, favor reponha");
            }
        }
    }

    //Função de compras do produto
    public compra(compra:number){
        if(compra<=0){
            console.error("Erro: Compra negativa e nula não existe");
        }else{
            this._quantidade+=compra;
            console.log(`Compra realizada com sucesso: Quantidade:${compra} ${this._nome}`);
            this.setQuantidade(this._quantidade);
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


const pc = new Informatica(123, "PC Positivo", 12,10);
console.log(pc.getQuantidade());
pc.venda(2);//Venda - alerta estoque
pc.compra(3);//Compra

