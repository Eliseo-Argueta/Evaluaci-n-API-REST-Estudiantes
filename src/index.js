import express from 'express';

// crear instancia
const app = express();
const PORT = 8000;


//ESPECIFICAR JSON COMO FORMATO DE RESPUESTA
app.use(express.json());

// BASE DE DATOS TEMPORAL
const students = [
    {
        id: 1,
        firstName: "Eliseo",
        lastName: "Argueta",
        age: 40,
        email: "prensaeliseoar@gmail.com",
        phone: "+503 7000 0000",
        address: {
            country: "El Salvador",
            city: "San Miguel"
        },
        isActive: true,
        courses: [
            "Matemáticas",
            "Programación",
            "Base de Datos"
        ]
    }
];

//CREANDO ENDPOINTS DE PRUEBA
app.get('/students', (req, res) => {
    res.json({ message: 'Probando API de estudiante, ahora en automático 🙌' });
});

//CREANDO SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT} 🚀🚀🚀`);
});

// ENDPOINT PARA CREAR UN NUEVO ESTUDIANTE
app.post("/create", (req, res) => {

    const {
        firstName,
        lastName,
        age,
        email,
        phone,
        address,
        isActive,
        courses
    } = req.body;

    if (
        !firstName ||
        !lastName ||
        !age ||
        !email
    ) {
        return res.status(400).json({
            message: "Faltan datos del estudiante"
        });
    }

    const newStudent = {
        id: students.length + 1,
        firstName,
        lastName,
        age,
        email,
        phone,
        address,
        isActive,
        courses
    };

    students.push(newStudent);

    res.status(201).json({
        message: `El estudiante ${firstName} ${lastName} se ha registrado correctamente.`,
        data: newStudent
    });

});

// ENDPOINT PARA ACTUALIZAR ESTUDIANTES
app.put("/update/:id", (req, res) => {

    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Estudiante no encontrado."
        });
    }

    const {
        firstName,
        lastName,
        age,
        email,
        phone,
        address,
        isActive,
        courses
    } = req.body;

    student.firstName = firstName;
    student.lastName = lastName;
    student.age = age;
    student.email = email;
    student.phone = phone;
    student.address = address;
    student.isActive = isActive;
    student.courses = courses;

    res.status(200).json({
        message: `El estudiante ${student.firstName} ${student.lastName} ha sido actualizado correctamente.`,
        data: student
    });

});

// ELIMINAR ESTUDIANTE
app.delete("/delete/:id", (req, res) => {

    // Obtener el ID enviado en la URL
    const id = Number(req.params.id);

    // Buscar la posición del estudiante en el arreglo
    const index = students.findIndex(student => student.id === id);

    // Verificar si el estudiante existe
    if (index === -1) {
        return res.status(404).json({
            message: "El estudiante no existe."
        });
    }

    // Guardar el estudiante antes de eliminarlo
    const deletedStudent = students[index];

    // Eliminar el estudiante
    students.splice(index, 1);

    // Respuesta
    res.status(200).json({
        message: `El estudiante ${deletedStudent.firstName} ${deletedStudent.lastName} fue eliminado correctamente.`,
        data: deletedStudent
    });

});