export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const parseCurrency = (value: string | null | undefined) => {
  if (!value) return 0;
  // Convert to string in case we receive a number
  const stringValue = value.toString();
  return Number(stringValue.replace(/[^0-9-]/g, '')) / 100;
};

export const formatDocument = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 11) {
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
  }
  return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5');
};

export const validateDocument = (document: string) => {
  const numbers = document.replace(/\D/g, '');
  return numbers.length <= 11 ? 'CPF' : 'CNPJ';
};