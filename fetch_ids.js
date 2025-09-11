// This script will run in the browser console on the deployed app
// Copy and paste this into the browser console

async function fetchFieldIds() {
  const LOCATION_ID = '3xmKQz6e0k6ij1aSfTFF';
  
  // Get the API token from the environment variables
  const API_TOKEN = import.meta.env.VITE_GHL_API_TOKEN;
  
  console.log('API Token:', API_TOKEN?.substring(0, 10) + '...');
  
  try {
    const response = await fetch(`https://services.leadconnectorhq.com/locations/${LOCATION_ID}/customFields`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Version': '2021-07-28',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('All Custom Fields:', data);
    
    // Look for quiz-related fields
    if (data.customFields) {
      console.log('\n=== QUIZ FIELDS ===');
      const quizFields = data.customFields.filter(field => 
        field.name && field.name.toLowerCase().includes('quiz')
      );
      
      quizFields.forEach(field => {
        console.log(`${field.name}: ${field.id}`);
      });
      
      // Also look for fields that might be related to our quiz answers
      console.log('\n=== POTENTIAL QUIZ FIELDS ===');
      const potentialFields = data.customFields.filter(field => {
        const name = field.name.toLowerCase();
        return name.includes('bill') || 
               name.includes('lighting') || 
               name.includes('upgrade') || 
               name.includes('home') || 
               name.includes('size') || 
               name.includes('timeline') ||
               name.includes('zip');
      });
      
      potentialFields.forEach(field => {
        console.log(`${field.name}: ${field.id}`);
      });
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchFieldIds();
