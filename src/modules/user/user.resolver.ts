import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';

import { UserService } from './user.service';
import { User } from './dto';
import { AuthGuard, CurrentUser } from '../auth/guard';

interface UserJwtPayload {
    sub: string;
    sessionId: string;
}

@Resolver(() => User)
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query(() => User)
    @UseGuards(AuthGuard)
    me(@CurrentUser() user: UserJwtPayload) {
        return this.userService.findById(user.sub);
    }
}
