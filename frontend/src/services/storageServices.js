export const storageService = {
    uploadCarImage,
  };
  
  async function uploadCarImage(file, carId, retries = 2) {
    const cloudName = 'dyn6w0d6c'; // Replace with your Cloudinary cloud name
    const uploadPreset = 'car_uploads'; // Replace with your Cloudinary unsigned upload preset
  
    try {
      // Validate file size (max 10MB for Cloudinary free tier)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        throw new Error('Image file size exceeds 10MB limit');
      }
  
      // Create FormData for Cloudinary upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('folder', `carImages/${carId}`);
      formData.append('public_id', `${carId}_${Date.now()}`);
  
      // Attempt upload with retries
      let attempt = 0;
      while (attempt <= retries) {
        try {
          const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData,
          });
  
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to upload image: ${errorData.error?.message || 'Unknown error'}`);
          }
  
          const data = await response.json();
          return data.secure_url;
        } catch (error) {
          if (attempt === retries) {
            throw error;
          }
          attempt++;
          await new Promise((resolve) => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
        }
      }
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw error;
    }
  }