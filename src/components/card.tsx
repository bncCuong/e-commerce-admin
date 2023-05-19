import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCreative, Keyboard } from 'swiper';

import { Button } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const Card = ({ name, price, description, _id, images }: ProductType) => {
    console.log(images);
    return (
        <div className="relative object-cover cursor-pointer w-[300px] h-[400px]  border-2 rounded-lg p-2 bg-slate-300/30 shadow-lg inline-flex  flex-col justify-between my-4">
            <div className="absolute top-10 -left-1 flex z-40">
                <Swiper
                    grabCursor={true}
                    effect={'creative'}
                    keyboard={{
                        enabled: true,
                    }}
                    creativeEffect={{
                        prev: {
                            shadow: true,
                            translate: [0, 0, -400],
                        },
                        next: {
                            translate: ['100%', 0, 0],
                        },
                    }}
                    className="w-[300px]"
                    navigation={true}
                    modules={[Pagination, Navigation, EffectCreative, Keyboard]}
                    slidesPerView={1}
                    loop={true}
                    pagination={{ clickable: true }}
                >
                    {images?.map((image) => (
                        <SwiperSlide key={image}>
                            <Image src={image as string} alt="priduct photo" width={500} height={500} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className=" absolute -top-0.5 -left-2 h-8 w-24 rounded-tl-lg bg-red-600 px-2 py-1 flex items-center justify-center rounded-r-2xl ">
                <p className="absolute w-1.5 h-1.5 bg-red-700 -left-0 top-8 rounded-b" />
                <p className="text-white font-semibold text-sm">Self off 10%</p>
            </div>

            <div className="absolute bottom-2 right-2">
                <div>name: {name}</div>
                <div>price: {price}</div>
                <div>infomation: {description}</div>

                <div className="flex gap-4 ">
                    <Link href={'/products/edit/' + _id} className="inline-flex">
                        <Button type="button">Edit</Button>
                    </Link>
                    <Button type="button">Delete</Button>
                </div>
            </div>
        </div>
    );
};
