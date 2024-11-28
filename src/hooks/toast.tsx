import { useSnackbar } from 'notistack';

const useToast = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showToast = (
    message: string,
    variant: 'default' | 'error' | 'success' | 'warning' | 'info' = 'default',
  ) => {
    enqueueSnackbar(message, { variant });
  };

  return showToast;
};

export default useToast;
