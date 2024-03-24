package com.alamega.backend.controllers;

import com.alamega.backend.model.api.request.AuthenticationRequest;
import com.alamega.backend.model.api.request.RegisterRequest;
import com.alamega.backend.model.api.response.AuthenticationResponse;
import com.alamega.backend.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthenticationController {
    final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        try {
            AuthenticationResponse response = authenticationService.register(request);
            response.setMessage("Пользователь зарегистрирован.");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            AuthenticationResponse errorResponse = new AuthenticationResponse();
            errorResponse.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        try {
            AuthenticationResponse response = authenticationService.authenticate(request);
            response.setMessage("Пользователь аутентифицирован.");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            AuthenticationResponse errorResponse = new AuthenticationResponse();
            errorResponse.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }
}