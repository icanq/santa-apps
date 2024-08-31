import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSantaRequest } from '../../hooks/useSantaRequest';
import { SantaRequest } from '../../types';
import { santaFormSchema } from '../../utils/validation';
import styles from './SantaForm.module.css';

const SantaForm: React.FC = () => {
  const { submitRequest, isLoading } = useSantaRequest();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SantaRequest>({
    resolver: yupResolver(santaFormSchema),
  });

  const messageLength = watch('message')?.length || 0;

  const onSubmit = (data: SantaRequest) => {
    submitRequest(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor='name' className={styles.label}>
          Who are you?
        </label>
        <input id='name' {...register('name')} className={styles.input} />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='message' className={styles.label}>
          What do you want for Christmas?
        </label>
        <textarea
          id='message'
          {...register('message')}
          className={styles.textarea}
        />
        <p className={styles.charCount}>
          Characters remaining: {100 - messageLength}
        </p>
        {errors.message && (
          <p className={styles.error}>{errors.message.message}</p>
        )}
      </div>
      <button type='submit' className={styles.button} disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};

export default SantaForm;
