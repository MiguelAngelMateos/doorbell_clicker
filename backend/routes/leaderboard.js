import express from "express";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/save", authMiddleware, async (req, res) => {
    try {
      const { time } = req.body;
  
      if (!time || typeof time !== "number") {
        return res.status(400).json({ message: "Tiempo inválido" });
      }
  
      const user = await User.findById(req.userId);
  
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      // Guardar el record solo si es menor o no existe
      if (user.record === undefined || user.record === null || time < user.record) {
        user.record = time;
        await user.save();
      }
  
      res.json({ message: "Record procesado correctamente" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
export default router;