package com.alamega.backend.config;

import com.alamega.backend.model.authority.Authority;
import com.alamega.backend.model.authority.AuthorityRepository;
import com.alamega.backend.model.role.Role;
import com.alamega.backend.model.role.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final RoleRepository roleRepository;
    private final AuthorityRepository authorityRepository;

    @Override
    public void run(String... args) {
        initializeAuthorities();
        initializeRoles();
    }

    private void initializeAuthorities() {
        new HashSet<>(Arrays.asList(
                new Authority(null, "ROLE_USER", "Роль \"Пользователь\""),
                new Authority(null, "ROLE_ADMIN", "Роль \"Админ\""),
                new Authority(null, "ПУКАЛЬЩИК", "МОГУ ПУКАТЬ")
        )).forEach(authority -> {
            if (authorityRepository.getByValue(authority.getValue()) == null) {
                authorityRepository.save(authority);
            }
        });
    }

    private void initializeRoles() {
        new HashSet<>(Arrays.asList(
                new Role(null, "USER", "Пользователь", Set.of(
                        authorityRepository.getByValue("ROLE_USER")
                )),
                new Role(null, "ADMIN", "Админ", Set.of(
                        authorityRepository.getByValue("ROLE_ADMIN"),
                        authorityRepository.getByValue("ПУКАЛЬЩИК")
                ))
        )).forEach(role -> {
            if (roleRepository.getByValue(role.getValue()) == null) {
                roleRepository.save(role);
            }
        });
    }
}