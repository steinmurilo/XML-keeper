import { UfCode } from "./enums";


export function formatCnpj(input: string): string {
    const cleanedInput = input.replace(/\D/g, '');
  
    const formattedCnpj = cleanedInput.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  
    return formattedCnpj;
}

export function formatCurrency(value: number): string {
    const formattedCurrency = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
  
    return formattedCurrency;
}

export function codeToUf(code: number): string | undefined {
    const ufKey = Object.keys(UfCode).find(key => (UfCode as any)[key] === code);
  
    return ufKey;
}

export function convertTimestampToDateTime(timestamp: string): string {
    const dateObject = new Date(timestamp);

    const dataString = dateObject.toLocaleDateString() + ', ' + dateObject.toLocaleTimeString();

    const novaDataString = dataString.replace(', ', ' - ');
  
    return novaDataString;
  }