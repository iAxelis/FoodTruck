import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/users/dto/login.dto';

@Controller('auth')
export class AuthController {
    
    constructor(
        private readonly authservice:AuthService
    ){}
    @Post('login')
    login(@Body() dto:LoginDto){
        return this.authservice.login(dto)
    }
}
