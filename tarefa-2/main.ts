// Objetivo: Demonstrar a aplicação do Princípio de Substituição de Liskov
// O Princípio de Substituição de Liskov diz que objetos de uma superclasse devem ser substituíveis por objetos de suas subclasses sem que isso afete a integridade do programa
// Em outras palavras, uma classe filha deve ser capaz de substituir a classe pai sem que isso cause problemas. Isso é importante para garantir a coesão do código e a manutenibilidade do software
// Neste exemplo, temos uma interface ContratoRemuneravel que define um contrato remunerável e um método para calcular a remuneração
// Outro nome para esse princípio é Aberto/Fechado, que diz que uma classe deve estar aberta para extensão, mas fechada para modificação
// Isso significa que você pode adicionar novas funcionalidades a uma classe sem alterar seu código fonte


const MES_COMERCIAL = 20; //dias trabalhados no mês
//criar uma interface para os contratos remuneraveis
interface ContratoRemuneravel {
  titulo: string; //titulo do contrato
  remuneracao(): number; //metodo para calcular a remuneração que será implementado nas classes que implementam a interface
}

//necessário implementar a interface para os contratos
class ContratoClt implements ContratoRemuneravel {
  private GANHO_POR_HORA_CLT = 24; //valor da hora trabalhada não pode ser uma const pois é diferente para cada tipo de contrato, então passa a ser um atributo privado
  private CARGA_HORARIA_DIARIA_CLT = 8; //valor da carga horaria não pode ser uma const pois é diferente para cada tipo de contrato, então passa a ser um atributo privado
  remuneracao(): number {
    return this.GANHO_POR_HORA_CLT * this.CARGA_HORARIA_DIARIA_CLT; //para usar os atributos privados, é necessário usar o this
  } //o metodo remuneracao calcula o salario
  titulo: string = "CLT";
}

class ContratoEstagiario {
  private GANHO_POR_HORA_ESTAGIARIO = 15; //valor da hora trabalhada não pode ser uma const pois é diferente para cada tipo de contrato, então passa a ser um atributo privado
  private CARGA_HORARIA_DIARIA_ESTAGIARIO = 6; //valor da carga horaria não pode ser uma const pois é diferente para cada tipo de contrato, então passa a ser um atributo privado
  remuneracao(): number {
    return (
      this.GANHO_POR_HORA_ESTAGIARIO * this.CARGA_HORARIA_DIARIA_ESTAGIARIO
    );
  } //o metodo remuneracao calcula o salario
  titulo: string = "Estágio";
}
//criar uma classe para ContratoPJ
class ContratoPj {
  private GANHO_POR_HORA_PJ = 30; //valor da hora trabalhada não pode ser uma const pois é diferente para cada tipo de contrato, então passa a ser um atributo privado
  private CARGA_HORARIA_DIARIA_PJ = 8; //valor da carga horaria não pode ser uma const pois é diferente para cada tipo de contrato, então passa a ser um atributo privado
  remuneracao(): number {
    return this.GANHO_POR_HORA_PJ * this.CARGA_HORARIA_DIARIA_PJ;
  } //o metodo remuneracao calcula o salario
  titulo: string = "PJ";
}

class FolhaDePagamento {
  static calcularSalarioMensal(funcionario: ContratoRemuneravel): number {  //o metodo calcularSalarioMensal recebe um funcionario do tipo ContratoRemuneravel
    return funcionario.remuneracao() * MES_COMERCIAL; //o salario mensal é calculado multiplicando a remuneração do funcionario pelo numero de dias trabalhados no mês
  }
}



const funcionarioClt = new ContratoClt();
const funcionarioEstagiario = new ContratoEstagiario();
const funcionarioPj = new ContratoPj();

console.log(
  `Sou ${
    funcionarioClt.titulo
  } e meu salário líquido mensal é R$ ${FolhaDePagamento.calcularSalarioMensal(
    funcionarioClt
  )}`
);
console.log(
  `Sou ${
    funcionarioEstagiario.titulo
  } e meu salário líquido mensal é R$ ${FolhaDePagamento.calcularSalarioMensal(
    funcionarioEstagiario
  )}`
);
console.log(
  `Sou ${
    funcionarioPj.titulo
  } e meu salário líquido mensal é R$ ${FolhaDePagamento.calcularSalarioMensal(
    funcionarioPj
  )}`
);
