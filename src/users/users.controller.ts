import {
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { UserService } from './users.service';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Post('register')
    async registerUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Post('login')
    async loginUser(@Body() loginDto: LoginDto) {
        return this.userService.loginUser(loginDto);
    }

};