import Typography from '../Typography';

export type StoreTagProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export const StoreTag = ({ title, description, icon }: StoreTagProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-1">
      <div className="w-9 h-9" aria-hidden="true" role="img">{icon}</div>
      <Typography variant="h5" className="text-dark">{title}</Typography>
      <Typography variant="bodySmall" tag="p" className="text-dark">{description}</Typography>
    </div>
  );
};
