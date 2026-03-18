import { HttpInterceptorFn } from '@angular/common/http';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = getTokenFromCookie();

  // Wenn ein Token existiert, klonen wir den Request und fügen den Header hinzu
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedRequest); // Den Request mit angehängtem Token weiterschicken
  }

  // Wenn kein Token da ist (z.B. beim Login), einfach den originalen Request schicken
  return next(req);
};

function getTokenFromCookie(): string | undefined {
  const sessionStr = document.cookie
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith('SESSIONID='));

  return sessionStr ? sessionStr.split('SESSIONID=')[1] : undefined;
}
