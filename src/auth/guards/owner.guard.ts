import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(context.switchToHttp().getRequest());

    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      throw new UnauthorizedException();
    }
    const email = String(request.user.email);
    const columnId = Number(request.params.columnId);
    console.log(context);
    console.log(this.userService);
    // console.log(this.entity);
    // this.columnService
    //   .findOne(email)
    //   .then((col) => {
    //     if (col.id != columnId) {
    //       return false;
    //     }
    //   })
    //   .catch((e) => {
    //     throw new BadRequestException();
    //   });

    return true;
  }
}
