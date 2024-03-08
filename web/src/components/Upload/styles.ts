import styled from "styled-components"

export const FileUploadContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const DropzoneContainer = styled.div`
    border: 2px dashed #cccccc;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;

    width: 40rem;
    height: 8rem;

    display: flex;
    align-items: center;
    justify-content: center;
`

export const FileResumeContainer = styled.div`
    max-height: 8rem;
    overflow: auto;
    width: 15rem;

    scrollbar-width: thin;
    scrollbar-color: #cccccc #ecf0f1;

    ::-webkit-scrollbar {
    width: 12px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #cccccc;
        border-radius: 6px;
    }
`

export const FileDescription = styled.div`
    display: flex; 
    justify-content: center; 
    align-items: center;
`

export const ButtonUpload = styled.button`
    margin-left: 1rem;  
    padding: 0.5rem 0; 
    border-radius: 10px; 
    display: flex; 
    width: 10rem; 
    justify-content: center; 
    align-items: center; 
    cursor: pointer;
`