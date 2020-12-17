
export default interface InputValidationResponse extends Vue {
  validate(): {
    /** Whether the input is valid */
    valid: boolean;

    /** The type of the input */
    type: string;

    /** The value of the input */
    value: string | number;
  };
}
