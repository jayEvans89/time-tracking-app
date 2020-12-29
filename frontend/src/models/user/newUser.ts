import { InputFormData } from '../form/formData';

export interface NewUser {
  user: string | InputFormData;
  company: {
      address: string | InputFormData;
  };
}
