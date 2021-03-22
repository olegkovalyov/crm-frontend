import { NextRouter } from 'next/router';
import { AuthInterface } from '../interfaces/auth.interface';
import { FORGOT_PASSWORD_URL, RESET_PASSWORD_URL, SIGN_IN_URL, SIGN_UP_URL } from '../constants/route.constants';

export const checkRouteAccess = (auth: AuthInterface | null, router: NextRouter): boolean => !(!auth.user
  && !router.pathname.includes(SIGN_IN_URL)
  && !router.pathname.includes(SIGN_UP_URL)
  && !router.pathname.includes(FORGOT_PASSWORD_URL)
  && !router.pathname.includes(RESET_PASSWORD_URL));
