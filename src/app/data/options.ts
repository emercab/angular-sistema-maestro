import { SelectOptions } from "../interfaces/select-options.interface";

export const table: SelectOptions[] = [
  { value: '',  option: 'Seleccione...' },
  { value: '1', option: 'Tabla general' },
  { value: '2', option: 'Tabla específica' },
]

export const efm: SelectOptions[] = [
  { value: '',    option: 'Seleccione...' },
  { value: '10',  option: 'Licenciado, Normalista o Tecnólogo en Educación' },
  { value: '5',   option: 'Profesional no licenciado' },
]

export const saberPro: SelectOptions[] = [
  { value: '',    option: 'Seleccione...' },
  { value: '10',  option: 'Quintil 5 o percentil 81-100' },
  { value: '8',   option: 'Quintil 4 o percentil 61-80' },
  { value: '5',   option: 'Quintil 3 o percentil 41-60' },
  { value: '0',   option: 'No disponible' },
]

export const exp: SelectOptions[] = [
  { value: '',    option: 'Seleccione...' },
  { value: '7',   option: 'Municipio donde se oferta la vacante' },
  { value: '5',   option: 'Departamento donde se oferta la vacante' },
  { value: '3',   option: 'Experiencia en otras zonas' },
  { value: '0',   option: 'No disponible' },
]

export const vinculo: SelectOptions[] = [
  { value: '',    option: 'Seleccione...' },
  { value: '15',  option: 'Por municipio - Nacimiento' },
  { value: '12',  option: 'Por municipio - Educación' },
  { value: '9',   option: 'Por municipio - Residencia' },
  { value: '9',   option: 'Por departamento - Nacimiento' },
  { value: '7',   option: 'Por departamento - Educación' },
  { value: '5',   option: 'Por departamento - Residencia' },
  { value: '0',   option: 'No disponible' },
]

export const efa: SelectOptions[] = [
  { value: '',    option: 'Seleccione...' },
  { value: 'd',   option: 'Doctorado' },
  { value: 'm',   option: 'Maestría' },
  { value: 'e',   option: 'Especialización' },
  { value: '0',   option: 'No disponible' },
]

export const tod: SelectOptions[] = [
  { value: '',    option: 'Seleccione...' },
  { value: '20',  option: 'Licenciado, Normalista o Tecnólogo en Educación' },
  { value: '10',  option: 'Profesional no licenciado' },
]

export const etdh: SelectOptions[] = [
  { value: '',    option: 'Seleccione...' },
  { value: '10',  option: 'Formación Académica' },
  { value: '10',  option: 'Formación Técnico Laboral' },
  { value: '0',   option: 'No disponible' },
]

export const ei: SelectOptions[] = [
  { value: '',    option: 'Seleccione...' },
  { value: '10',  option: 'Desde 120 hasta 159 horas' },
  { value: '8',   option: 'Entre 96 y 119 horas' },
  { value: '6',   option: 'Entre 72 y 95 horas' },
  { value: '4',   option: 'Entre 48 y 71 horas' },
  { value: '2',   option: 'Entre 24 y 47 horas' },
  { value: '0',   option: 'No disponible' },
]