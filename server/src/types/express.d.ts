import { SessionPayload } from '../schemas/auth.js';

declare global {
    namespace Express {
        interface User extends SessionPayload { }
    }
}

export { };
