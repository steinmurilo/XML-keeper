package com.steinmurilo.xmlKeeper.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JacksonXmlRootElement(localName = "nfeProc")
public class NFe {

    @JacksonXmlProperty(localName = "NFe")
    private NotaFiscal notaFiscal;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public class NotaFiscal {

        @JacksonXmlProperty(localName = "infNFe")
        private InfoNFe infoNFe;

        @Data
        @JsonIgnoreProperties(ignoreUnknown = true)
        public class InfoNFe {

            @JacksonXmlProperty(localName = "Id")
            private String id;

            @JacksonXmlProperty(localName = "ide")
            private Ide ide;

            @JacksonXmlProperty(localName = "emit")
            private Emit emit;

            @JacksonXmlProperty(localName = "dest")
            private Dest dest;

            @JacksonXmlProperty(localName = "total")
            private Total total;

            @Data
            @JsonIgnoreProperties(ignoreUnknown = true)
            public class Ide {

                @JacksonXmlProperty(localName = "dhEmi")
                private String dhEmi;

                @JacksonXmlProperty(localName = "cUF")
                private String cUF;

                @JacksonXmlProperty(localName = "cNF")
                private String cNF;

            }

            @Data
            @JsonIgnoreProperties(ignoreUnknown = true)
            public class Emit {
                @JacksonXmlProperty(localName = "CNPJ")
                private String cnpjEmit;

                @JacksonXmlProperty(localName = "xFant")
                private String xFantEmit;
            }

            @Data
            @JsonIgnoreProperties(ignoreUnknown = true)
            public class Dest {
                @JacksonXmlProperty(localName = "CNPJ")
                private String cnpjDest;

                @JacksonXmlProperty(localName = "xNome")
                private String xNomeDest;
            }

            @Data
            @JsonIgnoreProperties(ignoreUnknown = true)
            public class Total {
                @JacksonXmlProperty(localName = "ICMSTot")
                private ICMSTot icmsTot;


                @Data
                @JsonIgnoreProperties(ignoreUnknown = true)
                public class ICMSTot {
                    @JacksonXmlProperty(localName = "vTotTrib")
                    private String vTotTrib;

                    @JacksonXmlProperty(localName = "vNF")
                    private String vNF;
                }
            }
        }
    }
}