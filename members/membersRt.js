const router = require("express").Router();
const { getAllMembers, deleteMemberById, searchMember } = require("./membersCt");
const { updateMembership, configurationForm, updateProfilePic, getProfilePic } = require("./configuration/membershipConfiguration");
const { createMember } = require("../members/authorization/register");
const { loginMember } = require("../members/authorization/logIn");
const tokenAuth = require("../auth/sessionVerify");
const validator = require("../validators/validators");
const { passwordLost } = require("../utils/lostPassword");
const { passwordRecover } = require("../utils/recoverPassword");
const { passwordChange } = require("../utils/changePassword");
const { uploadPic } = require("../utils/handleStorage")

router.get("/find", getAllMembers);
router.get("/find/:query", searchMember)
router.delete("/:id", deleteMemberById);
router.post("/register", validator.register, createMember);
router.post("/login", loginMember);
router.get("/membership-configuration/:token", configurationForm);
router.post("/membership-configuration", updateMembership);
router.post("/profile-pic", uploadPic.single("profilePic"), updateProfilePic)
router.post("/get-profile-pic", getProfilePic)
router.get("/password-lost", passwordLost);
router.get("/password-recover/:token", passwordRecover);
router.post("/password-recover/:token", validator.passwordRecover, passwordChange);

module.exports = router;