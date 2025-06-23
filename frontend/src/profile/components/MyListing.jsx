import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { firebaseService } from '../../services/firebaseService.js';
import { useUser } from '@clerk/clerk-react';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ListingCard from './Listingcard.jsx';

function MyListing() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    async function fetchUserListings() {
      if (!user?.primaryEmailAddress?.emailAddress) return;

      try {
        setLoading(true);
        setError(null);
        
        // Fetch listings where email matches the current user's email
        const userListings = await firebaseService.getCarListingsByEmail(user.primaryEmailAddress.emailAddress);
        setListings(userListings);
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError("Failed to load your listings. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchUserListings();
  }, [user]);

  const handleDeleteListing = async (listingId) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await firebaseService.deleteCarListing(listingId);
        // Remove the deleted listing from state
        setListings(listings.filter(listing => listing.id !== listingId));
      } catch (err) {
        console.error("Error deleting listing:", err);
        setError("Failed to delete listing. Please try again.");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-bold text-2xl dark:text-white">My Listings</h2>
        <Link to="/add-listing">
          <Button className="bg-primary hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700">
            + Add New Listing
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary dark:text-blue-400" />
        </div>
      ) : error ? (
        <Alert variant="destructive" className="my-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : listings.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">No listings found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">You haven't created any car listings yet.</p>
          <Link to="/add-listing">
            <Button className="bg-primary hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700">
              Create Your First Listing
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingCard 
              key={listing.id} 
              listing={listing} 
              onDelete={() => handleDeleteListing(listing.id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
}




export default MyListing;