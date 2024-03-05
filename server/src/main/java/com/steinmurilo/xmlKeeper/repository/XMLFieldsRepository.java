package com.steinmurilo.xmlKeeper.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.steinmurilo.xmlKeeper.model.XMLFieldsEntity;

public interface XMLFieldsRepository extends JpaRepository<XMLFieldsEntity, Long> {
}