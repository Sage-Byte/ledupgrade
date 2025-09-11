import fetch from 'node-fetch';

async function getCustomFields() {
  // Using the same values as in ghlApi.ts
  const LOCATION_ID = '3xmKQz6e0k6ij1aSfTFF'; // From the contact response
  const API_TOKEN = 'pit-c8aaff...'; // Partial token from the logs
  
  console.log('Using LOCATION_ID:', LOCATION_ID);
  console.log('Note: Using partial API token - this may not work. Please provide the full token.');

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
    console.log('Custom Fields from GHL:');
    console.log(JSON.stringify(data, null, 2));
    
    // Look for quiz-related fields
    console.log('\n=== Quiz-related fields ===');
    if (data.customFields) {
      data.customFields.forEach(field => {
        if (field.name && field.name.toLowerCase().includes('quiz')) {
          console.log(`Name: ${field.name}`);
          console.log(`ID: ${field.id}`);
          console.log(`Type: ${field.type}`);
          console.log('---');
        }
      });
    }
    
  } catch (error) {
    console.error('Error fetching custom fields:', error);
  }
}

getCustomFields();
