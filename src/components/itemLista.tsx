import { Conta } from "@/types";
import { format } from "date-fns";

export default function ItemLista(props: Conta) {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.nome}</td>
            <td>{props.valorOriginal}</td>
            <td>{props.valorCorrigido}</td>
            <td>{props.quantidadeDiasDeAtraso}</td>
            <td>{format(props.dataPagamento, 'dd/MM/yyyy')}</td>
            <td>{props.regraCalculo}</td>
        </tr>
    )
}