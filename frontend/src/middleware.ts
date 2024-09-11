import { NextRequest, NextResponse } from 'next/server'
import { userProps } from '../types'
import { getUserInfo } from './lib/actions/user.actions';

function authorizeUser(userInfo: userProps, requestedPath: string): boolean {
  const roleRequiredForPath: { [key: string]: string[] } = {
    "administrator": ["/dashboard"]
  };

  const rolesRequired = roleRequiredForPath[requestedPath];

  if (rolesRequired) {
    return rolesRequired.includes(userInfo?.role);
  }
  return true;
}

export async function middleware(request: NextRequest) {
  const { pathname }: { pathname: string } = request.nextUrl;
  const token:string|undefined = request.cookies.get('token')?.value;
  
  const user: userProps = await getUserInfo();

 if(!token && !pathname.includes("login")){
   return NextResponse.redirect(new URL("/login", request.url));
 }

 if(token && pathname.includes("login")){
  return NextResponse.redirect(new URL("/dashboard", request.url));
 }


}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
