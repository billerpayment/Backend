import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';


dotenv.config();

const validEmailProviders = [
    'gmail.com',
    'yahoo.com',
    'yahoo.co.uk',
    'outlook.com',
    'hotmail.com',
    'aol.com',
    'icloud.com',
    'mail.com',
    'zoho.com',
    'yandex.com',
    'protonmail.com',
    'gmx.com',
    'mail.ru',
    'inbox.com',
    'me.com',
    'live.com',
    'msn.com',
    'ymail.com',
    'rocketmail.com',
    'att.net',
    'verizon.net',
    'comcast.net',
    'sbcglobal.net',
    'bellsouth.net',
    'charter.net',
    'cox.net',
    'earthlink.net',
    'juno.com',
    'frontier.com',
    'windstream.net',
    'netzero.net',
];

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.APP_PASSWORD,
            },
        });
    }

    private async sendMail(to: string, subject: string, text: string, html?: string) {
        let emailValidationResult: any;
        // let response: any;
        if (typeof to !== 'string') {
            return false;
        }
        const domain = to.split('@')[1];
        const internalValidation = validEmailProviders.includes(domain);
        if (!internalValidation) {
            return emailValidationResult = {
                status: 'Invalid',
                reason: 'please enter a valid mail',
            };
        }
        if (internalValidation) {
            try {
                if(emailValidationResult?.status === true) {
                    const mailOptions = {
                        from: process.env.EMAIL_USER,
                        to,
                        subject,
                        text,
                        html,
                    };

                    await this.transporter.sendMail(mailOptions);
                }
            } catch(err) {
                console.log('Error', err);
            }
        }
        

        
    }

    async welcomeMail(userEmail: string, firstName: string, link: string) {

    }
};