type ProductType = {
    description?: string | undefined;
    name?: string | undefined;
    price?: number | undefined;
    _id?: string | undefined;
    __v?: number | undefined;
    images?: string[];
    upLoadPage?: boolean;
    existingImages?: string[];
    existingName?: string;
    existingPrice?: number;
    existingDescription?: string;
    categorie?: string;
    fetchProduct?: () => void;
    product_properties?: Object;
};

type CategoryType = {
    categorie: string;
    _id: string;
    parent?: { categorie: string; _id: string };
    properties?: Object[];
};

type PropertyType = {
    key: string;
    values: string;
};
