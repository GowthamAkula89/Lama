const express =  require("express");
const projectsRoute = require("../controllers/projects.controller");
const router = express.Router();
router.post("/", projectsRoute.addProject);
router.get("/",projectsRoute.getProject);
module.exports = router;