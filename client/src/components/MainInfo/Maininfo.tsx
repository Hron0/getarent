import React from 'react'
import { Label } from '@/components/ui/label';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const Maininfo = () => {
    return (
        <div className='rounded-xl bg-slate-400 w-full h-[1000px] flex flex-col justify-center items-center relative'>
            <div className="flex flex-col w-[30%] items-center gap-12 mt-[15rem]">
                <Label className='font-bold text-[2.5rem]'>Поиск и бронирование автомобилей для путешествий</Label>
                <Link to={"/park"} className='text-white bg-blue-500 px-8 py-4 rounded-2xl text-xl'>Подобрать авто</Link>
            </div>

        </div>
    )
}

export default Maininfo