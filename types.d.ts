type ProductType = {
    description?: string | undefined;
    name?: string | undefined;
    price?: number | undefined;
    _id?: string | undefined;
    __v?: number | undefined;
    images?: string[];
};

type CategoryType = {
    categorie: string;
    _id: string;
    parent: { categorie: string; _id: string };
};
