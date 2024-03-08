package com.steinmurilo.xmlKeeper.service;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.steinmurilo.xmlKeeper.model.NFe;
import com.steinmurilo.xmlKeeper.model.XMLFieldsEntity;
import com.steinmurilo.xmlKeeper.model.XMLFileEntity;
import com.steinmurilo.xmlKeeper.repository.XMLFIleRepository;
import com.steinmurilo.xmlKeeper.repository.XMLFieldsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class XMLService {

    @Autowired
    private static XMLFIleRepository xmlFileRepository;
    @Autowired
    private static XMLFieldsRepository xmlFieldsRepository;

    private final ObjectMapper objectMapper;

    public XMLService(ObjectMapper objectMapper, XMLFIleRepository xmlFileRepository,
                      XMLFieldsRepository xmlFieldsRepository) {
        this.xmlFieldsRepository = xmlFieldsRepository;
        this.xmlFileRepository = xmlFileRepository;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public ResponseEntity<String> processXml(List<String> xmlContents) throws JsonProcessingException {

        try{
            for(String xmlContent : xmlContents) {
                XMLFileEntity savedFile = saveFile(xmlContent);
                saveFields(xmlContent, savedFile);
            }

            return new ResponseEntity<>("Success on save file", HttpStatus.OK);

        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error on save file", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


    private static XMLFileEntity saveFile(String xmlContent) {
        byte[] xmlBinaryData = xmlContent.getBytes();

        XMLFileEntity xmlFileEntity = new XMLFileEntity();
        xmlFileEntity.setXmlData(xmlBinaryData);

        xmlFileEntity = xmlFileRepository.save(xmlFileEntity);
        return xmlFileEntity;
    }

    private static XMLFieldsEntity saveFields(String xmlContent, XMLFileEntity file) throws JsonProcessingException {
        XmlMapper xmlMapper = new XmlMapper();
        NFe nfe = xmlMapper.readValue(xmlContent, NFe.class);

        XMLFieldsEntity xmlFieldsEntity = new XMLFieldsEntity();
        xmlFieldsEntity.setIdNF(nfe.getNotaFiscal().getInfoNFe().getId());
        xmlFieldsEntity.setCuf(nfe.getNotaFiscal().getInfoNFe().getIde().getCUF());
        xmlFieldsEntity.setDhEmi(nfe.getNotaFiscal().getInfoNFe().getIde().getDhEmi());
        xmlFieldsEntity.setCnf(nfe.getNotaFiscal().getInfoNFe().getIde().getCNF());
        xmlFieldsEntity.setCnpjEmit(nfe.getNotaFiscal().getInfoNFe().getEmit().getCnpjEmit());
        xmlFieldsEntity.setXFantEmit(nfe.getNotaFiscal().getInfoNFe().getEmit().getXFantEmit());
        xmlFieldsEntity.setCnpjDest(nfe.getNotaFiscal().getInfoNFe().getDest().getCnpjDest());
        xmlFieldsEntity.setXNomeDest(nfe.getNotaFiscal().getInfoNFe().getDest().getXNomeDest());
        xmlFieldsEntity.setVtotTrib(Double.parseDouble(nfe.getNotaFiscal().getInfoNFe().getTotal().getIcmsTot()
                .getVTotTrib()));
        xmlFieldsEntity.setVnf(Double.parseDouble(nfe.getNotaFiscal().getInfoNFe().getTotal().getIcmsTot().getVNF()));
        xmlFieldsEntity.setXmlFileEntity(file);

        xmlFieldsEntity = xmlFieldsRepository.save(xmlFieldsEntity);
        return xmlFieldsEntity;
    }

    public Page<XMLFieldsEntity> findAllPaginated(PageRequest pageRequest) {
        return xmlFieldsRepository.findAll(pageRequest);
    }


    public ResponseEntity<byte[]> findAndDownloadXML(Long id) {

        try{
            Optional<XMLFileEntity> xmlEntityOptional = xmlFileRepository.findById(id);
            byte[] xmlData = xmlEntityOptional.get().getXmlData();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_XML);
            headers.setContentDispositionFormData("attachment", "nfe.xml");

            return new ResponseEntity<>(xmlData, headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }


    }
}

