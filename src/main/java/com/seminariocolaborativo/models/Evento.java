package com.seminariocolaborativo.models;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;

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
	
	@Column (length=20)
	String title;
	
	@Column(length=100)
	String description;
	
	@Column(name="fecha_inicio", columnDefinition="DATETIME")
	
	LocalDateTime start;
	
	@Column(name="fecha_fin", columnDefinition="DATETIME")
	LocalDateTime end;
	
	@Column(length=25)
	String color;
	
}
