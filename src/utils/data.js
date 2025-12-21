import{
    Code2,
    // GraduationCap,
    Briefcase,
    Award,
    Rocket,
    Heart,
    Coffee,
    BookOpen,
    Zap,
    Database,
    Server,
    Cloud,
    Mail,
    MapPin,
    Phone,
    Tags,
    GraduationCap,
} from "lucide-react";

import {FiGithub, FiLinkedin, FiTwitter} from "react-icons/fi";

import Project_img_1 from "../assets/images/profile-img-1.png";
import Project_img_2 from "../assets/images/profile-img-2.png";
import Project_img_3 from "../assets/images/profile-img-3.png";
import Project_img_4 from "../assets/images/profile-img-4.png";
import Project_img_5 from "../assets/images/profile-img-5.png";
import Project_img_6 from "../assets/images/profile-img-6.png";
import Project_img_7 from "../assets/images/profile-img-7.png";
import { image, label, title } from "framer-motion/client";
import { color, number } from "framer-motion";

export const SKILLS_CATEGORY = [
    {
        title:"Frontend",
        icon:Code2,
        description: "Crafting beautiful, responsive user interfaces",
        skills:[
            {name:"react",level:95,color:"bg-blue-500"},
            {name:"TypeScript",level:90,color:"bg-blue-600"},
            {name:"Next.js",level:88,color:"bg-gray-800"},
            {name:"Tailwind CSS",level:92,color:"bg-cyan-500"},
            {name:"Framer Motion",level:85,color:"bg-pink-500"},
        ],
    },
    {
        title:"Backend",
        icon:Server,
        description:"Building robust server-side solution",
        skills:[
            {name:"Node.js",level:95,color:"bg-green-500"},
            {name:"Express.js",level:88,color:"bg-gray-500"},
            {name:"Python",level:85,color:"bg-yellow-500"},
            {name:"GraphQl",level:80,color:"bg-pink-600"},
            {name:"REST APIs",level:85,color:"bg-orange-500"},
        ],
    },
    {
        title:"Database",
        icon:Database,
        description:"Managing and optimizing data storage",
        skills:[
            {name:"MongoDB",level:88,color:"bg-green-600"},
            {name:"MongoDb",level:85,color:"bg-blue-700"},
            {name:"Redis",level:80,color:"bg-red-500"},
            {name:"Prisma",level:82,color:"bg-indigo-600"},
            {name:"Firebase",level:78,color:"bg-yellow-600"},          
        ],
    },
    {
        title:"DevOps",
        icon:Cloud,
        description:"Deploying and scaling application",
        skills:[
            {name:"Docker",level:82,color:"bg-blue-600"},
            {name:"AWS",level:78,color:"bg-orange-600"},
            {name:"Vercel",level:98,color:"bg-gray-900"},
            {name:"Git",level:95,color:"bg-orange-700"},
            {name:"CI/CD",level:75,color:"bg-purple-600"},
        ],
    },
];

export const TECH_STACK = [
    "JavaScript",
    "HTML",
    "CSS3",
    "Sass",
    "Webpack",
    "Vite",
    "Jest",
    "Cypress",
    "Figma",
    "Adobe XD",
    "Notion",
    "Slack",
];

export const STATS = [
    {number:"50+", label:"Projects Completed"},
    {number:"3+", label:"Years Experience"},
    {number:"20+", label:"Technologies"},
    {number:"100%", label:"Client Satisfaction"},
];

