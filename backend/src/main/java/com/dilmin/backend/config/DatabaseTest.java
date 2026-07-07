package com.dilmin.backend.config;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DatabaseTest {

    @GetMapping("/ho")
    public String test(){
        return "Backend Application Started";
    }

}
