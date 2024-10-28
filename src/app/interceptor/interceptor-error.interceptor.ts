import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class InterceptorErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          // Muestra un mensaje de error específico para el error 500
          alert("Ha ocurrido un error en el servidor (500). Por favor, intenta de nuevo más tarde.");
        }
        // Reemitir el error para que pueda ser capturado si es necesario
        return throwError(() => error);
      })
    );
  }
}
