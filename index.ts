/*
    +Sistema de gerenciamento de inventário de lojas+

    *OBJETIVOS:

        - Otimizar o controle de estoques e vendas na loja [A CONFIRMAR];
        - Fornecer informações sobre disponibilidades de produtos [FEITO];

    *FUNCIONALIDADES A CUMPRIR:

        - Controle de estoque (verificação de estoque após cada operação - imprimir resultados na tela)[100%];
        - Relatório de vendas (opção "show all" - apresentar todos os dados)[100%];
        - Alertas de estoque baixo (após toda venda, checar limite)[100%];

    *OBRIGATORIEDADE:
        
        - Classe para produtos[FEITO], transações e relatórios
        - Subclasses para diferentes categorias de produtos [FEITO]
        - Diferentes implementações de estoque [FEITO]
        - Tratamento de casos como falta de estoque ou erros de entrada de dados[50%]

    *É Necessário criar o atributo limite e elaborar meio de utilizá-lo
*/

//Criação de Array para gravar todos os registros de venda
let listaCompleta: string[] = [];

//Interface para Gerenciamento de estoque
interface gerenciaEstoque{
    checaEstoque():void ;
    atualizaEstoque(quantidade:number):void ;
}

//Classe para estoque básico - implementação de interface gerenciaEstoque
class estoqueBasico implements gerenciaEstoque{
    private _quantidade:number;

    constructor(quantidadeInicial:number){
        this._quantidade = quantidadeInicial;
    }

    checaEstoque(){
        console.log(`Quantidade em estoque atual:${this._quantidade} unidades`);
    }

    atualizaEstoque(quantidade:number){
        this._quantidade +=quantidade;
        console.log(`Estoque atualizado - Novo estoque:${this._quantidade} unidades`);
    }
}

//Classe para Estoque limite - também implementação de interface gerenciaEstoque
class estoqueLimite implements gerenciaEstoque{
    private _quantidade:number;
    private _limite:number;

    constructor(quantidadeInicial:number, limite:number){
        this._quantidade = quantidadeInicial;
        this._limite = limite;
    }

    checaEstoque(){
        console.log(`Quantidade em estoque atual:${this._quantidade} unidades`);
    }

    atualizaEstoque(quantidade: number): void {
        this._quantidade +=quantidade;
        console.log(`Estoque atualizado - Novo estoque:${this._quantidade} unidades`);

        if(this._quantidade<=this._limite){
            console.log(`ALERTA: QUANTIDADE ABAIXO DO LIMITE!\nEstoque: ${this._quantidade}| Mínimo necessário:${this._limite}`);
        }

    }
}

//Função para ler todos os registros da lista de vendas e compras
function verLista(){
    for (let index = 0; index < listaCompleta.length; index++) {
        console.log(listaCompleta[index]);
    }
}

//Implementação da classe Produto
class Produto{
    protected static listaProdutos:Produto[] = [];//Lista para registrar todos os produtos disponíveis e instanciados em um array.

    protected _codigo:number; //PK
    protected _nome:string;
    protected _quantidade:number;
    protected _limite:number;
    protected _preco:number;
    protected _info:string =  "";
    protected _estoque:gerenciaEstoque;

    constructor(codigo:number, nome:string, quantidade:number, limite:number, preco:number, estoque:gerenciaEstoque){
        this._codigo = codigo;
        this._nome = nome;
        this._quantidade = quantidade;
        this._limite = limite;
        this._preco = preco;
        this._estoque = estoque;

        Produto.listaProdutos.push(this); //Após cada constructor (instancia), o objeto é registrado no array
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
            this._estoque.atualizaEstoque(-venda);
            console.log(`Venda realizada com sucesso: Quantidade:${venda} ${this._nome}`);
            //Inserir informacao da venda em registro de produto
            this._info += `\nVenda: QUANTIDADE:${venda} | PRODUTO:${this._nome} | PREÇO/UNIDADE:${this._preco} R$| PREÇO/TOTAL:${venda * this._preco} R$`;
            //Inserir informacao da venda em registro total
            listaCompleta.push(this._info);
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
            this._estoque.atualizaEstoque(compra);
            console.log(`Compra realizada com sucesso: Quantidade:${compra} ${this._nome}`);
            //Inserir informacao da compra em registro de produto
            this._info += `\nCompra: QUANTIDADE:${compra} | PRODUTO:${this._nome} | PREÇO/UNIDADE:${this._preco} R$| PREÇO/TOTAL:${compra * this._preco} R$`;
            //Inserir informacao da compra em registro total
            listaCompleta.push(this._info);
            this.setQuantidade(this._quantidade);
        }
    }

    //Função "ToString"
    public lista(){
        console.log(this._info);
    }

    //Função para ver todos os produtos disponíveis
    public static listaprodutos(){
        console.log("\nPRATELEIRA DE PRODUTOS:\n");
        console.log("+============================================================================================================+\n");
        for(const produto of Produto.listaProdutos){//Imprimir para cada produto a seguinte informação:
            console.log(`Código: ${produto._codigo} | Produto: ${produto._nome} | Quantidade: ${produto._quantidade} | Preço: ${produto._preco} R$\n`);
        }
        console.log("+============================================================================================================+\n");
    }
}

//Implementação de subclasses
class Informatica extends Produto{
    constructor(codigo:number, nome:string, quantidade:number, limite:number, preco:number,estoque:gerenciaEstoque){
        super(codigo,nome,quantidade,limite,preco,estoque);
    } 
}

class Eletrodomesticos extends Produto{
    constructor(codigo:number, nome:string, quantidade:number, limite:number, preco:number,estoque:gerenciaEstoque){
        super(codigo,nome,quantidade,limite,preco,estoque);
    } 
}

const estoqueGeladeira = new estoqueLimite(20,5);
const estoquePc = new estoqueLimite(12,10);
const geladeira = new Eletrodomesticos(231, "Tramontina",20,5, 100,estoqueGeladeira);
const pc = new Informatica(123, "PC Positivo", 12,10,20.00,estoquePc);

Produto.listaprodutos();
console.log(pc.getQuantidade());
geladeira.compra(1);
pc.compra(3);//Compra
verLista();
