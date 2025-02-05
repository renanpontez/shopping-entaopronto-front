export function openWhatsAppChat(phoneNumber: number, message: string = '') {
  const cleanNumber = phoneNumber.toString();

  const encodedMessage = encodeURIComponent(message);

  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, '_blank');
};
