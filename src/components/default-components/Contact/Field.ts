interface Field {
  id: number;
  label: string;
  fullName: string;
  mobile: string;
  email: string;
  address: string;
  selectedCountry: string;
  selectedCity: string; // Add selectedCity property

  

  error?: boolean;
}

export default Field;
