import {render, screen} from '@testing-library/react';
import LandingPage from '../Pages/LandingPage';

test('renders mainDiv', () => {
    render(<LandingPage />);
    const mainDiv = screen.getByTestId('mainDiv');
    expect(mainDiv).toBeInTheDocument();
});

test('renders loginDiv', () => {
    render(<LandingPage />);
    const loginDiv = screen.getByTestId('loginDiv');
    expect(loginDiv).toBeInTheDocument();
});

test('renders loginForm', () => {
    render(<LandingPage />);
    const loginForm = screen.getByTestId('loginForm');
    expect(loginForm).toBeInTheDocument();
});

describe('testing the login form', () => {
    test('testing the username field', () => {
        render(<LandingPage />);
        const usernameField = screen.getByTestId('username');
        expect(usernameField).toBeInTheDocument();
        expect(usernameField).toHaveAttribute('name', 'username');
        usernameField.value = 'test';
        expect(usernameField.value).toBe('test');
        usernameField.submit();
        expect(usernameField.value).toBe('test');
    });

    test('testing the password field', () => {
        render(<LandingPage />);
        const passwordField = screen.getByTestId('passwordField');
        expect(passwordField).toBeInTheDocument();
    });

    test('testing the login button', () => {
        render(<LandingPage />);
        const loginButton = screen.getByTestId('loginButton');
        expect(loginButton).toBeInTheDocument();
    });
});

