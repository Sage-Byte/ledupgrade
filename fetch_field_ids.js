import fetch from 'node-fetch';

async function fetchCustomFieldIds() {
  // Using the same values as in the deployed app
  const LOCATION_ID = '3xmKQz6e0k6ij1aSfTFF';
  const API_TOKEN = 'pit-c8aaff...'; // This is partial, need to get the full token
  
  console.log('Fetching custom fields from GHL...');
  console.log('Location ID:', LOCATION_ID);
  
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
      console.error(`HTTP error! status: ${response.status}`);
      console.error('Response:', await response.text());
      return;
    }

    const data = await response.json();
    console.log('\n=== ALL CUSTOM FIELDS ===');
    console.log(JSON.stringify(data, null, 2));
    
    // Look for quiz-related fields
    if (data.customFields) {
      console.log('\n=== QUIZ-RELATED FIELDS ===');
      const quizFields = data.customFields.filter(field => 
        field.name && field.name.toLowerCase().includes('quiz')
      );
      
      quizFields.forEach(field => {
        console.log(`Name: ${field.name}`);
        console.log(`ID: ${field.id}`);
        console.log(`Type: ${field.type}`);
        console.log('---');
      });
      
      // Also look for fields that might be related to our quiz answers
      console.log('\n=== POTENTIAL QUIZ FIELDS (by name matching) ===');
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
        console.log(`Name: ${field.name}`);
        console.log(`ID: ${field.id}`);
        console.log(`Type: ${field.type}`);
        console.log('---');
      });
    }
    
  } catch (error) {
    console.error('Error fetching custom fields:', error);
  }
}

fetchCustomFieldIds();
