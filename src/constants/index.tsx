import React from "react";
import {
    Globe,
    Rocket,
    Code2,
    Cloud,
    Palette,
    ShieldCheck,
    ShoppingCart,
    Cpu,
    Smartphone,
    Layout as LayoutIcon,
    Sparkles,
    Zap,
    Bot,
    FileText,
    Briefcase as BriefcaseIcon,
    Users,
    Heart,
    CheckCircle,
    Video,
    Lock,
    Infinity as InfinityIcon,
    Search,
    Send,
    Mail,
    Phone,
} from "lucide-react";

export const IconMap: Record<string, React.ReactNode> = {
    Globe: <Globe className="w-8 h-8" />,
    Rocket: <Rocket className="w-8 h-8" />,
    Code2: <Code2 className="w-8 h-8" />,
    Cloud: <Cloud className="w-8 h-8" />,
    Palette: <Palette className="w-8 h-8" />,
    ShieldCheck: <ShieldCheck className="w-8 h-8" />,
    ShoppingCart: <ShoppingCart className="w-8 h-8" />,
    Cpu: <Cpu className="w-8 h-8" />,
    Smartphone: <Smartphone className="w-8 h-8" />,
    Layout: <LayoutIcon className="w-8 h-8" />,
    Sparkles: <Sparkles className="w-8 h-8" />,
    Zap: <Zap className="w-8 h-8" />,
    Bot: <Bot className="w-8 h-8" />,
    FileText: <FileText className="w-8 h-8" />,
    Briefcase: <BriefcaseIcon className="w-8 h-8" />,
    Users: <Users className="w-8 h-8" />,
    Heart: <Heart className="w-8 h-8" />,
    CheckCircle: <CheckCircle className="w-8 h-8" />,
    Video: <Video className="w-8 h-8" />,
    Lock: <Lock className="w-8 h-8" />,
    Infinity: <InfinityIcon className="w-8 h-8" />,
    Search: <Search className="w-8 h-8" />,
    Send: <Send className="w-8 h-8" />,
    Mail: <Mail className="w-8 h-8" />,
    Phone: <Phone className="w-8 h-8" />,
};

export const JOBS = [
    {
        title: "Senior Full Stack Engineer",
        department: "Engineering",
        location: "Remote / Hybrid",
        type: "Full-time",
        description: "Lead the development of high-performance web applications using React, Node.js, and cloud-native architectures."
    },
    {
        title: "Lead UI/UX Designer",
        department: "Design",
        location: "Remote",
        type: "Full-time",
        description: "Craft visionary digital experiences and define the visual language for next-generation products."
    },
    {
        title: "AI Solutions Architect",
        department: "AI & Innovation",
        location: "Hybrid",
        type: "Full-time",
        description: "Design and implement cutting-edge AI integrations and machine learning models for enterprise clients."
    },
    {
        title: "Product Manager",
        department: "Product",
        location: "Remote",
        type: "Full-time",
        description: "Bridge the gap between business goals and technical execution to deliver world-class digital products."
    }
];

