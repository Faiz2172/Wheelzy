import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase' // Adjust path based on your project structure
import Header from '@/components/Header'
import CarItem from '@/components/CarItem'
import Search from '@/components/Search'

const SearchByOptions = () => {
    const [searchParams] = useSearchParams();
    const cars = searchParams.get('cars');
    const make = searchParams.get('make');
    const price = searchParams.get('price');
    
    const [carList, setCarList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFilteredCars();
    }, [cars, make, price]);

    const fetchFilteredCars = async () => {
        try {
            setLoading(true);
            
            // Create a reference to the cars collection
            const carsRef = collection(db, 'carListings');
            
            // Start with a basic query
            let baseQuery = query(carsRef);
            
            // Store conditions to apply
            const conditions = [];
            
            // We'll need to do some filtering in JavaScript for multiple conditions
            // since Firestore doesn't support OR operations across fields in a single query
            
            // Get all cars first if there are multiple filters
            const querySnapshot = await getDocs(baseQuery);
            
            let filteredCars = [];
            
            // Convert snapshot to array
            querySnapshot.forEach((doc) => {
                filteredCars.push({ id: doc.id, ...doc.data() });
            });
            
            // Apply JavaScript filtering based on the search parameters
            if (cars) {
                filteredCars = filteredCars.filter(car => 
                    car.condition && car.condition.toLowerCase() === cars.toLowerCase()
                );
            }
            
            if (make) {
                filteredCars = filteredCars.filter(car => 
                    car.make && car.make.toLowerCase() === make.toLowerCase()
                );
            }
            
            if (price) {
                // Remove any non-numeric characters and convert to number
                const priceValue = Number(price.replace(/[^0-9.]/g, ''));
                if (!isNaN(priceValue)) {
                    filteredCars = filteredCars.filter(car => {
                        // Since sellingPrice is stored as a string in your database
                        const carPrice = Number(car.sellingPrice);
                        return !isNaN(carPrice) && carPrice <= priceValue;
                    });
                }
            }
            
            setCarList(filteredCars);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching cars:", error);
            setLoading(false);
        }
    };

    // Function to create a filter summary string
    const getFilterSummary = () => {
        const filters = [];
        if (cars) filters.push(cars);
        if (make) filters.push(make.charAt(0).toUpperCase() + make.slice(1));
        if (price) filters.push(`Under ${price}`);
        
        if (filters.length === 0) return "All Cars";
        return filters.join(" • ");
    };

    // Check if any filters are applied
    const hasFilters = !!(cars || make || price);

    return (
        <div>
            <Header />
            <div className='p-10 lg:p-20 flex items-center bg-blue-900 justify-center'>
                <Search />
            </div>
            
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">{getFilterSummary()}</h1>
                
                {loading ? (
                    <div className='flex justify-center items-center py-20'>
                        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
                    </div>
                ) : (
                    <div>
                        {!hasFilters ? (
                            <div className="text-center py-10">
                                <p className="text-xl text-gray-500">Please select search criteria and click the search button.</p>
                            </div>
                        ) : carList.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-xl text-gray-500">No cars match your search criteria.</p>
                                <p className="mt-2 text-gray-500">Try adjusting your filters for more results.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {carList.map((car) => (
                                    <CarItem key={car.id} car={car} />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchByOptions