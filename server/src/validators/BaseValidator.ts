export default abstract class IValidator<TBaseType> {
  /**
   * Validates that an object that is supposed to be inserted in to the database
   * is correct.
   */
  abstract validateNewObject(object: TBaseType): Promise<void>;

  /**
   * Validates an object that is suppposed to be updated in the database.
   *
   * At this point, the fields that do not change should already be stripped.
   */
  abstract validateUpdateObject(
    partialObject: Partial<TBaseType>
  ): Promise<void>;

  /**
   * Checks that all elements that exist in array1, exist in array2.
   */
  protected checkAllElementsExistInArr(
    array1: Array<unknown>,
    array2: Array<unknown>
  ) {
    return array1.every((value) => array2.includes(value));
  }
}
