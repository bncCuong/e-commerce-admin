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
        <div className=" object-cover cursor-pointer border-2 relative w-[300px] h-[400px]  rounded-lg p-2 bg-white shadow-lg inline-flex  flex-col justify-between my-4">
            <div className="absolute top-8 left-0 flex  w-full hover:scale-105 animation duration-200  ">
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
                    className="w-[280px]"
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
                                    <Image src={image as string} alt="priduct photo" width={500} height={500} />
                                </SwiperSlide>
                            ))}
                        </>
                    ) : (
                        <>
                            {images?.map((image) => (
                                <SwiperSlide key={image}>
                                    <Image src={image as string} alt="priduct photo" width={500} height={500} />
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
            <div className="absolute bottom-2 right-2">
                <div>name: {existingName ? existingName : name}</div>
                <div>price: {existingPrice ? existingPrice : price}</div>
                <div>infomation: {existingDescription ? existingDescription : description}</div>
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
