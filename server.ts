import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import multer from "multer";
import fs from "fs";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

// Load environment variables
dotenv.config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());
  app.use("/uploads", express.static(uploadDir));

  // Initialize tables
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS services (
        id TEXT PRIMARY KEY,
        title TEXT,
        description TEXT,
        "fullDescription" TEXT,
        features TEXT,
        icon TEXT,
        color TEXT,
        size TEXT,
        path TEXT,
        thumbnail_light TEXT,
        thumbnail_dark TEXT,
        "externalLink" TEXT
      );
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        title TEXT,
        description TEXT,
        "fullDescription" TEXT,
        category TEXT,
        client TEXT,
        year TEXT,
        results TEXT,
        challenge TEXT,
        solution TEXT,
        path TEXT,
        thumbnail_light TEXT,
        thumbnail_dark TEXT,
        impact TEXT,
        "keyPoints" TEXT,
        "isFeatured" BOOLEAN DEFAULT FALSE
      );
      CREATE TABLE IF NOT EXISTS case_studies (
        id TEXT PRIMARY KEY,
        title TEXT,
        description TEXT,
        "fullDescription" TEXT,
        category TEXT,
        client TEXT,
        year TEXT,
        challenge TEXT,
        solution TEXT,
        results TEXT,
        image TEXT,
        path TEXT,
        thumbnail_light TEXT,
        thumbnail_dark TEXT,
        impact TEXT,
        "keyPoints" TEXT,
        "isFeatured" BOOLEAN DEFAULT FALSE
      );
      CREATE TABLE IF NOT EXISTS blog_posts (
        id TEXT PRIMARY KEY,
        title TEXT,
        description TEXT,
        "fullDescription" TEXT,
        category TEXT,
        author TEXT,
        date TEXT,
        path TEXT,
        thumbnail_light TEXT,
        thumbnail_dark TEXT,
        impact TEXT,
        "keyPoints" TEXT,
        results TEXT,
        "isFeatured" BOOLEAN DEFAULT FALSE
      );
      CREATE TABLE IF NOT EXISTS jobs (
        id SERIAL PRIMARY KEY,
        title TEXT,
        department TEXT,
        location TEXT,
        type TEXT,
        description TEXT
      );
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        title TEXT,
        name TEXT,
        role TEXT,
        content TEXT,
        "fullContent" TEXT,
        avatar TEXT,
        rating INTEGER DEFAULT 5,
        "isFeatured" BOOLEAN DEFAULT FALSE,
        path TEXT
      );
      CREATE TABLE IF NOT EXISTS site_settings (
        key TEXT PRIMARY KEY,
        value TEXT
      );
      CREATE TABLE IF NOT EXISTS partners (
        id TEXT PRIMARY KEY,
        title TEXT,
        description TEXT,
        "fullDescription" TEXT,
        category TEXT,
        path TEXT,
        thumbnail_light TEXT,
        thumbnail_dark TEXT,
        website TEXT,
        "isFeatured" BOOLEAN DEFAULT FALSE
      );
    `);
    console.log("PostgreSQL tables initialized.");
  } catch (err) {
    console.error("Error initializing PostgreSQL tables:", err);
  }

  // Seed site settings
  try {
    const settingsCount = await pool.query("SELECT COUNT(*) FROM site_settings");
    if (parseInt(settingsCount.rows[0].count) === 0) {
      const initialSettings = [
        ["offer_text", "NEW OFFER: Discount of 2026 is live! Limited time only."],
        ["hero_image", ""],
        ["expert_logo", ""],
        ["about_content", "<h1>About TechxPrime</h1><p>We are a global technology powerhouse specializing in visionary design and world-class engineering.</p>"],
        ["contact_email", "hello@techxprime.com"],
        ["contact_phone", "+1 (555) 000-0000"],
        ["contact_address", "123 Innovation Drive, Silicon Valley, CA"],
        ["twitter_url", "https://twitter.com/techxprime"],
        ["linkedin_url", "https://linkedin.com/company/techxprime"],
        ["instagram_url", "https://instagram.com/techxprime"],
        ["homepage_established_text", "TXP ESTABLISHED 2016"],
        ["homepage_hero_bg", ""],
        ["homepage_hero_title", "Designing the <br /> <span class='text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-orange-600'>Next Generation</span>"],
        ["homepage_hero_description", "TechxPrime is where visionary design meets world-class engineering. We craft digital products that define industries and inspire millions."],
        ["why_choose_us", "<h1>Why Choose Us?</h1><p>We deliver excellence through innovation and dedication.</p>"],
        ["our_expertise", "<h1>Our Expertise</h1><p>From AI to Cloud, we cover it all.</p>"],
        ["quotation_text", "GET THE QUOTATION FREE!!!"],
        ["contact_page_content", "<h1>Contact Us</h1><p>Get in touch with our team for your next big project.</p>"],
        ["privacy_policy", "<h1>Privacy Policy</h1><p>At TechxPrime Solutions, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.</p><h2>Information Collection</h2><p>We collect information you provide directly to us, such as when you fill out a contact form or enquire about our services.</p><h2>Use of Information</h2><p>We use the information we collect to provide, maintain, and improve our services, and to communicate with you.</p><h2>Data Security</h2><p>We implement industry-standard security measures to protect your data from unauthorized access.</p>"],
        ["terms_conditions", "<h1>Terms & Conditions</h1><p>By accessing or using our services, you agree to be bound by these terms.</p><h2>Service Provision</h2><p>TechxPrime Solutions provides technology consulting and engineering services as described on our website.</p><h2>Intellectual Property</h2><p>All content and materials provided as part of our services are the intellectual property of TechxPrime Solutions unless otherwise stated.</p>"],
        ["cookie_policy", "<h1>Cookie Policy</h1><p>We use cookies to improve your experience on our website.</p><h2>What are cookies?</h2><p>Cookies are small text files stored on your device when you visit a website.</p><h2>How we use them</h2><p>We use cookies to understand how you use our site and to remember your preferences.</p>"]
      ];

      for (const setting of initialSettings) {
        await pool.query("INSERT INTO site_settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO NOTHING", setting);
      }
      console.log("Site settings seeded.");
    }
  } catch (err) {
    console.error("Error seeding site settings:", err);
  }

  // Seed initial data if empty
  try {
    const servicesCount = await pool.query("SELECT COUNT(*) FROM services");
    if (parseInt(servicesCount.rows[0].count) === 0) {
      const initialServices = [
        {
          id: "enterprise-architecture",
          title: "Enterprise Architecture",
          description: "Designing complex systems that scale with your business growth.",
          fullDescription: "We specialize in designing and implementing enterprise-grade architectures that are robust, scalable, and future-proof. Our approach focuses on creating modular systems that can evolve with your business, ensuring long-term stability and performance.",
          features: JSON.stringify(["System Design", "Scalability Planning", "Cloud Integration", "Legacy Modernization", "Performance Optimization"]),
          icon: "Globe",
          color: "from-orange-500/20 to-orange-600/20",
          size: "md:col-span-1",
          path: "/services/enterprise-architecture"
        },
        {
          id: "product-strategy",
          title: "Product Strategy",
          description: "Defining the roadmap for successful digital product launches.",
          fullDescription: "A great product starts with a great strategy. We help you define your product vision, identify market opportunities, and create a clear roadmap for success. Our strategic process ensures that every feature we build is aligned with your business goals and user needs.",
          features: JSON.stringify(["Market Analysis", "User Research", "Roadmap Development", "MVP Definition", "Growth Strategy"]),
          icon: "Rocket",
          color: "from-orange-500/20 to-orange-600/20",
          size: "md:col-span-1",
          path: "/services/product-strategy"
        },
        {
          id: "custom-software",
          title: "Custom Software Development",
          description: "We build robust, scalable, and high-performance software tailored to your specific business needs. From enterprise ERPs to specialized automation tools.",
          fullDescription: "Our custom software development service is designed to solve your unique business challenges. We don't believe in one-size-fits-all solutions. Instead, we work closely with you to understand your processes, goals, and pain points to build software that truly adds value. Whether you need a complex enterprise system, a specialized internal tool, or a customer-facing application, our team of expert developers uses the latest technologies and best practices to deliver high-quality, scalable, and secure software.",
          features: JSON.stringify(["Scalable Architecture", "Legacy System Integration", "API Development", "Cloud-Native Design", "Microservices Architecture"]),
          icon: "Code2",
          color: "from-orange-500/20 to-orange-600/20",
          size: "md:col-span-1",
          path: "/services/custom-software"
        },
        {
          id: "cloud-infra",
          title: "Cloud Infrastructure",
          description: "Modernize your operations with secure, high-availability cloud solutions. We specialize in AWS, Azure, and Google Cloud migrations.",
          fullDescription: "In today's digital landscape, a robust cloud infrastructure is essential for agility, scalability, and cost-efficiency. We help businesses navigate their cloud journey, from initial strategy and migration to ongoing optimization and management. Our experts specialize in building secure, high-availability environments on leading platforms like AWS, Azure, and Google Cloud, ensuring your applications are always performant and resilient.",
          features: JSON.stringify(["Serverless Computing", "Auto-scaling", "Disaster Recovery", "Cloud Security Audits", "Cost Optimization"]),
          icon: "Cloud",
          color: "from-orange-500/20 to-orange-600/20",
          size: "md:col-span-1",
          path: "/services/cloud-infra"
        },
        {
          id: "ui-ux-design",
          title: "UI/UX Experience Design",
          description: "We create intuitive digital experiences that delight users and drive conversions. Our design process is data-driven and user-centric.",
          fullDescription: "Great design is more than just aesthetics; it's about how a product works and how it makes users feel. Our UI/UX design process is deeply rooted in user research and data-driven insights. We create intuitive, engaging, and accessible digital experiences that not only look beautiful but also drive meaningful results for your business. From wireframing and prototyping to final visual design, we ensure every interaction is intentional and delightful.",
          features: JSON.stringify(["User Research", "Prototyping", "Visual Identity", "Interaction Design", "Accessibility Audits"]),
          icon: "Palette",
          color: "from-orange-500/20 to-orange-600/20",
          size: "md:col-span-1",
          path: "/services/ui-ux-design"
        },
        {
          id: "cybersecurity",
          title: "Advanced Cybersecurity",
          description: "Protect your business from evolving digital threats with our comprehensive security audits, penetration testing, and 24/7 monitoring.",
          fullDescription: "As cyber threats become increasingly sophisticated, protecting your digital assets is more critical than ever. We provide comprehensive cybersecurity solutions designed to identify vulnerabilities, mitigate risks, and ensure your business remains resilient. Our services include deep security audits, advanced penetration testing, and 24/7 proactive monitoring, giving you peace of mind in an uncertain digital world.",
          features: JSON.stringify(["Threat Detection", "Data Encryption", "Compliance Audits", "Incident Response", "Security Training"]),
          icon: "ShieldCheck",
          color: "from-orange-500/20 to-orange-600/20",
          size: "md:col-span-1",
          path: "/services/cybersecurity"
        },
        {
          id: "ecommerce",
          title: "E-commerce Solutions",
          description: "Scale your retail business with powerful, custom-built e-commerce platforms designed for high traffic and seamless checkout experiences.",
          fullDescription: "We build high-performance e-commerce platforms that are designed to scale with your business. Whether you're a niche boutique or a global retailer, our solutions provide a seamless shopping experience for your customers and powerful management tools for your team. We focus on speed, security, and conversion optimization to ensure your online store is a powerful driver of growth.",
          features: JSON.stringify(["Payment Integration", "Inventory Management", "SEO Optimized", "Mobile-First Commerce", "Analytics Dashboard"]),
          icon: "ShoppingCart",
          color: "from-orange-500/20 to-orange-600/20",
          size: "md:col-span-1",
          path: "/services/ecommerce"
        },
        {
          id: "ai-ml",
          title: "AI & Machine Learning",
          description: "Leverage the power of artificial intelligence to automate complex tasks, predict trends, and gain deep insights from your data.",
          fullDescription: "Artificial Intelligence is transforming how businesses operate and compete. We help you harness the power of AI and Machine Learning to unlock new opportunities, automate repetitive tasks, and gain a deeper understanding of your data. From predictive analytics and natural language processing to custom computer vision solutions, we build intelligent systems that drive innovation and efficiency.",
          features: JSON.stringify(["Predictive Analytics", "NLP Solutions", "Computer Vision", "Custom AI Models", "Data Engineering"]),
          icon: "Cpu",
          color: "from-orange-500/20 to-orange-600/20",
          size: "md:col-span-1",
          path: "/services/ai-ml"
        }
      ];
      for (const service of initialServices) {
        const keys = Object.keys(service);
        const values = Object.values(service);
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(",");
        const quotedKeys = keys.map(k => `"${k}"`).join(",");
        await pool.query(`INSERT INTO services (${quotedKeys}) VALUES (${placeholders})`, values);
      }
      console.log("Services seeded.");
    }
  } catch (err) {
    console.error("Error seeding services:", err);
  }

  // Seed projects
  try {
    const projectsCount = await pool.query("SELECT COUNT(*) FROM projects");
    if (parseInt(projectsCount.rows[0].count) === 0) {
      const initialProjects = [
        {
          id: "project-alpha",
          title: "Project Alpha",
          description: "A cutting-edge AI-driven platform for predictive maintenance in industrial manufacturing.",
          fullDescription: "Project Alpha revolutionized industrial maintenance by implementing a sophisticated AI model that predicts equipment failure before it happens. By analyzing real-time sensor data, the platform identifies subtle patterns that indicate wear and tear, allowing for proactive repairs that save millions in downtime and maintenance costs.",
          category: "AI & ML",
          client: "Global Manufacturing Corp",
          year: "2025",
          results: JSON.stringify(["45% reduction in unplanned downtime", "30% decrease in maintenance costs", "Extended equipment lifespan by 20%"]),
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
          results: JSON.stringify(["Sub-500ms page load times globally", "200% increase in peak traffic capacity", "15% improvement in conversion rate"]),
          challenge: "Slow page loads and inability to handle traffic spikes.",
          solution: "Headless e-commerce architecture with global CDN.",
          path: "/projects/project-beta"
        }
      ];
      for (const project of initialProjects) {
        const keys = Object.keys(project);
        const values = Object.values(project);
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(",");
        const quotedKeys = keys.map(k => `"${k}"`).join(",");
        await pool.query(`INSERT INTO projects (${quotedKeys}) VALUES (${placeholders})`, values);
      }
      console.log("Projects seeded.");
    }
  } catch (err) {
    console.error("Error seeding projects:", err);
  }

  // Seed case studies
  try {
    const studiesCount = await pool.query("SELECT COUNT(*) FROM case_studies");
    if (parseInt(studiesCount.rows[0].count) === 0) {
      const initialCaseStudies = [
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
          results: JSON.stringify(["300% increase in online revenue", "50% reduction in operational costs", "90% customer satisfaction rate"]),
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
          results: JSON.stringify(["98% diagnostic accuracy", "60% faster screening process", "Improved early detection rates"]),
          image: "https://picsum.photos/seed/healthcare/800/600",
          path: "/case-studies/ai-healthcare-diagnostics"
        }
      ];
      for (const study of initialCaseStudies) {
        const keys = Object.keys(study);
        const values = Object.values(study);
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(",");
        const quotedKeys = keys.map(k => `"${k}"`).join(",");
        await pool.query(`INSERT INTO case_studies (${quotedKeys}) VALUES (${placeholders})`, values);
      }
      console.log("Case studies seeded.");
    }
  } catch (err) {
    console.error("Error seeding case studies:", err);
  }

  // Seed jobs
  try {
    const jobsCount = await pool.query("SELECT COUNT(*) FROM jobs");
    if (parseInt(jobsCount.rows[0].count) === 0) {
      const initialJobs = [
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
      for (const job of initialJobs) {
        const keys = Object.keys(job);
        const values = Object.values(job);
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(",");
        await pool.query(`INSERT INTO jobs (${keys.join(",")}) VALUES (${placeholders})`, values);
      }
      console.log("Jobs seeded.");
    }
  } catch (err) {
    console.error("Error seeding jobs:", err);
  }

  // API Routes
  app.get("/api/all-content", async (req, res) => {
    try {
      const services = await pool.query("SELECT * FROM services");
      const projects = await pool.query("SELECT * FROM projects");
      const caseStudies = await pool.query("SELECT * FROM case_studies");
      const blogPosts = await pool.query("SELECT * FROM blog_posts");
      const jobs = await pool.query("SELECT * FROM jobs");
      const testimonials = await pool.query("SELECT * FROM testimonials");
      const settings = await pool.query("SELECT * FROM site_settings");
      const partners = await pool.query("SELECT * FROM partners");

      res.json({
        services: services.rows,
        projects: projects.rows,
        caseStudies: caseStudies.rows,
        blogPosts: blogPosts.rows,
        jobs: jobs.rows,
        testimonials: testimonials.rows,
        settings: settings.rows,
        partners: partners.rows
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // Support Chat API
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history, systemInstruction } = req.body;
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "Chat service not configured" });
      }

      const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: systemInstruction
      });

      const chat = model.startChat({
        history: history || [],
      });

      const result = await chat.sendMessage(message);
      const response = await result.response;
      res.json({ text: response.text() });
    } catch (err: any) {
      console.error("Chat Error:", err);
      res.status(500).json({ error: "Failed to process chat" });
    }
  });

  // Generic CRUD endpoints
  const tables = ["services", "projects", "case_studies", "blog_posts", "jobs", "testimonials", "site_settings", "partners"];
  tables.forEach((table) => {
    const pk = table === "site_settings" ? "key" : "id";

    app.get(`/api/${table}`, async (req, res) => {
      try {
        const data = await pool.query(`SELECT * FROM ${table}`);
        res.json(data.rows);
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }
    });

    app.post(`/api/${table}`, async (req, res) => {
      try {
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(",");
        const quotedKeys = keys.map(k => `"${k}"`).join(",");
        const query = `INSERT INTO ${table} (${quotedKeys}) VALUES (${placeholders}) RETURNING *`;
        const result = await pool.query(query, values);
        res.json({ success: true, data: result.rows[0] });
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }
    });

    app.put(`/api/${table}/:id`, async (req, res) => {
      try {
        const { id } = req.params;
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);
        const setClause = keys.map((key, i) => `"${key}" = $${i + 1}`).join(",");
        const query = `UPDATE ${table} SET ${setClause} WHERE "${pk}" = $${keys.length + 1} RETURNING *`;
        const result = await pool.query(query, [...values, id]);
        res.json({ success: true, data: result.rows[0] });
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }
    });

    app.delete(`/api/${table}/:id`, async (req, res) => {
      try {
        const { id } = req.params;
        await pool.query(`DELETE FROM ${table} WHERE "${pk}" = $1`, [id]);
        res.json({ success: true });
      } catch (err: any) {
        console.error(`Error deleting from ${table}:`, err);
        res.status(500).json({ error: err.message });
      }
    });
  });

  // Image upload endpoint
  app.post("/api/upload", upload.single("image"), (req: any, res) => {
    if (req.file) {
      res.json({ url: `/uploads/${req.file.filename}` });
    } else {
      res.status(400).json({ error: "No file uploaded" });
    }
  });

  // Error handling middleware
  app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
