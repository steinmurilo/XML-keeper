package com.steinmurilo.xmlKeeper.controller;
import com.steinmurilo.xmlKeeper.converter.XMLFieldsConverter;
import com.steinmurilo.xmlKeeper.dto.XMLFieldsEntityDto;
import com.steinmurilo.xmlKeeper.model.XMLFieldsEntity;
import com.steinmurilo.xmlKeeper.service.XMLService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class XMLController {

    @Autowired
    private XMLService xmlService;

    @Autowired
    private XMLFieldsConverter xmlFieldsConverter;

    @PostMapping("/upload")
    public ResponseEntity<String> handleXmlFileUpload(@RequestParam("file") List<MultipartFile> files) {
        try {
            List<String> xmlContents = new ArrayList<>();

            for(MultipartFile file : files) {
                if (!file.getContentType().equals("application/xml")) {
                    return ResponseEntity.badRequest().body("Invalid file type.");
                }

                String xmlContent = new String(file.getBytes(), StandardCharsets.UTF_8);
                xmlContents.add(xmlContent);
            }

            ResponseEntity<String> response = xmlService.processXml(xmlContents);

            return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error on file upload");
        }
    }

    @GetMapping("/list")
    public ResponseEntity<Page<XMLFieldsEntityDto>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<XMLFieldsEntity> entities = xmlService.findAllPaginated(pageRequest);

        Page<XMLFieldsEntityDto> xmlFieldsEntityDtos = entities.map(xmlFieldsConverter::convertToDTO);

        return ResponseEntity.ok(xmlFieldsEntityDtos);
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<byte[]> downloadXml(@PathVariable Long id) {
        ResponseEntity<byte[]> responseEntity;
         try {
             responseEntity = xmlService.findAndDownloadXML(id);
             return responseEntity;
         } catch (Exception e) {
             responseEntity = new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
         }

         return responseEntity;
    }
}
