const { getallEvents, getEvent, createEvent, updateEvent, deleteEvent } = require("../controllers/eventsController");
const { protect } = require("../middleware/protect");

const router = require('express').Router();

router.get("/", protect,getallEvents);
router.get("/:id", protect,getEvent);
router.post("/", protect,createEvent);
router.put("/:id", protect,updateEvent);
router.delete("/:id", protect,deleteEvent);

module.exports = router;
