import bcrypt from 'bcrypt';

const roles = ['user', 'admin'];

export const generateMockUsers = async (count) => {
    return Promise.all(
        Array.from({ length: count }, async (_, index) => {
            const hashedPassword = await bcrypt.hash('coder123', 10);
            return {
                first_name: `Nombre${index + 1}`,
                last_name: `Apellido${index + 1}`,
                email: `usuario${index + 1}@mail.com`,
                password: hashedPassword,
                role: roles[Math.floor(Math.random() * roles.length)],
                pets: []
            };
        })
    );
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