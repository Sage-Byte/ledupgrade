// GoHighLevel API integration utilities

const GHL_API_BASE = 'https://services.leadconnectorhq.com';
const GHL_API_VERSION = '2021-07-28';

// Helper function to extract URL parameters
export function getUrlParameter(paramName: string): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(paramName);
}

// You'll need to replace this with your actual GHL API token
const GHL_API_TOKEN = import.meta.env.VITE_GHL_API_TOKEN || 'YOUR_GHL_API_TOKEN';

// You'll need to replace these with your actual location, pipeline and stage IDs
const LOCATION_ID = import.meta.env.VITE_GHL_LOCATION_ID || 'YOUR_LOCATION_ID';
const PIPELINE_ID = import.meta.env.VITE_GHL_PIPELINE_ID || 'YOUR_PIPELINE_ID';
const PIPELINE_STAGE_ID = import.meta.env.VITE_GHL_PIPELINE_STAGE_ID || 'YOUR_STAGE_ID'; // "New Lead 💡" stage

// Debug environment variables
console.log('=== GHL API Debug Info ===');
console.log('All environment variables:', import.meta.env);
console.log('VITE_GHL_API_TOKEN from import.meta.env:', import.meta.env.VITE_GHL_API_TOKEN);
console.log('VITE_GHL_LOCATION_ID from import.meta.env:', import.meta.env.VITE_GHL_LOCATION_ID);
console.log('VITE_GHL_PIPELINE_ID from import.meta.env:', import.meta.env.VITE_GHL_PIPELINE_ID);
console.log('VITE_GHL_PIPELINE_STAGE_ID from import.meta.env:', import.meta.env.VITE_GHL_PIPELINE_STAGE_ID);
console.log('API Token exists:', !!GHL_API_TOKEN);
console.log('API Token length:', GHL_API_TOKEN?.length);
console.log('API Token starts with:', GHL_API_TOKEN?.substring(0, 10) + '...');
console.log('Location ID:', LOCATION_ID);
console.log('Pipeline ID:', PIPELINE_ID);
console.log('Pipeline Stage ID:', PIPELINE_STAGE_ID);
console.log('=== End Debug Info ===');

export interface GHLContactData {
  locationId: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  source?: string;
  tags?: string[];
  address1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  companyName?: string;
  customFields?: Array<{
    id: string;
    value: string;
  }>;
}

export interface GHLOpportunityData {
  locationId: string;
  pipelineId: string;
  pipelineStageId: string;
  contactId: string;
  name: string;
  status: string;
}

export interface GHLContactResponse {
  contact: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    // ... other contact fields
  };
}

export interface GHLOpportunityResponse {
  opportunity: {
    id: string;
    name: string;
    pipelineId: string;
    pipelineStageId: string;
    contactId: string;
    status: string;
    // ... other opportunity fields
  };
}

// Create or update a contact in GHL
export async function upsertContact(contactData: GHLContactData): Promise<GHLContactResponse> {
  console.log('Making GHL Contact API call with data:', contactData);
  console.log('Using API Token:', GHL_API_TOKEN?.substring(0, 10) + '...');
  
  const response = await fetch(`${GHL_API_BASE}/contacts/upsert`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GHL_API_TOKEN}`,
      'Version': GHL_API_VERSION,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contactData),
  });

  console.log('GHL Contact API Response Status:', response.status);
  console.log('GHL Contact API Response Headers:', Object.fromEntries(response.headers.entries()));

  if (!response.ok) {
    const errorText = await response.text();
    console.error('GHL Contact API Error Details:', {
      status: response.status,
      statusText: response.statusText,
      errorText: errorText,
      url: `${GHL_API_BASE}/contacts/upsert`,
      headers: {
        'Authorization': `Bearer ${GHL_API_TOKEN?.substring(0, 10)}...`,
        'Version': GHL_API_VERSION,
        'Content-Type': 'application/json',
      }
    });
    throw new Error(`GHL Contact API Error: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  console.log('GHL Contact API Success:', result);
  return result;
}

