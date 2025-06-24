import Header from '@/components/Header'
import Search from '@/components/Search'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../firebase.js' // Adjust path based on your project structure
import CarItem from '../../components/CarItem.jsx' // Import the CarItem component

function SearchByCategory() {
  const { category } = useParams();
  const [carList, setCarList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch car data when component mounts or category changes
    fetchCarsByCategory();
  }, [category]);

  const fetchCarsByCategory = async () => {
    try {
      setLoading(true);
      
      // Create a query against the 'cars' collection (adjust collection name if needed)
      const carsRef = collection(db, 'carListings');
      const q = query(carsRef, where('category', '==', category));
      
      const querySnapshot = await getDocs(q);
      
      const cars = [];
      querySnapshot.forEach((doc) => {
        cars.push({ id: doc.id, ...doc.data() });
      });
      
      setCarList(cars);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Header/>
      <div className='p-10 lg:p-20 flex items-center bg-blue-900 justify-center'>
        <Search/>
      </div>
      <div>
        <h2 className='text-4xl flex justify-center p-8 md:p-10 font-bold items-center'>{category}</h2>
        
        {loading ? (
          <div className='flex justify-center items-center py-20'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8 md:px-16 lg:px-20 pb-16'>
            {carList.length > 0 ? (
              carList.map((car) => (
                <CarItem key={car.id} car={car} />
              ))
            ) : (
              <div className='col-span-full text-center py-10'>
                <p className='text-xl text-gray-500'>No cars found in the {category} category.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchByCategory