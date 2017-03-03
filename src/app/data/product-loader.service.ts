import { Injectable } from '@angular/core';
import { AsyncSubject } from 'rxjs/AsyncSubject';

import { OccProductService } from '../occ/occ-core/product.service';
import { OccProductSearchService } from '../occ/occ-core/product-search.service';
import { ProductModelService } from './product-model.service';

@Injectable()
export class ProductLoaderService {

    constructor(
        protected occProductService: OccProductService,
        protected occProductSearchService: OccProductSearchService,
        protected productModelService: ProductModelService
    ) { }

    /**
     * @desc delegates to the cached model
     * @param productCode
     */
    getSubscription(productCode: string) {
        return this.productModelService.getSubscription(productCode);
    }

    loadProduct(productCode: string) {
        this.occProductService.loadProduct(productCode)
            .then((productData) => {
                this.productModelService.storeProduct(productData);
        });
    }

    searchProducts(query: string): AsyncSubject<any> {
        const s = new AsyncSubject<any>();
        this.occProductSearchService.incrementalSearch(query)
            .then((pageData) => {
                s.next(pageData);
                s.complete();
        });
        return s;
    }
}