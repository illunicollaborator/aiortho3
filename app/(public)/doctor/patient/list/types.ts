export interface PatientData {
  id: string;
  registrationNumber: string;
  patientName: string;
  birthDate: string;
  gender: string;
  sa: string;
  doctor: string;
  treatmentPeriod: string;
  registrationDate: string;
  lastPrescriptionDate: string;
  status: string;
  statusType: "waiting" | "prescription" | "completed";
}

export interface StatusBadgeProps {
  status: string;
  type: "waiting" | "prescription" | "completed";
}

export interface TableHeaderCellProps {
  label: string;
  flex: string;
}

export interface PatientTableRowProps {
  id: string;
  registrationNumber: string;
  patientName: string;
  birthDate: string;
  gender: string;
  sa: string;
  doctor: string;
  treatmentPeriod: string;
  registrationDate: string;
  lastPrescriptionDate: string;
  status: string;
  statusType: "waiting" | "prescription" | "completed";
}

export interface PatientListTitleProps {
  title: string;
  count: number;
}

export interface PatientListSearchProps {
  showOnlyMyPatients: boolean;
  setShowOnlyMyPatients: (value: boolean) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export interface PatientListSheetProps {
  showOnlyMyPatients: boolean;
  setShowOnlyMyPatients: (value: boolean) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
} 