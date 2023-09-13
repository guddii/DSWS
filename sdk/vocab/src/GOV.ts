import { LitVocabTerm, getLocalStore } from "@inrupt/lit-vocab-term";
import dataFactory from "@rdfjs/data-model";
import type { NamedNode } from "rdf-js";

const { namedNode } = dataFactory;

function _NS(localName: string): NamedNode {
  return namedNode(`urn:gov#${localName}`);
}

export const GOV = {
  PREFIX: "gov",
  NAMESPACE: "urn:gov#",
  PREFIX_AND_NAMESPACE: { gov: "urn:gov#" },
  NS: _NS,

  // ----------------------------------------------------------------
  // car-insurance-company (Kfz-Versicherer)
  // ----------------------------------------------------------------

  MotorVehicleInsuranceCertificate: new LitVocabTerm(
    _NS("MotorVehicleInsuranceCertificate"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Kfz-Versicherungsschein`, "de")
    .addLabel(`Motor Vehicle Insurance Certificate`, "en"),

  MotorVehicleInsuranceCertificateCreator: new LitVocabTerm(
    _NS("MotorVehicleInsuranceCertificateCreator"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Herausgeber des Kfz-Versicherungsschein`, "de")
    .addLabel(`Motor Vehicle Insurance Certificate Creator`, "en"),

  MotorVehicleInsuranceID: new LitVocabTerm(
    _NS("MotorVehicleInsuranceID"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Kfz-Versichertennummer`, "de")
    .addLabel(`Motor Vehicle Insurance ID`, "en"),

  // ----------------------------------------------------------------
  // construction-office (Bauamt)
  // ----------------------------------------------------------------

  BuildingPermit: new LitVocabTerm(
    _NS("BuildingPermit"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Baugenehmigung`, "de")
    .addLabel(`Building Permit`, "en"),

  BuildingPermitCreator: new LitVocabTerm(
    _NS("BuildingPermitCreator"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Herausgeber der Baugenehmigung`, "de")
    .addLabel(`Building Permit Creator`, "en"),

  BuildingCompletion: new LitVocabTerm(
    _NS("BuildingCompletion"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Baufertigstellung`, "de")
    .addLabel(`Building Completion`, "en"),

  // ----------------------------------------------------------------
  // customs (Zoll)
  // ----------------------------------------------------------------

  VehicleRegistrationCertificate: new LitVocabTerm(
    _NS("VehicleRegistrationCertificate"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Fahrzeugschein`, "de")
    .addLabel(`Vehicle Registration Certificate`, "en"),

  VehicleRegistrationCertificateCreator: new LitVocabTerm(
    _NS("VehicleRegistrationCertificateCreator"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Herausgeber des Fahrzeugscheins`, "de")
    .addLabel(`Vehicle Registration Certificate Creator`, "en"),

  VehicleConstructionYear: new LitVocabTerm(
    _NS("VehicleConstructionYear"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Fahrzeugbaujahr`, "de")
    .addLabel(`Vehicle Construction Year`, "en"),

  // ----------------------------------------------------------------
  // employment-agency (Arbeitsagentur)
  // ----------------------------------------------------------------

  FundingNotice: new LitVocabTerm(
    _NS("FundingNotice"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Förderbescheid`, "de")
    .addLabel(`Funding Notice`, "en"),

  FundingNoticeCreator: new LitVocabTerm(
    _NS("FundingNoticeCreator"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Herausgeber des Förderbescheids`, "de")
    .addLabel(`Funding Notice Creator`, "en"),

  FundingGrant: new LitVocabTerm(
    _NS("FundingGrant"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Förderzuschuss`, "de")
    .addLabel(`Funding Grant`, "en"),

  // ----------------------------------------------------------------
  // environmental-office (Umweltamt)
  // ----------------------------------------------------------------

  BusinessPremisesPermit: new LitVocabTerm(
    _NS("BusinessPremisesPermit"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Betriebsstättengenehmigung`, "de")
    .addLabel(`Business Premises Permit`, "en"),

  BusinessPremisesPermitCreator: new LitVocabTerm(
    _NS("BusinessPremisesPermitCreator"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Herausgeber der Betriebsstättengenehmigung`, "de")
    .addLabel(`Business Premises Permit Creator`, "en"),

  BusinessPremisesInspectionInterval: new LitVocabTerm(
    _NS("BusinessPremisesInspectionInterval"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Grundstückinspektionsintervall`, "de")
    .addLabel(`Business Premises Inspection Interval`, "en"),

  // ----------------------------------------------------------------
  // land-registry-office (Katasteramt)
  // ----------------------------------------------------------------

  PropertyData: new LitVocabTerm(
    _NS("PropertyData"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Grundstücksdaten`, "de")
    .addLabel(`Property Data`, "en"),

  PropertyDataCreator: new LitVocabTerm(
    _NS("PropertyDataCreator"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Herausgeber der Grundstücksdaten`, "de")
    .addLabel(`Property Data Creator`, "en"),

  PropertyDataSize: new LitVocabTerm(
    _NS("PropertyDataSize"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Grundstücksgröße`, "de")
    .addLabel(`Property Size`, "en"),

  // ----------------------------------------------------------------
  // parental-benefits-office (Elterngeldstelle)
  // ----------------------------------------------------------------

  ParentalBenefitNotice: new LitVocabTerm(
    _NS("ParentalBenefitNotice"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Elterngeldbescheid`, "de")
    .addLabel(`Parental Benefit Notice`, "en"),

  ParentalBenefitNoticeCreator: new LitVocabTerm(
    _NS("ParentalBenefitNoticeCreator"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Herausgeber des Elterngeldbescheids`, "de")
    .addLabel(`Parental Benefit Notice Creator`, "en"),

  ParentalBenefitAmount: new LitVocabTerm(
    _NS("ParentalBenefitAmount"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Elterngeldbetrag`, "de")
    .addLabel(`Parental Benefit Amount`, "en"),

  // ----------------------------------------------------------------
  // reconstruction-loan-corporation (Kfw)
  // ----------------------------------------------------------------

  CreditNotice: new LitVocabTerm(
    _NS("CreditNotice"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Kreditbescheid`, "de")
    .addLabel(`Credit Notice`, "en"),

  CreditNoticeCreator: new LitVocabTerm(
    _NS("CreditNoticeCreator"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Herausgeber des Kreditbescheids`, "de")
    .addLabel(`Credit Notice Creator`, "en"),

  CreditAmount: new LitVocabTerm(
    _NS("CreditAmount"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Kreditbetrag`, "de")
    .addLabel(`Credit Amount`, "en"),

  CreditPeriod: new LitVocabTerm(
    _NS("CreditPeriod"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Kreditlaufzeit`, "de")
    .addLabel(`Credit Period`, "en"),

  // ----------------------------------------------------------------
  // registration-office (Einwohnermeldeamt)
  // ----------------------------------------------------------------

  IdentityCard: new LitVocabTerm(
    _NS("IdentityCard"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Personalausweis`, "de")
    .addLabel(`Identity Card`, "en"),

  IdentityCardCreator: new LitVocabTerm(
    _NS("IdentityCardCreator"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Herausgeber des Personalausweis`, "de")
    .addLabel(`Identity Card Creator`, "en"),

  IdentityCardNumber: new LitVocabTerm(
    _NS("IdentityCardNumber"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Personalausweis-Nr.`, "de")
    .addLabel(`Identity Card Number`, "en"),

  // ----------------------------------------------------------------
  //  tax-office (Finanzamt)
  // ----------------------------------------------------------------

  TaxDeclaration: new LitVocabTerm(
    _NS("TaxDeclaration"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Steuererklärung`, "de")
    .addLabel(`Tax Declaration`, "en"),

  TaxDeclarationCreator: new LitVocabTerm(
    _NS("TaxDeclarationCreator"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Herausgeber der Steuererklärung`, "de")
    .addLabel(`Tax Declaration Creator`, "en"),

  TaxID: new LitVocabTerm(
    _NS("TaxID"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Steuernummer`, "de")
    .addLabel(`Tax ID`, "en"),

  // ----------------------------------------------------------------
  // trade-office (Gewerbeamt)
  // ----------------------------------------------------------------

  TradeLicence: new LitVocabTerm(
    _NS("TradeLicence"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Gewerbeschein`, "de")
    .addLabel(`Trade Licence`, "en"),

  TradeLicenceCreator: new LitVocabTerm(
    _NS("TradeLicenceCreator"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Herausgeber des Gewerbescheins`, "de")
    .addLabel(`Trade Licence Creator`, "en"),

  TradeID: new LitVocabTerm(
    _NS("TradeID"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Umsatzsteuernummer`, "de")
    .addLabel(`Trade ID`, "en"),

  // ----------------------------------------------------------------
  // vehicle-registration-office (Kfz-Zulassungsstelle)
  // ----------------------------------------------------------------

  LicensePlate: new LitVocabTerm(
    _NS("LicensePlate"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Kennzeichen`, "de")
    .addLabel(`License Plate`, "en"),

  LicensePlateCreator: new LitVocabTerm(
    _NS("LicensePlateCreator"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Herausgeber des Kennzeichens`, "de")
    .addLabel(`License Plate Creator`, "en"),

  LicensePlateNumber: new LitVocabTerm(
    _NS("LicensePlateNumber"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Kennzeichennummer`, "de")
    .addLabel(`License Plate Number`, "en"),
};
