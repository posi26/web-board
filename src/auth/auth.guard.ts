import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        if (!request.headers.authorization) {
            return false;
        }
        const token = request.headers.authorization.split(' ')[1];
        try {
            const decoded = this.jwtService.verify(token, {
                secret: "aaa",
            });
            request.user = decoded;
            return true;
        } catch (err) {
            console.error('Token verification failed:', err);
            return false;
        }
    }
}
