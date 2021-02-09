import { Injectable, Scope, Inject, PipeTransform } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class CreateResourcePipe implements PipeTransform {
  constructor(@Inject(REQUEST) private request: Request) {}

  transform(value: any) {
    return {
      ...value,
      createdBy: this.request.headers['x-user-id'],
      createdAt: new Date().toISOString(),
      updatedBy: '',
      updatedAt: '',
    };
  }
}
