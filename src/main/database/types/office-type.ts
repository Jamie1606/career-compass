export interface OfficeType {
  officeTypeId: number | bigint; // Auto-generated
  name: string;
  createdAt: string;
}

export interface OfficeTypeInsert {
  name: string;
}

export interface OfficeTypeUpdate {
  officeTypeId: number | bigint;
  name?: string;
}

export interface OfficeTypeDelete {
  officeTypeId: number | bigint;
}
