import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  ApiItemResponse,
  ApiPaginateResponse,
} from './types';

@Injectable()
export class ApiResponseService {
  /**
   * Bind an item to a transformer and start building a response
   *
   * @param {*} Object
   * @param {*} Transformer
   *
   * @return Object
   */
  item<T>(item: T, transformer: any): ApiItemResponse<T> {
    return { data: plainToInstance(transformer as any, item) };
  }

  /**
   * Bind a collection to a transformer and start building a response
   *
   * @param {*} collection
   * @param {*} transformer
   *
   * @return Object
   */
  collection(collection: any, transformer: any) {
    const data = collection.map((item: any) =>
      plainToInstance(transformer as any, item)
    );
    return { data };
  }

  object(data: any) {
    return { data };
  }

  success() {
    return { data: { success: true } };
  }

  /**
   * Bind a paginator to a transformer and start building a response
   *
   * @param {*} LengthAwarePaginator
   * @param {*} Transformer
   *
   * @return Object
   */
  paginate<T>(paginator: any, transformer: any): ApiPaginateResponse<T> {
    const items = paginator.items.map((item: any) =>
      plainToInstance(transformer as any, item)
    );
    return {
      data: items,
      meta: {
        pagination: {
          itemCount: paginator.meta.itemCount,
          totalItems: paginator.meta.totalItems,
          itemsPerPage: paginator.meta.itemsPerPage,
          currentPage: paginator.meta.currentPage,
          totalPages: paginator.meta.totalPages,
        },
      },
    };
  }
}
