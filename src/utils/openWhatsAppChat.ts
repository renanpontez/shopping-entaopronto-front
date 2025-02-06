export function openWhatsAppChat(phoneNumber: string, message: string = '') {
  const cleanNumber = phoneNumber.replace(/\D/g, '');

  const encodedMessage = encodeURIComponent(message);

  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, '_blank');
}
