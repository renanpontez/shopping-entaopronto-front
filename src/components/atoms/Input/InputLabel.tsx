export type InputLabelProps = {
  label?: string;
  elementId?: string;
};

export const InputLabel = ({ label, elementId }: InputLabelProps) => {
  return label && (
    <label htmlFor={elementId} className="ml-3 block text-dark text-sm font-normal">{label}</label>
  );
};
