export default abstract class IValidator<TBaseType> {
  abstract validateAndThrow(object: TBaseType): Promise<void>;
}
