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

  IdentityCardNumber: new LitVocabTerm(
    _NS("IdentityCardNumber"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Personalausweis-Nr.`, "de")
    .addLabel(`Identity Card Number`, "en"),

  TradeID: new LitVocabTerm(
    _NS("TradeID"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Umsatzsteuernummer`, "de")
    .addLabel(`Trade ID`, "en"),

  TaxID: new LitVocabTerm(
    _NS("TaxID"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Steuernummer`, "de")
    .addLabel(`Tax ID`, "en"),

  VehicleRegistrationCertificate: new LitVocabTerm(
    _NS("VehicleRegistrationCertificate"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Fahrzeugschein`, "de")
    .addLabel(`Vehicle Registration Certificate`, "en"),

  LicensePlateNumber: new LitVocabTerm(
    _NS("LicensePlateNumber"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Kennzeichen`, "de")
    .addLabel(`License Plate Number`, "en"),

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
    .addLabel(`Herausgeber der Grundstücksdaten `, "de")
    .addLabel(`Property Data Creator`, "en"),

  PropertyDataSize: new LitVocabTerm(
    _NS("PropertyDataSize"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Grundstücksgröße `, "de")
    .addLabel(`Property Size`, "en"),

  BuildingPermit: new LitVocabTerm(
    _NS("BuildingPermit"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Baugenehmigung`, "de")
    .addLabel(`Building Permit`, "en"),

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
    .addLabel(`Herausgeber der Steuererklärung `, "de")
    .addLabel(`Tax Declaration Creator`, "en"),

  BusinessPremisesPermit: new LitVocabTerm(
    _NS("BusinessPremisesPermit"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Betriebsstättengenehmigung`, "de")
    .addLabel(`Business Premises Permit`, "en"),

  MotorVehicleInsuranceCertificate: new LitVocabTerm(
    _NS("MotorVehicleInsuranceCertificate"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Kfz-Versicherungsschein`, "de")
    .addLabel(`Motor Vehicle Insurance Certificate`, "en"),

  CreditNotice: new LitVocabTerm(
    _NS("CreditNotice"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Kreditbescheid`, "de")
    .addLabel(`Credit Notice`, "en"),

  ParentalBenefitNotice: new LitVocabTerm(
    _NS("ParentalBenefitNotice"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Elterngeldbescheid`, "de")
    .addLabel(`Parental Benefit Notice`, "en"),

  FundingNotice: new LitVocabTerm(
    _NS("FundingNotice"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Förderbescheid`, "de")
    .addLabel(`Funding Notice`, "en"),
};
