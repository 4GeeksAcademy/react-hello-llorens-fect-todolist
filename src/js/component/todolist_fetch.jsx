import React, { useEffect, useState } from "react";

export const Todo_List_Fetch = () => {
    const [tareas, setTareas] = useState([]);
    const [formData, setFormData] = useState({
        tarea: '',
        done: false
    });

    // Recogemos todos los datos de la API
    const get_Datos = async () => {
        try {
            const respuesta = await fetch('https://playground.4geeks.com/todo/users');
            const datos = await respuesta.json();
            console.log(datos.users);
            setTareas(datos.users);
            console.log(tareas);
        } catch (error) {
            console.log('Error al cargar los datos');
        }
    };

    // Insertamos datos en la API
    const insert_Datos = async (nombre) => {
        try {
            const respuesta = await fetch('https://playground.4geeks.com/todo/users/' + nombre, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (respuesta.ok) {
                get_Datos(); // Actualizamos la lista después de insertar
            }
        } catch (error) {
            console.log('Error al insertar los datos');
        }
    };

    // Borrar datos en la API
    const borrar_Datos = async (nombre) => {
        try {
            const respuesta = await fetch('https://playground.4geeks.com/todo/users/' + nombre, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (respuesta.ok) {
                get_Datos(); // Actualizamos la lista después de borrar
            }
        } catch (error) {
            console.log('Error al borrar los datos');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.tarea.trim() !== '') {
            insert_Datos(formData.tarea);
            setFormData({ ...formData, tarea: '' });
        }
    };

    const handleCambioConObjeto = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleEliminar = (nombre) => {
        borrar_Datos(nombre);
    };

    // GENERARÁ AUTOMÁTICAMENTE LA CARGA DE DATOS
    useEffect(() => {
        get_Datos();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Todo List</h2>
            <p className="text-center text-muted">Total de tareas: {tareas.length}</p>
            <form onSubmit={handleSubmit} className="d-flex justify-content-center mb-3">
                <div className="input-group w-50">
                    <input
                        value={formData.tarea}
                        onChange={handleCambioConObjeto}
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                        name="tarea"
                        type="text"
                        className="form-control"
                        placeholder="Comienza a escribir"
                    />
                </div>
            </form>
            <div className="container">
                {tareas.length === 0 ? (
                    <p className="text-muted text-center">No hay tareas, añadir tareas</p>
                ) : (
                    <ul className="list-group">
                        {tareas.map((tarea) => (
                            <li
                                key={tarea.id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                                onMouseEnter={(e) => (e.currentTarget.querySelector('.delete-btn').style.display = 'inline')}
                                onMouseLeave={(e) => (e.currentTarget.querySelector('.delete-btn').style.display = 'none')}
                            >
                                {tarea.name}
                                <button
                                    className="btn btn-sm btn-danger delete-btn"
                                    style={{ display: 'none' }}
                                    onClick={() => handleEliminar(tarea.name)}
                                >
                                    ×
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
