/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from "react";
import { getProducts } from "../service/getProducts";
import { useReducer } from "react";

const initialState = {
	product: [],
	cart: [],
	suggestionForm: {
		productName: "",
		description: "",
		category: "",
	},
	suggestionMessage: "",
};

const cartReducer = (state, action) => {
	switch (action.type) {
		case "SET_PRODUCT":
			return {
				...state,
				product: action.payload,
			};
		case "ADD_TO_CART":
			const existingProductIndex = state.cart.findIndex(product => product.id === action.payload.id);
			if (existingProductIndex !== -1) {
				const updatedCart = state.cart.map((product, index) =>
					index === existingProductIndex
						? { ...product, quantity: product.quantity + 1 }
						: product
				);
				return { ...state, cart: updatedCart };
			} else {
				return {
					...state,
					cart: [...state.cart, { ...action.payload, quantity: 1 }],
				};
			}
		case "DELETE_TO_CART":
			return {
				...state,
				cart: state.cart.filter((product) => product.id !== action.payload),
			};
		case "UPDATE_SUGGESTION_FORM":
			return {
				...state,
				suggestionForm: {
					...state.suggestionForm,
					[action.payload.name]: action.payload.value,
				},
			};
		case "SET_SUGGESTION_MESSAGE":
			return {
				...state,
				suggestionMessage: action.payload,
			};
		case "RESET_SUGGESTION_FORM":
			return {
				...state,
				suggestionForm: initialState.suggestionForm,
				suggestionMessage: "",
			};
		default:
			return state;
	}
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, initialState);

	const addToCart = (product) => {
		console.log("Agregar al carrito", product);
		dispatch({ type: "ADD_TO_CART", payload: product });
	};

	const deleteToCart = (id) => {
		console.log("Eliminar del carrito", id);
		dispatch({ type: "DELETE_TO_CART", payload: id });
	};

	useEffect(() => {
		getProducts().then((data) => {
			dispatch({ type: "SET_PRODUCT", payload: data });
		});
	}, []);

	const updateSuggestionForm = (name, value) => {
		dispatch({ type: "UPDATE_SUGGESTION_FORM", payload: { name, value } });
	};

	const submitSuggestionForm = () => {
		const { productName, description, category } = state.suggestionForm;

		if (!productName || !description || !category) {
			dispatch({ type: "SET_SUGGESTION_MESSAGE", payload: "Por favor, llena todos los campos antes de enviar" });
			return;
		}

		console.log("Sugerencia enviada:", state.suggestionForm);

		dispatch({ type: "SET_SUGGESTION_MESSAGE", payload: "¡Gracias por tu sugerencia! La hemos recibido" });
		dispatch({ type: "RESET_SUGGESTION_FORM" });
	};

	return (
		<CartContext.Provider
			value={{
				cart: state.cart,
				addToCart,
				deleteToCart,
				products: state.product,
				suggestionForm: state.suggestionForm,
				suggestionMessage: state.suggestionMessage,
				updateSuggestionForm,
				submitSuggestionForm,
			}}
		>
			{children}
		</CartContext.Provider>

	);
};

export const useCart = () => useContext(CartContext);
