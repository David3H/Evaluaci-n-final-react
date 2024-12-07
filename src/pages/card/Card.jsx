import { useCart } from "../../context/CartContext";
import styles from "./Card.module.css";
import Navbar from "../../navBar/Navbar";

const Cart = () => {
	const { cart, deleteToCart } = useCart();

	const calculateTotal = () => {
		let subtotal = 0;
		cart.forEach((product) => {
			subtotal += product.price * product.quantity;
		});
		const iva = subtotal * 0.12;
		const total = subtotal + iva;
		return { subtotal, iva, total };
	};

	const { subtotal, iva, total } = calculateTotal();

	return (
		<main>
			<Navbar />
			<div className={styles.container}>
				<h1 className={styles.title}>Productos</h1>
				{cart.length === 0 ? (
					<p className={styles.emptyMessage}>No existen productos seleccionados</p>
				) : (
					<ul className={styles.productList}>
						{cart.map((product) => (
							<li key={product.id} className={styles.productItem}>
								<div  className={styles.productDetail}>
									<img src={product.image} alt={product.name} className={styles.productImage} />
									<h3 className={styles.productTitle}>{product.title}</h3>
								</div>
								<div className={styles.productDetails}>
									<p>Cantidad: {product.quantity}</p>
								</div>
								<div className={styles.productDetails}>
									<p>Precio unidad: ${product.price}</p>
								</div>
								<div className={styles.productDetails}>
									<button
										className={styles.button}
										onClick={() => deleteToCart(product.id)}
									>
										Eliminar Artículo
									</button>
								</div>
							</li>
						))}
					</ul>
				)}

				<div className={styles.total}>
					<h3>Subtotal: ${subtotal}</h3>
					<h3>IVA (12%): ${iva.toFixed(2)}</h3>
					<h3>Total: ${total.toFixed(2)}</h3>
				</div>
			</div>
		</main>
	);
};

export default Cart;