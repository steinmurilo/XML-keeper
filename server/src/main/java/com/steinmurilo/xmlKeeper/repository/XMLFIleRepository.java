package com.steinmurilo.xmlKeeper.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.steinmurilo.xmlKeeper.model.XMLFileEntity;

public interface XMLFIleRepository extends JpaRepository<XMLFileEntity, Long> {
}
