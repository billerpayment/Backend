import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { UsersRepository } from './users.repository';
import { EmailService } from 'src/common/services/email/email.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UsersRepository,
        private emailService: EmailService,
        private readonly jwtService: JwtService,  // Injecting JwtService
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
        try {
            const existingUser = await this.userRepository.findOne({ email: createUserDto.email });
            if (existingUser) {
                throw new BadRequestException('User with this email already exists');
            }

            // Hash the password before saving the user
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
            createUserDto.password = hashedPassword;

            const newUser = await this.userRepository.createUser(createUserDto);

            // Send a welcome email
            // await this.emailService.sendWelcomeEmail(newUser.email);

            return newUser;

        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }
            throw new InternalServerErrorException('Failed to create user');
        }
    }

    async loginUser(loginUserDto: LoginDto): Promise<{ accessToken: string }> {
        try {
            const user = await this.userRepository.findOne({ email: loginUserDto.email });
            if (!user) {
                throw new NotFoundException('User not found');
            }

            // Validate the password
            const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
            if (!isPasswordValid) {
                throw new BadRequestException('Invalid credentials');
            }

            // Proceed with login logic: generating JWT token
            const payload = { userId: user._id, email: user.email };
            const accessToken = this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET, // Ensure to set your secret in the .env
                expiresIn: '1h', // Token validity period
            });

            return { accessToken };

        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }
            throw new InternalServerErrorException('Failed to login user');
        }
    }
}
