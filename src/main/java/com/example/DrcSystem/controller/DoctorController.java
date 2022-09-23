package com.example.DrcSystem.controller;

import com.example.DrcSystem.constants.ApplicationURLConstants;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(ApplicationURLConstants.DOCTOR)
public class DoctorController extends BaseController{

    @GetMapping("/")
    public ModelAndView loadLoginPage(){

        return new ModelAndView(ApplicationURLConstants.LOGIN);

    }


}
