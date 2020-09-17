import { ApolloError } from '@apollo/client';


export const useGraphQlErrorHandler = () => {
  const getFormattedErrorMessage = (e: ApolloError): string => {
    let formattedMessage = '';
    if (e.networkError) {
      formattedMessage = e.networkError.message;
    } else {
      const errorExtensions = e.graphQLErrors[0].extensions!;
      let notFormattedErrorMessage;
      if (errorExtensions.exception.response.message instanceof Array) {
        notFormattedErrorMessage = errorExtensions.exception.response.message.shift();
      } else {
        notFormattedErrorMessage = errorExtensions.exception.response.message;
      }
      if (notFormattedErrorMessage !== undefined) {
        formattedMessage = notFormattedErrorMessage.charAt(0).toUpperCase() + notFormattedErrorMessage.slice(1);
      }
    }
    return formattedMessage;
  };
  return {
    getFormattedErrorMessage,
  };
};
