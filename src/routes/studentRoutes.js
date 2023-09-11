import express from "express";
import studentController from "../controllers/studentController.js";

const router = express.Router();

router.post("/students", studentController.create);
router.get("/students", studentController.getAll);
router.get("/students/:id", studentController.getById);
router.put("/students/:id", studentController.update);
router.delete("/students/:id", studentController.delete);

export default router;
