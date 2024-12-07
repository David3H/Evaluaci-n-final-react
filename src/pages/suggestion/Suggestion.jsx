import { useState } from "react";
import styles from "./Suggestion.module.css";
import Navbar from "../../navBar/Navbar";

const Suggestion = () => {
    const [form, setForm] = useState({
        productName: "",
        description: "",
        category: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.productName || !form.description || !form.category) {
            setMessage("Por favor, llena todos los campos antes de enviar");
            return;
        }

        console.log("Sugerencia enviada:", form);

        setMessage("¡Gracias por tu sugerencia! La hemos recibido");
        setForm({
            productName: "",
            description: "",
            category: "",
        });
    };

    return (
        <main>
            {<Navbar />}
            <br /><br />
            <div className={styles.container}>
                <h1 className={styles.title}>Sugerir Producto</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.label}>
                        Nombre del Producto:
                        <input
                            type="text"
                            name="productName"
                            value={form.productName}
                            onChange={handleChange}
                            className={styles.input}
                            placeholder="Ingrese el nombre del producto"
                            required
                        />
                    </label>
                    <label className={styles.label}>
                        Descripción:
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className={styles.textarea}
                            placeholder="Describa el producto sugerido"
                            required
                        />
                    </label>
                    <label className={styles.label}>
                        Categoría:
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className={styles.select}
                            required
                        >
                            <option value="">Seleccione una categoría</option>
                            <option value="Tecnología">Tecnología</option>
                            <option value="Hogar">Hogar</option>
                            <option value="Ropa">Ropa</option>
                            <option value="Otros">Otros</option>
                        </select>
                    </label>
                    <button type="submit" className={styles.button}>
                        Enviar
                    </button>
                </form>
                {message && <p className={styles.message}>{message}</p>}
            </div>
        </main>
    );
};

export default Suggestion;
