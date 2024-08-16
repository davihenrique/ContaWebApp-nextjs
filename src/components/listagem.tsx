import { Conta } from "@/types";
import ItemLista from "./itemLista";

interface Props {
    contas: Conta[]
}

export default function Listagem(props: Props) {

    const contas = props.contas || [];

    return (
        <div className="text-base flex max-h-[45vh] overflow-auto">
            <table >
                <thead className="font-bold">
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Valor Original</th>
                        <th>Valor Corrigido</th>
                        <th>Dias de Atraso</th>
                        <th>Data de Pagamento</th>
                        <th>Regra de Cálculo</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        contas.map(conta => (

                            <ItemLista key={conta.id}
                                id={conta.id}
                                nome={conta.nome}
                                valorOriginal={conta.valorOriginal}
                                valorCorrigido={conta.valorCorrigido}
                                quantidadeDiasDeAtraso={conta.quantidadeDiasDeAtraso}
                                dataPagamento={new Date(conta.dataPagamento)}
                                regraCalculo={conta.regraCalculo}
                            ></ItemLista>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}