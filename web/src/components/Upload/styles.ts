import styled from "styled-components"

export const FileUploadContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 2rem 0;
`

export const DropzoneContainer = styled.div`
    border: 2px dashed ${(props) => props.theme['gray-100']};
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
    scrollbar-color: ${(props) => props.theme['blue-title']} ${(props) => props.theme['gray-100']};

    ::-webkit-scrollbar {
    width: 12px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${(props) => props.theme['blue-title']};
        border-radius: 6px;
    }
`

export const FileDescription = styled.div`
    display: flex; 
    justify-content: center; 
    align-items: center;
`

export const RemoveFile = styled.span`
    font-size: 12px;
    margin-left: 1rem;
    font-weight: 800;
    color: ${(props) => props.theme['gray-500']};
    cursor: pointer;

    &:hover {
        color: red;
    }
`

export const ButtonUpload = styled.button`
    margin-left: 1rem;  
    padding: 0.5rem 0; 
    border-radius: 10px; 
    border: none;
    width: 10rem; 

    display: flex; 
    justify-content: center; 
    align-items: center; 

    cursor: pointer;

    font-weight: 700;
    color: ${(props) => props.theme['black']};
    background: ${(props) => props.theme['green-button']};

    &:hover {
        color: ${(props) => props.theme['white']};
        background: ${(props) => props.theme['green-hover']};
    }

    &:disabled {
        color: ${(props) => props.theme['gray-300']};
        background: ${(props) => props.theme['green-disabled']};
        cursor: not-allowed;
    }

    span {
        margin-right: 0.5rem
    }
`