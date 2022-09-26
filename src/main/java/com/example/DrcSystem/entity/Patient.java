package com.example.DrcSystem.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "patient")
@Getter
@Setter
public class Patient {

    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = "patient", sequenceName = "patient_sequence")
    @GeneratedValue(generator = "patient", strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private Long id;

    @Column
    private String name;

    @Column
    private Integer age;

    @Column(name="image")
    private String image;

    @Column(name="gender")
    private String gender;

    @Column(name="birth_date")
    private LocalDate birthDate;



}
