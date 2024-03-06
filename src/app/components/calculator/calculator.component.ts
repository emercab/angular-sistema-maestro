import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SelectOptions } from '../../interfaces/select-options.interface';

import * as options from '../../data/options';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
})
export class CalculatorComponent {

  // Atributos de formularios
  @ViewChild('selTable')        public selectTable!: ElementRef<HTMLSelectElement>
  @ViewChild('selEfm')          public selectEfm!: ElementRef<HTMLSelectElement>
  @ViewChild('selSaberPro1')    public selectSaberPro1!: ElementRef<HTMLSelectElement>
  @ViewChild('selSaberPro2')    public selectSaberPro2!: ElementRef<HTMLSelectElement>
  @ViewChild('selExp')          public selectExp!: ElementRef<HTMLSelectElement>
  @ViewChild('inpTime')         public inputTime!: ElementRef<HTMLInputElement>
  @ViewChild('inpTimeExpCualq') public inputTimeExpCualq!: ElementRef<HTMLInputElement>
  @ViewChild('selVinculo')      public selectVinculo!: ElementRef<HTMLSelectElement>
  @ViewChild('selEfa')          public selectEfa!: ElementRef<HTMLSelectElement>
  @ViewChild('selTod')          public selectTod!: ElementRef<HTMLSelectElement>
  @ViewChild('selEtdh')         public selectEtdh!: ElementRef<HTMLSelectElement>
  @ViewChild('selEi')           public selectEi!: ElementRef<HTMLSelectElement>

  public myForm = this.fb.group({
    tableType: ['', [Validators.required]],
    efmControl: ['', [Validators.required]],
    saberProControl: ['', [Validators.required]],
    expControl: ['', [Validators.required]],
    expCualqControl: ['', [Validators.required]],
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
  public expCualq: number = 2 // Puntos por año
  public vinculo: number = 0
  private _tieneVinculo: boolean = false
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

  private _selectedTable?: string | null = '0' // 1 o 2


  // Metodos
  constructor(private fb: FormBuilder) { }


  get selectedTableVal(): string {
    return this._selectedTable || '0'
  }


  public onSelectTable(): void {
    this._selectedTable = this.selectTable.nativeElement.value
    console.log(this._selectedTable)
  }


  public onSelectEfm(): void {
    this.efm = parseInt(this.selectEfm.nativeElement.value, 10)
    console.log(this.efm)
  }


  public onSelectSaberPro1(): void {
    let valor: string = this.selectSaberPro1.nativeElement.value
    if (valor === '') {
      valor = '0'
    }
    this.saberPro1 = parseInt(valor, 10)
    console.log(this.saberPro1)
  }


  public onSelectExp(): void {
    this.exp = parseInt(this.selectExp.nativeElement.value, 10)
    console.log(this.exp)
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
    this.inputTime.nativeElement.value = ''
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

    console.log(this.arrayExp)
  }


  public onSelectExpCualq(): void {
    this.expCualq = parseInt(this.selectExp.nativeElement.value, 10)
    console.log(this.expCualq)
  }


  public onSelectVinculo(): void {
    const vinculo = this.selectVinculo.nativeElement.value
    if (vinculo != '0' && vinculo != '') {
      this._tieneVinculo = true
    }

    this.vinculo = parseInt(vinculo, 10)
    console.log(this.vinculo)
  }


  public onSelectEfa(): void {
    this.efa = parseInt(this.selectEfa.nativeElement.value, 10)
    console.log(this.efa)
  }

}