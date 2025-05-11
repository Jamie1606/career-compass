export interface Resume {
  resumeId: number | bigint;
  name: string;
  resume: Blob;
  createdAt: string;
}
