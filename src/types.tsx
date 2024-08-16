export interface Conta {
    id: string,
    nome: string,
    valorOriginal: number,
    valorCorrigido: number,
    quantidadeDiasDeAtraso: number,
    dataPagamento: Date,
    regraCalculo: string
}