import
{
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { switchMap, takeUntil } from "rxjs";
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

export class InterceptorService implements HttpInterceptor
{
  intercept(req: HttpRequest<any>, next: HttpHandler)
  {
    console.log("Request");
    // alerts
    //   .open<boolean>(
    //     new PolymorpheusComponent(AlertExampleComponent, this.injector),
    //     {
    //       label: 'Question',
    //       status: 'error',
    //       autoClose: false,
    //     },
    //   )
    //   .pipe(
    //     switchMap(response =>
    //       alerts.open(`Got a value — ${response}`, {
    //         label: 'Information',
    //       }),
    //     ),
    //     takeUntil(router.events),
    //   );
    return next.handle(req);
  }
}
