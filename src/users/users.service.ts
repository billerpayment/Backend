import {
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Observable, from, map } from 'rxjs';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { User, UserDocument } from './schema/user.schema';
import { UsersRepository } from './users.repository';
