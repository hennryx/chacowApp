export type Paper = {
  id: number;
  title: string;
  type: string;
  datestarted: string | Date;
  datecompleted: string | Date;
  publicationdate?: string | Date | null | undefined;
  journal: string;
  volumenumber: number;
  status: string;
  issue: number;
  issn: string;
  doi?: string | null | undefined;
  url?: string | null | undefined;
  keywords: string;
  taggeduser: string;
};
