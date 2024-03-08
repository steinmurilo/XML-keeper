
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, CloudArrowUp } from '@phosphor-icons/react'

import { DropzoneContainer, FileUploadContainer, FileResumeContainer, ButtonUpload, FileDescription } from "./styles";

type UploadProps = {
    onUploadItems: (files: File[]) => void
}

export default function Upload(props: UploadProps) {

    const { onUploadItems } = props;
    const [fileList, setFileList] = useState<File[]>([]);

    const onDrop = (acceptedFiles: File[]) => {
        acceptedFiles.forEach(file => {
          if(file.type === 'text/xml') {
            setFileList(prevState => [file, ...prevState])
          } else {
            alert('Invalid file type');
          }
        });
    };
    
    const renderFileSelected = () => {
        return fileList.map((file : File, index: number) => (
            <FileDescription key={`${index}-${file.name}`}>
                <FileText size={24} /> {file.name}
            </FileDescription>
        ))
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true });

    return(
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
                <FileResumeContainer>
                    {renderFileSelected()}
                </FileResumeContainer>}
                <ButtonUpload 
                    type='button'
                    disabled={fileList.length < 1}
                    onClick={() => {
                        onUploadItems(fileList);
                        setFileList([]);
                    }}
                    >
                    <CloudArrowUp  size={24}/> Send File
                </ButtonUpload>
            </FileUploadContainer>
    )
}