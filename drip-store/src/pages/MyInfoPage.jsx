import { useState } from "react"
import AccountLayout from "./AccountLayout.jsx"
import FormField from "../components/FormField.jsx"
import { useAuth } from "../context/AuthContext.jsx"
import { maskCEP, maskCPF, maskPhone, validateProfile } from "../utils/forms.js"
import "./MyInfoPage.css"

const personal = [
  ["Nome", "name"],
  ["CPF", "cpf"],
  ["E-mail", "email"],
  ["Celular", "phone"],
]
const delivery = [
  ["Endereço", "address"],
  ["Bairro", "district"],
  ["Cidade", "city"],
  ["CEP", "cep"],
  ["Complemento", "complement"],
]

function MyInfoPage() {
  const { user, updateUser } = useAuth()
  const data = user ?? {} // user fica null por um instante ao sair da conta
  const [editing, setEditing] = useState(false)
  const [values, setValues] = useState(user ?? {})
  const [errors, setErrors] = useState({})

  function startEditing() {
    setValues(data)
    setErrors({})
    setEditing(true)
  }

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((e) => ({ ...e, [name]: undefined }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = validateProfile(values)
    if (Object.keys(found).length) {
      setErrors(found)
      return
    }
    updateUser(values)
    setEditing(false)
  }

  const action = !editing && (
    <button type="button" className="account__action" onClick={startEditing}>
      Editar
    </button>
  )

  return (
    <AccountLayout title="Minhas Informações" action={action}>
      {editing ? (
        <form className="my-info__form" onSubmit={handleSubmit} noValidate>
          <h2 className="my-info__subtitle">Informações Pessoais</h2>
          <div className="my-info__fields">
            <FormField label="Nome Completo" name="name" value={values.name ?? ""} onChange={setField} error={errors.name} required />
            <FormField label="CPF" name="cpf" value={values.cpf ?? ""} onChange={setField} error={errors.cpf} mask={maskCPF} required inputMode="numeric" />
            <FormField label="E-mail" name="email" type="email" value={values.email ?? ""} onChange={setField} error={errors.email} required />
            <FormField label="Celular" name="phone" value={values.phone ?? ""} onChange={setField} error={errors.phone} mask={maskPhone} required inputMode="tel" />
          </div>
          <h2 className="my-info__subtitle">Informações de Entrega</h2>
          <div className="my-info__fields">
            <FormField label="Endereço" name="address" value={values.address ?? ""} onChange={setField} error={errors.address} required />
            <FormField label="Bairro" name="district" value={values.district ?? ""} onChange={setField} error={errors.district} required />
            <FormField label="Cidade" name="city" value={values.city ?? ""} onChange={setField} error={errors.city} required />
            <FormField label="CEP" name="cep" value={values.cep ?? ""} onChange={setField} error={errors.cep} mask={maskCEP} required inputMode="numeric" />
            <FormField label="Complemento" name="complement" value={values.complement ?? ""} onChange={setField} />
          </div>
          <div className="my-info__buttons">
            <button type="button" className="btn my-info__cancel" onClick={() => setEditing(false)}>
              Cancelar
            </button>
            <button type="submit" className="btn btn--primary">
              Salvar
            </button>
          </div>
        </form>
      ) : (
        <>
          <section className="my-info__block">
            <h2 className="my-info__subtitle">Informações Pessoais</h2>
            <dl>
              {personal.map(([label, key]) => (
                <div key={key}>
                  <dt>{label}:</dt>
                  <dd>{data[key] || "—"}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section className="my-info__block">
            <h2 className="my-info__subtitle">Informações de Entrega</h2>
            <dl>
              {delivery.map(([label, key]) => (
                <div key={key}>
                  <dt>{label}:</dt>
                  <dd>{data[key] || "—"}</dd>
                </div>
              ))}
            </dl>
          </section>
        </>
      )}
    </AccountLayout>
  )
}

export default MyInfoPage
