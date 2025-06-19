import { Repository } from "typeorm";
import * as crypto from "crypto";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { User } from "src/entities/user.entity";
import Jwt from "src/modules/auth/utils/jwt";
import { SignInDto } from "src/modules/auth/dtos/sign-in.dto";

@Injectable()
export class SignInHandler {
    constructor(
        private jwt: Jwt,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async execute({email, password}: SignInDto) {
        const user = await this.userRepository.findOneBy({
           email: email
        })

        if(!user){
            throw new BadRequestException({ message: "Fail in sign in. Please, verify your credentials." });
        }

        const currentPassword = crypto
        .createHash('md5')
        .update(password)
        .digest('hex');

        const passwordMatch = currentPassword === user.password;

        if(!passwordMatch){
            throw new BadRequestException({ message: "Fail in sign in. Please, verify your credentials." });
        }
        
        const { access_token, refresh_token } = this.jwt.generateTokens({
            id: user.id,
            email: user.email
        });
        
        return {
            access_token, refresh_token,
            email
        }
    }
}
