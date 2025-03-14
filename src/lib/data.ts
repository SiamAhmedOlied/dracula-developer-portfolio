import { Project, Education, Certificate, Tool, Skill } from "./types";
import { 
  Code2, 
  Shield, 
  Bug, 
  Terminal, 
  FileCode2, 
  Database, 
  GitBranch, 
  Monitor, 
  Network, 
  Radar, 
  Lock, 
  Key
} from "lucide-react";

export const projects: Project[] = [
  {
    id: 1,
    title: "Zoom Clone",
    description: "Replicated Zoom with React, Next.js, Tailwind CSS, and StreamAPI",
    technologies: ["React", "Next.js", "Tailwind CSS", "StreamAPI"],
    featured: false,
    githubUrl: "https://github.com/SiamAhmedOlied/Zoom_Clone",
  },
  {
    id: 2,
    title: "Crevo - Figma Clone",
    description: "Replicated Figma with React, Next.js, Tailwind CSS and Framer Motion",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    featured: false,
    githubUrl: "https://github.com/SiamAhmedOlied/Crevo",
  },
  {
    id: 3,
    title: "Grayanotoxin HoneyTrap",
    description: "A Honeytrap made using Python, NextJs, TailwindCSS to trap attackers and get their details and System Access",
    technologies: ["Python", "NextJs", "TailwindCSS"],
    featured: false,
    githubUrl: "https://github.com/SiamAhmedOlied/Grayanotoxin-HoneyTrap",
  },
  {
    id: 4,
    title: "Steg-Daddy",
    description: "A powerful tool to hide and extract data from images using steganography",
    technologies: ["Python", "Tkinter", "Pillow"],
    featured: true,
    githubUrl: "https://github.com/SiamAhmedOlied/Steg-Daddy",
  },
  {
    id: 5,
    title: "Vulnerability Scanner",
    description: "Developed an automated vulnerability scanner for web applications with detailed reporting.",
    technologies: ["Python", "Docker", "REST API"],
    githubUrl: "https://github.com/username/vuln-scanner",
  },
].sort((a, b) => a.title.localeCompare(b.title));

export const education: Education[] = [
  {
    id: 1,
    degree: "Ethical Hacking & Cybersecurity",
    institution: "Creative IT Institute",
    location: "Dhaka, Bangladesh",
    startDate: "2023",
    endDate: "2024",
    description: "Specialized in Cybersecurity and Penetration Testing."
  },
  {
    id: 2,
    degree: "Malware Analysis & Malware Development",
    institution: "Udemy",
    location: "Online",
    startDate: "2024",
    endDate: "2025",
    description: "Advanced Malware Analysis and Development."
  }
];

export const certificates: Certificate[] = [
  {
    id: 1,
    name: "CISSP",
    issuer: "ISC²",
    date: "2022",
    url: "https://www.isc2.org/cissp"
  },
  {
    id: 2,
    name: "AWS Certified Security",
    issuer: "Amazon Web Services",
    date: "2021",
    url: "https://aws.amazon.com/certification/certified-security-specialty/"
  },
  {
    id: 3,
    name: "OSCP",
    issuer: "Offensive Security",
    date: "2021",
    url: "https://www.offensive-security.com/pwk-oscp/"
  },
  {
    id: 4,
    name: "Certified Ethical Hacker (CEH)",
    issuer: "EC-Council",
    date: "2020",
    url: "https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/"
  }
];

export const tools: Tool[] = [
  {
    id: 1,
    name: "Kali Linux",
    icon: "Terminal",
    category: "security"
  },
  {
    id: 2,
    name: "Wireshark",
    icon: "Network",
    category: "security"
  },
  {
    id: 3,
    name: "Metasploit",
    icon: "Bug",
    category: "security"
  },
  {
    id: 4,
    name: "Docker",
    icon: "Database",
    category: "development"
  },
  {
    id: 5,
    name: "Git",
    icon: "GitBranch",
    category: "development"
  },
  {
    id: 6,
    name: "Burp Suite",
    icon: "Shield",
    category: "security"
  },
  {
    id: 7,
    name: "VSCode",
    icon: "Code2",
    category: "development"
  },
  {
    id: 8,
    name: "Nmap",
    icon: "Radar",
    category: "security"
  },
  {
    id: 9,
    name: "Hashcat",
    icon: "Key",
    category: "security"
  },
  {
    id: 10,
    name: "AWS",
    icon: "Cloud",
    category: "development"
  },
  {
    id: 11,
    name: "John the Ripper",
    icon: "Lock",
    category: "security"
  },
  {
    id: 12,
    name: "Ghidra",
    icon: "FileCode2",
    category: "security"
  }
];

export const skills: Skill[] = [
  {
    id: 1,
    name: "Python",
    category: "language",
    level: "expert"
  },
  {
    id: 2,
    name: "Rust",
    category: "language",
    level: "expert"
  },
  {
    id: 3,
    name: "Golang",
    category: "language",
    level: "advanced"
  },
  {
    id: 4,
    name: "React",
    category: "framework",
    level: "advanced"
  },
  {
    id: 5,
    name: "Node.js",
    category: "framework",
    level: "advanced"
  },
  {
    id: 6,
    name: "Penetration Testing",
    category: "tool",
    level: "expert"
  },
  {
    id: 7,
    name: "Network Security",
    category: "tool",
    level: "expert"
  }
];

export const socialLinks = {
  github: "https://github.com/SiamAhmedOlied",
  linkedin: "https://www.linkedin.com/in/programmersiamolied/",
  email: "imananonymusentity@proton.me",
  pgpKey: "https://keybase.io/crypto"
};

export const getToolIcon = (iconName: string) => {
  const icons = {
    "Terminal": Terminal,
    "Network": Network,
    "Bug": Bug,
    "Database": Database,
    "GitBranch": GitBranch,
    "Shield": Shield,
    "Code2": Code2,
    "Radar": Radar,
    "Key": Key,
    "Cloud": Database, // Placeholder
    "Lock": Lock,
    "FileCode2": FileCode2,
    "Monitor": Monitor
  };

  return icons[iconName as keyof typeof icons] || Code2;
};
