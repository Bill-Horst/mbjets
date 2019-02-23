import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LogicService } from 'src/app/services/logic.service';

@Component({
  selector: 'app-technical',
  templateUrl: './technical.component.html',
  styleUrls: ['./technical.component.css']
})
export class TechnicalComponent implements OnInit {

  characterCountForm: FormGroup;

  constructor(logicService: LogicService) { }

  // for converstion from number units to USD
  private l10nUSD = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })

  private showPriceDetails: boolean = false;
  private characterCountEntered: number;
  private calculatedPrice: string;

  // private tier1CharPrice;
  // private tier2CharPrice;
  // private tier3CharPrice;
  private totalCharPrice;
  private totalCharPriceString;

  // tier object / pricing info:
  private tierStructure = {
    tier1: {
      name: 'Tier 1',
      price: 12,
      max: 1000
    },
    tier2: {
      name: 'Tier 2',
      price: 10,
      max: 3000
    },
    tier3: {
      name: 'Tier 3',
      price: 8,
      max: Infinity
    }
  }

  // tier pricing for display in top table:
  private tier1PriceString: string = this.l10nUSD.format(this.tierStructure.tier1.price / 100);
  private tier2PriceString: string = this.l10nUSD.format(this.tierStructure.tier2.price / 100);
  private tier3PriceString: string = this.l10nUSD.format(this.tierStructure.tier3.price / 100);

  private calculatedPricingStructureDisplay = [];

  // table stuff:
  private showTable = false;
  displayedColumns: string[] = ['tier', 'charCount', 'total'];
  dataSource = [
    { tier: 'Tier 1', charCount: 0, total: '0' },
    { tier: 'Tier 2', charCount: 0, total: '0' },
    { tier: 'Tier 3', charCount: 0, total: '0' },
    { tier: 'Total', charCount: 0, total: '0' }
  ]

  ngOnInit() {
    this.characterCountForm = new FormGroup({
      characterCount: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    this.showTable = true;
    // getting the character count entered in form
    this.characterCountEntered = this.characterCountForm.value.characterCount;
    // call to populate this.calculatedPricingStructureDisplay with the character count
    this.calculatePriceFromCharacterCount(this.characterCountEntered);
    // formatting char count with commas for sentence display
    this.characterCountEntered = this.convertToNumberWithCommas(this.characterCountEntered);
    // getting total price and formatting it to display in sentence
    this.totalCharPrice = this.calculatedPricingStructureDisplay[3].price;
    this.totalCharPriceString = this.l10nUSD.format(this.totalCharPrice / 100);
    // setting the table's data:
    this.dataSource = [
      { tier: 'Tier 1', charCount: this.calculatedPricingStructureDisplay[2].chars, total: this.l10nUSD.format(this.calculatedPricingStructureDisplay[2].price / 100) },
      { tier: 'Tier 2', charCount: this.calculatedPricingStructureDisplay[1].chars, total: this.l10nUSD.format(this.calculatedPricingStructureDisplay[1].price / 100) },
      { tier: 'Tier 3', charCount: this.calculatedPricingStructureDisplay[0].chars, total: this.l10nUSD.format(this.calculatedPricingStructureDisplay[0].price / 100) },
      { tier: 'Total', charCount: this.calculatedPricingStructureDisplay[3].chars, total: this.l10nUSD.format(this.calculatedPricingStructureDisplay[3].price / 100) }
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
