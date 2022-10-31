package com.seminariocolaborativo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.seminariocolaborativo.models.Evento;

@Repository	
public interface EventoRepository extends CrudRepository<Evento,Integer>{

}
