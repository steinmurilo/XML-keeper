package com.steinmurilo.xmlKeeper.model;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Data
@Table(name = "nf_fields")
public class XMLFieldsEntity {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name = "nf_id")
        private String idNF;
        @Column(name = "dh_emi")
        private String dhEmi;
        private String cnf;
        private String cuf;
        @Column(name = "cnpj_emit")
        private String cnpjEmit;
        @Column(name = "xfant_emit")
        private String xFantEmit;
        @Column(name = "cnpj_dest")
        private String cnpjDest;
        @Column(name = "xnome_dest")
        private String xNomeDest;
        @Column(name = "vtot_trib")
        private Double vtotTrib;
        private Double vnf;

        @OneToOne
        @JoinColumn(name = "xml_id")
        private XMLFileEntity xmlFileEntity;
}
