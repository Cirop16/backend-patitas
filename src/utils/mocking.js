import bcrypt from 'bcrypt';

const roles = ['user', 'admin'];

export const generateMockUsers = async (count) => {
    const users = await Promise.all(
        Array.from({ length: count }, async (_, index) => {
            const hashedPassword = await bcrypt.hash('coder123', 10);
            const user = {
                first_name: `Nombre${index + 1}`,
                last_name: `Apellido${index + 1}`,
                email: `usuario${index + 1}@mail.com`,
                password: hashedPassword,
                role: ['user', 'admin'][Math.floor(Math.random() * 2)],
                pets: []
            };

            console.log('Usuario generado:', user);

            return user;
        })
    );

    console.log('Lista final de usuarios:', JSON.stringify(users, null, 2));
    return users;
};

export const generateMockData = async (userCount, petCount) => {
    console.log(`Generando ${userCount} usuarios y ${petCount} mascotas...`);

    const users = await generateMockUsers(userCount);
    const pets = Array.from({ length: petCount }, (_, index) => ({
        name: `Mascota${index + 1}`,
        specie: ['perro', 'gato', 'ave'][Math.floor(Math.random() * 3)],
        adopted: false,
        owner: null
    }));

    console.log('Datos generados:', { users, pets });

    return { users, pets };
};