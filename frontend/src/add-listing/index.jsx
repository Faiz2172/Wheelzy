import Header from '@/components/Header';
import React, { useState, useEffect } from 'react';
import carDetails from '../Shared/carDetails.json';
import InputField from './components/InputField';
import DropDownField from './components/DropDownField';
import TextAreaField from './components/TextAreaField';
import { Separator } from '@/components/ui/separator';
import features from '../Shared/features.json';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import CarImagesUpload from './components/CarImagesUpload';
import { firebaseService } from '../services/firebaseService.js';
import { storageService } from '../services/storageServices.js';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { carListingApi, carImageApi } from '../services/api.js';

function AddListing() {
  const [formData, setFormData] = useState({
    email: '', // Add email to formData
  });
  const [carImages, setCarImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (files) => {
    setCarImages(files);
  };

  const validateForm = () => {
    // Add email validation
    if (!formData.email || !formData.email.includes('@')) {
      return 'Please enter a valid email address';
    }

    const requiredFields = carDetails.carDetails.filter((item) => item.required).map((item) => item.name);
    for (const field of requiredFields) {
      if (!formData[field]) {
        return `Please fill in the required field: ${field}`;
      }
    }
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Validate form data
      const validationError = validateForm();
      if (validationError) {
        throw new Error(validationError);
      }

      // Prepare the listing data with email
      const listingData = {
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Save the listing to Neon database
      const response = await carListingApi.createCarListing(listingData);
      const carListing = response.data.data;

      // Upload image URLs to backend if any
      if (carImages.length > 0) {
        // For now, only support uploading image URLs (not files)
        // If you want to support file uploads, backend changes are needed
        const imageUrls = carImages.map(file => file.url || file);
        await carImageApi.addCarImages(carListing.id, imageUrls);
      }

      setSubmitMessage('Car listing saved successfully!');
      setFormData({ email: '' }); // Reset form but keep email field initialized
      setCarImages([]); // Reset images
    } catch (error) {
      setSubmitMessage(`Error: ${error.message}`);
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Header />
      <div className='px-10 md:px-20 my-10'>
        <h2 className='text-4xl font-bold'>Add New Listing</h2>
        <form className='p-10 border-2 rounded-xl mt-10' onSubmit={onSubmit}>
          {/* User Email */}
          <div className="mb-6">
            <h2 className='font-medium text-xl mb-6'>Contact Information</h2>
            <div className="max-w-md">
              <Label htmlFor="email" className="text-sm">
                Email Address <span className='text-red-700'>*</span>
              </Label>
              <Input 
                id="email"
                type="email" 
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
                className="mt-1"
                required
              />
            </div>
          </div>

          <Separator className='my-6' />

          {/* Car details */}
          <div>
            <h2 className='font-medium text-xl mb-6'>Car details</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-5'>
              {carDetails.carDetails.map((item, index) => (
                <div key={index}>
                  <label className='text-sm'>
                    {item?.label} {item.required && <span className='text-red-700'>*</span>}
                  </label>
                  {item.fieldType === 'text' || item.fieldType === 'number' ? (
                    <InputField item={item} handleInputChange={handleInputChange} />
                  ) : item.fieldType === 'dropdown' ? (
                    <DropDownField item={item} handleInputChange={handleInputChange} />
                  ) : item.fieldType === 'textarea' ? (
                    <TextAreaField item={item} handleInputChange={handleInputChange} />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <Separator className='my-6' />

          {/* Features List */}
          <div>
            <h2 className='font-md text-xl my-6'>Features</h2>
            <div className='grid grid-cols-2 md:grid-cols-3'>
              {features.features.map((item, index) => (
                <div className='flex items-center gap-3' key={index}>
                  <Checkbox onCheckedChange={(value) => handleInputChange(item.name, value)} />
                  <h2>{item.label}</h2>
                </div>
              ))}
            </div>
          </div>
          <Separator className='my-6' />

          {/* Car Images Section */}
          <CarImagesUpload handleImageChange={handleImageChange} />

          {/* Submission feedback */}
          {submitMessage && (
            <div
              className={`mt-4 p-3 rounded ${
                submitMessage.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}
            >
              {submitMessage}
            </div>
          )}

          {/* Submit button */}
          <div className='mt-10 flex justify-end'>
            <Button type='submit' disabled={isSubmitting} className='justify-end'>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddListing;