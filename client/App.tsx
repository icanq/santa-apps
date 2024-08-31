import React from 'react';
import { Provider, useSelector } from 'react-redux';
import styles from './App.module.css';
import Footer from './src/components/Footer/Footer';
import SantaForm from './src/components/SantaForm/SantaForm';
import { RootState, store } from './src/config/redux/store';

const App: React.FC = () => {
  const response = useSelector((state: RootState) => state.santa.response);
  const error = useSelector((state: RootState) => state.santa.error);
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h1 className={styles.title}>A Letter to Santa's</h1>
        <p className={styles.bold}>Ho ho ho, what you want for Christmas?</p>
        <SantaForm />
        {response && (
          <p className={`${styles.response} ${styles.success}`}>{response}</p>
        )}
        {error && (
          <p className={`${styles.response} ${styles.error}`}>{error}</p>
        )}
      </div>
      <Footer />
    </div>
  );
};
const AppWithProvider: React.FC = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWithProvider;
