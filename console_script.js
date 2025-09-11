// Copy and paste this into the browser console on the deployed app
// This will fetch all custom field IDs from your GHL account

async function fetchAllFieldIds() {
  const LOCATION_ID = '3xmKQz6e0k6ij1aSfTFF';
  
  try {
    const response = await fetch(`https://services.leadconnectorhq.com/locations/${LOCATION_ID}/customFields`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer pit-c8aaff...', // This won't work, need full token
        'Version': '2021-07-28',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('=== ALL CUSTOM FIELDS ===');
    console.log(data);
    
    if (data.customFields) {
      console.log('\n=== QUIZ FIELDS ===');
      const quizFields = data.customFields.filter(field => 
        field.name && field.name.toLowerCase().includes('quiz')
      );
      
      quizFields.forEach(field => {
        console.log(`${field.name}: ${field.id}`);
      });
      
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

fetchAllFieldIds();
