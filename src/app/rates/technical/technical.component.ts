import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-technical',
  templateUrl: './technical.component.html',
  styleUrls: ['./technical.component.css']
})
export class TechnicalComponent implements OnInit {

  constructor() { }

  // the array of tiles for the calculated price
  private calculatedPriceTiles;

  // show the grid after button pressed:
  showGrid = false;

  // the reactive form for the character count
  characterCountForm: FormGroup;

  // for converstion from number units to USD
  private l10nUSD = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

  // private showPriceDetails: boolean = false;
  private characterCountEntered: number;

  // used to show the total price in the sentence (not the grid)
  private totalCharPriceString;

  // tier object / pricing info - this is where all prices and tier limits are set:
  private tierStructure = {
    tier1: {
      name: 'Tier 1',
      price: 12,
      max: 1500
    },
    tier2: {
      name: 'Tier 2',
      price: 10,
      max: 5000
    },
    tier3: {
      name: 'Tier 3',
      price: 8,
      max: Infinity
    }
  }

  // tier pricing for display in top grid:
  private tier1PriceString: string = this.l10nUSD.format(this.tierStructure.tier1.price / 100);
  private tier2PriceString: string = this.l10nUSD.format(this.tierStructure.tier2.price / 100);
  private tier3PriceString: string = this.l10nUSD.format(this.tierStructure.tier3.price / 100);

  // data grid stuff:
  private gridHeadColor: string = '#e8f0ff';
  private priceTierColumnColor: string = '#f8f4ff';
  private chargeTierColumnColor: string = '#f2f7ff';
  private charCountColumnColor: string = '#f4f7ff';

  infoTiles = [
    { text: 'We specialize in translations related to all things tech and here\'s what we charge:', cols: 10, rows: 1, color: this.gridHeadColor },

    { text: 'Price Tier', cols: 2, rows: 1, color: this.priceTierColumnColor },
    { text: 'Charge', cols: 3, rows: 1, color: this.chargeTierColumnColor },
    { text: 'Character Count', cols: 5, rows: 1, color: this.charCountColumnColor},

    { text: '1', cols: 2, rows: 1, color: this.priceTierColumnColor },
    { text: this.tier1PriceString, cols: 3, rows: 1, color: this.chargeTierColumnColor },
    { text: `First ${this.tierStructure.tier1.max} characters`, cols: 5, rows: 1, color: this.charCountColumnColor},

    { text: '2', cols: 2, rows: 1, color: this.priceTierColumnColor },
    { text: this.tier2PriceString, cols: 3, rows: 1, color: this.chargeTierColumnColor },
    { text: `${this.tierStructure.tier1.max} ~ ${this.tierStructure.tier2.max} characters`, cols: 5, rows: 1, color: this.charCountColumnColor},

    { text: '3', cols: 2, rows: 1, color: this.priceTierColumnColor },
    { text: this.tier3PriceString, cols: 3, rows: 1, color: this.chargeTierColumnColor },
    { text: `${this.tierStructure.tier2.max} characters +`, cols: 5, rows: 1, color: this.charCountColumnColor},
  ];

  private calculatedPricingStructureDisplay = [];

