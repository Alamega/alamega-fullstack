package com.alamega.alamegaspringapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@SpringBootApplication
public class AlamegaSpringAppApplication {
    public static void main(String[] args) {
        SpringApplication.run(AlamegaSpringAppApplication.class, args);
    }

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();

        dataSource.setDriverClassName("org.postgresql.Driver");
        dataSource.setUsername("postgres");
        dataSource.setPassword("1111");
        dataSource.setUrl("jdbc:postgresql://localhost:5432/postgres");

        return dataSource;
    }
}
