const express = require ("express");
const projectsRoutes = require("./projects.route");
const router = express.Router()
router.use("/projects", projectsRoutes)
module.exports = router;