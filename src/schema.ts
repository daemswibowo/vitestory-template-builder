/**
 * Build your form schema
 */

import type { FormSchema, Schema } from "./types";
import { generateMockValues } from "./utils/generateMockValues";

export const formSchema: FormSchema = {
  schema: {
    date: {
      type: "string",
      format: "date",
    },
    audio_url: {
      type: "string",
      format: "url",
    },
    couple: {
      type: "object",
      required: ["bride", "groom"],
      properties: {
        bride: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              description: "Name of the bride",
            },
            alias: {
              type: "string",
              description: "Alias of the bride",
            },
            description: {
              type: "string",
              description: "About the bride",
            },
          },
        },
        groom: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              description: "Name of the groom",
            },
            alias: {
              type: "string",
              description: "Alias of the bride",
            },
            description: {
              type: "string",
              description: "About the bride",
            },
          },
        },
      },
    },
    appearance: {
      type: "object",
      required: ["header_image", "bride_image", "groom_image"],
      properties: {
        bride_image: {
          type: "file",
          format: "image",
        },
        groom_image: {
          type: "file",
          format: "image",
        },
        header_image: {
          type: "file",
          format: "image",
        },
      },
    },
    event_details: {
      type: "array",
      items: {
        type: "object",
        required: ["venue", "address", "schedule"],
        properties: {
          venue: {
            type: "string",
            description: "Name of the wedding venue",
          },
          address: {
            type: "string",
            description: "Address of the wedding venue",
          },
          pinpoint: {
            type: "object",
            required: ["lat", "lng"],
            properties: {
              lat: {
                type: "number",
                description: "Latitude of the venue",
              },
              lng: {
                type: "number",
                description: "Longitude of the venue",
              },
            },
          },
          schedules: {
            type: "array",
            items: {
              type: "object",
              required: ["name", "start_date"],
              properties: {
                name: {
                  type: "string",
                  description: "Name of the schedule",
                },
                end_date: {
                  type: "string",
                  format: "dateTime",
                  description: "End date time of the wedding ",
                },
                start_date: {
                  type: "string",
                  format: "dateTime",
                  description: "Start date time of the schedule",
                },
              },
            },
          },
        },
      },
    },
  },
  sections: {
    couple: {
      title: "Informasi Pengantin",
      sub_title: "",
    },
    appeareance: {
      title: "Tampilan",
      sub_title: "Ubah tampilan tema",
    },
    event_details: {
      title: "Detail Acara",
      sub_title: "",
    },
  },
};

/**
 * Edit this value to generate mock values
 */
export const formExample = {
  ...generateMockValues(formSchema.schema),
  slug: "my-template-slug", // slug for handling attendance form
  audio_url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
};
