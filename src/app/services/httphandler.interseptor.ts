import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {EMPTY, Observable, throwError} from "rxjs";
import {catchError, ignoreElements} from "rxjs/operators";
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";

@Injectable({providedIn: 'root'})
export class HttphandlerInterseptor implements HttpInterceptor{
  snackbarRef?: MatSnackBarRef<any>;
  constructor(private snack: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(e => {
        if (!this.snackbarRef) {
          this.snackbarRef = this.snack.open('Something went wrong', 'Close');
        }
        return throwError(e);
      })
    );
  }
}
