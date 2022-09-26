package com.example.DrcSystem.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "doctor")
@Getter
@Setter
public class Doctor {

    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = "doctor", sequenceName = "doctor_sequence")
    @GeneratedValue(generator = "doctor", strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private Long id;


    @Column(name="education",columnDefinition = "TEXT")
    private String education;

    @Column(name="experience")
    private Float experience;

    @Column(name="specialization",columnDefinition = "TEXT")
    private String specialization;

    @Column(name="created_at")
    private LocalDateTime createdAt;

    @Column(name="account_status")
    private String accountStatus;

    @Column(name="about",columnDefinition = "TEXT")
    private String about;

}
