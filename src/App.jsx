import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router";
import Cart from "./pages/card/Card";
import Home from "./pages/home/Home";
import Suggestions from "./pages/suggestion/Suggestion";
import {CartProvider} from "./context/CartContext";

function App() {
	return (
		<CartProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/card" element={<Cart />} />
					<Route path="/suggestions" element={<Suggestions />}/>
					<Route path="*" element={<h1>404 Not Found</h1>} />
				</Routes>
			</BrowserRouter>
		</CartProvider>
	);
}

export default App;
