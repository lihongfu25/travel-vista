import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards';

import { RoleGuard } from '../guards/role.guard';

export function Auth(...roles: string[]) {
  if (Array.isArray(roles) && roles.length > 0) {
    return applyDecorators(
      SetMetadata('roles', roles),
      UseGuards(JwtAuthGuard, RoleGuard),
      ApiBearerAuth()
    );
  } else {
    return applyDecorators(
      SetMetadata('roles', []),
      UseGuards(JwtAuthGuard),
      ApiBearerAuth()
    );
  }
}
