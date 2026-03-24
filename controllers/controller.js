const prisma = require("../db/prisma");
const bcrypt = require("bcryptjs");
const passport = require("passport");


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
    },

    logInGet: async(req,res) => {
        res.render("auth/log-in")
    },

    logInPost: passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/log-in"
    }),

    logOut:async (req,res, next) => {
        req.logout((err) => {
        if (err) return next(err);
        res.redirect("/");
        });
    },

    newFolderGet: async (req,res) => {
        res.render("folders/new")
    },

    newFolderPost: async (req,res, next) => {
        try {
            const {name} = req.body
            await prisma.folder.create({data:{name,userId: req.user.id}})
            res.redirect("/")
        } catch (err) {
            next(err)
        }
    },

    showFolder: async (req, res, next) => {
        try {
            const folder = await prisma.folder.findUnique({
                where: { id: parseInt(req.params.id) },
                include: { files: true }
            });
            res.render("folders/show", { folder });
        } catch (err) {
            next(err);
        }
    },

    editFolderGet: async (req, res, next) => {
        try {
            const folder = await prisma.folder.findUnique({
                where: { id: parseInt(req.params.id) }
            });
            res.render("folders/edit", { folder });
        } catch (err) {
            next(err);
        }
    },

    editFolderPost: async (req, res, next) => {
        try {
            const { name } = req.body;
            await prisma.folder.update({
                where: { id: parseInt(req.params.id) },
                data: { name }
            });
            res.redirect("/");
        } catch (err) {
            next(err);
        }
    },

    deleteFolder: async (req,res, next) => {
        try{
            await prisma.folder.delete({ where: { id: parseInt(req.params.id)}})
            res.redirect("/")
        } catch (err) {
            next(err)
        }
    },

    showFile:async(req,res,next) => {
        try {
        const file = await prisma.file.findUnique({
            where: { id: parseInt(req.params.id) },
            include: { file: true }
        });
            res.render("files/show", { file });
        } catch (err) {
            next(err);
        }
    },

    uploadFile: async (req, res, next) => {
        try {
            await prisma.file.create({
                data: {
                    name: req.file.originalname,
                    size: req.file.size,
                    url: req.file.path,
                    userId: req.user.id,
                    folderId: req.body.folderId ? parseInt(req.body.folderId) : null
                }
            });
            res.redirect("/");
        } catch (err) {
            next(err);
        }
    },

    deleteFile:async(req,res, next) => {
        try{
            await prisma.file.delete({ where: { id: parseInt(req.params.id)}})
            res.redirect("/")
        } catch (err) {
            next(err)
        }
    }
}