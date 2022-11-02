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
	
	@Column(name="start", columnDefinition="DATETIME")	
	LocalDateTime start;
	
	@Column(name="end", columnDefinition="DATETIME")
	LocalDateTime end;
	
	@Column(length=25)
	String color;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAutor() {
		return autor;
	}

	public void setAutor(String autor) {
		this.autor = autor;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDateTime getStart() {
		return start;
	}

	public void setStart(LocalDateTime start) {
		this.start = start;
	}

	public LocalDateTime getEnd() {
		return end;
	}

	public void setEnd(LocalDateTime end) {
		this.end = end;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}
	
}
