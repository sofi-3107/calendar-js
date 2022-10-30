package com.seminariocolaborativo.models;

import java.sql.Date;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter @Setter @NoArgsConstructor	
public class Evento {
	
	
	@Id @GeneratedValue
	
	Integer id;
	
	@Column(length=20)
	String autor;
	
	@Column (length=100)
	String evento;
	
	@Column(name="fecha_inicio", columnDefinition="DATE")
	
	LocalDate fechaInicio;
	
	@Column(name="fecha_fin", columnDefinition="DATE")
	LocalDate fechaFin;
	
	@Column(length=25)
	String color;
	
}
