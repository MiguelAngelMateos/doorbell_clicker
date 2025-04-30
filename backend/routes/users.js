import express from "express";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/users
router.get("/username", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("username");
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        res.json({ username: user.username });
    } catch (err) {
        res.status(500).json({ message: "Error al obtener el usuario" });
    }
});

export default router;
