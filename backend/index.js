import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './models/User.js';

const app = express();
const PORT = 3000;

app.use(cors());

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/doorbellclicker');

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API is up' });
});

app.get('/api/v1/user/list', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

app.post('/api/v1/user/create', async (req, res) => {
  const { username, email, password, record } = req.body;
  
  try {

    const newUser = new User({
      username,
      email,
      password,
      record
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar el usuario' });
  }
});

app.post('/api/v1/user/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar el usuario' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});
