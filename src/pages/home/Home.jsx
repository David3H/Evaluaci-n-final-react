import { useCart } from "../../context/CartContext";
import Navbar from "../../navBar/Navbar";
import styles from "./Home.module.css";

const Home = () => {
    const { products, addToCart } = useCart();

    return (
        <main>
            <Navbar />
            <div className={styles.container}>
                <h2>Artículos disponibles</h2>
                <ul className={styles.productList}>
                    {products.map((product) => (
                        <li key={product.id} className={styles.productItem}>
                            <img
                                src={product.image}
                                alt={product.title}
                                className={styles.productImage}
                            />
                            <div>
                                <h3>{product.title}</h3>
                                <p>
                                    <strong>Precio:</strong> ${product.price}
                                </p>
                                <button
                                    className={styles.button}
                                    onClick={() => addToCart({ ...product, price: product.price })}
                                >
                                    Agregar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
};

export default Home;
