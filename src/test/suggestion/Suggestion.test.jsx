import { describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Suggestion from "../../pages/suggestion/Suggestion";
import { CartProvider } from "../../context/CartContext";

describe('Test <Suggestion />', () => {
  
  vi.mock('../../navBar/Navbar', () => ({
    default: () => <div data-testid="mock-navbar"></div>, // Un componente vacío simulado
  }));

  test('Renderizar correctamente el formulario', () => {
    render(<CartProvider>
      <Suggestion />
  </CartProvider>);

    const productNameInput = screen.getByLabelText(/nombre del producto/i);
    const descriptionTextarea = screen.getByLabelText(/descripción/i);
    const categorySelect = screen.getByLabelText(/categoría/i);
    const submitButton = screen.getByRole('button', { name: /enviar/i });

    expect(productNameInput).not.to.be.null;
    expect(descriptionTextarea).not.to.be.null;
    expect(categorySelect).not.to.be.null;
    expect(submitButton).not.to.be.null;

    expect(productNameInput.tagName).to.equal('INPUT');
    expect(descriptionTextarea.tagName).to.equal('TEXTAREA');
    expect(categorySelect.tagName).to.equal('SELECT');
    expect(submitButton.disabled).to.be.false;
    screen.debug();
  });

  test('Validar las opciones del select de categoría', () => {
    render(<CartProvider>
      <Suggestion />
  </CartProvider>);

    const categorySelect = screen.getByLabelText(/categoría/i);
    const options = Array.from(categorySelect.options).map(option => option.text);

    expect(options).to.deep.equal(['Seleccione una categoría', 'Tecnología', 'Hogar', 'Ropa', 'Otros']);
  });

  test('Reiniciar formulario tras envío exitoso', () => {
    render(<CartProvider>
      <Suggestion />
  </CartProvider>);

    const productNameInput = screen.getByPlaceholderText(/Ingrese el nombre del producto/i);
    const descriptionInput = screen.getByPlaceholderText(/Describa el producto sugerido/i);
    const categorySelect = screen.getByRole('combobox');

    fireEvent.change(productNameInput, { target: { value: 'Producto 1' } });
    fireEvent.change(descriptionInput, { target: { value: 'Descripción del producto 1' } });
    fireEvent.change(categorySelect, { target: { value: 'Tecnología' } });

    const submitButton = screen.getByRole('button', { name: /enviar/i });
    fireEvent.click(submitButton);

    expect(productNameInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
    expect(categorySelect.value).toBe('');
  });

})