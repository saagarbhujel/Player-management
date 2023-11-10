// src/App.test.tsx
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import App from "../../src/App";


describe('App',() => {
    it('should render the home page', () => {
        render(<App  />)
        screen.getByText("home")
        expect(screen.getByText("home")).toBeInTheDocument()
    })
})