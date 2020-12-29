import { InputFormData } from './formData'
import { DefineComponent } from 'vue'

export interface InputValidationResponse extends DefineComponent {
  validate(): {
    /** Whether the input is valid */
    valid: boolean;

    /** The type of the input */
    type: string;

    /** The value of the input */
    value: string | number;
  };
}

export interface ParentValidationResponse extends DefineComponent {
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
