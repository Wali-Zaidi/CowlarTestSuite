import React from 'react';
import { render, fireEvent } from '@testing-library/react';
jest.mock('axios'); // Mock the axios module
import axios from 'axios';
import LandingPage from '../LandingPage';

describe('LandingPage', () => {
  it('renders the login form', () => {
    const { getByLabelText } = render(<LandingPage />);

    expect(getByLabelText('Username:')).toBeInTheDocument();
    expect(getByLabelText('Password:')).toBeInTheDocument();
    expect(getByLabelText('Email:')).toBeInTheDocument();
  });

  it('handles login form submission', async () => {
    const { getByLabelText, getByText } = render(<LandingPage />);
    const usernameInput = getByLabelText('Username:');
    const passwordInput = getByLabelText('Password:');
    const loginButton = getByText('Login');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    axios.post.mockResolvedValueOnce({ data: { message: 'Login successful' } });

    fireEvent.click(loginButton);

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining('/user/login'),
      expect.objectContaining({ username: 'testuser', password: 'testpassword' })
    );
  });
});

// final version of LandingPage.test.js