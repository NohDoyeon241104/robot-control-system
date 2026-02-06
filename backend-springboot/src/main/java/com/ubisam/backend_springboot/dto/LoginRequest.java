// 로그인 DTO 및 컨트롤러 구현
// 프론트엔드에서 보낸 아이디와 비밀번호를 처리한다.
package com.ubisam.backend_springboot.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginRequest {
    private String username;
    private String password;
}