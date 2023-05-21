import { FormEvent, useEffect, useState } from 'react';
import { Layout } from '@/components';
import { Button, Input } from '@/utils';
import axios from 'axios';

type Props = {};

const Products = (props: Props) => {
    const [categorie, setCategorie] = useState<string>('');
    const [listCategorie, setListCategorie] = useState<CategoryType[]>([]);
    const [parent, setParent] = useState<string>('');
    const [editedCategory, setEditedCategory] = useState<CategoryType | null>(null);
    const [properties, setProperties] = useState<any>([]);
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        axios.get('api/categories').then((res) => setListCategorie(res.data));
    };

    const addCategoriesSubmitHanler = async (e: FormEvent<HTMLFormElement>) => {
        const data = {
            parent,
            categorie,
            properties: properties.map((item: PropertyType) => ({ key: item.key, values: item.values.split(',') })),
        };
        e.preventDefault();
        if (categorie === '') return;
        if (editedCategory) {
            await axios.put('/api/categories', { ...data, _id: editedCategory._id });
            setEditedCategory(null);
        } else {
            await axios.post('api/categories', data);
        }
        setCategorie('');
        setProperties([]);
        setParent('');
        fetchCategories();
    };

    const editCategory = (categorie: CategoryType) => {
        setEditedCategory(categorie);
        setParent(categorie.parent?._id as string);
        setCategorie(categorie.categorie);
        setProperties(
            categorie.properties?.map(({ key, values }: any) => ({
                key,
                values: values.join(','),
            })),
        );
    };

    const deleteCategory = async (id: string) => {
        await axios.delete('/api/categories?id=' + id);
        fetchCategories();
    };

    const addProperties = () => {
        setProperties((prev: [Object]) => {
            return [...prev, { key: '', values: '' }];
        });
    };

    const propertiesKeyHanler = (index: number, newKey: string) => {
        setProperties((prev: any) => {
            const propertie = [...prev];
            propertie[index].key = newKey;
            return propertie;
        });
    };
    const propertiesValueHanler = (index: number, newValue: string) => {
        setProperties((prev: any) => {
            const propertie = [...prev];
            propertie[index].values = newValue;
            return propertie;
        });
    };

    const removeProperty = (indexRemove: number) => {
        setProperties((prev: number[]) => {
            return [...prev].filter((p, pIndex) => pIndex !== indexRemove);
        });
    };

    return (
        <Layout>
            <h1 className="font-bold text-4xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700 bg-clip-text text-transparent ">
                Categories
            </h1>

            <h1 className="mt-10">
                {editedCategory ? `Edit category: ${editedCategory.categorie}` : 'Add new category'}
            </h1>
            <form onSubmit={addCategoriesSubmitHanler} className="mb-10">
                <div>
                    <input
                        className={` bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-[300px] p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        type="string"
                        placeholder="New Categories"
                        value={categorie}
                        onChange={(e) => setCategorie(e.target.value)}
                    />
                    <select value={parent} onChange={(e) => setParent(e.target.value)}>
                        {listCategorie &&
                            listCategorie.map((item) => (
                                <option key={item._id} value={item._id}>
                                    {item.categorie}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="mt-10 flex flex-col  space-x-2 ">
                    <div className="ml-2 mb-3">
                        <Button type="button" children="Add new properties" onClick={addProperties} />
                    </div>

                    {properties.length > 0 &&
                        properties.map((item: any, index: number) => (
                            <div key={item.index} className="flex space-x-2 mb-2 items-center ">
                                <input
                                    className="input w-[200px]"
                                    type="text"
                                    placeholder="Key"
                                    value={item.key}
                                    onChange={(e) => propertiesKeyHanler(index, e.target.value)}
                                />
                                <input
                                    className="input w-[200px]"
                                    type="text"
                                    placeholder="Value"
                                    value={item.values}
                                    onChange={(e) => propertiesValueHanler(index, e.target.value)}
                                />
                                <Button type="button" children="Remove" onClick={() => removeProperty(index)} />
                            </div>
                        ))}
                </div>
                <Button type="submit" children="Save" />
            </form>
            {listCategorie.length > 0 &&
                listCategorie.map((item) => (
                    <div>
                        {<span>{item?.categorie}</span>}
                        <span className="mx-4">{item.parent && item.parent?.categorie}</span>
                        <Button onClick={() => editCategory(item)} type="button">
                            Edit
                        </Button>
                        <Button onClick={() => deleteCategory(item._id)} type="button">
                            Delete
                        </Button>
                    </div>
                ))}
        </Layout>
    );
};

export default Products;
