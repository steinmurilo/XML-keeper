package com.steinmurilo.xmlKeeper.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "nf_xml")
public class XMLFileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "xml_id")
    private Long id;

    @Lob
    @Column(name = "xml_data")
    private byte[] xmlData;

}
