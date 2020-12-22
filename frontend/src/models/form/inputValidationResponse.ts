import { InputFormData } from './formData'

export interface InputValidationResponse extends Vue {
  validate(): {
    /** Whether the input is valid */
    valid: boolean;

    /** The type of the input */
    type: string;

    /** The value of the input */
    value: string | number;
  };
}

export interface ParentValidationResponse extends Vue {
  validate(parent: boolean): {
    /** Whether the Fomr section is valid */
    valid: boolean;

    /** The page of the section */
    page: number;

    /** The values of the section */
    data: InputFormData;

    /** The type of form section */
    type: string;
  };
}
