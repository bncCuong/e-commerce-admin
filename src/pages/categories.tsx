import { FormEvent, useEffect, useState } from 'react';
import { Layout } from '@/components';
import { Button } from '@/utils';
import CricleLoader from 'react-spinners/CircleLoader';

import axios from 'axios';
import { BarLoader } from 'react-spinners';

type Props = {};

const categoryList = ['Iphone', 'Ipad', 'Macbook', 'IMac', 'Watch'];

const Products = (props: Props) => {
    const [categorie, setCategorie] = useState<string>('');
    const [listCategorie, setListCategorie] = useState<CategoryType[]>([]);
    const [parent, setParent] = useState<string>('');
    const [editedCategory, setEditedCategory] = useState<CategoryType | null>(null);
    const [properties, setProperties] = useState<any>([]);
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const [saveLoading, setSaveLoading] =  useState<boolean>(false);
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        axios.get('api/categories').then((res) => setListCategorie(res.data));
        setDeleteLoading(false);
    };

    const addCategoriesSubmitHanler = async (e: FormEvent<HTMLFormElement>) => {
        setSaveLoading(true)
        e.preventDefault();
        const data = {
            parent,
            categorie,
            properties:
                properties &&
                properties.map((item: PropertyType) => ({ key: item.key, values: item.values.split(',') })),
        };
        if (data.categorie === '') {
            setSaveLoading(false)
            return
        };

        //check nếu có category trong list categories rồi thì k add thêm
        const hasCategory = listCategorie.some(
            (item) =>
                item.categorie.toLowerCase().replace(/\s+/g, ' ') ===
                data.categorie.toLowerCase().replace(/\s+/g, ' '),
        );

        if (hasCategory === true) {
            return;
        }

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
        setSaveLoading(false)
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
        setDeleteLoading(true);
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

    const cancelBtnHanler = () => {
        setEditedCategory(null);
        setParent('');
        setProperties('');
        setCategorie('');
    };

    return (
        <Layout>
            <div className="absolute top-0 left-0">
            {deleteLoading &&   <BarLoader loading={deleteLoading} color={'#2463eb'} width={10000}  speedMultiplier={0.4}  />}
            </div>
            <h1 className="font-bold text-4xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700 bg-clip-text text-transparent ">
                Categories
            </h1>

            <h1 className="mt-10 font-semibold text-xl mb-2">
                {editedCategory ? `Edit category: ${editedCategory.categorie}` : 'Add new category'}
            </h1>
            <form onSubmit={addCategoriesSubmitHanler} className="mb-10">
                <div>
                    <input
                        className="input"
                        type="string"
                        placeholder="New Categories"
                        value={categorie}
                        onChange={(e) => setCategorie(e.target.value)}
                    />
                    <select value={parent} onChange={(e) => setParent(e.target.value)} className="input w-[150px] ml-4">
                        <option value="">No category</option>
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
                <div className=" space-x-2 ml-2 my-2">
                    <Button type="submit" >
                        <div className='flex items-center justify-center gap-4'>
                             Save {saveLoading && <CricleLoader loading={ saveLoading} color="#2463eb" size={16} /> }
                       </div>
                    </Button>

                    {editedCategory && <Button type="button" children="Cancel" onClick={cancelBtnHanler} />}
                </div>
            </form>
            {listCategorie.length > 0 &&
                listCategorie.map((item) => (
                    <div key={item._id} className="ml-2 space-x-4 mb-4">
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
