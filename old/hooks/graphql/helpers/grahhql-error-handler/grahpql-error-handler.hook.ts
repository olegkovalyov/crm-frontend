import { ApolloError } from '@apollo/client';


export const useGraphQlErrorHandler = () => {
  const getFormattedErrorMessage = (e: ApolloError): string[] => {
    const { graphQLErrors, networkError } = e;
    let concatenatedErrorMessages = [];
    if (networkError) {
      concatenatedErrorMessages.push('Network error. Try again later...');
    } else {
      graphQLErrors.forEach((error) => {
        concatenatedErrorMessages.push(error.message);
      });
    }
    return concatenatedErrorMessages;
  };
  return {
    getFormattedErrorMessage,
  };
};
