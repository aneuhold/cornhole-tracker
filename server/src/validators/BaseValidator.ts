export default abstract class IValidator<TBaseType> {
  /**
   * Validates that an object that is supposed to be inserted in to the database
   * is correct.
   */
  abstract validateNewObject(object: TBaseType): Promise<void>;

  /**
   * Validates an object that is suppposed to be updated in the database.
   */
  abstract validateUpdateObject(object: TBaseType): Promise<void>;

  /**
   * Throws a formatted message indicating the validation error and the
   * provided object which caused it.
   */
  protected throwValidationError(message: string, erroneousObject: TBaseType) {
    const errorMessage = `${message}\n${JSON.stringify(
      erroneousObject,
      null,
      2
    )}`;
    throw new Error(errorMessage);
  }
}