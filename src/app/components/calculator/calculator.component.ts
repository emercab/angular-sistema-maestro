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
  @ViewChild('selTable') public selectTable!: ElementRef<HTMLSelectElement>
  @ViewChild('selEfm') public selectEfm!: ElementRef<HTMLSelectElement>
  @ViewChild('selSaberPro') public selectSaberPro!: ElementRef<HTMLSelectElement>
  @ViewChild('selExp') public selectExp!: ElementRef<HTMLSelectElement>
  @ViewChild('selVinculo') public selectVinculo!: ElementRef<HTMLSelectElement>
  @ViewChild('selEfa') public selectEfa!: ElementRef<HTMLSelectElement>
  @ViewChild('selTod') public selectTod!: ElementRef<HTMLSelectElement>
  @ViewChild('selEtdh') public selectEtdh!: ElementRef<HTMLSelectElement>
  @ViewChild('selEi') public selectEi!: ElementRef<HTMLSelectElement>

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
    saberPro:   Quintiles superiores es Saber Pro y T & T
    exp:        Experiencia en niveles de educacion inicial, preescolar, basica y media
    expCualq:   Experiencia en cualquier nivel de educacion
    vinculo:    Vinculo del aspirante en el lugar en el que se oferta la vacante
    efa:        Educacion formal adicional
  */
  public efm: number = 0
  public saberPro: number = 0
  public exp: number = 0
  public expCualq: number = 2 // Puntos por año
  public vinculo: number = 0
  public efa: number = 0

  /*
  Tabla especifica
    tod:        Titulo orientado a la docencia
    saberPro:   Quintiles superiores es Saber Pro y T & T
    efa:        Educacion formal adicional
    etdh:       Educacion para el trabajo y el desarrollo humano
    ei:         Educacion informal
    vinculo:    Vinculo del aspirante en el lugar en el que se oferta la vacante
  */
  public tod: number = 0
  public etdh: number = 0
  public ei: number = 0

  // Importo opciones de los select
  public tableOptions: SelectOptions[] = options.table
  public efmOptions: SelectOptions[] = options.efm
  public saberProOptions: SelectOptions[] = options.saberPro
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


  public onSelectSaberPro(): void {
    let valor: string = this.selectSaberPro.nativeElement.value
    if (valor === '') {
      valor = '0'
    }
    this.saberPro = parseInt(valor, 10)
    console.log(this.saberPro)
  }


  public onSelectExp(): void {
    this.exp = parseInt(this.selectExp.nativeElement.value, 10)
    console.log(this.exp)
  }

}