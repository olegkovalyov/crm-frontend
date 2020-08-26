import { ApolloError } from 'apollo-client';
import { IGraphQlError } from '../../interfaces/auth.interface';


export const useGraphQlErrorHandler = () => {
  const getFormattedErrorMessage = (e: ApolloError): string => {
    let formattedMessage = '';
    const error: IGraphQlError = e.graphQLErrors[0];
    let notFormattedErrorMessage;
    if (error.extensions.exception.response.message instanceof Array) {
      notFormattedErrorMessage = error.extensions.exception.response.message.shift();
    } else {
      notFormattedErrorMessage = error.extensions.exception.response.message;
    }
    if (notFormattedErrorMessage !== undefined) {
      formattedMessage = notFormattedErrorMessage.charAt(0).toUpperCase() + notFormattedErrorMessage.slice(1);
    }
    return formattedMessage;
  };
  return {
    getFormattedErrorMessage,
  };
};
