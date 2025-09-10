// GoHighLevel API integration utilities

const GHL_API_BASE = 'https://services.leadconnectorhq.com';
const GHL_API_VERSION = '2021-07-28';

// Helper function to extract URL parameters
export function getUrlParameter(paramName: string): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(paramName);
}

// You'll need to replace this with your actual GHL API token
const GHL_API_TOKEN = process.env.VITE_GHL_API_TOKEN || 'YOUR_GHL_API_TOKEN';

// You'll need to replace these with your actual location, pipeline and stage IDs
const LOCATION_ID = process.env.VITE_GHL_LOCATION_ID || 'YOUR_LOCATION_ID';
const PIPELINE_ID = process.env.VITE_GHL_PIPELINE_ID || 'YOUR_PIPELINE_ID';
const PIPELINE_STAGE_ID = process.env.VITE_GHL_PIPELINE_STAGE_ID || 'YOUR_STAGE_ID'; // "New Lead 💡" stage

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
  const response = await fetch(`${GHL_API_BASE}/contacts/upsert`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GHL_API_TOKEN}`,
      'Version': GHL_API_VERSION,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contactData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GHL Contact API Error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

// Create an opportunity in GHL
export async function createOpportunity(opportunityData: GHLOpportunityData): Promise<GHLOpportunityResponse> {
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

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GHL Opportunity API Error: ${response.status} - ${errorText}`);
  }

  return response.json();
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
    if (quizAnswers.billRange) {
      customFields.push({
        id: 'quiz_billRange', // You'll need to create this custom field in GHL
        value: quizAnswers.billRange
      });
    }
    if (quizAnswers.currentLighting) {
      customFields.push({
        id: 'quiz_currentLighting', // You'll need to create this custom field in GHL
        value: quizAnswers.currentLighting
      });
    }
    if (quizAnswers.upgradeAreas && quizAnswers.upgradeAreas.length > 0) {
      customFields.push({
        id: 'quiz_upgradeAreas', // You'll need to create this custom field in GHL
        value: quizAnswers.upgradeAreas.join(', ')
      });
    }
    if (quizAnswers.homeSize) {
      customFields.push({
        id: 'quiz_homeSize', // You'll need to create this custom field in GHL
        value: quizAnswers.homeSize
      });
    }
    if (quizAnswers.sqFtDetail) {
      customFields.push({
        id: 'quiz_sqFtDetail', // You'll need to create this custom field in GHL
        value: quizAnswers.sqFtDetail
      });
    }
    if (quizAnswers.timeline) {
      customFields.push({
        id: 'quiz_timeline', // You'll need to create this custom field in GHL
        value: quizAnswers.timeline
      });
    }
  }

  return {
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
