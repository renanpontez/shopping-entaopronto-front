import Typography from '@/components/Typography';
import { FaInstagram, FaLocationDot } from 'react-icons/fa6';
import { MdOutlineMail, MdOutlinePhoneAndroid } from 'react-icons/md';

// type ContactInfoProps = {
//   email?: string;
//   phone: string;
//   address: string;
//   instagram?: string;
// };

export const ContactInfo = () => {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="h3" className="text-grayDark pb-1">CONTATO</Typography>
      <span className="flex gap-2 items-center">
        <FaLocationDot color="#FF9100" aria-label="Location icon" role="img" aria-hidden="false" />
        <Typography className="text-grayDark" variant="body" tag="p">Av. Treze de Maio, 2894 - Sl 203</Typography>
      </span>
      <span className="flex gap-2 items-center">
        <MdOutlinePhoneAndroid color="#FF9100" aria-label="Phone icon" role="img" aria-hidden="false" />
        <Typography className="text-grayDark" variant="body" tag="p">(85) 9 9874.0589 | (85) 3342.1259</Typography>
      </span>
      <span className="flex gap-2 items-center">
        <MdOutlineMail color="#FF9100" aria-label="Email icon" role="img" aria-hidden="false" />
        <Typography className="text-grayDark" variant="body" tag="p">contato@joaomercearia.com</Typography>
      </span>
      <span className="flex gap-2 items-center">
        <FaInstagram color="#FF9100" aria-label="Instagram icon" role="img" aria-hidden="false" />
        <Typography className="text-grayDark" variant="body" tag="p">@joaomercearia</Typography>
      </span>

    </div>
  );
};
