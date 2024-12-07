import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import styles from "./Navbar.module.css";
import React from "react";

const Navbar = () => {
    const { cart } = useCart(); // Acceder al carrito para mostrar la cantidad de productos

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0); // Calcular el total de productos

    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>
                <Link to="/" className={styles.link}>
                    Inicio
                </Link>
                <Link to="/suggestions" className={styles.link}>
                    Sugerencias productos
                </Link>
            </div>
            <div className={styles.center}>
                <h1 className={styles.title}>Mundo en Línea</h1>
            </div>
            <div className={styles.right}>
                <Link to="/card" className={styles.cart}>
                    🛒
                    <img src="" />
                    {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
