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
        res.json({ success: true, message: "Record procesado correctamente" });
      } else {
        res.json({ success: false, message: "El tiempo no es un nuevo record" });
      }

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

router.get("/top", async (req, res) => {
  try {
    // obtener los 100 mejores jugadores
    const topPlayers = await User.find({ record: { $exists: true, $ne: null } }) // filtra solo los usuarios con tiempos registrados
      .select('username record')
      .sort({ record: 1 }) // ordenar de menor a mayor
      .limit(100); // maximo 100 jugadores

    if (topPlayers.length === 0) {
      return res.status(404).json({ message: "No hay jugadores con tiempos registrados" });
    }

    // incluye la posicion del jugador
    const topPlayersWithPosition = topPlayers.map((player, index) => ({
      ...player.toObject(),
      position: index + 1
    }));

    res.json({ topPlayers: topPlayersWithPosition });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/currentpos", authMiddleware, async (req, res) => {
  try {

    // obtener el usuario actual segun el token
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // obtener todos los usuarios ordenados por el campo record (de menor a mayor tiempo)
    const allUsers = await User.find({ record: { $exists: true, $ne: null } })
      .sort({ record: 1 })
      .select('username record');

    const position = allUsers.findIndex((u) => u._id.toString() === user._id.toString()) + 1;

    if (position === -1) {
      return res.status(404).json({ message: "usuario no encontrado. No tiene tiempo registrado?" });
    }

    // Devolver el usuario con su posición
    return res.json({
      username: user.username,
      record: user.record,
      position: position
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});
  
export default router;