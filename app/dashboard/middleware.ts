import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authTokensssss')?.value;

  // Verifica se o token existe. Caso contrário, redireciona para o login.
  if (!token) {
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Aplica o middleware somente nas rotas do dashboard
export const config = {
  matcher: ['/dashboard/:path*'],
};
