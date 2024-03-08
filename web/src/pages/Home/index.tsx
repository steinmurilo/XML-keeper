import { useEffect, useState } from 'react';
import api from '../../services/api'

import { TableItem, TablePaginationInfo } from '../../models/item';

import Header from '../../components/Header';
import Upload from '../../components/Upload';
import ItemList from '../../components/ItemList';

import { Container } from "./styles";

export default function Home() {
    const [data, setData] = useState<TableItem[]>([]);
    const [paginationInfo, setPaginationInfo] = useState<TablePaginationInfo>();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async(pageSelected: number | void) => {
        try{
            const response = await api.get(`/list?page=${pageSelected? pageSelected : 0}`);
            setData(response.data.content);
            setPaginationInfo({
                first: response.data.first, 
                last: response.data.last,
                pageNumber: response.data.pageable.pageNumber,
                totalPage: response.data.totalPages,
            })
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
            <ItemList list={data} pagination={paginationInfo} onDownloadItem={handleDownloadXML} onChangePagination={fetchData} />
        </Container>
    )
}