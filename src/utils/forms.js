export const onlyDigits = (value) => String(value).replace(/\D/g, "")

// ---------- máscaras ----------
export const maskCPF = (value) =>
  onlyDigits(value)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")

export const maskCEP = (value) =>
  onlyDigits(value)
    .slice(0, 8)
    .replace(/(\d{5})(\d)/, "$1-$2")

export const maskPhone = (value) =>
  onlyDigits(value)
    .slice(0, 11)
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4,5})(\d{4})$/, "$1-$2")

export const maskCard = (value) =>
  onlyDigits(value)
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ")

export const maskExpiry = (value) =>
  onlyDigits(value)
    .slice(0, 4)
    .replace(/(\d{2})(\d)/, "$1/$2")

export const maskCVV = (value) => onlyDigits(value).slice(0, 4)

// ---------- validações ----------
export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim())

export function isCPF(value) {
  const cpf = onlyDigits(value)
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false
  const digit = (len) => {
    let sum = 0
    for (let i = 0; i < len; i++) sum += Number(cpf[i]) * (len + 1 - i)
    const rest = (sum * 10) % 11
    return rest === 10 ? 0 : rest
  }
  return digit(9) === Number(cpf[9]) && digit(10) === Number(cpf[10])
}

export const isCEP = (value) => onlyDigits(value).length === 8
export const isPhone = (value) => [10, 11].includes(onlyDigits(value).length)

const required = (value) => String(value ?? "").trim().length > 0

// Valida dados pessoais + entrega (usado no cadastro e no checkout)
export function validateProfile(values) {
  const errors = {}
  if (!required(values.name) || values.name.trim().split(/\s+/).length < 2)
    errors.name = "Informe seu nome completo"
  if (!isCPF(values.cpf)) errors.cpf = "Informe um CPF válido"
  if (!isEmail(values.email)) errors.email = "Informe um e-mail válido"
  if (!isPhone(values.phone)) errors.phone = "Informe um celular com DDD"
  if (!required(values.address)) errors.address = "Informe o endereço"
  if (!required(values.district)) errors.district = "Informe o bairro"
  if (!required(values.city)) errors.city = "Informe a cidade"
  if (!isCEP(values.cep)) errors.cep = "Informe um CEP válido"
  return errors
}

export const emptyProfile = {
  name: "",
  cpf: "",
  email: "",
  phone: "",
  address: "",
  district: "",
  city: "",
  cep: "",
  complement: "",
}
