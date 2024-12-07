export const getProducts = async () => {
	try {
		const endPoint = "https://fakestoreapi.com/products";
		const response = await fetch(endPoint);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log("Error al obtener los productos", error);
	}
};
