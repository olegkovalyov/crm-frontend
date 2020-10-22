import { ApolloError } from '@apollo/client';


export const useGraphQlErrorHandler = () => {
  const getFormattedErrorMessage = (e: ApolloError): string => {
    const { graphQLErrors, networkError } = e;
    let formattedMessage = '';
    if (networkError) {
      formattedMessage = 'Network eventsErrorMessage. Try again later...';
    } else {
      const errorExtensions = graphQLErrors[0].extensions!;
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
