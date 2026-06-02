import { FaInstagram, FaLocationDot } from 'react-icons/fa6';
import { MdOutlineMail, MdOutlinePhoneAndroid } from 'react-icons/md';
import Typography from '@/components/Typography';

type ContactInfoProps = {
  email?: string;
  phone?: string;
  address?: string;
  instagram?: string;
};

export const ContactInfo = ({
  email,
  phone,
  address,
  instagram,
}: ContactInfoProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="h3" className="text-grayDark pb-1">CONTATO</Typography>
      {address && (
        <span className="flex gap-2 items-center">
          <FaLocationDot color="#FF9100" aria-label="Location icon" role="img" aria-hidden="false" />
          <Typography className="text-grayDark" variant="body" tag="p">{address}</Typography>
        </span>
      )}
      {phone && (
        <span className="flex gap-2 items-center">
          <MdOutlinePhoneAndroid color="#FF9100" aria-label="Phone icon" role="img" aria-hidden="false" />
          <Typography className="text-grayDark" variant="body" tag="p">{phone}</Typography>
        </span>
      )}
      {email && (
        <span className="flex gap-2 items-center">
          <MdOutlineMail color="#FF9100" aria-label="Email icon" role="img" aria-hidden="false" />
          <Typography className="text-grayDark" variant="body" tag="p">{email}</Typography>
        </span>
      )}
      {instagram && (
        <span className="flex gap-2 items-center">
          <FaInstagram color="#FF9100" aria-label="Instagram icon" role="img" aria-hidden="false" />
          <Typography className="text-grayDark" variant="body" tag="p">{instagram}</Typography>
        </span>
      )}
    </div>
  );
};
