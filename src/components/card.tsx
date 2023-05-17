import { Button } from '@/utils';
import Link from 'next/link';
import React from 'react';

export const Card = ({ name, price, description, _id }: ProductType) => {
    return (
        <Link href={'/products/edit/' + _id} className="flex">
            <div className="relative  cursor-pointer w-[300px] h-[400px] ] border-2 rounded-lg p-2 bg-slate-300/30 shadow-lg flex  flex-col justify-between my-4">
                <div className=" absolute -top-0.5 -left-2 h-8 w-24 rounded-tl-lg bg-red-600 px-2 py-1 flex items-center justify-center rounded-r-2xl ">
                    <p className="absolute w-1.5 h-1.5 bg-red-700 -left-0 top-8 rounded-b" />
                    <p className="text-white font-semibold text-sm">Self off 10%</p>
                </div>
                {name}, {description}, {price}
                <div className="flex gap-4 ">
                    <Button type="button">Edit</Button>
                    <Button type="button">Delete</Button>
                </div>
            </div>
        </Link>
    );
};
