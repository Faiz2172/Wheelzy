import React from 'react'
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

const Search = () => {
    return (
        <div className='p-2 md:p-5 bg-white rounded-md 
        md:rounded-full flex-col md:flex md:flex-row gap-10
        px-5 items-center w-[60%] '>
            <Select>
                <SelectTrigger className=" outline-none md:border-none w-full shadow-none text-lg">
                    <SelectValue placeholder="Cars" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="old">Old</SelectItem>
                </SelectContent>
            </Select>
            <Separator orientation='vertical' />

            <Select>
                <SelectTrigger className=" outline-none md:border-none w-full shadow-none text-lg">
                    <SelectValue placeholder="Cars Make" />
                </SelectTrigger>
                <SelectContent>
                    {Data.CarMakes.map((maker, index) => (
                        <SelectItem key={index} value={maker.name.toLowerCase()}>
                            {maker.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Separator orientation='vertical' />

            <Select>
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
            <div>
                <FaSearch className='text-[50px] bg-blue-400 p-3 rounded-full hover:text-white hover:scale-105 transition-all cursor-pointer' />
            </div>
        </div>
    )
}

export default Search