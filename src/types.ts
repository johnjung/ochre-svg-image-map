export type OchreNote = {
  noteNo: number;
  content: OchreString | Array<OchreString>;
};

export type OchreCreator = {
  date: string;
  type: string;
  uuid: string;
  content: string;
};

export type OchreString =
  | string
  | number
  | {
      content?: string | number;
      string?: string | number | OchreString | Array<OchreString>;
      title?: string;
      languages?: string;
      lang?: string;
      rend?: string;
      whitespace?: string;
      links?: {
        resource: OchreLink | Array<OchreLink>;
        concept?:
          | "string"
          | {
              uuid: string;
              content: string | number | OchreString | Array<OchreString>;
            };
        whitespace?: string;
      };
      properties?: { property: OchreProperty };
    };

export type OchreProperty = {
  label: {
    uuid: string;
    content:
      | OchreString
      | Array<OchreString>
      | { string: OchreString | Array<OchreString> };
  };
  value: {
    type: string;
    uuid?: string;
    content:
      | OchreString
      | Array<OchreString>
      | { string: OchreString | Array<OchreString> };
  };
  property?: OchreProperty | Array<OchreProperty>;
};

export type OchreLink = {
  publicationDateTime: string;
  type: string;
  uuid: string;
  content: string;
  rend?: string;
  height: number;
  width: number;
  href: string;
};

export type OchreResource = {
  date: string;
  copyright: string;
  image: {
    publicationDateTime: string;
    content: OchreString | Array<OchreString>;
  };
  project: {
    identification: {
      label: OchreString;
      abbreviation: string;
    };
  };
  identification: {
    label: OchreString;
    abbreviation: string;
    iri: string;
    iriPreview: string;
    heightPreview: number;
    widthPreview: number;
    height: number;
    width: number;
  };
  creators?: { creator: OchreCreator | Array<OchreCreator> };
  notes?: { note: OchreNote | Array<OchreNote> };
  publicationDateTime: string;
  context: {
    context: {
      tree: {
        publicationDateTime: string;
        uuid: string;
        n: number;
        content: string;
      };
      project: {
        uuid: string;
        n: number;
        content: string;
      };
      displayPath: string;
    };
    displayPath: string;
  };
  description: OchreString;
  document: {
    content: { string: OchreString | Array<OchreString> };
  };
  events: {
    event: {
      comment: OchreString;
      label: OchreString;
    };
  };
  links: {
    resource: OchreLink | Array<OchreLink>;
    concept?:
      | "string"
      | {
          uuid: string;
          content: string | number | OchreString | Array<OchreString>;
        };
    whitespace?: string;
  };
  format: string;
  type: string;
  attr: string;
  uuid: string;
  n: number;
  citedBibliography?: {
    reference: {
      citationFormatSpan: {
        span: {
          xmlns: string;
          content: string;
        };
      };
      identification: {
        label: {
          content: OchreString | Array<OchreString>;
        };
      };
      publicationInfo: {
        endDate: {
          year: number;
        };
        startDate: {
          year: number;
        };
      };
      referenceFormatDiv: {
        div: {
          div: {
            class: string;
            content: string;
          };
          xmlns: string;
          style: string;
          class: string;
        };
      };
      publicationDateTime: string;
      context: {
        context: {
          tree: {
            uuid: string;
            n: number;
            content: string;
          };
          project: {
            uuid: string;
            n: number;
            content: string;
          };
          displayPath: string;
        };
        displayPath: string;
      };
      project: {
        identification: {
          label: {
            content: OchreString | Array<OchreString>;
          };
          abbreviation: {
            content: OchreString | Array<OchreString>;
          };
        };
      };
      type: string;
      uuid: string;
      n: number;
      properties: {
        property: OchreProperty | Array<OchreProperty>;
      };
      authors: {
        person: {
          type: string;
          uuid: string;
          content: string;
        };
      };
    };
  };
  properties: {
    property: OchreProperty | Array<OchreProperty>;
  };
};

export type OchreHeadingResource = {
  identification: {
    label: {
      content: OchreString | Array<OchreString>;
    };
  };
  type: string;
  uuid: string;
};

export type OchreHeading = {
  resource: OchreHeadingResource | Array<OchreHeadingResource>;
  name: string;
  heading?: OchreHeading | Array<OchreHeading>;
};

