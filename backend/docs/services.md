# Services

Services can be arbitrary code, usually connecting to external services. These are used as wrapper around outer dependencies that are needed in many places.

For example a service can connect to SMTP to send emails, or to Stripe to make payments, or any other external API, that doesn't have a library.

## Usage

There is no strict form of a service, but it usually exports a bunch of functions. It can depend on libraries, config values and even the models.

For example a simple EmailService could be implemented as such:

```ts
import nodemailer from 'nodemailer';
import { email } from '../config';

const transporter = nodemailer.createTransport({
    host: email.host,
    port: email.port,
    secure: email.secure,
    auth: {
        user: email.username,
        pass: email.password,
    },
    tls: { rejectUnauthorized: false },
});

async function sendMail(user: User, subject, html) {
    const result = await transporter.sendMail({
        to: user.email,
        subject,
        html
    });

    return result;
}
```