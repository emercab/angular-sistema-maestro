import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectOptions } from '../../interfaces/select-options.interface';

import * as options from '../../data/options';
import { doScroll, showResults } from '../../helpers/show-results';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
})
export class CalculatorComponent {

  // Atributos de formularios
  @ViewChild('selTable') public selectTable!: ElementRef<HTMLSelectElement>
  @ViewChild('selEfm') public selectEfm!: ElementRef<HTMLSelectElement>
  @ViewChild('selSaberPro1') public selectSaberPro1!: ElementRef<HTMLSelectElement>
  @ViewChild('selSaberPro2') public selectSaberPro2!: ElementRef<HTMLSelectElement>
  @ViewChild('selExp') public selectExp!: ElementRef<HTMLSelectElement>
  @ViewChild('inpTime') public inputTime!: ElementRef<HTMLInputElement>
  @ViewChild('inpTimeExpCualq') public inputTimeExpCualq!: ElementRef<HTMLInputElement>
  @ViewChild('selVinculo') public selectVinculo!: ElementRef<HTMLSelectElement>
  @ViewChild('selEfa') public selectEfa!: ElementRef<HTMLSelectElement>
  @ViewChild('selTod') public selectTod!: ElementRef<HTMLSelectElement>
  @ViewChild('selEtdh') public selectEtdh!: ElementRef<HTMLSelectElement>
  @ViewChild('selEi') public selectEi!: ElementRef<HTMLSelectElement>

  public myForm: FormGroup = this.fb.group({
    tableType: ['', [Validators.required]],
    efmControl: ['', [Validators.required]],
    saberProControl1: ['', [Validators.required]],
    saberProControl2: ['', [Validators.required]],
    expControl: ['', [Validators.required]],
    expTimeControl: ['0', []],
    expCualqControl: ['0', []],
    vinculoControl: ['', [Validators.required]],
    efaControl: ['', [Validators.required]],
    todControl: ['', [Validators.required]],
    etdhControl: ['', [Validators.required]],
    eiControl: ['', [Validators.required]],
  })

  // Atributos de titulos e información
  public title: string = 'Calculadora de Puntaje'
  public subtitle: string = 'Sistema Maestro'
  public table1: string = 'tabla general'
  public table2: string = 'tabla específica'
  public description1: string = 'Seleccione una de las dos tablas de ponderación: '
  public description2: string = `
    privilegia la experiencia en zonas rurales, el vínculo del aspirante en el lugar en el que se oferta la vacante, la formación adicional y el título orientado a la docencia, entre otros.`
  public description3: string = `
    considera criterios para jóvenes entre 18 y 28 años sin experiencia, su educación, el título orientado a la docencia y el vínculo del aspirante donde se oferte la vacante.`

  /* Atributos de las tablas
  Tabla general
    efm:        Educacion formal minima
    saberPro1:  Quintiles superiores es Saber Pro y T & T
    exp:        Experiencia en niveles de educacion inicial, preescolar, basica y media
    expCualq:   Experiencia en cualquier nivel de educacion
    vinculo:    Vinculo del aspirante en el lugar en el que se oferta la vacante
    efa:        Educacion formal adicional
  */
  public efm: number = 0
  public saberPro1: number = 0
  public arrayExp: number[][] = [] // Array para guardar las experiencias del docente
  public exp: number = 0
  public expCualq: number = 0
  public puntExpCualq: number = 2 // Puntaje por año de experiencia en cualquier nivel de educación
  public vinculo: number = 0
  private _tieneVinculo: boolean = true
  public efa: number = 0

  /*
  Tabla especifica
  tod:        Titulo orientado a la docencia
  saberPro2:  Quintiles superiores es Saber Pro y T & T
  efa:        Educacion formal adicional
  etdh:       Educacion para el trabajo y el desarrollo humano
  ei:         Educacion informal
  vinculo:    Vinculo del aspirante en el lugar en el que se oferta la vacante
  */
  public tod: number = 0
  public saberPro2: number = 0
  public etdh: number = 0
  public ei: number = 0

  // Importo opciones de los select
  public tableOptions: SelectOptions[] = options.table
  public efmOptions: SelectOptions[] = options.efm
  public saberProOptions1: SelectOptions[] = options.saberPro1
  public saberProOptions2: SelectOptions[] = options.saberPro2
  public expOptions: SelectOptions[] = options.exp
  public vinculoOptions: SelectOptions[] = options.vinculo
  public efaOptions: SelectOptions[] = options.efa
  public todOptions: SelectOptions[] = options.tod
  public etdhOptions: SelectOptions[] = options.etdh
  public eiOptions: SelectOptions[] = options.ei

  public selectedTable?: string | null = '0' // 1 o 2


  /************ Metodos ************/
  constructor(private fb: FormBuilder) { }


  get selectedTableVal(): string {
    return this.selectedTable || '0'
  }


  public onSelectTable(): void {
    this.selectedTable = this.selectTable.nativeElement.value
    doScroll(600)
  }


  public onSelectEfm(): void {
    this.efm = parseInt(this.selectEfm.nativeElement.value, 10)
  }


  public onSelectSaberPro1(): void {
    let valor: string = this.selectSaberPro1.nativeElement.value
    if (valor === '') {
      valor = '0'
    }
    this.saberPro1 = parseInt(valor, 10)
  }


  public onSelectExp(): void {
    this.exp = parseInt(this.selectExp.nativeElement.value, 10)
  }


