// Objetivo: Implementar o princípio de substituição de Liskov.
// O princípio de substituição de Liskov é um princípio da programação orientada a objetos que diz que um objeto de uma classe filha deve ser capaz de substituir um objeto da classe pai sem que isso cause erros ou problemas na execução do código.
// Para isso, é necessário que as classes filhas possuam os mesmos métodos e propriedades que a classe pai, e que esses métodos e propriedades sejam compatíveis entre si.
// Implemente o princípio de substituição de Liskov no código abaixo. O código é um exemplo simplificado de um sistema de gestão de funcionários de uma empresa.
// O código possui uma interface Funcionario, que possui as propriedades nome e cargaHoraria, e duas classes que implementam essa interface: FuncionarioEfetivo e FuncionarioVoluntario.
// A classe FuncionarioEfetivo possui uma propriedade adicional chamada salario, e dois métodos adicionais: calculaSalarioLiquido e calculaParticipacaoDeLucros.
// A classe FuncionarioVoluntario possui uma propriedade adicional chamada orientador, que é um objeto da classe FuncionarioEfetivo, e um método adicional chamado escreveRelatorio.

interface Funcionario {
    nome: string;
    cargaHoraria: number;
    trabalha(): void;  //void porque não retorna nada
}

interface FuncionarioEfetivo extends Funcionario {
    salario: number;
    calculaSalario(): number;
    calculaParticipacaoDeLucros(lucro: number): number;
}

interface FuncionarioVoluntario extends Funcionario {
    escreveRelatorio(): void;
}

class FuncionarioEfetivo implements FuncionarioEfetivo {  
    constructor(nome: string, cargaHoraria: number, salario: number) {
        this.nome = nome;
        this.cargaHoraria = cargaHoraria;
        this.salario = salario;
    }

    trabalha(): void {
        console.log(`Me chamo ${this.nome} e eu trabalho ${this.cargaHoraria} horas por semana`);
    }

    calculaSalarioLiquido(): number {
        const TAXA_DESCONTO = 0.2;
        const desconto = this.salario * TAXA_DESCONTO;
        return this.salario - desconto;
    }
    calculaParticipacaoDeLucros(lucro: number): number {
        return lucro * this.salario;
    }
}

class FuncionarioVoluntario implements FuncionarioVoluntario {
    orientador: Funcionario;

    constructor(nome: string, cargaHorariaExtensao: number, funciarioEfetivo: Funcionario) {
        this.nome = nome;
        this.cargaHoraria = cargaHorariaExtensao;
        this.orientador = funciarioEfetivo;
    }

    escreveRelatorio(): void {
        console.log(`Me chamo ${this.nome} e eu escrevo relatórios para o meu orientador ${this.orientador.nome}`);
    }

    trabalha(): void {
        console.log(`Me chamo ${this.nome} e eu pesquiso ${this.cargaHoraria} horas por semana para cumprir na minha graduação`);
    }
}

const funcionarioEfetivo = new FuncionarioEfetivo("João", 40, 2400);
const funcionarioVoluntario = new FuncionarioVoluntario("Enzo", 20, funcionarioEfetivo);

//Efetivo
console.log("nome:", funcionarioEfetivo.nome);
console.log("salário bruto:", funcionarioEfetivo.salario);
console.log("salário líquido:", funcionarioEfetivo.calculaSalarioLiquido());
console.log("salário com PL:", funcionarioEfetivo.calculaParticipacaoDeLucros(2.5), "\n");

//Voluntário
console.log("nome:", funcionarioVoluntario.nome);
funcionarioVoluntario.escreveRelatorio(); 