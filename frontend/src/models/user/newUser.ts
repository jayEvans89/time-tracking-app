
export interface NewUser {
  user: NewUserDetails;
  company: NewCompany;
}

export interface NewUserValidationData {
  user: NewUserDetails;
  companyDetails: NewCompanyDetails;
  companyAddress: NewCompanyAddress;
}

export interface NewUserDetails {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface NewCompanyDetails {
  name: string;
  contact_number: string;
  contact_email: string;
  business_type: string;
}

export interface NewCompanyAddress {
  address: string;
  town_city: string;
  county: string;
  postcode: string;
}

export interface NewCompany extends NewCompanyDetails {
  address: NewCompanyAddress;
}
