package com.steinmurilo.xmlKeeper.converter;

import com.steinmurilo.xmlKeeper.dto.XMLFieldsEntityDto;
import com.steinmurilo.xmlKeeper.model.XMLFieldsEntity;
import org.springframework.stereotype.Component;

@Component
public class XMLFieldsConverter {
    public XMLFieldsEntityDto convertToDTO(XMLFieldsEntity xmlFieldsEntity) {
        XMLFieldsEntityDto xmlFieldsEntityDto = new XMLFieldsEntityDto();

        xmlFieldsEntityDto.setId(xmlFieldsEntity.getId());
        xmlFieldsEntityDto.setIdNF(xmlFieldsEntity.getIdNF());
        xmlFieldsEntityDto.setDhEmi(xmlFieldsEntity.getDhEmi());
        xmlFieldsEntityDto.setCnf(xmlFieldsEntity.getCnf());
        xmlFieldsEntityDto.setCuf(xmlFieldsEntity.getCuf());
        xmlFieldsEntityDto.setCnpjEmit(xmlFieldsEntity.getCnpjEmit());
        xmlFieldsEntityDto.setXFantEmit(xmlFieldsEntity.getXFantEmit());
        xmlFieldsEntityDto.setCnpjDest(xmlFieldsEntity.getCnpjDest());
        xmlFieldsEntityDto.setXNomeDest(xmlFieldsEntity.getXNomeDest());
        xmlFieldsEntityDto.setVtotTrib(xmlFieldsEntity.getVtotTrib());
        xmlFieldsEntityDto.setVnf(xmlFieldsEntity.getVnf());

        return xmlFieldsEntityDto;
    }

}
