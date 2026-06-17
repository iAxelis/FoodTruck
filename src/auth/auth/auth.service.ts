import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/users/dto/login.dto';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {
    constructor(
        private userService:UsersService,
        private jwtService:JwtService
    ){}
    
    async login(data:LoginDto){
        const user = await this.userService.findByEmail(data.email);
        if(!user)throw new UnauthorizedException('Credenciales invalidas');
        const match = await bcrypt.compare(data.password,user.password);
        if(!match)throw new UnauthorizedException('Credenciales invalidas');
        const payload = {sub:user.id,email:user.email}
        return {acces_token: this.jwtService.sign(payload), user:{id:user.id,email:user.email}}
    
        



    }

}