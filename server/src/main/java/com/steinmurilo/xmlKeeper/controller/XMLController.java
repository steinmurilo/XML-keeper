package com.steinmurilo.xmlKeeper.controller;
import com.steinmurilo.xmlKeeper.service.XMLService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api")
public class XMLController {

    @Autowired
    private XMLService xmlService;

    @PostMapping("/upload")
    public ResponseEntity<String> handleXmlFileUpload(@RequestParam("file") MultipartFile file) {
        try {
            if (!file.getContentType().equals("application/xml")) {
                return ResponseEntity.badRequest().body("Invalid file type.");
            }

            String xmlContent = new String(file.getBytes(), StandardCharsets.UTF_8);
            ResponseEntity<String> response = xmlService.processXml(xmlContent);

            return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error on file upload");
        }
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
