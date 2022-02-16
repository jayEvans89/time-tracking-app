
export interface FormResponse<T> {
  /** Whether the form is valid */
  valid: boolean;

  /** The form data */
  data: T | null
}
