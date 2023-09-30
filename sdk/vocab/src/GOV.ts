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

  VehicleInsurance: new LitVocabTerm(
    _NS("VehicleInsurance"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Kfz-Versicherungsschein`, "de")
    .addComment(
      "Ein Dokument, das nachweist, dass ein Kraftfahrzeug versichert ist, und das Einzelheiten zum Versicherungsschutz enthält.",
      "de"
    )
    .addLabel(`Motor Vehicle Insurance Certificate`, "en")
    .addComment(
      "A document proving that a motor vehicle is insured, providing coverage details.",
      "en"
    ),

  VehicleInsuranceCreator: new LitVocabTerm(
    _NS("VehicleInsuranceCreator"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Herausgeber des Kfz-Versicherungsschein`, "de")
    .addComment(
      "Die Stelle oder Person, die für die Erstellung und Ausstellung von Kfz-Versicherungsscheinen zuständig ist.",
      "de"
    )
    .addLabel(`Motor Vehicle Insurance Certificate Creator`, "en")
    .addComment(
      "The entity or person responsible for generating and issuing motor vehicle insurance certificates.",
      "en"
    ),

  VehicleInsuranceID: new LitVocabTerm(
    _NS("VehicleInsuranceID"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Kfz-Versichertennummer`, "de")
    .addComment(
      "Eine eindeutige Identifikationsnummer, die mit einer bestimmten Kfz-Versicherungspolice verbunden ist.",
      "de"
    )
    .addLabel(`Motor Vehicle Insurance ID`, "en")
    .addComment(
      "A unique identification number associated with a specific motor vehicle insurance policy.",
      "en"
    ),

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
    .addComment(
      "Offizielle Genehmigung der örtlichen Behörden für den Beginn von Bau- oder Renovierungsarbeiten an einer Immobilie.",
      "de"
    )
    .addLabel(`Building Permit`, "en")
    .addComment(
      "Official authorization from local authorities to commence construction or renovation on a property.",
      "en"
    ),

  BuildingPermitCreator: new LitVocabTerm(
    _NS("BuildingPermitCreator"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Herausgeber der Baugenehmigung`, "de")
    .addComment(
      "Die für die Erteilung von Baugenehmigungen und die Überwachung von Bauprojekten zuständige Stelle oder Behörde.",
      "de"
    )
    .addLabel(`Building Permit Creator`, "en")
    .addComment(
      "The entity or agency responsible for granting building permits and overseeing construction projects.",
      "en"
    ),

  BuildingCompletion: new LitVocabTerm(
    _NS("BuildingCompletion"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Baufertigstellung`, "de")
    .addComment(
      "Das Jahr, in dem die Bauarbeiten an einem Gebäude abgeschlossen sind und es zur Nutzung oder zum Bezug bereit ist.",
      "de"
    )
    .addLabel(`Building Completion`, "en")
    .addComment(
      "The year at which construction work on a building is finished and it is ready for use or occupancy.",
      "en"
    ),

  // ----------------------------------------------------------------
  // customs (Zoll)
  // ----------------------------------------------------------------

  VehicleRegistration: new LitVocabTerm(
    _NS("VehicleRegistration"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Fahrzeugschein`, "de")
    .addComment(
      "Ein Dokument, das die Zulassung eines Fahrzeugs bei den zuständigen Behörden bestätigt und wichtige Details enthält.",
      "de"
    )
    .addLabel(`Vehicle Registration Certificate`, "en")
    .addComment(
      "A document confirming a vehicle's registration with relevant authorities, containing key details.",
      "en"
    ),

  VehicleRegistrationCreator: new LitVocabTerm(
    _NS("VehicleRegistrationCreator"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Herausgeber des Fahrzeugscheins`, "de")
    .addComment(
      "Die Organisation oder Abteilung, die für die Ausstellung von Fahrzeugzulassungsbescheinigungen zuständig ist.",
      "de"
    )
    .addLabel(`Vehicle Registration Certificate Creator`, "en")
    .addComment(
      "The organization or department responsible for issuing vehicle registration certificates.",
      "en"
    ),

  VehicleConstructionYear: new LitVocabTerm(
    _NS("VehicleConstructionYear"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Fahrzeugbaujahr`, "de")
    .addComment(
      "Das Jahr, in dem ein Fahrzeug ursprünglich hergestellt oder gebaut wurde.",
      "de"
    )
    .addLabel(`Vehicle Construction Year`, "en")
    .addComment(
      "The year in which a vehicle was originally manufactured or constructed.",
      "en"
    ),

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
    .addComment(
      "Ein Dokument, das die Empfänger über die Verfügbarkeit von finanzieller Unterstützung oder Finanzierungsmöglichkeiten informiert.",
      "de"
    )
    .addLabel(`Funding Notice`, "en")
    .addComment(
      "A document informing recipients about the availability of financial support or funding opportunities.",
      "en"
    ),

  FundingNoticeCreator: new LitVocabTerm(
    _NS("FundingNoticeCreator"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Herausgeber des Förderbescheids`, "de")
    .addComment(
      "Die für die Ausstellung von Förderbescheiden und die Verwaltung von Förderprogrammen zuständige Stelle oder Organisation.",
      "de"
    )
    .addLabel(`Funding Notice Creator`, "en")
    .addComment(
      "The entity or organization responsible for issuing funding notices and managing funding programs.",
      "en"
    ),

  FundingGrant: new LitVocabTerm(
    _NS("FundingGrant"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Förderzuschuss`, "de")
    .addComment(
      "Finanzielle Unterstützung, die Einzelpersonen, Unternehmen oder Organisationen für bestimmte Zwecke oder Projekte gewährt wird.",
      "de"
    )
    .addLabel(`Funding Grant`, "en")
    .addComment(
      "Financial assistance provided to individuals, businesses, or organizations for specific purposes or projects.",
      "en"
    ),

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
    .addComment(
      "Offizielle Genehmigung, die es einem Unternehmen erlaubt, an einem bestimmten Ort tätig zu sein.",
      "de"
    )
    .addLabel(`Business Premises Permit`, "en")
    .addComment(
      "Official permission allowing a business to operate from a specific location.",
      "en"
    ),

  BusinessPremisesPermitCreator: new LitVocabTerm(
    _NS("BusinessPremisesPermitCreator"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Herausgeber der Betriebsstättengenehmigung`, "de")
    .addComment(
      "Die Behörde, die für die Erteilung von Genehmigungen für den Betrieb von Unternehmen an bestimmten Standorten zuständig ist.",
      "de"
    )
    .addLabel(`Business Premises Permit Creator`, "en")
    .addComment(
      "The authority responsible for granting permits to operate businesses at specific premises.",
      "en"
    ),

  BusinessPremisesInspectionInterval: new LitVocabTerm(
    _NS("BusinessPremisesInspectionInterval"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Grundstückinspektionsintervall`, "de")
    .addComment(
      "Die Häufigkeit, mit der Inspektionen von Geschäftsräumen erforderlich sind, um die Einhaltung der Vorschriften zu gewährleisten.",
      "de"
    )
    .addLabel(`Business Premises Inspection Interval`, "en")
    .addComment(
      "The frequency at which inspections of business premises are required to ensure compliance with regulations.",
      "en"
    ),

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
    .addComment(
      "Informationen und Details, die sich auf eine bestimmte Immobilie beziehen, wie z. B. Eigentumsverhältnisse, Abmessungen und Bewertung.",
      "de"
    )
    .addLabel(`Property Data`, "en")
    .addComment(
      "Information and details related to a specific property, such as ownership, dimensions, and valuation.",
      "en"
    ),

  PropertyDataCreator: new LitVocabTerm(
    _NS("PropertyDataCreator"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Herausgeber der Grundstücksdaten`, "de")
    .addComment(
      "Die Quelle oder Organisation, die für die Sammlung und Pflege von immobilienbezogenen Informationen verantwortlich ist.",
      "de"
    )
    .addLabel(`Property Data Creator`, "en")
    .addComment(
      "The source or organization responsible for collecting and maintaining property-related information.",
      "en"
    ),

  PropertyDataSize: new LitVocabTerm(
    _NS("PropertyDataSize"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Grundstücksgröße`, "de")
    .addComment(
      "Die physischen Abmessungen oder die Fläche einer Immobilie.",
      "de"
    )
    .addLabel(`Property Size`, "en")
    .addComment("The physical dimensions or area of a property.", "en"),

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
    .addComment(
      "Ein Dokument, das Eltern über ihren Anspruch auf Elterngeld und die damit verbundenen Einzelheiten informiert.",
      "de"
    )
    .addLabel(`Parental Benefit Notice`, "en")
    .addComment(
      "A document informing parents about their eligibility for parental benefits and the associated details.",
      "en"
    ),

  ParentalBenefitNoticeCreator: new LitVocabTerm(
    _NS("ParentalBenefitNoticeCreator"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Herausgeber des Elterngeldbescheids`, "de")
    .addComment(
      "Die Behörde oder Einrichtung, die für die Ausstellung von Elterngeldbescheiden zuständig ist.",
      "de"
    )
    .addLabel(`Parental Benefit Notice Creator`, "en")
    .addComment(
      "The government agency or institution responsible for issuing parental benefit notices.",
      "en"
    ),

  ParentalBenefitAmount: new LitVocabTerm(
    _NS("ParentalBenefitAmount"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Elterngeldbetrag`, "de")
    .addComment(
      "Die finanzielle Unterstützung, die den Eltern während ihrer Elternzeit gewährt wird.",
      "de"
    )
    .addLabel(`Parental Benefit Amount`, "en")
    .addComment(
      "The financial support provided to parents during their designated parental leave.",
      "en"
    ),

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
    .addComment(
      "Ein Dokument, das eine Privatperson oder ein Unternehmen über ein kreditrelevantes Ereignis oder eine Änderung der Kreditbedingungen informiert.",
      "de"
    )
    .addLabel(`Credit Notice`, "en")
    .addComment(
      "A document informing an individual or business about a credit-related event or change in credit terms.",
      "en"
    ),

  CreditNoticeCreator: new LitVocabTerm(
    _NS("CreditNoticeCreator"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Herausgeber des Kreditbescheids`, "de")
    .addComment(
      "Das Finanzinstitut oder die Kreditauskunftei, die für den Versand von Kreditmitteilungen zuständig ist.",
      "de"
    )
    .addLabel(`Credit Notice Creator`, "en")
    .addComment(
      "The financial institution or credit agency responsible for sending credit notices.",
      "en"
    ),

  CreditAmount: new LitVocabTerm(
    _NS("CreditAmount"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Kreditbetrag`, "de")
    .addComment(
      "Der Geldbetrag, der von einer natürlichen oder juristischen Person als Kredit gewährt oder aufgenommen wird.",
      "de"
    )
    .addLabel(`Credit Amount`, "en")
    .addComment(
      "The sum of money extended as credit or borrowed by an individual or entity.",
      "en"
    ),

  CreditPeriod: new LitVocabTerm(
    _NS("CreditPeriod"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Kreditlaufzeit`, "de")
    .addComment(
      "Die Dauer, innerhalb derer ein geliehener Kredit zurückgezahlt werden muss, einschließlich etwaiger Zinsen.",
      "de"
    )
    .addLabel(`Credit Period`, "en")
    .addComment(
      "The duration within which borrowed credit must be repaid, including any applicable interest.",
      "en"
    ),

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
    .addComment(
      "Ein von der Regierung ausgestelltes Dokument, das zur Bestätigung der Identität einer Person verwendet wird und oft ein Foto und persönliche Informationen enthält.",
      "de"
    )
    .addLabel(`Identity Card`, "en")
    .addComment(
      "A government-issued document used to confirm an individual's identity, often including a photograph and personal information.",
      "en"
    ),

  IdentityCardCreator: new LitVocabTerm(
    _NS("IdentityCardCreator"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Herausgeber des Personalausweis`, "de")
    .addComment(
      "Die für die Ausstellung von Personalausweisen zuständige Regierungsbehörde oder Abteilung.",
      "de"
    )
    .addLabel(`Identity Card Creator`, "en")
    .addComment(
      "The government agency or department responsible for issuing identity cards.",
      "en"
    ),

  IdentityCardNumber: new LitVocabTerm(
    _NS("IdentityCardNumber"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Personalausweis-Nr.`, "de")
    .addComment(
      "Ein eindeutiger alphanumerischer Code, der dem Personalausweis einer Person zu Identifikationszwecken zugewiesen wird.",
      "de"
    )
    .addLabel(`Identity Card Number`, "en")
    .addComment(
      "A unique alphanumeric code assigned to an individual's identity card for identification purposes.",
      "en"
    ),

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
    .addComment(
      "Eine formelle Erklärung, in der die finanziellen Details und das Einkommen einer Person oder eines Unternehmens für die Steuerveranlagung offengelegt werden.",
      "de"
    )
    .addLabel(`Tax Declaration`, "en")
    .addComment(
      "A formal statement disclosing an individual's or business's financial details and income for tax assessment.",
      "en"
    ),

  TaxDeclarationCreator: new LitVocabTerm(
    _NS("TaxDeclarationCreator"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Herausgeber der Steuererklärung`, "de")
    .addComment(
      "Die für die Bearbeitung und Erfassung von Steuererklärungen zuständige Stelle, häufig eine Steuerbehörde.",
      "de"
    )
    .addLabel(`Tax Declaration Creator`, "en")
    .addComment(
      "The entity responsible for processing and recording tax declarations, often a tax authority.",
      "en"
    ),

  TaxID: new LitVocabTerm(
    _NS("TaxID"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Steuernummer`, "de")
    .addComment(
      "Eine eindeutige Identifikationsnummer, die Einzelpersonen und Unternehmen für steuerliche Zwecke zugewiesen wird.",
      "de"
    )
    .addLabel(`Tax ID`, "en")
    .addComment(
      "A unique identification number assigned to individuals and businesses for tax-related purposes.",
      "en"
    ),

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
    .addComment(
      "Offizielle Genehmigung, die es einer Person oder einem Unternehmen erlaubt, ein bestimmtes Gewerbe oder einen bestimmten Beruf auszuüben.",
      "de"
    )
    .addLabel(`Trade Licence`, "en")
    .addComment(
      "Official authorization permitting an individual or business to engage in a specific trade or occupation.",
      "en"
    ),

  TradeLicenceCreator: new LitVocabTerm(
    _NS("TradeLicenceCreator"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Herausgeber des Gewerbescheins`, "de")
    .addComment(
      "Die Aufsichtsbehörde oder lokale Behörde, die für die Erteilung von Gewerbeerlaubnissen zuständig ist.",
      "de"
    )
    .addLabel(`Trade Licence Creator`, "en")
    .addComment(
      "The regulatory body or local authority responsible for issuing trade licenses.",
      "en"
    ),

  TradeID: new LitVocabTerm(
    _NS("TradeID"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Umsatzsteuernummer`, "de")
    .addComment(
      "Eine eindeutige Kennung, die mit einem bestimmten Gewerbe oder Unternehmen für Verfolgungs- und Regulierungszwecke verbunden ist.",
      "de"
    )
    .addLabel(`Trade ID`, "en")
    .addComment(
      "A unique identifier associated with a specific trade or business for tracking and regulatory purposes.",
      "en"
    ),

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
    .addComment(
      "Ein Schild mit einer eindeutigen Kombination aus Zahlen und Buchstaben zur Identifizierung eines Kraftfahrzeugs.",
      "de"
    )
    .addLabel(`License Plate`, "en")
    .addComment(
      "A plate displaying a unique combination of numbers and letters to identify a motor vehicle.",
      "en"
    ),

  LicensePlateCreator: new LitVocabTerm(
    _NS("LicensePlateCreator"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Herausgeber des Kennzeichens`, "de")
    .addComment(
      "Die für die Ausgabe von Nummernschildern zuständige Regierungsbehörde oder Abteilung.",
      "de"
    )
    .addLabel(`License Plate Creator`, "en")
    .addComment(
      "The government agency or department responsible for issuing license plates.",
      "en"
    ),

  LicensePlateNumber: new LitVocabTerm(
    _NS("LicensePlateNumber"),
    // @ts-ignore
    dataFactory,
    getLocalStore(),
    false
  )
    .addLabel(`Kennzeichennummer`, "de")
    .addComment(
      "Der alphanumerische Code, der auf dem Nummernschild eines Fahrzeugs zur Identifizierung im Straßenverkehr angezeigt wird.",
      "de"
    )
    .addLabel(`License Plate Number`, "en")
    .addComment(
      "The alphanumeric code displayed on a vehicle's license plate for identification on the road.",
      "en"
    ),
};
