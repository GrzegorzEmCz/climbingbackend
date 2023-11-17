const router = require("express").Router();
const roadController = require("../controllers/roadController");
const { verifyTokenAndAgent } = require("../middleware/verifyToken");

// CREATE ROAD
router.post("/", verifyTokenAndAgent, roadController.createRoad);

// UPADATE ROAD
router.put("/:id", verifyTokenAndAgent, roadController.updateRoad);

// DELETE ROAD
router.delete("/:id", verifyTokenAndAgent, roadController.deleteRoad);

// GET ROAD BY ID
router.get("/:id", roadController.getRoad);

// GET ALL ROADS
router.get("/", roadController.getAllRoads);

// SEARCH FOR ROADS
router.get("/search/:key", roadController.searchRoads);

module.exports = router;
