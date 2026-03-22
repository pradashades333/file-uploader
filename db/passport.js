const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const prisma = require("./prisma");
const bcrypt = require("bcryptjs");

passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return done(null, false);
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return done(null, false);
        } else {
            return done(null, user);
        }

    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;