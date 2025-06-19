import { Repository } from "typeorm";
import * as crypto from "crypto";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { User } from "src/entities/user.entity";
import { SignUpDto } from "src/modules/auth/dtos/sign-up.dto";
import Jwt from "src/modules/auth/utils/jwt";

@Injectable()
export class SignUpHandler {
    constructor(
        private jwt: Jwt,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async execute(body: SignUpDto) {
        const user = await this.userRepository.findOneBy({
           email: body.email
        })

        if(user){
            throw new BadRequestException({ message: "Fail in sign in. Please, verify your credentials." });
        }


        const passwordHash = crypto
        .createHash("md5")
        .update(body.password)
        .digest("hex");

        const newUser = this.userRepository.create({
            email: body.email,
            password: passwordHash
        });
        
        const res = await this.userRepository.save(newUser);

        const { access_token, refresh_token } = this.jwt.generateTokens({
            id: res.id,
            email: res.email
        });
        
        return {
            access_token, refresh_token, email: res.email
        }
    }
}
