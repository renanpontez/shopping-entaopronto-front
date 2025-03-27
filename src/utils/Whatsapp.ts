export const openWhatsAppChat = (phoneNumber?: string, message: string = '') => {
  const cleanNumber = phoneNumber?.replace(/\D/g, '');

  const encodedMessage = encodeURIComponent(message);

  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, '_blank');
};

export const getStoreWhatsAppMessage = (storeName: string, itemName: string, description: string, formattedPrice: string) => {
  const whatsAppMessage = `Olá, estava navegando no Shopping EntãoPronto e encontrei a/o ${storeName}.

  Gostaria de mais informações sobre o seguinte produto/serviço:
  ${itemName}
  ${description}
  ${formattedPrice}`;

  return whatsAppMessage;
};

export const getShoppingWhatsAppMessage = (userName: string, userEmail: string, userMessage: string) => {
  const messageFormated = `Olá! Estou entrando em contato pelo site da Shopping EntãoPronto.
  Me chamo ${userName} de ${userEmail} e gostaria de saber mais sobre: ${userMessage}
  `;
  return messageFormated;
};

export const createStoreInfoWhatsAppMessage = `Olá, estou entrando em contato pelo site da Shopping EntãoPronto e gostaria de saber mais sobre como cadastrar meu estabelecimento na EntãoPronto.`;

export const getGeneralInfoWhatsAppMessage = `Olá, estou entrando em contato pelo site da Shopping EntãoPronto e gostaria de saber mais sobre a organização.`;
