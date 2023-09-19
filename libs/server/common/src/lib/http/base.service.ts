import { Injectable } from '@nestjs/common';
import {
  EntityTarget,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { ApiResponseService } from './api-response.service';
import { IPaginationOptions, Pagination } from './types';
import { DEFAULT_LIMIT_PER_PAGE } from './const';

@Injectable()
export class BaseService<T> {
  public response!: ApiResponseService;
  public entity!: EntityTarget<T>;
  public repository!: Repository<T extends ObjectLiteral ? any : any>;

  private resolveOptions(options?: IPaginationOptions): [number, number] {
    const page = options?.page ?? 1;
    const limit = options?.limit ?? DEFAULT_LIMIT_PER_PAGE;

    return [page, limit];
  }

  private async paginateQueryBuilder<T>(
    queryBuilder: SelectQueryBuilder<T extends ObjectLiteral ? any : any>,
    options: IPaginationOptions
  ): Promise<Pagination<T>> {
    const [page, limit] = this.resolveOptions(options);

    const [items, total] = await queryBuilder
      .take(limit)
      .skip((page - 1) * limit)
      .getManyAndCount();

    return this.createPaginationObject<T>(items, total, page, limit);
  }

  private createPaginationObject<T>(
    items: T[],
    totalItems: number,
    currentPage: number,
    limit: number
  ) {
    const totalPages = Math.ceil(totalItems / limit);
    return new Pagination(items, {
      totalItems: totalItems,
      itemCount: items.length,
      itemsPerPage: limit,
      totalPages: totalPages,
      currentPage: currentPage,
    });
  }

  async paginate(
    queryBuilder?: SelectQueryBuilder<
      T extends ObjectLiteral ? any : any
    > | null,
    options?: IPaginationOptions
  ): Promise<Pagination<T> | undefined> {
    const query = queryBuilder ?? this.repository.createQueryBuilder();
    if (options) return this.paginateQueryBuilder(query, options);
    else return;
  }
}
