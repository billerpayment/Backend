import { Injectable, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { FilterQuery, Model, QueryOptions, Types, UpdateQuery } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Counter, CounterDocument } from './schema/counter.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersRepository {
    constructor(
        @InjectModel(User.name)
        private model: Model<UserDocument>,
        @InjectModel(Counter.name)
        private counterModel: Model<CounterDocument>,
        private jwtService: JwtService,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<UserDocument> {
        let countResponse: CounterDocument;
        try {
            countResponse = await this.counterModel.findOneAndUpdate(
                { id: 'users_count' },
                { $inc: { sequence: 1 } },
                { new: true, upsert: true, setDefaultsOnInsert: true }
            );
        } catch (error) {
            throw new InternalServerErrorException('Failed to update user count');
        }

        if (!countResponse || countResponse.sequence === undefined) {
            throw new InternalServerErrorException('Failed to retrieve user count sequence');
        }

        const customId = `TL2024${countResponse.sequence}`;

        try {
            const newUser = new this.model({
                ...createUserDto,
                customId,
            });
            return await newUser.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new BadRequestException('User already exists');
            }
            throw new InternalServerErrorException('Failed to create user');
        }
    }

    async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
        const { email, password } = loginDto;

        const user = await this.model.findOne({ email });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { email: user.email, sub: user._id };
        const accessToken = this.jwtService.sign(payload);

        // Update last login timestamp
        try {
            user.updateLoginTimestamp();
            await user.save();
        } catch (error) {
            throw new InternalServerErrorException('Failed to update last login timestamp');
        }

        return { accessToken };
    }
}
