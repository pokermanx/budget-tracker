export class CategoryModel {
    id: number;
    name: string;
    color: string;
}

export class WalletCategoriesModel {
    walletId: number;
    title: string;
    list: {
        incomeCategories: CategoryModel[];
        outcomeCategories: CategoryModel[];
    };
}
