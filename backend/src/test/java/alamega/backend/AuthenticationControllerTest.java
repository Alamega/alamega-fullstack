package alamega.backend;

import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class AuthenticationControllerTest {
//    @Mock
//    private AuthenticationService authenticationService;
//
//    @InjectMocks
//    private AuthenticationController authenticationController;
//
//    private final MockMvc mockMvc = MockMvcBuilders.standaloneSetup(authenticationController).build();
//    private final ObjectMapper objectMapper = new ObjectMapper();
//
//    @Test
//    void register_ShouldReturnAuthResponse() throws Exception {
//        RegisterRequest request = new RegisterRequest("testUser", "testPassword");
//
//        when(authenticationService.register(any(RegisterRequest.class))).thenReturn( );
//
//        mockMvc.perform(post("/auth/register")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(request)))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.token").value("testToken"));
//    }
//
//    @Test
//    void authenticate_ShouldReturnAuthResponse() throws Exception {
//        AuthenticationRequest request = new AuthenticationRequest("testUser", "testPassword");
//        when(authenticationService.authenticate(any(AuthenticationRequest.class))).thenReturn();
//
//        mockMvc.perform(post("/auth/authenticate")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(request)))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.token").value("testToken"));
//    }
}
