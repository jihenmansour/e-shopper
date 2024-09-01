import { NextRequest, NextResponse } from 'next/server'
import { userProps } from '../types'
import { getUserInfo } from './lib/actions/user.actions';

function authorizeUser(userInfo: userProps, requestedPath: string): boolean {
  const roleRequiredForPath: { [key: string]: string[] } = {
    "/dashboard": ["administrator"]
  };

  const rolesRequired = roleRequiredForPath[requestedPath];

  if (rolesRequired) {
    return rolesRequired.includes(userInfo?.role);
  }
  return true;
}

export async function middleware(request: NextRequest) {
  const { pathname }: { pathname: string } = request.nextUrl;
  const token = request.cookies.get('token')?.value;
  
  const user: userProps = await getUserInfo();
  
  const Redirect = () => {
    const isAuthorized = authorizeUser(user, pathname);
    if (user?.role === "administrator") {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else if (user?.role === "client") {
      return NextResponse.redirect(new URL('/', request.url));
    }
    // else{
    //   return NextResponse.redirect(new URL('/login', request.url));
    // }
  }

  if (token && pathname === '/login') {
    return Redirect();
  }
  

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
