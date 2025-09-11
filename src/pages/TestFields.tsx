import { useEffect } from 'react';
import { getCustomFieldIds } from '@/utils/ghlApi';

const TestFields = () => {
  useEffect(() => {
    // Automatically fetch custom field IDs when the page loads
    getCustomFieldIds();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Fetching Custom Field IDs...</h1>
      <p>Check the browser console for the field IDs.</p>
      <p>This page will automatically fetch all custom fields from your GHL account.</p>
    </div>
  );
};

export default TestFields;
