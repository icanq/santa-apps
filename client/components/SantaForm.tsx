import React, { useState, FormEvent } from 'react';
import './SantaForm.module.css';

interface SantaFormProps {
  onSubmit: (name: string, message: string) => void;
  loading: boolean;
}

const SantaForm: React.FC<SantaFormProps> = ({ onSubmit, loading }) => {
  const [name, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(name, message);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="formGroup">
        <label htmlFor="name" className="label">Who are you?</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setUserId(e.target.value)}
          required
          className="input"
        />
      </div>
      <div className="formGroup">
        <label htmlFor="message" className="label">What do you want for christmas?</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={100}
          required
          className="textarea"
        />
        <p className="charCount">Characters remaining: {100 - message.length}</p>
      </div>
      <button type="submit" className="button" disabled={loading}>
        { loading ? "Sending..." : "Send"  }
      </button>
    </form>
  );
};

export default SantaForm;