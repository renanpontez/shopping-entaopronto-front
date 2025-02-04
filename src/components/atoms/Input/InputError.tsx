export type InputErrorProps = {
  isInvalid?: boolean;
};

export const InputError = ({ isInvalid }: InputErrorProps) => {
  return isInvalid && (
    <div className="ml-3 mt-0.5 text-error italic text-xs">campo inválido ou incompleto</div>
  );
};
