import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { FaSearch } from "react-icons/fa";
import Data from '@/Shared/Data';
import { useNavigate } from 'react-router-dom';
import { carListingApi } from '../services/api.js';

const Search = () => {
    const [cars, setCars] = useState();
    const [make, setMake] = useState();
    const [price, setPrice] = useState();
    const navigate = useNavigate();

    const handleSearch = async () => {
        // Build params for backend
        const params = {};
        if (cars) params.condition = cars;
        if (make) params.make = make;
        if (price) params.price = price;
        // Optionally, you can fetch results here or just navigate
        navigate(`/search?${new URLSearchParams(params).toString()}`);
    };

    return (
        <div className='p-2 md:p-5 bg-white rounded-md 
        md:rounded-full flex-col md:flex md:flex-row gap-10
        px-5 items-center w-[60%] '>
            <Select onValueChange={(value) => setCars(value)}>
                <SelectTrigger className=" outline-none md:border-none w-full shadow-none text-lg">
                    <SelectValue placeholder="Cars" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Used">Used</SelectItem>
                    <SelectItem value="Certified Pre-Owned">Certified Pre-Owned</SelectItem>
                </SelectContent>
            </Select>
            <Separator orientation='vertical' className="hidden md:block" />

            <Select onValueChange={(value) => setMake(value)}>
                <SelectTrigger className=" outline-none md:border-none w-full shadow-none text-lg">
                    <SelectValue placeholder="Cars Make" />
                </SelectTrigger>
                <SelectContent>
                    {Data.CarMakes.map((maker, index) => (
                        <SelectItem key={index} value={maker.name}>
                            {maker.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Separator orientation='vertical' className="hidden md:block" />

            <Select onValueChange={(value) => setPrice(value)}>
                <SelectTrigger className=" outline-none md:border-none w-full shadow-none text-lg">
                    <SelectValue placeholder="Pricing" />
                </SelectTrigger>
                <SelectContent>
                    {Data.Pricing.map((price) => (
                        <SelectItem key={price.id} value={price.amount}>
                            {price.amount}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <button onClick={handleSearch} style={{ background: 'none', border: 'none', padding: 0 }}>
                <FaSearch className='text-[50px] bg-blue-400 p-3 rounded-full hover:text-white hover:scale-105 transition-all cursor-pointer' />
            </button>
        </div>
    )
}

export default Search