import React, { useState } from 'react';

function CarImagesUpload({ handleImageChange }) {
  const [error, setError] = useState('');
  const [previews, setPreviews] = useState([]);
  const maxImages = 5;
  const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Validate number of images
    if (files.length > maxImages) {
      setError(`You can upload a maximum of ${maxImages} images`);
      return;
    }

    // Validate file types
    const invalidFiles = files.filter((file) => !validImageTypes.includes(file.type));
    if (invalidFiles.length > 0) {
      setError('Only JPEG, PNG, and GIF images are allowed');
      return;
    }

    // Generate previews
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
    setError('');
    handleImageChange(files);
  };

  return (
    <div className='my-6'>
      <h2 className='font-medium text-xl mb-4'>Upload Car Images</h2>
      <div className='border-2 border-dashed p-4 rounded-lg'>
        <input
          type='file'
          accept='image/jpeg,image/png,image/gif'
          multiple
          onChange={handleFileChange}
          className='block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100'
        />
        <p className='text-sm text-gray-500 mt-2'>Upload up to {maxImages} images (JPEG, PNG, or GIF only)</p>
        {error && <p className='text-red-700 text-sm mt-2'>{error}</p>}
        {previews.length > 0 && (
          <div className='mt-4 grid grid-cols-3 gap-2'>
            {previews.map((url, index) => (
              <img key={index} src={url} alt={`Preview ${index}`} className='w-full h-24 object-cover rounded' />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CarImagesUpload;