export const SERVICES = [
    {
        id: "enterprise-architecture",
        title: "Enterprise Architecture",
        description: "Designing complex systems that scale with your business growth.",
        fullDescription: "We specialize in designing and implementing enterprise-grade architectures that are robust, scalable, and future-proof. Our approach focuses on creating modular systems that can evolve with your business, ensuring long-term stability and performance.",
        features: ["System Design", "Scalability Planning", "Cloud Integration", "Legacy Modernization", "Performance Optimization"],
        icon: <Globe className="w-8 h-8" />,
        color: "from-orange-500/20 to-orange-600/20",
        size: "md:col-span-1",
        path: "/services/enterprise-architecture"
    },
    {
        id: "product-strategy",
        title: "Product Strategy",
        description: "Defining the roadmap for successful digital product launches.",
        fullDescription: "A great product starts with a great strategy. We help you define your product vision, identify market opportunities, and create a clear roadmap for success. Our strategic process ensures that every feature we build is aligned with your business goals and user needs.",
        features: ["Market Analysis", "User Research", "Roadmap Development", "MVP Definition", "Growth Strategy"],
        icon: <Rocket className="w-8 h-8" />,
        color: "from-orange-500/20 to-orange-600/20",
        size: "md:col-span-1",
        path: "/services/product-strategy"
    },
    {
        id: "custom-software",
        title: "Custom Software Development",
        description: "We build robust, scalable, and high-performance software tailored to your specific business needs. From enterprise ERPs to specialized automation tools.",
        fullDescription: "Our custom software development service is designed to solve your unique business challenges. We don't believe in one-size-fits-all solutions. Instead, we work closely with you to understand your processes, goals, and pain points to build software that truly adds value. Whether you need a complex enterprise system, a specialized internal tool, or a customer-facing application, our team of expert developers uses the latest technologies and best practices to deliver high-quality, scalable, and secure software.",
        features: ["Scalable Architecture", "Legacy System Integration", "API Development", "Cloud-Native Design", "Microservices Architecture"],
        icon: <Code2 className="w-8 h-8" />,
        color: "from-orange-500/20 to-orange-600/20",
        size: "md:col-span-1",
        path: "/services/custom-software"
    },
    {
        id: "cloud-infra",
        title: "Cloud Infrastructure",
        description: "Modernize your operations with secure, high-availability cloud solutions. We specialize in AWS, Azure, and Google Cloud migrations.",
        fullDescription: "In today's digital landscape, a robust cloud infrastructure is essential for agility, scalability, and cost-efficiency. We help businesses navigate their cloud journey, from initial strategy and migration to ongoing optimization and management. Our experts specialize in building secure, high-availability environments on leading platforms like AWS, Azure, and Google Cloud, ensuring your applications are always performant and resilient.",
        features: ["Serverless Computing", "Auto-scaling", "Disaster Recovery", "Cloud Security Audits", "Cost Optimization"],
        icon: <Cloud className="w-8 h-8" />,
        color: "from-orange-500/20 to-orange-600/20",
        size: "md:col-span-1",
        path: "/services/cloud-infra"
    },
    {
        id: "ui-ux-design",
        title: "UI/UX Experience Design",
        description: "We create intuitive digital experiences that delight users and drive conversions. Our design process is data-driven and user-centric.",
        fullDescription: "Great design is more than just aesthetics; it's about how a product works and how it makes users feel. Our UI/UX design process is deeply rooted in user research and data-driven insights. We create intuitive, engaging, and accessible digital experiences that not only look beautiful but also drive meaningful results for your business. From wireframing and prototyping to final visual design, we ensure every interaction is intentional and delightful.",
        features: ["User Research", "Prototyping", "Visual Identity", "Interaction Design", "Accessibility Audits"],
        icon: <Palette className="w-8 h-8" />,
        color: "from-orange-500/20 to-orange-600/20",
        size: "md:col-span-1",
        path: "/services/ui-ux-design"
    },
    {
        id: "cybersecurity",
        title: "Advanced Cybersecurity",
        description: "Protect your business from evolving digital threats with our comprehensive security audits, penetration testing, and 24/7 monitoring.",
        fullDescription: "As cyber threats become increasingly sophisticated, protecting your digital assets is more critical than ever. We provide comprehensive cybersecurity solutions designed to identify vulnerabilities, mitigate risks, and ensure your business remains resilient. Our services include deep security audits, advanced penetration testing, and 24/7 proactive monitoring, giving you peace of mind in an uncertain digital world.",
        features: ["Threat Detection", "Data Encryption", "Compliance Audits", "Incident Response", "Security Training"],
        icon: <ShieldCheck className="w-8 h-8" />,
        color: "from-orange-500/20 to-orange-600/20",
        size: "md:col-span-1",
        path: "/services/cybersecurity"
    },
    {
        id: "ecommerce",
        title: "E-commerce Solutions",
        description: "Scale your retail business with powerful, custom-built e-commerce platforms designed for high traffic and seamless checkout experiences.",
        fullDescription: "We build high-performance e-commerce platforms that are designed to scale with your business. Whether you're a niche boutique or a global retailer, our solutions provide a seamless shopping experience for your customers and powerful management tools for your team. We focus on speed, security, and conversion optimization to ensure your online store is a powerful driver of growth.",
        features: ["Payment Integration", "Inventory Management", "SEO Optimized", "Mobile-First Commerce", "Analytics Dashboard"],
        icon: <ShoppingCart className="w-8 h-8" />,
        color: "from-orange-500/20 to-orange-600/20",
        size: "md:col-span-1",
        path: "/services/ecommerce"
    },
    {
        id: "ai-ml",
        title: "AI & Machine Learning",
        description: "Leverage the power of artificial intelligence to automate complex tasks, predict trends, and gain deep insights from your data.",
        fullDescription: "Artificial Intelligence is transforming how businesses operate and compete. We help you harness the power of AI and Machine Learning to unlock new opportunities, automate repetitive tasks, and gain a deeper understanding of your data. From predictive analytics and natural language processing to custom computer vision solutions, we build intelligent systems that drive innovation and efficiency.",
        features: ["Predictive Analytics", "NLP Solutions", "Computer Vision", "Custom AI Models", "Data Engineering"],
        icon: <Cpu className="w-8 h-8" />,
        color: "from-orange-500/20 to-orange-600/20",
        size: "md:col-span-1",
        path: "/services/ai-ml"
    }
];

