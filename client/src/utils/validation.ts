import * as yup from 'yup';

export const santaFormSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .max(50, 'Name must be at most 50 characters'),
  message: yup
    .string()
    .required('Message is required')
    .max(100, 'Message must be at most 100 characters'),
});
