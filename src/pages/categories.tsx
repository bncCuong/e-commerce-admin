import { FormEvent, useEffect, useState } from 'react';
import { Layout } from '@/components';
import { Button } from '@/utils';
import axios from 'axios';

type Props = {};

const Products = (props: Props) => {
    const [categorie, setCategorie] = useState<string>('');
    const [listCategorie, setListCategorie] = useState<CategoryType[]>([]);
    const [parent, setParent] = useState<string>('');
    const [editedCategory, setEditedCategory] = useState<CategoryType | null>(null);
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        axios.get('api/categories').then((res) => setListCategorie(res.data));
    };

    const addCategoriesSubmitHanler = async (e: FormEvent<HTMLFormElement>) => {
        const data = { parent, categorie };
        e.preventDefault();
        if (categorie === '') return;
        if (editedCategory) {
            await axios.put('/api/categories', { ...data, _id: editedCategory._id });
            setEditedCategory(null);
        } else {
            await axios.post('api/categories', data);
        }
        setCategorie('');
        fetchCategories();
    };

    const editCategory = (categorie: CategoryType) => {
        setEditedCategory(categorie);
        setParent(categorie.parent?._id as string);
        setCategorie(categorie.categorie);
    };

    const deleteCategory = async (id: string) => {
        await axios.delete('/api/categories?id=' + id);
        fetchCategories();
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
                    <Button type="submit" children="Save" />
                </div>
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
