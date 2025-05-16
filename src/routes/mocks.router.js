import { Router } from 'express';
import { generateMockUsers, generateMockData } from '../utils/mocking.js';
import UserModel from '../dao/models/User.js';
import PetModel from '../dao/models/Pet.js';

const router = Router();

router.get('/mockingusers', async (req, res) => {
    const mockUsers = await generateMockUsers(50);

    console.log('Usuarios generados:', JSON.stringify(mockUsers, null, 2));

    if (!mockUsers || mockUsers.length === 0) {
        return res.status(404).json({ error: 'No se generaron usuarios' });
    }

    res.json(mockUsers);
});

router.post('/generateData', async (req, res) => {
    const { users, pets } = req.body;

    if (!users || !pets) {
        return res.status(400).json({ error: '❌ Debes proporcionar la cantidad de usuarios y mascotas a generar.' });
    }

    try {
        const generatedData = await generateMockData(users, pets);
        
        const existingEmails = new Set(
            (await UserModel.find({}, 'email')).map(user => user.email)
        );

        const filteredUsers = generatedData.users.filter(user => !existingEmails.has(user.email));

        console.log('Usuarios filtrados sin duplicados:', JSON.stringify(filteredUsers, null, 2));

        await UserModel.insertMany(filteredUsers);
        await PetModel.insertMany(generatedData.pets);

        res.json({ message: '✅ Datos insertados correctamente.', generatedData });
    } catch (error) {
        console.error('❌ Error al insertar datos:', error);
        res.status(500).json({ error: 'Error al insertar datos en la base de datos.' });
    }
});

export default router;