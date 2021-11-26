package com.example.back.config;

import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ConfigUtils {
    private final Environment environment;

    public String getProperty(String key){
        return environment.getProperty(key);
    }
}