export const PROJECTS = [
    {
        id:1,
        title:"E-Commerce Platform",
        description:
            "A full-stack e-commerce solution with  advance filtering, payment integration, and real-time inventor",
        image:Project_img_1,
        tags:["React", "Tailwind", "Framer motion"],
        liveUrl:"#",
        githubUrl:"#",
        featured:false,
        category:"Full Stack",
    },
    {
        id:2,
        title:"Blog App with AI Post Generator",
        description:
            "A full-stack blog app using the MERN stack - with full Markdown support, tag filtering and an integration",
        image:Project_img_2,
        tags:["React", "Node.js", "MongoDB", "Tailwind"],
        liveUrl:"#",
        githubUrl:"#",
        featured: true,
        category:"Full Stack",
    },
    {
        id:3,
        title:"Task Management App",
        description:
            "Collaborative project management tool with real-time updates, team chat, and advanced analytics dashboard",
        image:Project_img_3,
        tags:["React", "Tailwind", "Framer motion"],
        liveUrl:"#",
        githubUrl:"#",
        featured:false,
        category:"Web App",
    },
    {
        id:4,
        title:"E-Commerce Platform",
        description:
            "A full-stack e-commerce solution with  advance filtering, payment integration, and real-time inventor",
        image:Project_img_4,
        tags:["React", "Tailwind", "Framer motion"],
        liveUrl:"#",
        githubUrl:"#",
        featured:false,
        category:"Full Stack",
    },
    {
        id:5,
        title:"E-Commerce Platform",
        description:
            "A full-stack e-commerce solution with  advance filtering, payment integration, and real-time inventor",
        image:Project_img_4,
        tags:["React", "Tailwind", "Framer motion"],
        liveUrl:"#",
        githubUrl:"#",
        featured:false,
        category:"Full Stack",
    },
    {
        id:6,
        title:"E-Commerce Platform",
        description:
            "A full-stack e-commerce solution with  advance filtering, payment integration, and real-time inventor",
        image:Project_img_4,
        tags:["React", "Tailwind", "Framer motion"],
        liveUrl:"#",
        githubUrl:"#",
        featured:false,
        category:"Full Stack",
    },
];

export const JOURNEY_STEPS = [
    {
        year:"2023",
        title:"Started Coding Journey",
        company:"self-taught",
        description:
            "Began learning web development with HTML, CSS, and JavaScript",
        icon:Code2,
        color:"bg-green-500",
    },
    {
        year:"2024",
        title:"First Intership",
        company:"Still Seeking",
        description:
            "Began learning web development with HTML, CSS, and JavaScript",
        icon:Briefcase,
        color:"bg-green-500",
    },
    {
        year:"2025",
        title:"Full Stack Developer",
        company:"Present",
        description:
            "Began learning web development with HTML, CSS, and JavaScript",
        icon:Rocket,
        color:"bg-orange-500",
    },
    {
        year:"2027",
        title:"BCA Degree",
        company:"YCMOU University",
        description:
            "Began learning web development with HTML, CSS, and JavaScript",
        icon:GraduationCap,
        color:"bg-purple-500",
    },
    {
        year:"2028",
        title:"Freelance & Open Source",
        company:"Independent",
        description:
            "Began learning web development with HTML, CSS, and JavaScript",
        icon:Award,
        color:"bg-pink-500",
    },
    {
        year:"2029",
        title:"Senior Developer",
        company:"Future",
        description:
            "Began learning web development with HTML, CSS, and JavaScript",
        icon:Zap,
        color:"bg-cyan-500",
    },
];

export const PASSIONS = [
    {
        icon:Heart,
        title:"User Experience",
        description:"Crafting intutive interfaces that users love",
    },
    {
        icon:Coffee,
        title:"Problem Solving",
        description:"Turning complex challenges into elegant solutions",
    },
    {
        icon:BookOpen,
        title:"Continous Learning",
        description:"Always exploring new technologies and best practices",
    },
];

export const SOCIAL_LINKS = [
    {
        name:"GitHub",
        icon: FiGithub,
        url:"https://github.com/Intekhab-Ansari",
        color:"hover:text-gray-400",
        bgColor:"hover:bg-gray-800",
    },
    {
        name:"LinkedIn",
        icon: FiLinkedin,
        url:"https://www.linkedin.com/in/intekhab-ansari-5a6934281?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        color:"hover:text-blue-400",
        bgColor:"hover:bg-blue-500/10",
    },
    {
        name:"Twitter",
        icon: FiTwitter,
        url:"https://x.com",
        color:"hover:text-sky-400",
        bgColor:"hover:bg-blue-500/10",
    },
    {
        name:"Email",
        icon: Mail,
        url:"mailto:ansariintekhab47@gmail.com",
        color:"hover:text-green-400",
        bgColor:"hover:bg-green-500/10",
    },
];

export const CONTACT_INFO = [
    {
        icon:MapPin,
        label:"Location",
        value:"Goregaon(west), Mumbai-400104",
    },
    {
        icon:Mail,
        label:"Email",
        value:"ansariintekhab47@gmail.com",
    },
    {
        icon:Phone,
        label:"Phone",
        value:"9594292262",
    },
];