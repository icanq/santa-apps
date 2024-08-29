import React, { useState, FormEvent } from 'react';
import SantaForm from './components/SantaForm';
import Footer from './components/Footer'
import './App.module.css';

const App: React.FC = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (name: string, message: string) => {
    try {
      setLoading(true)
      const res = await fetch('/api/santa/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, message }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        setLoading(false)
        if (data.errors && data.errors.length > 0) {
          setError(data.errors[0].message)
        } else {
          setError('An error occurred, Please try again later')
        }
      } else {
          setLoading(false)
          setResponse(data.message);
          setError(null)
      }
    } catch (error) {
      setLoading(false)
      setError('An error occurred. Please try again.');
      setResponse(null)
      console.error('Error:', error);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">A Letter to Santa's</h1>
        <p className="bold">Ho ho ho, what you want for Christmas?</p>
        <SantaForm onSubmit={handleSubmit} loading={loading} />
        {response && <p className="response success">{response}</p>}
        {error && <p className="response error">{error}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default App;