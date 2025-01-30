export interface Doc {
  slug: string;
  slugAsParams: string;
  doc: string;
  content: string;
  title: string;
  description: string;
  published: boolean;
  date?: string | undefined;
  _meta: {
    filePath: string;
    fileName: string;
    directory: string;
    path: string;
    extension: string;
  };
}

export interface DocPageProps {
  params: Promise<{ slug: string[] }>;
}
