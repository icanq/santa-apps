import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../config/redux/store';
import SantaForm from './SantaForm';

describe('SantaForm Component', () => {
  it('renders form fields', () => {
    render(
      <Provider store={store}>
        <SantaForm />
      </Provider>
    );
    expect(screen.getByLabelText('Who are you?')).toBeInTheDocument();
    expect(
      screen.getByLabelText('What do you want for Christmas?')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('displays validation errors for empty fields', async () => {
    render(
      <Provider store={store}>
        <SantaForm />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Message is required')).toBeInTheDocument();
    });
  });
});
