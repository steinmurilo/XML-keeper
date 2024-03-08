import { useEffect, useState } from 'react';
import api from '../../services/api'

import { TableItem } from '../../models/item';

import Header from '../../components/Header';
import Upload from '../../components/Upload';
import ItemList from '../../components/ItemList';

import { Container } from "./styles";

export default function Home() {
    const [data, setData] = useState<TableItem[]>([]);

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

    const handleUploadXML = async(fileList: File[]) => {
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('file', file);
        })
        try{
            const response = await api.post(`/upload`, formData);
            if(response.status === 200) {
                fetchData();
            }
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
    
    return(
        <Container>
            <Header />
            <Upload onUploadItems={handleUploadXML} />
            <ItemList list={data} onDownloadItem={handleDownloadXML} />
        </Container>
    )
}