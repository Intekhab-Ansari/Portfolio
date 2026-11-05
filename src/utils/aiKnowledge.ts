export interface ChatMessage {
    id: string;
    sender: 'user' | 'assistant';
    text: string;
    timestamp: string;
    suggestions?: string[];
}

export const INITIAL_SUGGESTIONS = [
    "🛠️ Tell me about IntekEdit & IntekChat",
    "💼 What client projects have you built?",
    "⚡ What is Intekhab's tech stack?",
    "🏆 How did you rank #1 on Google in USA?",
    "📞 How can I hire or contact you?",
];

interface KnowledgePattern {
    keywords: string[];
    response: string;
    followUps?: string[];
}

const KNOWLEDGE_BASE: KnowledgePattern[] = [
    // 1. IntekEdit
    {
        keywords: ["intekedit", "intek edit", "pdf", "photo suite", "photo editor", "vector", "compress", "target kb", "split pdf", "merge pdf", "exif", "document suite", "document tool"],
        response: `**IntekEdit** is Intekhab's flagship privacy-first document and photo engineering suite executed **100% on-device** directly in your browser memory:

• **Zero Server Egress:** Your sensitive files and PDFs are never uploaded to any cloud server.
• **Core Features:**
  - Direct in-place vector PDF editing
  - Exact target KB photo & PDF compression
  - Reordering, merging, splitting & rotating pages
  - EXIF & GPS metadata stripping for total privacy
• **Tech Stack:** Next.js, WebAssembly (Wasm), TypeScript, Tailwind CSS, Client-Side Vector Engine.
• **Live Website:** [Launch IntekEdit](https://intekedit.vercel.app/)

Feel free to try it out for free without any sign-up or installation!`,
        followUps: [
            "What is IntekChat & IntekDrop?",
            "What other tools have you built?",
            "How can I contact Intekhab?",
        ],
    },

    // 2. IntekChat & IntekDrop
    {
        keywords: ["intekchat", "intekdrop", "intek chat", "intek drop", "webrtc", "p2p", "file transfer", "airdrop", "encrypted chat", "e2ee", "view once"],
        response: `**IntekChat & IntekDrop** is a decentralized, browser-native utility combining lightning-fast peer-to-peer file transfer with end-to-end encrypted private chat:

• **AirDrop for the Web:** Transfers massive files directly browser-to-browser via **WebRTC P2P** at full local network bandwidth (up to 100+ MB/s).
• **Zero Cloud Storage:** Nothing touches a centralized server—data flows directly between connected devices.
• **Ephemeral Security:** AES-GCM zero-knowledge encryption, disposable chat rooms, and self-destructing View-Once media.
• **Instant Pairing:** Open a room or pair a mobile device in seconds via QR camera scan!
• **Tech Stack:** Next.js 15, WebRTC DataChannels, Web Crypto API (AES-GCM), Tailwind CSS.
• **Live App:** [Launch IntekChat](https://intekchat.vercel.app/)`,
        followUps: [
            "Tell me about IntekEdit",
            "What client projects have you built?",
            "Can Intekhab build a custom P2P or real-time app for me?",
        ],
    },

    // 3. All Tools / Personal Tools
    {
        keywords: ["tools", "personal tools", "utilities", "browser tools", "web tools", "browser utility"],
        response: `Intekhab has engineered two standout browser-native utilities focused on privacy and performance:

1. **IntekEdit** ([intekedit.vercel.app](https://intekedit.vercel.app/))
   - All-in-One 100% on-device document and photo engineering suite with WebAssembly and zero server uploads.

2. **IntekChat & IntekDrop** ([intekchat.vercel.app](https://intekchat.vercel.app/))
   - High-speed WebRTC peer-to-peer file sharing (AirDrop for the web) + anonymous E2EE encrypted chat rooms.

Both tools run entirely in the client with 0B cloud retention!`,
        followUps: [
            "Tell me about IntekEdit",
            "Tell me about IntekChat & IntekDrop",
            "Show me your client websites",
        ],
    },

    // 4. Live Client Work & Projects
    {
        keywords: ["tiffin wales", "tiffinwales", "quantorra", "hare krsna", "harekrsna", "suyog", "salvagereef", "salvage reef", "client", "clients", "live work", "client projects", "work"],
        response: `Here are the active production client websites built and deployed by Intekhab:

• 🏆 **Tiffin Wales** ([tiffinwales.com](https://tiffinwales.com/))
  - Full online catering & food ordering platform on WordPress & WooCommerce.
  - **Ranked #1 on Google in the USA** (Boston, MA) through technical & on-page SEO!

• ⚡ **SalvageReef** ([salvagereef.com](https://salvagereef.com/))
  - B2B salvage auctions and classifieds marketplace platform.
  - Built with a high-performance **Next.js** frontend and **Laravel REST API** backend.

• 🛍️ **Hare Krsna Attires** ([harekrsnaattires.com](https://harekrsnaattires.com/))
  - Luxury devotional e-commerce platform built with headless **Next.js** frontend + **WordPress CMS** backend.

• 🏢 **Quantorra** ([quantorra.co](https://quantorra.co/))
  - Modern business corporate platform featuring React/Vite frontend + custom PHP admin dashboard.

• 🏡 **Suyog Saanidhya** ([suyogsaanidhya.com](https://suyogsaanidhya.com/))
  - Premium real estate portal with React/Vite interface + PHP backend.`,
        followUps: [
            "How did you rank Tiffin Wales #1 on Google?",
            "Can you build an e-commerce website for me?",
            "How can I get a free quote?",
        ],
    },

    // 5. SEO & Google Ranking
    {
        keywords: ["seo", "google rank", "ranking", "serp", "google search console", "ga4", "analytics", "core web vitals", "first page", "search engine"],
        response: `**Intekhab's SEO Expertise:**

Intekhab has a proven track record of ranking client websites on **Page 1 / #1 spot on Google** in both the USA and India!

• **Flagship Case Study:** **Tiffin Wales** ([tiffinwales.com](https://tiffinwales.com/)) achieved the coveted **#1 Google Rank in Boston, MA (USA)** for high-intent catering keywords against major competitors.
• **Specializations:**
  - On-Page Keyword Architecture & Schema Markup (JSON-LD)
  - Technical SEO & Server Response Optimization
  - Core Web Vitals (LCP, FID/INP, CLS) optimization
  - Google Search Console indexing, sitemaps & error remediation
  - Google Analytics 4 (GA4) custom event tracking & conversion funnels

Need your business to rank on Page 1? Intekhab provides full SEO audits and optimization!`,
        followUps: [
            "How can I hire Intekhab for SEO?",
            "What tech stack do you use?",
            "What client websites have you built?",
        ],
    },

    // 6. WordPress & WooCommerce
    {
        keywords: ["wordpress", "wp", "woocommerce", "elementor", "cpanel", "godaddy", "cms", "headless"],
        response: `**WordPress & E-Commerce Mastery:**

Intekhab is a WordPress specialist with **100% proficiency** in designing, developing, securing, and scaling WordPress sites:

• **Custom E-Commerce:** High-converting WooCommerce storefronts with custom checkout flows, payment gateways (Stripe, Razorpay, PayPal), and inventory management.
• **Headless Architecture:** Combining WordPress as a headless CMS with modern **Next.js / React** frontends for ultra-fast load times.
• **Hosting & DevOps:** GoDaddy, cPanel, Hostinger, custom DNS management, SSL certificates, speed caching, and Cloudflare CDN.
• **Page Builders & Custom Code:** Elementor Pro, ACF (Advanced Custom Fields), and custom PHP theme/plugin enhancements.`,
        followUps: [
            "Show me your WordPress client sites",
            "What is your pricing for a website?",
            "Can you convert my design to WordPress?",
        ],
    },

    // 7. Tech Stack & Skills
    {
        keywords: ["skills", "tech stack", "technologies", "tech", "react", "nextjs", "next.js", "frontend", "backend", "java", "spring boot", "springboot", "mysql", "php", "laravel", "tailwind"],
        response: `**Intekhab's Core Technical Stack:**

• **Frontend:** React, Next.js 15, TypeScript, JavaScript (ES6+), Tailwind CSS, Framer Motion, HTML5, CSS3.
• **Backend & APIs:** Java, Spring Boot, RESTful APIs, Hibernate/JPA, PHP, Laravel, Maven.
• **Databases:** MySQL, MongoDB.
• **CMS & Hosting:** WordPress, WooCommerce, Headless CMS, cPanel, GoDaddy, DNS/Domain Management.
• **DevOps & Tools:** Git, GitHub, Vite, Postman, VS Code, IntelliJ IDEA, Figma.
• **Performance & Growth:** Technical SEO, Google Search Console, Google Analytics 4, WebRTC P2P, WebAssembly.`,
        followUps: [
            "Tell me about your Java & Spring Boot experience",
            "What are your top projects?",
            "Are you available for hire?",
        ],
    },

    // 8. Java & Spring Boot
    {
        keywords: ["java", "spring boot", "springboot", "hibernate", "jpa", "rest api", "maven"],
        response: `**Java & Spring Boot Capabilities:**

Intekhab builds scalable, type-safe enterprise backends using the Java ecosystem:

• **Architecture:** Layered architecture (Controllers, Services, Repositories, DTOs).
• **Persistence:** Hibernate ORM & Spring Data JPA for robust relational database modeling with MySQL.
• **APIs:** RESTful endpoints with input validation, exception handling, and Postman testing.
• **Projects:** Built full-stack systems including an **Employee Management System** with React frontend and Spring Boot/MySQL backend.`,
        followUps: [
            "What other backend skills do you have?",
            "What is your full tech stack?",
            "How can I contact Intekhab?",
        ],
    },

    // 9. About Intekhab / Experience / Bio
    {
        keywords: ["who is", "who are you", "intekhab", "bio", "about", "experience", "background", "education", "degree", "bca", "ycmou", "journey", "story"],
        response: `**About Intekhab Ansari:**

• **Role:** Full Stack Web Developer & Software Engineer based in **Goregaon (West), Mumbai, India**.
• **Experience:** 1+ years of active industry and freelance experience delivering production-grade web solutions and ranking client sites on Google.
• **Education:** Pursuing a **Bachelor of Computer Applications (BCA)** degree from **YCMOU University**.
• **Journey:** Self-taught developer strengthened with professional training at Raj Computers and web development experience at Social Mantraa.
• **Passion:** Crafting high-speed user interfaces, robust backend APIs, and decentralized privacy-first web utilities.`,
        followUps: [
            "What are your standout projects?",
            "Where is Intekhab located?",
            "How can I get in touch?",
        ],
    },

    // 10. Contact / Hire / Rates / Location
    {
        keywords: ["contact", "hire", "email", "phone", "call", "whatsapp", "number", "location", "address", "mumbai", "where", "reach", "cost", "price", "pricing", "rate", "quote", "freelance"],
        response: `**Connect with Intekhab Ansari:**

Intekhab is currently **available for freelance projects, contract roles, and full-time engineering opportunities**!

• 📧 **Email:** [ansariintekhab47@gmail.com](mailto:ansariintekhab47@gmail.com)
• 📱 **Phone / WhatsApp:** [+91 9594292262](tel:+919594292262)
• 📍 **Location:** Goregaon (West), Mumbai - 400104, Maharashtra, India
• 💼 **LinkedIn:** [linkedin.com/in/intekhab-ansari-5a6934281](https://www.linkedin.com/in/intekhab-ansari-5a6934281)
• 🐙 **GitHub:** [github.com/Intekhab-Ansari](https://github.com/Intekhab-Ansari)

💬 **Free Quote & Consultation:** Have a project in mind? Message him on WhatsApp or send an email for a fast response and free quote!`,
        followUps: [
            "What services does Intekhab offer?",
            "What client projects have you built?",
            "Tell me about IntekEdit & IntekChat",
        ],
    },

    // 11. Services Offered
    {
        keywords: ["services", "service", "what do you do", "what can you do", "what can you build", "offer", "help"],
        response: `**Services Intekhab Provides:**

1. **Custom Web App Development:** Modern, dynamic web applications with React 19, Next.js 15, and Tailwind CSS.
2. **WordPress & WooCommerce Websites:** High-converting e-commerce shops, corporate websites, and custom headless CMS implementations.
3. **SEO Ranking & Optimization:** Technical audits, page-1 Google ranking strategies, schema markup, and Core Web Vitals speed optimization.
4. **Backend & Full-Stack Systems:** REST API design, Java / Spring Boot microservices, PHP/Laravel backends, and MySQL databases.
5. **Real-Time & P2P Web Utilities:** WebRTC peer-to-peer file transfer and client-side WebAssembly tools.`,
        followUps: [
            "How much does a website cost?",
            "Show me your live projects",
            "How can I hire Intekhab?",
        ],
    },

    // 12. Resume / CV
    {
        keywords: ["resume", "cv", "curriculum vitae", "download resume"],
        response: `You can review Intekhab's full background, technologies, and achievements directly in this portfolio!

For a formal copy of his latest **Resume / CV (PDF)**, feel free to reach out via:
• Email: [ansariintekhab47@gmail.com](mailto:ansariintekhab47@gmail.com)
• Phone / WhatsApp: [+91 9594292262](tel:+919594292262)
• LinkedIn: [Intekhab Ansari](https://www.linkedin.com/in/intekhab-ansari-5a6934281)

He will be happy to share it immediately!`,
        followUps: [
            "What is your tech stack?",
            "Tell me about your experience",
            "How can I hire you?",
        ],
    },

    // 13. Greetings
    {
        keywords: ["hi", "hello", "hey", "namaste", "good morning", "good evening", "howdy", "what's up", "sup", "yo"],
        response: `Hello! 👋 I'm **Intekhab's AI Assistant**.

I can answer any questions about Intekhab's:
• 🛠️ **Browser Tools** (IntekEdit & IntekChat)
• 💼 **Live Client Websites** (Tiffin Wales, SalvageReef, Quantorra...)
• 🏆 **#1 Google SEO Rankings** in USA & India
• ⚡ **Full Tech Stack** (React, Next.js, Java, Spring Boot, WordPress)
• 📞 **Hiring, Quotes & Contact Info**

What would you like to know?`,
        followUps: [
            "Tell me about IntekEdit",
            "Show me your client work",
            "How can I contact Intekhab?",
        ],
    },

    // 14. Thanks
    {
        keywords: ["thank", "thanks", "awesome", "great", "cool", "good job", "perfect"],
        response: `You're very welcome! 😊

If you'd like to work together or discuss an exciting project, don't hesitate to reach out directly to Intekhab at [ansariintekhab47@gmail.com](mailto:ansariintekhab47@gmail.com) or [+91 9594292262](tel:+919594292262).

Is there anything else I can help you with?`,
        followUps: [
            "How can I hire Intekhab?",
            "What are your top skills?",
            "Tell me about IntekEdit & IntekChat",
        ],
    },
];

export function getAiResponse(userMessage: string): { response: string; suggestions: string[] } {
    const cleanText = userMessage.toLowerCase().trim();

    // Check exact or keyword match across knowledge base
    let bestMatch: KnowledgePattern | null = null;
    let highestScore = 0;

    for (const item of KNOWLEDGE_BASE) {
        let score = 0;
        for (const kw of item.keywords) {
            if (cleanText === kw) {
                score += 10;
            } else if (cleanText.includes(kw)) {
                score += kw.length > 5 ? 4 : 2;
            }
        }
        if (score > highestScore) {
            highestScore = score;
            bestMatch = item;
        }
    }

    if (bestMatch && highestScore > 0) {
        return {
            response: bestMatch.response,
            suggestions: bestMatch.followUps || [
                "Tell me about IntekEdit",
                "What client work have you done?",
                "How can I hire Intekhab?",
            ],
        };
    }

    // Fallback response for unhandled or open-ended queries
    return {
        response: `Thanks for asking! While I specialize in Intekhab's portfolio, skills, and projects, here's what I can highlight:

• **Intekhab Ansari** is a Full Stack Web Developer & WordPress specialist with expertise in **React, Next.js, Java, Spring Boot, and SEO**.
• He built standout live tools like **IntekEdit** ([intekedit.vercel.app](https://intekedit.vercel.app/)) and **IntekChat** ([intekchat.vercel.app](https://intekchat.vercel.app/)).
• He ranked client sites **#1 on Google in the USA** (e.g. Tiffin Wales).

Would you like to speak directly with Intekhab?
• Email: [ansariintekhab47@gmail.com](mailto:ansariintekhab47@gmail.com)
• Phone / WhatsApp: [+91 9594292262](tel:+919594292262)`,
        suggestions: [
            "🛠️ Tell me about IntekEdit & IntekChat",
            "💼 Client Work & #1 SEO Rank",
            "⚡ What is your full tech stack?",
            "📞 How can I hire or contact you?",
        ],
    };
}

