package com.alamega.backend.model.authority;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.util.UUID;

@Entity
@Table(name = "authorities")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Authority implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String value;

    @Column
    private String name;

    @Override
    public String getAuthority() {
        return value;
    }
}
