import { useEffect, useState } from 'react';
import { FileArrowDown } from '@phosphor-icons/react'
import api from '../../services/api'

import { Container, THead, TData, Table } from "./styles";

export function Home() {

    const [data, setData] = useState<any>([{}]);

    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await api.get('/list');
                console.log("response", response.data.content);
                setData(response.data.content);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [])

    const handleDownloadXML = async (id: number) => {
        try{
            const response = await api.get(`/${id}/download`);
            
            const blob = new Blob([response.data], { type: 'application/xml' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.download = 'file.xml';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error(error);
        }
    };

    const renderRows = () => {
        return data.map((item: { id: any; cnf: any; idNF: any, dhEmi: any, chf: any, cuf: any, cnpjEmit: any, xfantEmit: any, 
                                cnpjDest: any, xnomeDest: any, vtotTrib: any, vnf: any }) => (
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
                <TData style={{ cursor: 'pointer' }} onClick={() => handleDownloadXML(item.id)}><FileArrowDown size={24} /></TData>
            </tr>
        ))
    }

    return(
        <Container>
            <div>XML KEEPER</div>

            <input type="file" accept="text/xml" />

            <Table>
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
            </Table>
        </Container>
        
    )
}