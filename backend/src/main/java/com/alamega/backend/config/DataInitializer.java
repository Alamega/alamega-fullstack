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
import java.util.Optional;
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
                new Authority(null, "ROLE_ADMIN", "Роль \"Админ\"")
        )).forEach(authority -> {
            if (authorityRepository.findByValue(authority.getValue()).isEmpty()) {
                authorityRepository.save(authority);
            }
        });
    }

    private void initializeRoles() {
        Set<Role> roles = new HashSet<>(Arrays.asList(
                new Role(null, "USER", "Пользователь", Set.of(
                        authorityRepository.findByValue("ROLE_USER").orElseThrow(() -> new RuntimeException("Authority ROLE_USER не существует!"))
                )),
                new Role(null, "ADMIN", "Админ", Set.of(
                        authorityRepository.findByValue("ROLE_ADMIN").orElseThrow(() -> new RuntimeException("Authority ROLE_ADMIN не существует!"))
                ))
        ));

        roles.forEach(role -> {
            Optional<Role> existingRole = roleRepository.findByValue(role.getValue());
            if (existingRole.isEmpty()) {
                roleRepository.save(role);
            }
        });
    }
}