  ngOnInit() {
    this.characterCountForm = new FormGroup({
      characterCount: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    this.showGrid = true;
    // getting the character count entered in form
    this.characterCountEntered = this.characterCountForm.value.characterCount;
    // call to populate this.calculatedPricingStructureDisplay with the character count
    this.calculatePriceFromCharacterCount(this.characterCountEntered);
    // formatting char count with commas for sentence display
    this.characterCountEntered = this.convertToNumberWithCommas(this.characterCountEntered);
    // getting total price and formatting it to display in sentence
    this.totalCharPriceString = this.l10nUSD.format(this.calculatedPricingStructureDisplay[3].price / 100);
    // setting the grid's data:
    this.calculatedPriceTiles = [
      
      { text: 'Price Tier', cols: 3, rows: 1, color: this.priceTierColumnColor },
      { text: 'Charge', cols: 3, rows: 1, color: this.chargeTierColumnColor },
      { text: 'Character Count', cols: 3, rows: 1, color: this.charCountColumnColor},
      { text: 'Tier Total', cols: 3, rows: 1, color: this.charCountColumnColor},
  
      { text: '1', cols: 3, rows: 1, color: this.priceTierColumnColor },
      { text: this.tier1PriceString, cols: 3, rows: 1, color: this.chargeTierColumnColor },
      { text: this.calculatedPricingStructureDisplay[2].chars, cols: 3, rows: 1, color: this.charCountColumnColor},
      { text: this.l10nUSD.format(this.calculatedPricingStructureDisplay[2].price / 100), cols: 3, rows: 1, color: this.charCountColumnColor},
  
      { text: '2', cols: 3, rows: 1, color: this.priceTierColumnColor },
      { text: this.tier2PriceString, cols: 3, rows: 1, color: this.chargeTierColumnColor },
      { text: this.calculatedPricingStructureDisplay[1].chars, cols: 3, rows: 1, color: this.charCountColumnColor},
      { text: this.l10nUSD.format(this.calculatedPricingStructureDisplay[1].price / 100), cols: 3, rows: 1, color: this.charCountColumnColor},
  
      { text: '3', cols: 3, rows: 1, color: this.priceTierColumnColor },
      { text: this.tier3PriceString, cols: 3, rows: 1, color: this.chargeTierColumnColor },
      { text: this.calculatedPricingStructureDisplay[0].chars, cols: 3, rows: 1, color: this.charCountColumnColor},
      { text: this.l10nUSD.format(this.calculatedPricingStructureDisplay[0].price / 100), cols: 3, rows: 1, color: this.charCountColumnColor},

      {text: 'Totals', cols: 3, rows: 1, color: this.gridHeadColor },
      {text: '', cols: 3, rows: 1, color: this.gridHeadColor },
      {text: this.calculatedPricingStructureDisplay[3].chars, cols: 3, rows: 1, color: this.gridHeadColor},
      {text: this.l10nUSD.format(this.calculatedPricingStructureDisplay[3].price / 100), cols: 3, rows: 1, color: this.gridHeadColor}
    ];
  }

  //
  calculatePriceFromCharacterCount(chars: number) {
    // clearing the display so user can enter multiple character counts per page load
    this.calculatedPricingStructureDisplay = [];
    // starting price that will be added to in the conditionals
    let price = 0;
    // copying character count to display in the 'total' object (chars will be manipulated below)
    let originalChars = chars;

    // the variables for the actual count of characters for the three tiers based on the total characters passed in
    let tier1Count;
    let tier2Count;
    let tier3Count;

    // conditionals for calculating tiered char count and price:

    // "tier 3" object:
    if (chars > this.tierStructure.tier2.max) {
      tier3Count = chars - this.tierStructure.tier2.max;
      chars = this.tierStructure.tier2.max;
      price += tier3Count * this.tierStructure.tier3.price;
      this.pushToPSD('tier3', tier3Count, tier3Count * this.tierStructure.tier3.price);
    } else {
      tier3Count = 0;
      this.pushToPSD('tier3', tier3Count, tier3Count * this.tierStructure.tier3.price);
    }
    // "tier 2" object:
    if (chars > this.tierStructure.tier1.max) {
      tier2Count = chars - this.tierStructure.tier1.max;
      chars = this.tierStructure.tier1.max;
      price += tier2Count * this.tierStructure.tier2.price;
      this.pushToPSD('tier2', tier2Count, tier2Count * this.tierStructure.tier2.price);
    } else {
      tier2Count = 0;
      this.pushToPSD('tier2', tier2Count, tier2Count * this.tierStructure.tier2.price);
    }
    // "tier 1" object:
    tier1Count = chars;
    price += tier1Count * this.tierStructure.tier1.price;
    this.pushToPSD('tier1', tier1Count, tier1Count * this.tierStructure.tier1.price);
    // "total" object:
    this.pushToPSD('total', originalChars, price);
  }

  pushToPSD(n, c, p) {
    // just to cut down on code volume, this takes the properties and pushes to the calculatedPricingStructureDisplay
    this.calculatedPricingStructureDisplay.push({
      name: n,
      chars: c,
      price: p
    });
  }

  convertToNumberWithCommas(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

}
