export function phoneMask(numero) {
  if (numero !== null && numero.length === 11) {
    // Pega DDD
    const ddd = numero.slice(0, 2);
    // Retira DDD
    const number = numero.slice(2);
    // Separa 2 metades do numero
    const numberFirstHalf = number.slice(0, 5);
    const numberSecondHalf = number.slice(5, 9);

    const maskedNumber = `(${ddd})${numberFirstHalf}-${numberSecondHalf}`;
    // Retorna numero Convertido

    return maskedNumber;
  }
  return numero;
}
