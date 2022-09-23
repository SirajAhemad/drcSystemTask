package com.example.DrcSystem.controller;

import com.example.DrcSystem.utils.ServiceRegistry;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;

@Getter
public abstract class BaseController {

    @Autowired
    private ServiceRegistry serviceRegistry;

}
