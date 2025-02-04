import type { InputErrorProps } from './InputError';
import type { InputFieldProps } from './InputField';
import type { InputLabelProps } from './InputLabel';
import { InputError } from './InputError';
import { InputField } from './InputField';
import { InputLabel } from './InputLabel';

export const Input = {
  Field: InputField as React.FC<InputFieldProps>,
  Label: InputLabel as React.FC<InputLabelProps>,
  Error: InputError as React.FC<InputErrorProps>,
};
