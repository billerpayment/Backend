import {
    BadRequestException,
    forwardRef,
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Observable, from, map } from 'rxjs';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { UsersRepository } from './users.repository';
import { EmailService } from 'src/common/services/email/email.service';


@Injectable()
export class UserService {
    constructor(private readonly userRepository: UsersRepository,
        private emailService: EmailService,
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
        try {
            return await this.userRepository.createUser(createUserDto);
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }
            throw new InternalServerErrorException('Failed to create user');
        }
    }

    async loginUser(loginUserDto: LoginDto) {
        try {
            return await this.userRepository.login(loginUserDto);
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }
            throw new InternalServerErrorException('Failed to Login user');
        }
    }
};
