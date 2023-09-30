import { UrlString, WebId } from "@inrupt/solid-client";
import { GOV } from "vocab";

export const MAINDATA_FOLDER_NAME = "maindata";
export const MAINDATA_FOLDER_PATH = `${MAINDATA_FOLDER_NAME}/`;

export const MAINDATA_FILE_NAME = "maindata.ttl";
export const MAINDATA_FILE_PATH = `${MAINDATA_FOLDER_NAME}/${MAINDATA_FILE_NAME}`;

export const INBOX_FOLDER_NAME = "inbox";
export const INBOX_FOLDER_PATH = `${INBOX_FOLDER_NAME}/`;

export const MESSAGE_TYPE: UrlString =
  "http://custom-predicates.org/messageType";

export const WEB_ID_TO_PROPERTY_MAP: Record<WebId, UrlString> = {};
export const WEB_ID_TO_OFFICE_NAME_MAP: Record<WebId, UrlString> = {};

if (process.env.NEXT_PUBLIC_TRADE_OFFICE_WEB_ID) {
  WEB_ID_TO_PROPERTY_MAP[process.env.NEXT_PUBLIC_TRADE_OFFICE_WEB_ID] =
    GOV.TradeLicence.value;
  WEB_ID_TO_OFFICE_NAME_MAP[process.env.NEXT_PUBLIC_TRADE_OFFICE_WEB_ID] =
    "apps.tradeOffice.app.root.title";
}

if (process.env.NEXT_PUBLIC_REGISTRATION_OFFICE_WEB_ID) {
  WEB_ID_TO_PROPERTY_MAP[process.env.NEXT_PUBLIC_REGISTRATION_OFFICE_WEB_ID] =
    GOV.IdentityCard.value;
  WEB_ID_TO_OFFICE_NAME_MAP[
    process.env.NEXT_PUBLIC_REGISTRATION_OFFICE_WEB_ID
  ] = "apps.registrationOffice.app.root.title";
}

if (process.env.NEXT_PUBLIC_TAX_OFFICE_WEB_ID) {
  WEB_ID_TO_PROPERTY_MAP[process.env.NEXT_PUBLIC_TAX_OFFICE_WEB_ID] =
    GOV.TaxDeclaration.value;
  WEB_ID_TO_OFFICE_NAME_MAP[process.env.NEXT_PUBLIC_TAX_OFFICE_WEB_ID] =
    "apps.taxOffice.app.root.title";
}

if (process.env.NEXT_PUBLIC_VEHICLE_REGISTRATION_OFFICE_WEB_ID) {
  WEB_ID_TO_PROPERTY_MAP[
    process.env.NEXT_PUBLIC_VEHICLE_REGISTRATION_OFFICE_WEB_ID
  ] = GOV.LicensePlate.value;
  WEB_ID_TO_OFFICE_NAME_MAP[
    process.env.NEXT_PUBLIC_VEHICLE_REGISTRATION_OFFICE_WEB_ID
  ] = "apps.vehicleRegistrationOffice.app.root.title";
}

if (process.env.NEXT_PUBLIC_CUSTOMS_WEB_ID) {
  WEB_ID_TO_PROPERTY_MAP[process.env.NEXT_PUBLIC_CUSTOMS_WEB_ID] =
    GOV.VehicleRegistration.value;
  WEB_ID_TO_OFFICE_NAME_MAP[process.env.NEXT_PUBLIC_CUSTOMS_WEB_ID] =
    "apps.customs.app.root.title";
}
if (process.env.NEXT_PUBLIC_LAND_REGISTRY_OFFICE_WEB_ID) {
  WEB_ID_TO_PROPERTY_MAP[process.env.NEXT_PUBLIC_LAND_REGISTRY_OFFICE_WEB_ID] =
    GOV.PropertyData.value;
  WEB_ID_TO_OFFICE_NAME_MAP[
    process.env.NEXT_PUBLIC_LAND_REGISTRY_OFFICE_WEB_ID
  ] = "apps.landRegistryOffice.app.root.title";
}

if (process.env.NEXT_PUBLIC_CONSTRUCTION_OFFICE_WEB_ID) {
  WEB_ID_TO_PROPERTY_MAP[process.env.NEXT_PUBLIC_CONSTRUCTION_OFFICE_WEB_ID] =
    GOV.BuildingPermit.value;
  WEB_ID_TO_OFFICE_NAME_MAP[
    process.env.NEXT_PUBLIC_CONSTRUCTION_OFFICE_WEB_ID
  ] = "apps.constructionOffice.app.root.title";
}

if (process.env.NEXT_PUBLIC_EMPLOYMENT_AGENCY_WEB_ID) {
  WEB_ID_TO_PROPERTY_MAP[process.env.NEXT_PUBLIC_EMPLOYMENT_AGENCY_WEB_ID] =
    GOV.FundingNotice.value;
  WEB_ID_TO_OFFICE_NAME_MAP[process.env.NEXT_PUBLIC_EMPLOYMENT_AGENCY_WEB_ID] =
    "apps.employmentAgency.app.root.title";
}

if (process.env.NEXT_PUBLIC_ENVIRONMENTAL_OFFICE_WEB_ID) {
  WEB_ID_TO_PROPERTY_MAP[process.env.NEXT_PUBLIC_ENVIRONMENTAL_OFFICE_WEB_ID] =
    GOV.BusinessPremisesPermit.value;
  WEB_ID_TO_OFFICE_NAME_MAP[
    process.env.NEXT_PUBLIC_ENVIRONMENTAL_OFFICE_WEB_ID
  ] = "apps.environmentalOffice.app.root.title";
}

if (process.env.NEXT_PUBLIC_CAR_INSURANCE_COMPANY_WEB_ID) {
  WEB_ID_TO_PROPERTY_MAP[process.env.NEXT_PUBLIC_CAR_INSURANCE_COMPANY_WEB_ID] =
    GOV.VehicleInsurance.value;
  WEB_ID_TO_OFFICE_NAME_MAP[
    process.env.NEXT_PUBLIC_CAR_INSURANCE_COMPANY_WEB_ID
  ] = "apps.carInsuranceCompany.app.root.title";
}

if (process.env.NEXT_PUBLIC_RECONSTRUCTION_LOAN_CORPORATION_WEB_ID) {
  WEB_ID_TO_PROPERTY_MAP[
    process.env.NEXT_PUBLIC_RECONSTRUCTION_LOAN_CORPORATION_WEB_ID
  ] = GOV.CreditNotice.value;
  WEB_ID_TO_OFFICE_NAME_MAP[
    process.env.NEXT_PUBLIC_RECONSTRUCTION_LOAN_CORPORATION_WEB_ID
  ] = "apps.reconstructionLoanCorporation.app.root.title";
}

if (process.env.NEXT_PUBLIC_PARENTAL_BENEFITS_OFFICE_WEB_ID) {
  WEB_ID_TO_PROPERTY_MAP[
    process.env.NEXT_PUBLIC_PARENTAL_BENEFITS_OFFICE_WEB_ID
  ] = GOV.ParentalBenefitNotice.value;
  WEB_ID_TO_OFFICE_NAME_MAP[
    process.env.NEXT_PUBLIC_PARENTAL_BENEFITS_OFFICE_WEB_ID
  ] = "apps.parentalBenefitsOffice.app.root.title";
}
