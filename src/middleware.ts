import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Herhangi bir genel middleware işlemi yapılabilir
  // Örneğin, oturum kontrolü, yönlendirme vb.
  return NextResponse.next();
}

// Middleware'in hangi yollar için çalışacağını belirle (opsiyonel)
export const config = {
  matcher: [
    // Tüm rotalar için middleware'i etkinleştir
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
