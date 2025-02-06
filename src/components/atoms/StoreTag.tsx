import Typography from '../Typography';

export type StoreTagProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export const StoreTag = ({ title, description, icon }: StoreTagProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-1">
      <div className="w-7.5 h-7.5" aria-hidden="true" role="img">{icon}</div>
      <Typography variant="h5" className="text-dark">{title}</Typography>
      <Typography variant="bodySmall" tag="p" className="text-dark max-w-36">{description}</Typography>
    </div>
  );
};
