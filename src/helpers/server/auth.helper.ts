import { checkCookies, getCookie, removeCookies } from 'cookies-next';
import { REFRESH_TOKEN } from '../../constants/auth.constant';
import { initializeApollo } from '../../graphql/client/graphql.client';
import { AccessToken } from '../../interfaces/generated/AccessToken';
import accessTokenQuery from '/src/graphql/query/access-token.query.graphql';
import { IncomingMessage, ServerResponse } from 'http';
import { AuthInterface } from '../../interfaces/auth.interface';
import { AUTH_ROUTES, PROTECTED_ROUTES, ROUTE_DASHBOARD, ROUTE_LOG_IN } from '../../constants/route.constants';


export const hasRefreshToken = (
  request: IncomingMessage,
): boolean => {
  const has = checkCookies(REFRESH_TOKEN, {
    req: request,
  });
  return has;
};

export const getRefreshToken = (
  request: IncomingMessage,
): string | null => {
  const refreshToken = getCookie(REFRESH_TOKEN, {
    req: request,
  });
  if (!refreshToken) {
    return null;
  }
  return refreshToken as string;
};

export const removeRefreshToken = (
  request: IncomingMessage,
  response: ServerResponse,
): void => {
  removeCookies(REFRESH_TOKEN, {
    req: request,
    res: response,
  });
};

export const getAuthByRefreshToken = async (refreshToken: string): Promise<AuthInterface | null> => {
  const client = initializeApollo();

  try {
    const result = await client.query<AccessToken, null>({
      query: accessTokenQuery,
      context: {
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
      },
    });
    return result.data ? result.data.accessToken : null;
  } catch (e) {
    return null;
  }
};

export const protectAdminRoutes = (route: string, response: ServerResponse): void =>{
  if (PROTECTED_ROUTES.includes(route)) {
    response.writeHead(307, {
      Location: ROUTE_LOG_IN,
    });
    response.end();
  }
}

export const protectAuthRoutes = (route: string, response: ServerResponse): void =>{
  if (AUTH_ROUTES.includes(route)) {
    response.writeHead(307, {
      Location: ROUTE_DASHBOARD,
    });
    response.end();
  }
}



