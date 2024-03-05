CREATE TABLE nf_fields (
    id serial PRIMARY KEY,
	nf_id varchar(255),
    dh_emi varchar(255),
    cnf varchar(20),
    cuf varchar(2),
    cnpj_emit varchar(14),
    xfant_emit varchar(255),
    cnpj_dest varchar(14),
    xnome_dest varchar(255),
    vtot_trib numeric(15,2),
    vnf numeric(15,2)
);

CREATE TABLE nf_xml (
    xml_id serial PRIMARY KEY,
    xml_data bigint
);

ALTER TABLE nf_fields
ADD COLUMN xml_id INTEGER REFERENCES nf_xml(xml_id);