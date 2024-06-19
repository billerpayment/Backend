import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

export type UserDocument = User & Document & {
    comparePassword(candidatePassword: string): Promise<boolean>;
    generateResetToken(): string;
    updateLoginTimestamp(): void;
};


@Schema({ timestamps: true, strict: false })
export class User {
    @Prop({
        type: MongooseSchema.Types.String,
        required: true,
        index: true,
        unique: true,
      })
      customId: string;

    @Prop({
        type: MongooseSchema.Types.String,
        index: true,
        required: true,
        unique: true,
    })
    id: string;

    @Prop({
        type: MongooseSchema.Types.String,
        required: true,
        index: true,
        unique: true,
    })
    email: string;

    @Prop({ type: MongooseSchema.Types.String, required: true })
    password: string;

    @Prop({ type: MongooseSchema.Types.String, required: true })
    name: string;

    @Prop({ type: [String], default: [] })
    roles: string[];

    @Prop({ type: MongooseSchema.Types.String })
    phoneNumber: string;

    @Prop({ type: MongooseSchema.Types.Date })
    lastLogin: Date;

    @Prop({ type: MongooseSchema.Types.String })
    resetPasswordToken: string;

    @Prop({ type: MongooseSchema.Types.Date })
    resetPasswordExpires: Date;

    @Prop({ type: MongooseSchema.Types.Boolean, default: false })
    isVerfied: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.generateResetToken = function(): string {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes
    return resetToken;
};

UserSchema.methods.updateLoginTimestamp = function(): void {
    this.lastLogin = new Date();
};

// Pre-save hook to hash the password before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});