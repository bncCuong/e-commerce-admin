import { FormEvent, useEffect, useState } from 'react';
import { Layout } from '@/components';
import { Button } from '@/utils';
import axios from 'axios';

type Props = {};

const Products = (props: Props) => {
    const [categorie, setCategorie] = useState<string>('');
    const [listCategorie, setListCategorie] = useState<CategoryType[]>([]);
    const [parent, setParent] = useState<string>('');
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        axios.get('api/categories').then((res) => setListCategorie(res.data));
    };

    const addCategoriesSubmitHanler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (categorie === '') return;
        await axios.post('api/categories', { categorie, parent });
        setCategorie('');
        fetchCategories();
    };
    console.log(listCategorie, parent);
    return (
        <Layout>
            <h1 className="font-bold text-4xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700 bg-clip-text text-transparent ">
                Categories
            </h1>
            <form onSubmit={addCategoriesSubmitHanler} className="mt-10">
                <div>
                    <input
                        className={` bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-[300px] p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        type="string"
                        placeholder="New Categories"
                        value={categorie}
                        onChange={(e) => setCategorie(e.target.value)}
                    />
                    <select value={parent} onChange={(e) => setParent(e.target.value)}>
                        <option value="0">New category</option>
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
            {listCategorie.map((item) => (
                <div>
                    {item.parent && <span>{item?.parent.categorie}</span>}
                    {item._id == item.parent?._id && <span>{item.categorie}</span>}
                </div>
            ))}
        </Layout>
    );
};

export default Products;
