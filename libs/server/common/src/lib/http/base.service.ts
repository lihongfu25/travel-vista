import {
  DeleteResult,
  EntityTarget,
  FindOneOptions,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { ApiResponseService } from './api-response.service';
import { IPaginationOptions, Pagination } from './types';
import { DEFAULT_LIMIT_PER_PAGE } from './const';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
export class BaseService<T> {
  public response: ApiResponseService;
  public entity: EntityTarget<T>;
  public repository: Repository<T>;

  private resolveOptions(options?: IPaginationOptions): [number, number] {
    const page = options?.page ?? 1;
    const limit = options?.limit ?? DEFAULT_LIMIT_PER_PAGE;

    return [page, limit];
  }

  async find(options: FindOneOptions): Promise<T | null> {
    return this.repository.findOne(options);
  }

  private async paginateQueryBuilder<T>(
    queryBuilder: SelectQueryBuilder<T>,
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
    queryBuilder?: SelectQueryBuilder<T> | null,
    options?: IPaginationOptions
  ): Promise<Pagination<T> | undefined> {
    const query = queryBuilder ?? this.repository.createQueryBuilder();
    if (options) return this.paginateQueryBuilder(query, options);
    else return;
  }

  /**
   * Save a new model and return the instance.
   *
   * @param data
   */
  async create(
    data: QueryDeepPartialEntity<T>[] | QueryDeepPartialEntity<T>
  ): Promise<T | null> {
    const { identifiers } = await this.repository
      .createQueryBuilder()
      .insert()
      .into(this.entity)
      .values(Array.isArray(data) ? data : [data])
      .execute();
    return this.find({ where: { id: identifiers[0].id } });
  }

  /**
   * Update an entity in repository by id
   *
   * @param id number | string
   * @param data
   */
  async update(
    id: number | string,
    data: QueryDeepPartialEntity<T>
  ): Promise<T | null> {
    await this.repository
      .createQueryBuilder()
      .update(this.entity)
      .set(data)
      .where('id = :id', { id })
      .execute();
    return this.find({ where: { id } });
  }

  /**
   * Destroy the models for the given ID
   *
   * @param id Number | String
   */
  async destroy(id: number | string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
