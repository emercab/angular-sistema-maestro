export function showResults(
  table: string,
  puntaje: number,
  efm: number,
  saberPro1: number,
  saberPro2: number,
  exp: number,
  expCualq: number,
  vinculo: number,
  efa: number,
  tod: number,
  etdh: number,
  ei: number,
): string {
  let result = `
    <h3 class="text-second-color">Puntaje:
      <span class="text-first-color">${puntaje}</span>
    </h3>
  `
  switch (table) {
    case '1': // Tabla 1 - General
      result += `
        <table>
          <tr>
            <td class="left w-75">Educación Formal Mínima:</td>
            <td>${efm}</td>
          </tr>
          <tr>
            <td class="left">Saber Pro y Saber TyT:</td>
            <td>${saberPro1}</td>
          </tr>
          <tr>
            <td class="left">Experiencia Docente:</td>
            <td>${exp}</td>
          </tr>
          <tr>
            <td class="left">Experiencia Docente en otro nivel:</td>
            <td>${expCualq}</td>
          </tr>
          <tr>
            <td class="left">Vínculo con la Zona de la Vacante:</td>
            <td>${vinculo}</td>
          </tr>
          <tr>
            <td class="left"><strong>Educación Formal Adicional:</strong></td>
            <td>${efa}</td>
          </tr>
        </table>
      `
      break
    case '2': // Tabla 2 - Específica
      result += `
        <table>
          <tr>
            <td class="left w-75">Título Orientado a la Docencia:</td>
            <td>${tod}</td>
          </tr>
          <tr>
            <td class="left">Saber Pro y Saber TyT:</td>
            <td>${saberPro2}</td>
          </tr>
          <tr>
            <td class="left">Educación Formal Adicional:</td>
            <td>${efa}</td>
          </tr>
          <tr>
            <td class="left">Educación para el Trabajo y Desarrollo Humano:</td>
            <td>${etdh}</td>
          </tr>
          <tr>
            <td class="left"><strong>Educación Informal:</strong></td>
            <td>${ei}</td>
          </tr>
          <tr>
            <td class="left">Vínculo con la zona de la vacante:</td>
            <td>${vinculo}</td>
          </tr>
        </table>
      `
      break
  }

  return result
}