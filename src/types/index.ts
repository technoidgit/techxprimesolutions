export interface Service {
    id: string;
    title: string;
    description: string;
    fullDescription: string;
    features: string[];
    icon: string;
    color: string;
    size: string;
    path: string;
    thumbnail_light?: string;
    thumbnail_dark?: string;
    externalLink?: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    fullDescription: string;
    category: string;
    client: string;
    year: string;
    results: string[];
    challenge: string;
    solution: string;
    path: string;
    thumbnail_light?: string;
    thumbnail_dark?: string;
    impact?: string;
    keyPoints?: string[];
    isFeatured?: boolean;
}

export interface CaseStudy {
    id: string;
    title: string;
    description: string;
    fullDescription: string;
    category: string;
    client: string;
    year: string;
    challenge: string;
    solution: string;
    results: string[];
    image: string;
    path: string;
    thumbnail_light?: string;
    thumbnail_dark?: string;
    impact?: string;
    keyPoints?: string[];
    isFeatured?: boolean;
}

export interface BlogPost {
    id: string;
    title: string;
    description: string;
    fullDescription: string;
    category: string;
    author: string;
    date: string;
    path: string;
    thumbnail_light?: string;
    thumbnail_dark?: string;
    impact?: string;
    keyPoints?: string[];
    results?: string[];
    isFeatured?: boolean;
}

export interface Job {
    id?: number;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
}

export interface Testimonial {
    id?: number;
    title: string;
    name: string;
    role: string;
    content: string;
    fullContent?: string;
    avatar: string;
    rating: number;
    isFeatured?: boolean;
    path?: string;
}

export interface Partner {
    id: string;
    title: string;
    description: string;
    fullDescription: string;
    category: string;
    path: string;
    thumbnail_light?: string;
    thumbnail_dark?: string;
    website?: string;
    isFeatured?: boolean;
}

export interface SiteSetting {
    key: string;
    value: string;
}

export interface ContentContextType {
    services: Service[];
    projects: Project[];
    caseStudies: CaseStudy[];
    blogPosts: BlogPost[];
    jobs: Job[];
    testimonials: Testimonial[];
    partners: Partner[];
    settings: Record<string, string>;
    refreshContent: () => Promise<void>;
}
