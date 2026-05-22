import { createClient } from "next-sanity";

import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env";

export const sanityClient = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "development" ? false : true,
  perspective: "published",
  stega: {
    enabled: false,
    studioUrl: "/studio",
  },
});

export { isSanityConfigured };
