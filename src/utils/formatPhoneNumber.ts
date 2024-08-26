export const formatPhoneNumber = (phoneNumber: string) => {
  const regexFixo = /^(\d{2})(\d{4})(\d{4})$/;
  const regexCelular = /^(\d{2})(9\d{4})(\d{4})$/;

  if (regexFixo.test(phoneNumber)) {
    return phoneNumber.replace(regexFixo, "($1) $2-$3");
  }

  if (regexCelular.test(phoneNumber)) {
    return phoneNumber.replace(regexCelular, "($1) $2-$3");
  }

  return phoneNumber;
};
