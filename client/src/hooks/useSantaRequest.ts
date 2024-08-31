import { useDispatch } from 'react-redux';
import { setError, setResponse } from '../config/redux/slices/santaSlice';
import { useSendSantaRequestMutation } from '../services/santaApi';
import { ErrorWithData, SantaRequest } from '../types';

export const useSantaRequest = () => {
  const [sendRequest, { isLoading }] = useSendSantaRequestMutation();
  const dispatch = useDispatch();

  const submitRequest = async (request: SantaRequest) => {
    try {
      const response = await sendRequest(request).unwrap();
      dispatch(setResponse(response.message));
    } catch (error) {
      console.log(error, 'ini');
      if ((error as ErrorWithData).data) {
        const apiError = (error as ErrorWithData).data;
        dispatch(setError(apiError.message));
      } else {
        dispatch(setError('An unknown error occurred'));
      }
    }
  };

  return { submitRequest, isLoading };
};
