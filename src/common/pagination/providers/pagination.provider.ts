import {Injectable, Inject} from '@nestjs/common';
import PaginationQueryDTO from '../DTOs/pagination-query.dto';

import {Repository, ObjectLiteral} from 'typeorm';
import {Request} from 'express';
import {REQUEST} from '@nestjs/core';
import {PaginationInterface} from '../../interfaces/pagination.interface';
import {meta} from '@typescript-eslint/eslint-plugin';
import {Cards} from '../../../cards-management/entities/cards.entity';

@Injectable()
export class PaginationProvider {
    constructor(
        @Inject(REQUEST)
        private readonly request: Request,
    ) {
    }

    public async paginateQuery<Type extends ObjectLiteral>(
        paginationQueryDTO: PaginationQueryDTO,
        repository: Repository<Type>,
        orderToFollow?: any,
        where?: any,
    ): Promise<PaginationInterface<Type>> {
        // setting the base URL for the pagination interface
        const baseURL: string = `${this.request.protocol}://${this.request.headers.host}/`;
        const newURL = new URL(this.request.url, baseURL);

        // calculate page numbers
        const totalItems = await repository.count();
        const totalPages = Math.ceil(totalItems / paginationQueryDTO.limit);
        const nextPage =
            paginationQueryDTO.page !== totalPages
                ? paginationQueryDTO.page + 1
                : paginationQueryDTO.page;
        const previousPage =
            paginationQueryDTO.page >= totalPages && paginationQueryDTO.page < 1
                ? paginationQueryDTO.page - 1
                : paginationQueryDTO.page;

        const result = await repository.find({
            take: paginationQueryDTO.limit,
            skip: (paginationQueryDTO.page - 1) * paginationQueryDTO.limit,
            order: Object.keys(orderToFollow).length ? orderToFollow : undefined,
            where,
        });
        const finalResponse: PaginationInterface<Type> = {
            data: result,
            meta: {
                itemsPerPage: paginationQueryDTO.limit,
                totalItems,
                currentPage: paginationQueryDTO.page,
                totalPages,
            },
            links: {
                firstPage: `${newURL.origin}${newURL.pathname}?limit=${paginationQueryDTO.limit}&page=1`,
                lastPage: `${newURL.origin}${newURL.pathname}?limit=${paginationQueryDTO.limit}&page=${totalPages}`,
                currentPage: `${newURL.origin}${newURL.pathname}?limit=${paginationQueryDTO.limit}&page=${paginationQueryDTO.page}`,
                nextPage: `${newURL.origin}${newURL.pathname}?limit=${paginationQueryDTO.limit}&page=${nextPage}`,
                previousPage: `${newURL.origin}${newURL.pathname}?limit=${paginationQueryDTO.limit}&page=${previousPage}`,
            },
        };

        return finalResponse;
    }
}
