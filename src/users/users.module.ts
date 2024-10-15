import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UserService } from './users.service';
import { Counter, CounterSchema } from './schema/counter.schema';
// import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from 'src/common/common.module';


@Module({
    imports: [
        JwtModule.register({
            secret: 'yourSecretKey', // Use a secret key here
            signOptions: { expiresIn: '60m' }, // Customize as needed
          }),
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            },
        ]),
        MongooseModule.forFeature([
            {
                name: Counter.name,
                schema: CounterSchema,
            },
        ]),
        CommonModule,
    ],
    controllers: [UsersController],
    providers: [
        UsersRepository,
        UserService,
    ],
    exports: [UserService],
})
export class UserModule { }