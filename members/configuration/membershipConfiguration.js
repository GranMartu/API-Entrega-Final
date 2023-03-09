const Member = require("../membersMd");
const jwt = require("../../utils/jwt");


const configurationForm = async (req, res, next) => {
    const { token } = req.params;
    const parsedToken = jwt.parseJwt(token);
    // const tokenData = jwt.parseJwt(req.headers.authorization.split(" ").pop());
    const currentMember = (await Member.find({ email: parsedToken.email }))[0];


    res.redirect(`http://127.0.0.1:5173/${token}`);

};




const updateMembership = async (req, res, next) => {

    try {
        const member = await Member.findOneAndUpdate({ email: req.body.email }, req.body, { new: true });
        res.status(200).json(member)
    }
    catch (error) {
        return next();

    }
};

const updateProfilePic = async (req, res, next) => {

    console.log("enter update");

    console.log("REQ.BODY", req.body);
    console.log("REQ.FILE", req.file);


    const profilePic = `http://localhost:3030/storage/${req.file.filename}`


    try {
        const member = await Member.findOneAndUpdate({ email: req.body.email }, { profilePic: profilePic }, { new: true });
        res.status(200).json(member)
    }
    catch (error) {
        return next();

    }
}

const getProfilePic = async (req, res, next) => {

    const member = (await Member.find().where({ email: req.body.email }))[0];

    res.status(200).json({ message: "Profile pic requested", profilePic: member.profilePic });
};

module.exports = { configurationForm, updateMembership, updateProfilePic, getProfilePic }

