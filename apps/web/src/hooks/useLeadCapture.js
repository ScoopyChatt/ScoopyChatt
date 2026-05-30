import { useState } from 'react';
import pb from '@/lib/pocketbaseClient.js';
import { toast } from 'sonner';

export function useLeadCapture() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLeadCaptured, setIsLeadCaptured] = useState(false);
  const [leadData, setLeadData] = useState(null);

  const submitLead = async (data) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Filter data to only include the 4 requested fields
      const cleanData = {
        name: data.name || '',
        phone: data.phone || '',
        zipCode: data.zipCode || '',
        numberOfDogs: data.numberOfDogs ? parseInt(data.numberOfDogs, 10) : 1,
      };

      // Create lead in PocketBase (using quote_requests collection as it matches the schema fields for dogs/zip)
      // Providing default values for required fields that are no longer in the form
      const record = await pb.collection('quote_requests').create({
        name: cleanData.name,
        phone: cleanData.phone,
        email: `${cleanData.phone.replace(/\D/g, '')}@placeholder.com`, // Fallback email since it's required
        serviceZipCode: cleanData.zipCode,
        serviceType: 'TBD', // Default since it was removed from form but is required in DB
        numberOfDogs: cleanData.numberOfDogs,
        additionalNotes: `Zip Code: ${cleanData.zipCode}` 
      }, { $autoCancel: false });
      
      setLeadData(record);
      setIsLeadCaptured(true);
      toast.success("Thanks! Our staff will contact you to schedule your service day.");
      return true;
    } catch (err) {
      console.error('Lead capture error:', err);
      const errorMessage = err.response?.message || err.message || "Failed to submit. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    leadData, 
    isLoading, 
    error, 
    submitLead, 
    isLeadCaptured 
  };
}