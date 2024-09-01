import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import SantaForm from '../src/components/SantaForm/SantaForm';
import santaReducer from '../src/config/redux/slices/santaSlice';
import { useSantaRequest } from '../src/hooks/useSantaRequest';
import { api } from '../src/services/api';

vi.mock('../src/hooks/useSantaRequest');

const createMockStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      santa: santaReducer,
      [api.reducerPath]: api.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

describe('SantaForm Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders form fields correctly', () => {
    (useSantaRequest as jest.Mock).mockReturnValue({
      submitRequest: vi.fn(),
      isLoading: false,
    });

    render(
      <Provider store={createMockStore()}>
        <SantaForm />
      </Provider>
    );

    expect(screen.getByLabelText('Who are you?')).toBeInTheDocument();
    expect(screen.getByLabelText('What do you want for Christmas?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('displays validation errors when form is submitted with empty fields', async () => {
    (useSantaRequest as jest.Mock).mockReturnValue({
      submitRequest: vi.fn(),
      isLoading: false,
    });

    render(
      <Provider store={createMockStore()}>
        <SantaForm />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Message is required')).toBeInTheDocument();
    });
  });

  it('submits the form with valid data', async () => {
    const mockSubmitRequest = vi.fn();
    (useSantaRequest as jest.Mock).mockReturnValue({
      submitRequest: mockSubmitRequest,
      isLoading: false,
    });

    render(
      <Provider store={createMockStore()}>
        <SantaForm />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Who are you?'), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText('What do you want for Christmas?'), {
      target: { value: 'A new bike' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => {
      expect(mockSubmitRequest).toHaveBeenCalledWith({
        name: 'Test User',
        message: 'A new bike',
      });
    });
  });

  it('displays loading state when form is being submitted', () => {
    (useSantaRequest as jest.Mock).mockReturnValue({
      submitRequest: vi.fn(),
      isLoading: true,
    });

    render(
      <Provider store={createMockStore()}>
        <SantaForm />
      </Provider>
    );

    expect(screen.getByRole('button', { name: 'Sending...' })).toBeDisabled();
  });

  it('updates character count as user types', () => {
    (useSantaRequest as jest.Mock).mockReturnValue({
      submitRequest: vi.fn(),
      isLoading: false,
    });

    render(
      <Provider store={createMockStore()}>
        <SantaForm />
      </Provider>
    );

    const messageInput = screen.getByLabelText('What do you want for Christmas?');
    fireEvent.change(messageInput, { target: { value: 'Hello Santa' } });

    expect(screen.getByText('Characters remaining: 89')).toBeInTheDocument();
  });
});