  public addExperience(): void {
    // Añadir experiencia al array
    const years: number = parseInt(this.inputTime.nativeElement.value, 10)
    const expType: number = parseInt(this.selectExp.nativeElement.value, 10)
    this.arrayExp.push([years, expType])

    // Guardo el nombre de la zona de la experiencia seleccionada
    const index: number = this.selectExp.nativeElement.selectedIndex
    const zona: string = this.selectExp.nativeElement.options[index].text

    // Limpiar campos
    this.inputTime.nativeElement.value = '0'
    this.selectExp.nativeElement.value = ''

    // Mostrar experiencia agregada en el formulario
    const textExp: string = `${years} años en ${zona}.`
    const expList: HTMLElement = document.getElementById('expList')!
    const expItem: HTMLElement = document.createElement('li')
    const expSpan: HTMLElement = document.createElement('span')
    expSpan.classList.add('text-first-color')
    expSpan.style.fontWeight = 'bold'
    expSpan.appendChild(document.createTextNode('Experiencia agregada: '))
    expItem.appendChild(expSpan)
    expItem.appendChild(document.createTextNode(textExp))
    expList.appendChild(expItem)
  }


  public onSelectExpCualq(): void {
    let expCualq: string = this.selectExp.nativeElement.value
    if (expCualq === '') {
      expCualq = '0'
    }

    this.expCualq = parseInt(expCualq, 10)
  }


  public onSelectVinculo(): void {
    const vinculo = this.selectVinculo.nativeElement.value
    if (vinculo == '0' || vinculo == '') {
      this._tieneVinculo = false
    }
    else {
      this._tieneVinculo = true
    }

    this.vinculo = parseInt(vinculo, 10)
  }


  public onSelectEfa(): void {
    const efa = this.selectEfa.nativeElement.value

    switch (this.selectedTable) {
      case '1': // Tabla general
        switch (efa) {
          case 'd': (this._tieneVinculo) ? this.efa = 20 : this.efa = 15; break
          case 'm': (this._tieneVinculo) ? this.efa = 15 : this.efa = 10; break
          case 'e': (this._tieneVinculo) ? this.efa = 10 : this.efa = 5; break
          default: this.efa = 0; break
        }
        break
      case '2': // Tabla específica
        switch (efa) {
          case 'd': this.efa = 30; break
          case 'm': this.efa = 20; break
          case 'e': this.efa = 10; break
          default: this.efa = 0; break
        }
        break
      default: this.efa = 0; break
    }
  }


  public onSelectTod(): void {
    this.tod = parseInt(this.selectTod.nativeElement.value, 10)
  }


  public onSelectSaberPro2(): void {
    let valor: string = this.selectSaberPro2.nativeElement.value
    if (valor === '') {
      valor = '0'
    }
    this.saberPro2 = parseInt(valor, 10)
  }


  public onSelectEtdh(): void {
    this.etdh = parseInt(this.selectEtdh.nativeElement.value, 10)
  }


  public onSelectEi(): void {
    this.ei = parseInt(this.selectEi.nativeElement.value, 10)
  }


  public calcularPuntaje(): void {
    let puntaje: number = 0

    switch (this.selectedTable) {
      case '1': // Tabla general

        // Calculo valor de la experiencia docente en niveles de educación inicial, preescolar, básica y media
        let acumExp = this.arrayExp.reduce((acumExp, expActual) => {
          let puntos = expActual[0] * expActual[1]; // Calcula el puntaje multiplicanos años por puntos de la zona
          return acumExp + puntos; // Suma el producto al acumulado
        }, 0); // Inicia el acumulador en 0
        if (acumExp > 35) acumExp = 35 // El puntaje máximo es 35
        this.exp = acumExp

        // Calculo experiencia en cualquier otro nivel de educación
        let valExpCualq = this.inputTimeExpCualq.nativeElement.value
        if (valExpCualq === '') valExpCualq = '0'
        let expCualq = parseInt(valExpCualq, 10) * this.puntExpCualq
        if (expCualq > 10) expCualq = 10 // El puntaje máximo es 10
        this.expCualq = expCualq

        puntaje = this.efm + this.saberPro1 + this.exp + this.expCualq + this.vinculo + this.efa
        break
      case '2': // Tabla específica
        puntaje = this.tod + this.saberPro2 + this.efa + this.etdh + this.ei + this.vinculo
        break
      default: puntaje = 0; break
    }

    const results = showResults(
      this.selectedTable!,
      puntaje,
      this.efm,
      this.saberPro1,
      this.saberPro2,
      this.exp,
      this.expCualq,
      this.vinculo,
      this.efa,
      this.tod,
      this.etdh,
      this.ei,
    )

    // Mostrar resultados
    const resultsDiv: HTMLElement = document.getElementById('resultados')!
    resultsDiv.innerHTML = results
    doScroll(1200)
  }


  public resetForm(): void {
    this.selectedTable = '0'
    this.arrayExp = []
    this.efm = 0
    this.saberPro1 = 0
    this.saberPro2 = 0
    this.exp = 0
    this.expCualq = 0
    this.vinculo = 0
    this.efa = 0
    this.tod = 0
    this.etdh = 0
    this.ei = 0
    
    // Limpiar resultados
    const resultsDiv: HTMLElement = document.getElementById('resultados')!
    resultsDiv.innerHTML = ''

    // limpiar formulario y establecer valores por defecto
    this.myForm.reset()
    this.myForm.controls['tableType'].setValue('')
    this.myForm.controls['efmControl'].setValue('')
    this.myForm.controls['saberProControl1'].setValue('')
    this.myForm.controls['saberProControl2'].setValue('')
    this.myForm.controls['expControl'].setValue('')
    this.myForm.controls['expTimeControl'].setValue('0')
    this.myForm.controls['expCualqControl'].setValue('0')
    this.myForm.controls['vinculoControl'].setValue('')
    this.myForm.controls['efaControl'].setValue('')
    this.myForm.controls['todControl'].setValue('')
    this.myForm.controls['etdhControl'].setValue('')
    this.myForm.controls['eiControl'].setValue('')
  }

}