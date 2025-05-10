export interface Resume {
  resumeId: number | bigint;
  name: string;
  resume: Blob;
  createdAt: string;
}

export interface ResumeInsert {
  name: string;
  resume: Blob;
}

export interface ResumeUpdate {
  resumeId: number | bigint;
  name?: string;
  resume?: Blob;
}

export interface ResumeDelete {
  resumeId: number | bigint;
}
