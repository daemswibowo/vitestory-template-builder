export type Schema = {
  type: string;
  required?: string[];
  label?: string;
  description?: string;
  hint?: string;
  format?: string;
  properties?: {
    [key: string]: Schema;
  };
  items?: Schema;
};

export type Section = {
  title: string;
  sub_title?: string;
};

export type SchemaDict = {
  [x: string]: Schema;
};

export type FormSchema = {
  schema: SchemaDict;
  sections: {
    [x: string]: Section;
  };
};
