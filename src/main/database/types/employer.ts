export interface Employer {
  employerId: number | bigint; // Auto-generated
  name: string;
  createdAt: string;
}

export interface EmployerInsert {
  name: string;
}

export interface EmployerUpdate {
  employerId: number | bigint;
  name?: string;
}

export interface EmployerDelete {
  employerId: number | bigint;
}
