const express =  require("express");
const projectsRoute = require("../controllers/projects.controller");
const router = express.Router();
router.post("/", projectsRoute.addProject);
router.get("/",projectsRoute.getProjects);
router.patch("/:projectId/files", projectsRoute.updateProjectFiles);
router.patch("/:projectId/configuration", projectsRoute.updateConfiguration);
router.patch("/:projectId/files/:fileId", projectsRoute.updateProjectFile)
router.delete("/:projectId/files/:fileId", projectsRoute.deleteFile);
module.exports = router;