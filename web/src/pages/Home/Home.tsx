import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileArrowDown, FileText, CloudArrowUp } from '@phosphor-icons/react'
import api from '../../services/api'

import { Container, THead, TData, Table, DropzoneContainer, FileUploadContainer } from "./styles";

interface TableItem {
    id: number; 
    cnf: string; 
    idNF: string, 
    dhEmi: string, 
    chf: string, 
    cuf: string, 
    cnpjEmit: string, 
    xfantEmit: string,
    cnpjDest: string, 
    xnomeDest: string, 
    vtotTrib: number, 
    vnf: number
}

export function Home() {

    const [data, setData] = useState<TableItem[]>([]);
    const [fileList, setFileList] = useState<File[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async() => {
        try{
            const response = await api.get('/list');
            setData(response.data.content);
        } catch (error) {
            console.error(error);
        }
    }

    const onDrop = (acceptedFiles: File[]) => {
        acceptedFiles.forEach(file => {
          if(file.type === 'text/xml') {
            setFileList(prevState => [file, ...prevState])
          } else {
            alert('Invalid file type');
          }
        });
    };

    const handleSendFiles = async() => {
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('file', file);
        })
        try{
            const response = await api.post(`/upload`, formData);
            console.log(response);
            fetchData();
        } catch (error) {
            console.error(error);
        }
    }

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
        return data.map((item: TableItem) => (
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

    const renderFileSelected = () => {
        return fileList.map((file : File, index: number) => (
            <div key={`${index}-${file.name}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'  }}><FileText size={24} /> {file.name}</div>
        ))
    }
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true });

    return(
        <Container>
            <div>XML KEEPER</div>

            <FileUploadContainer>
                <DropzoneContainer {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drag the XML here...</p>
                    ) : (
                        <p>Click or drag the selected XML's</p>
                    )}
                </DropzoneContainer>
                {fileList.length > 0 && 
                <div style={{ maxHeight: '8rem', overflow: 'auto', width: '15rem' }}>
                    {renderFileSelected()}
                </div>}
                <button 
                    style={{ marginLeft: '1rem',  
                            padding: '0.5rem 0', 
                            borderRadius: '10px', 
                            display: 'flex', 
                            width: '10rem', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            cursor: 'pointer' }} 
                    type='button'
                    disabled={fileList.length < 1}
                    onClick={() => handleSendFiles()}
                    >
                    <CloudArrowUp  size={24}/> Send File
                </button>
            </FileUploadContainer>

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