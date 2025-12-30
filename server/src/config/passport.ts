import passport from 'passport';
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import User, { IUser } from '../models/User.js';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const CALLBACK_URL = process.env.CALLBACK_URL || 'http://localhost:4000/auth/google/callback';

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: CALLBACK_URL,
            scope: ['profile', 'email'],
        },
        async (
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            done: VerifyCallback
        ) => {
            try {
                const email = profile.emails?.[0]?.value;
                const avatar = profile.photos?.[0]?.value;

                if (!email) {
                    return done(new Error('No email found in Google profile'), undefined);
                }

                // Find or create user
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    user = await User.create({
                        googleId: profile.id,
                        email,
                        name: profile.displayName || email.split('@')[0],
                        avatar: avatar || '',
                    });
                    console.log('✅ New user created:', user.email);
                } else {
                    // Update user info if changed
                    user.name = profile.displayName || user.name;
                    user.avatar = avatar || user.avatar;
                    await user.save();
                }

                // Return session payload compatible object for Express.User
                const sessionUser: Express.User = {
                    userId: user._id.toString(),
                    email: user.email,
                    iat: Math.floor(Date.now() / 1000),
                    exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60), // 7 days
                };
                return done(null, sessionUser);
            } catch (error) {
                console.error('❌ Google OAuth error:', error);
                return done(error as Error, undefined);
            }
        }
    )
);

// Serialize user for session
passport.serializeUser((user, done) => {
    // user is already a SessionPayload with userId
    done(null, (user as Express.User).userId);
});

// Deserialize user from session
passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return done(null, null);
        }
        // Return SessionPayload compatible object
        const sessionUser: Express.User = {
            userId: user._id.toString(),
            email: user.email,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60),
        };
        done(null, sessionUser);
    } catch (error) {
        done(error, null);
    }
});

export default passport;
