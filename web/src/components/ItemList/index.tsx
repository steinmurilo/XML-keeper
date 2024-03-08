import { FileArrowDown } from '@phosphor-icons/react'
import { TableItem } from "../../models/item";

import { THead, TData, TableContainer } from "./styles";

type ItemListProps = {
    list: TableItem[],
    onDownloadItem: (id: number) => void
}

export default function ItemList(props: ItemListProps) {

    const { list, onDownloadItem } = props;

    const renderRows = () => {
        return list.map((item: TableItem) => (
            <tr key={`${item.id}${item.cnf}`}>
                <TData>{item.idNF}</TData>    
                <TData>{item.dhEmi}</TData>
                <TData>{item.cnf}</TData>
                <TData>{item.cuf}</TData>
                <TData>{item.cnpjEmit}</TData>
                <TData>{item.xfantEmit}</TData>
                <TData>{item.cnpjDest}</TData>
                <TData>{item.xnomeDest}</TData>
                <TData>{item.vtotTrib}</TData>
                <TData>{item.vnf}</TData>
                <TData style={{ cursor: 'pointer' }} onClick={() => onDownloadItem(item.id)}><FileArrowDown size={24} /></TData>
            </tr>
        ))
    }

    return(

        <TableContainer>
            <thead>
                <tr>
                    <THead>ID NF</THead>
                    <THead>Data de Emissão</THead>
                    <THead>Chave NF</THead>
                    <THead>UF</THead>
                    <THead>CNPJ Emissor</THead>
                    <THead>Fantasia Emissor</THead>
                    <THead>CNPJ Destinatátio</THead>
                    <THead>Nome Destinatátio</THead>
                    <THead>Total Tributos</THead>
                    <THead>Valor da NF</THead>
                    <THead>Download</THead>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </TableContainer>

    )
}