import express from "express";
import { execFile } from "child_process"; // ✅ Importación necesaria
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

router.get("/sendEmail", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("email");
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        // Ejecutar script Python y pasar el email como argumento
        execFile("python3", ["send_email.py", user.email], { cwd: process.cwd() }, (error, stdout, stderr) => {
            if (error) {
                console.error("Error ejecutando script:", error);
                return res.status(500).json({ message: "Error al enviar el correo" });
            }

            console.log("Output del script:", stdout);
            res.json({ message: "Correo enviado correctamente" });
        });
    } catch (err) {
        res.status(500).json({ message: "Error al obtener el correo del usuario" });
    }
});

export default router;
