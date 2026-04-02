import { createContext } from "react";
import type { ContentContextType } from "../types";

export const ContentContext = createContext<ContentContextType>({
    services: [],
    projects: [],
    caseStudies: [],
    blogPosts: [],
    jobs: [],
    testimonials: [],
    partners: [],
    settings: {},
    refreshContent: async () => { },
});
