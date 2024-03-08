import { codeToUf, convertTimestampToDateTime, formatCnpj, formatCurrency } from '../../utils/utils';

import { FileArrowDown, ArrowFatLeft, ArrowFatRight } from '@phosphor-icons/react'
import { TableItem, TablePaginationInfo } from "../../models/item";

import { THead, TData, TableContainer, NavButtom, ButtonContainer } from "./styles";

type ItemListProps = {
    list: TableItem[],
    pagination: TablePaginationInfo | undefined,
    onDownloadItem: (id: number) => void
    onChangePagination: (page: number) => void
}

export default function ItemList(props: ItemListProps) {

    const { list, pagination, onDownloadItem, onChangePagination } = props;

    const renderRows = () => {
        return list.map((item: TableItem) => (
            <tr key={`${item.id}${item.cnf}`}>
                <TData>{item.idNF}</TData>    
                <TData>{convertTimestampToDateTime(item.dhEmi)}</TData>
                <TData>{item.cnf}</TData>
                <TData>{codeToUf(parseInt(item.cuf,10))}</TData>
                <TData>{formatCnpj(item.cnpjEmit)}</TData>
                <TData>{item.xfantEmit}</TData>
                <TData>{formatCnpj(item.cnpjDest)}</TData>
                <TData>{item.xnomeDest}</TData>
                <TData className='currency' >{formatCurrency(item.vtotTrib)}</TData>
                <TData className='currency' >{formatCurrency(item.vnf)}</TData>
                <TData onClick={() => onDownloadItem(item.id)}>
                    <FileArrowDown size={24} />
                </TData>
            </tr>
        ))
    }

    return(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
            <TableContainer>
                <thead>
                    <tr>
                        <THead>ID NF</THead>
                        <THead>Data de Emissão</THead>
                        <THead>Chave NF</THead>
                        <THead>UF</THead>
                        <THead>CNPJ Emissor</THead>
                        <THead>Fantasia Emissor</THead>
                        <THead>CNPJ Destinatário</THead>
                        <THead>Nome Destinatário</THead>
                        <THead>Total Tributos</THead>
                        <THead>Valor da NF</THead>
                        <THead>Download</THead>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </TableContainer>
            {pagination && list.length > 0 &&
            <ButtonContainer>
                <span>Page {pagination.pageNumber + 1} of {pagination.totalPage}</span>
                {<NavButtom disabled={pagination?.first} 
                    onClick={() => onChangePagination(pagination.pageNumber - 1)}>
                    <ArrowFatLeft size={24} />
                </NavButtom>}
                <NavButtom disabled={pagination.last} 
                    onClick={() => onChangePagination(pagination.pageNumber + 1)}>
                    <ArrowFatRight size={24} />
                </NavButtom>
            </ButtonContainer>
            }
        </div>

    )
}