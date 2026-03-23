const prisma = require("../db/prisma");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const folders = await prisma.folder.findMany({ where: { userId: req.user.id } });

module.exports = {
    index: async (req, res, next) => {
        try {
            const folders = await prisma.folder.findMany({ where: { userId: req.user.id } });
            res.render("index", { folders: folders });
        } catch (err) {
            next(err);
        }
    },

    signUpGet: async (req,res) => {
        res.render("auth/sign-up")
    },

    signUpPost: async(req,res,next) => {
        try {
            const {email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10)
            await prisma.user.create({ data: { email, password: hashedPassword } })
            res.redirect("/log-in")
        } catch (err) {
            next(err)
        }


    }
}