export type OchreMetadata = {
  identifier: {
    content: string;
    xmlns: {
      dc: string;
    };
  };
  description: {
    content: string;
    xmlns: {
      dc: string;
    };
  };
  publisher: {
    content: string;
    xmlns: {
      dc: string;
    };
  };
  language: {
    default?: boolean;
    content: string;
    xmlns: {
      dc: string;
    };
  };
  dataset: {
    content: string;
    xmlns: {
      dc: string;
    };
  };
};

export type OchreConcept = {
  identification: {
    label: OchreString;
  };
  uuid: string;
  n: number;
  properties: {
    property: OchreProperty | Array<OchreProperty>;
  };
};

export type OchreSet = {
  identification: {
    label: OchreString;
  };
  publicationDateTime: string;
  context: {
    context: {
      tree: {
        uuid: string;
        n: number;
        content: OchreString | Array<OchreString>;
      };
      project: {
        uuid: string;
        n: number;
        content: OchreString | Array<OchreString>;
      };
      displayPath: string;
    };
    displayPath: string;
  };
  project: {
    identification: {
      label: OchreString;
      abbreviation: OchreString;
    };
  };
  availability: {
    license:
      | string
      | {
          content: string;
          target: string;
        };
  };
  type: string;
  uuid: string;
  items: {
    resource?: Array<OchreResource>;
    concept?: Array<OchreConcept>;
  };
};

export type OchreSetResponse = {
  ochre: {
    uuidBelongsTo: string;
    metadata: OchreMetadata;
    set: OchreSet;
    publicationDateTime: string;
    belongsTo: string;
    uuid: string;
  };
};

export type OchreResourceResponse = {
  ochre: {
    uuidBelongsTo: string;
    metadata: OchreMetadata;
    languages: string;
    publicationDateTime: string;
    resource: OchreResource;
    belongsTo: string;
    uuid: string;
  };
};

export type OchreTreeResponse = {
  ochre: {
    uuidBelongsTo: string;
    metadata: OchreMetadata;
    tree: {
      identification: {
        label: {
          lang: string;
          content: OchreString | Array<OchreString>;
        };
        abbreviation: {
          rend: string;
          lang: string;
          content: OchreString | Array<OchreString>;
        };
      };
      publicationDateTime: string;
      type: string;
      uuid: string;
      items: {
        resource?: Array<OchreResource>;
        heading?: OchreHeading | Array<OchreHeading>;
      };
    };
    publicationDateTime: string;
    belongsTo: string;
    uuid: string;
  };
};

export type OchreConceptResponse = {
  ochre: {
    uuidBelongsTo: string;
    metadata: OchreMetadata;
    uuid: string;
    belongsTo: string;
    concept: {
      identification: {
        label: OchreString;
        abbreviation: OchreString;
      };
      publicationDateTime: string;
      context: {
        context: {
          tree: {
            publicationDateTime: string;
            uuid: string;
            n: number;
            content: OchreString | Array<OchreString>;
          };
          project: {
            uuid: string;
            n: number;
            content: OchreString | Array<OchreString>;
          };
          displayPath: string;
        };
        displayPath: string;
      };
      project: {
        identification: {
          label: OchreString;
          abbreviation: OchreString;
        };
      };
      availability: {
        license: {
          content: string;
          target: string;
        };
      };
      interpretations: {
        interpretation: {
          interpretationNo: number;
          date: string;
          notes: {
            note: OchreNote | Array<OchreNote>;
          };
          properties: {
            property: {
              property: OchreProperty | Array<OchreProperty>;
            };
          };
        };
        uuid: string;
        n: number;
      };
    };
  };
};

export type OchreItem = {
  ochre: {
    uuidBelongsTo: string;
    metadata: OchreMetadata;
    publicationDateTime: string;
    resource: OchreResource;
    uuid: string;
  };
};

export type MappedInnerContent = {
  text: string;
  rend: Array<string>;
  whitespace: Array<string>;
  link: {
    type: string;
    uuid: string;
    content: string;
    dimensions: {
      width: number;
      height: number;
    } | null;
    rend: Array<string>;
  } | null;
};

export type MappedContent = {
  rend: Array<string>;
  whitespace: Array<string>;
  content: Array<MappedInnerContent>;
};
