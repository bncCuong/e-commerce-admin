import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCreative, Keyboard } from 'swiper';

import { Button } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import axios from 'axios';

export const Card = ({
    name,
    price,
    description,
    _id,
    images,
    upLoadPage,
    existingImages,
    existingPrice,
    existingName,
    existingDescription,
    fetchProduct,
}: ProductType) => {

    const deleteProduct = async () => {
        await axios.delete('/api/products?id=' + _id);
        if (fetchProduct) fetchProduct();
    };

    return (
        <div className="group object-cover cursor-pointer border-2 relative w-[350px] h-[450px] ml-[10px] rounded-2xl p-2 bg-white shadow-lg inline-flex  flex-col justify-between my-4 hover:scale-105 hover:shadow-2xl animation duration-500 ">
            <div className="absolute top-8 left-0 flex w-full hover:scale-105 animation duration-200  ">
                <Swiper
                    grabCursor={true}
                    effect={'creative'}
                    keyboard={{
                        enabled: true,
                    }}
                    creativeEffect={{
                        prev: {
                            shadow: true,
                            translate: [0, 0, -500],
                        },
                        next: {
                            translate: ['100%', 0, 0],
                        },
                    }}
                    className="w-[100%] h-[280px]"
                    navigation={true}
                    modules={[Pagination, Navigation, EffectCreative, Keyboard]}
                    slidesPerView={1}
                    loop={true}
                    pagination={{ clickable: true }}
                >
                    {existingImages ? (
                        <>
                            {existingImages?.map((image) => (
                                <SwiperSlide key={image}>
                                    <Image src={image as string} className=" object-contain max-h-[280px] w-full " alt="priduct photo" width={10000} height={1} />
                                </SwiperSlide>
                            ))}
                        </>
                    ) : (
                        <>
                            {images?.map((image) => (
                                <SwiperSlide key={image}>
                                    <Image src={image as string} className=" object-contain max-h-[280px] w-[100%] " alt="priduct photo" width={100000} height={1} />
                                </SwiperSlide>
                            ))}
                        </>
                    )}
                </Swiper>
            </div>
            <div className=" absolute -top-0.5 -left-1.5 h-8 w-24 rounded-tl-lg bg-red-600 px-2 py-1 flex items-center justify-center rounded-r-2xl ">
                <p className="absolute w-1.5 h-1.5 bg-red-700 -left-0 top-8 rounded-b" />
                <p className="text-white font-semibold text-xs">Sell off 10%</p>
            </div>

            <div className="absolute bg-[#f5f5f7] rounded-3xl flex items-center justify-center py-2 px-6 left-[24%]  top-[60%] opacity-0 group-hover:animate-movetop z-50">
                <p className="font-semibold">Take a closer look</p>
            </div>
            <div className="absolute bottom-2 ">
                <div>{existingName ? existingName : name}</div>
                <div>{existingPrice ? existingPrice : price}$</div>
                <div>{existingDescription ? existingDescription : description}</div>
                {!upLoadPage && (
                    <div className={`flex gap-4 `}>
                        <Link href={' /products/edit/' + _id} className="inline-flex">
                            <Button type="button">Edit</Button>
                        </Link>
                        <Button onClick={deleteProduct} type="button">
                            Delete
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