export const PROJECTS = [
    {
        id: "project-alpha",
        title: "Project Alpha",
        description: "A cutting-edge AI-driven platform for predictive maintenance in industrial manufacturing.",
        fullDescription: "Project Alpha revolutionized industrial maintenance by implementing a sophisticated AI model that predicts equipment failure before it happens. By analyzing real-time sensor data, the platform identifies subtle patterns that indicate wear and tear, allowing for proactive repairs that save millions in downtime and maintenance costs.",
        category: "AI & ML",
        client: "Global Manufacturing Corp",
        year: "2025",
        results: ["45% reduction in unplanned downtime", "30% decrease in maintenance costs", "Extended equipment lifespan by 20%"],
        challenge: "High maintenance costs and unpredictable equipment failures.",
        solution: "AI-driven predictive maintenance platform.",
        path: "/projects/project-alpha"
    },
    {
        id: "project-beta",
        title: "Project Beta",
        description: "A high-performance e-commerce engine designed for seamless global scaling.",
        fullDescription: "Project Beta involved building a next-generation e-commerce platform from the ground up. The goal was to create a system that could handle massive traffic spikes during global sales events while maintaining sub-second page load times. The resulting platform features a headless architecture, global CDN integration, and an ultra-fast checkout process.",
        category: "E-commerce",
        client: "FashionForward Retail",
        year: "2024",
        results: ["Sub-500ms page load times globally", "200% increase in peak traffic capacity", "15% improvement in conversion rate"],
        challenge: "Slow page loads and inability to handle traffic spikes.",
        solution: "Headless e-commerce architecture with global CDN.",
        path: "/projects/project-beta"
    }
];

export const CASE_STUDIES = [
    {
        id: "digital-transformation-retail",
        title: "Digital Transformation for Retail Giant",
        description: "How we helped a traditional retailer pivot to a digital-first strategy, increasing online revenue by 300%.",
        fullDescription: "A major traditional retailer was struggling to compete in the digital age. We led a comprehensive digital transformation that involved modernizing their legacy systems, launching a new mobile-first e-commerce platform, and implementing a data-driven marketing strategy. The results were transformative, with online revenue tripling within the first year.",
        category: "Digital Strategy",
        client: "Legacy Retailers Inc.",
        year: "2024",
        challenge: "Declining foot traffic and outdated online presence.",
        solution: "Full-stack e-commerce overhaul and omnichannel integration.",
        results: ["300% increase in online revenue", "50% reduction in operational costs", "90% customer satisfaction rate"],
        image: "https://picsum.photos/seed/retail/800/600",
        path: "/case-studies/digital-transformation-retail"
    },
    {
        id: "ai-healthcare-diagnostics",
        title: "AI-Powered Healthcare Diagnostics",
        description: "Implementing machine learning models to assist radiologists in early cancer detection with 98% accuracy.",
        fullDescription: "In collaboration with leading medical researchers, we developed an AI system designed to assist radiologists in identifying early signs of cancer in medical imaging. The system uses deep learning models trained on millions of images to provide highly accurate diagnostic support, significantly improving early detection rates and patient outcomes.",
        category: "Healthcare AI",
        client: "HealthTech Innovations",
        year: "2025",
        challenge: "High volume of medical images and the need for faster, more accurate screening.",
        solution: "Custom deep learning models integrated into existing diagnostic workflows.",
        results: ["98% diagnostic accuracy", "60% faster screening process", "Improved early detection rates"],
        image: "https://picsum.photos/seed/healthcare/800/600",
        path: "/case-studies/ai-healthcare-diagnostics"
    }
];

export const BLOG_POSTS = [
    {
        id: "future-of-gen-ai",
        title: "The Future of Generative AI",
        description: "How AI is reshaping the software landscape and what it means for the next generation of digital products.",
        fullDescription: "Generative AI is no longer just a buzzword; it's a fundamental shift in how we build and interact with technology. From automated code generation to hyper-personalized user experiences, AI is enabling a new era of digital products that are more intuitive, efficient, and creative than ever before. In this post, we explore the key trends shaping the future of Gen AI and how businesses can prepare for the coming wave of innovation.",
        category: "AI & ML",
        author: "Dr. Sarah Chen",
        date: "March 15, 2026",
        path: "/blog/future-of-gen-ai"
    },
    {
        id: "minimalism-2026",
        title: "Minimalism in 2026",
        description: "Why less is still more in digital products and how to achieve clarity through intentional design choices.",
        fullDescription: "In an increasingly noisy digital world, minimalism is more relevant than ever. But minimalism in 2026 isn't just about white space; it's about intentionality and clarity. It's about removing the friction between the user and their goals. This post dives into the principles of modern minimalism and how designers can create products that feel calm, focused, and profoundly useful.",
        category: "Design",
        author: "Marcus Thorne",
        date: "February 28, 2026",
        path: "/blog/minimalism-2026"
    }
];