// Create an opportunity in GHL
export async function createOpportunity(opportunityData: GHLOpportunityData): Promise<GHLOpportunityResponse> {
  console.log('Making GHL Opportunity API call with data:', opportunityData);
  
  const response = await fetch(`${GHL_API_BASE}/opportunities/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GHL_API_TOKEN}`,
      'Version': GHL_API_VERSION,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(opportunityData),
  });

  console.log('GHL Opportunity API Response Status:', response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('GHL Opportunity API Error Details:', {
      status: response.status,
      statusText: response.statusText,
      errorText: errorText,
      url: `${GHL_API_BASE}/opportunities/`,
    });
    throw new Error(`GHL Opportunity API Error: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  console.log('GHL Opportunity API Success:', result);
  return result;
}

// Helper function to create contact data from form and quiz answers
export function createContactData(
  formData: {
    name: string;
    email: string;
    phone: string;
    zip: string;
  },
  quizAnswers: any,
  homeownerValue?: string,
  adId?: string
): GHLContactData {
  console.log('=== createContactData Debug ===');
  console.log('formData:', formData);
  console.log('quizAnswers:', quizAnswers);
  console.log('homeownerValue:', homeownerValue);
  console.log('adId:', adId);
  
  const [firstName, ...lastNameParts] = formData.name.trim().split(' ');
  const lastName = lastNameParts.join(' ') || '';

  // Create custom fields for quiz answers
  const customFields: Array<{ id: string; value: string }> = [];

  // Add ad_id from URL parameters
  if (adId) {
    customFields.push({
      id: 'ad_id', // You'll need to create this custom field in GHL
      value: adId
    });
  }

  // Add homeowner status
  if (homeownerValue) {
    customFields.push({
      id: 'homeowner', // You'll need to create this custom field in GHL
      value: homeownerValue
    });
  }

  // Add quiz answers as custom fields
  if (quizAnswers) {
    console.log('=== Processing Quiz Answers ===');
    console.log('quizAnswers.billRange:', quizAnswers.billRange, 'type:', typeof quizAnswers.billRange);
    console.log('quizAnswers.currentLighting:', quizAnswers.currentLighting, 'type:', typeof quizAnswers.currentLighting);
    console.log('quizAnswers.upgradeAreas:', quizAnswers.upgradeAreas, 'type:', typeof quizAnswers.upgradeAreas);
    console.log('quizAnswers.homeSize:', quizAnswers.homeSize, 'type:', typeof quizAnswers.homeSize);
    console.log('quizAnswers.sqFtDetail:', quizAnswers.sqFtDetail, 'type:', typeof quizAnswers.sqFtDetail);
    console.log('quizAnswers.timeline:', quizAnswers.timeline, 'type:', typeof quizAnswers.timeline);
    console.log('quizAnswers.zip:', quizAnswers.zip, 'type:', typeof quizAnswers.zip);
    
    if (quizAnswers.billRange && quizAnswers.billRange.trim() !== '') {
      console.log('Adding quiz_billRange:', quizAnswers.billRange);
      customFields.push({
        id: 'quiz_billRange', // GHL custom field ID (lowercase)
        value: quizAnswers.billRange
      });
    }
    if (quizAnswers.currentLighting && quizAnswers.currentLighting.trim() !== '') {
      console.log('Adding quiz_currentLighting:', quizAnswers.currentLighting);
      customFields.push({
        id: 'quiz_currentLighting', // GHL custom field ID (lowercase)
        value: quizAnswers.currentLighting
      });
    }
    if (quizAnswers.upgradeAreas && Array.isArray(quizAnswers.upgradeAreas) && quizAnswers.upgradeAreas.length > 0) {
      console.log('Adding quiz_upgradeAreas:', quizAnswers.upgradeAreas);
      customFields.push({
        id: 'quiz_upgradeAreas', // GHL custom field ID (lowercase)
        value: quizAnswers.upgradeAreas.join(', ')
      });
    }
    if (quizAnswers.homeSize && quizAnswers.homeSize.trim() !== '') {
      console.log('Adding quiz_homeSize:', quizAnswers.homeSize);
      customFields.push({
        id: 'quiz_homeSize', // GHL custom field ID (lowercase)
        value: quizAnswers.homeSize
      });
    }
    if (quizAnswers.sqFtDetail && quizAnswers.sqFtDetail.trim() !== '') {
      console.log('Adding quiz_sqFtDetail:', quizAnswers.sqFtDetail);
      customFields.push({
        id: 'quiz_sqFtDetail', // GHL custom field ID (lowercase)
        value: quizAnswers.sqFtDetail
      });
    }
    if (quizAnswers.timeline && quizAnswers.timeline.trim() !== '') {
      console.log('Adding quiz_timeline:', quizAnswers.timeline);
      customFields.push({
        id: 'quiz_timeline', // GHL custom field ID (lowercase)
        value: quizAnswers.timeline
      });
    }
    if (quizAnswers.zip && quizAnswers.zip.trim() !== '') {
      console.log('Adding quiz_zip:', quizAnswers.zip);
      customFields.push({
        id: 'quiz_zip', // GHL custom field ID (lowercase)
        value: quizAnswers.zip
      });
    }
    console.log('=== End Quiz Answers Processing ===');
  }

  const contactData = {
    locationId: LOCATION_ID,
    firstName,
    lastName,
    email: formData.email,
    phone: formData.phone,
    source: 'LED Savings Calculator',
    tags: ['LED Lead', 'Website', 'Calculator'],
    postalCode: formData.zip,
    country: 'US', // Assuming US based on the context
    customFields: customFields.length > 0 ? customFields : undefined,
  };
  
  console.log('=== Final Contact Data ===');
  console.log('customFields created:', customFields);
  console.log('contactData.customFields:', contactData.customFields);
  console.log('=== End Debug ===');
  
  return contactData;
}

// Helper function to create opportunity data
export function createOpportunityData(
  contactId: string,
  contactName: string
): GHLOpportunityData {
  return {
    locationId: LOCATION_ID,
    pipelineId: PIPELINE_ID,
    pipelineStageId: PIPELINE_STAGE_ID,
    contactId,
    name: `${contactName} - LED Savings Lead`,
    status: 'open',
  };
}
