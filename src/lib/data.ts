
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
    title: "JustEat Clone",
    description: "Replicated Just Eat's homepage and restaurant listings with Agile team coordination.",
    technologies: ["HTML", "CSS", "Trello", "GitHub"],
    featured: true,
    githubUrl: "https://github.com/username/justeat-clone",
  },
  {
    id: 2,
    title: "RTFKT Clone",
    description: "Led a team to recreate RTFKT's digital fashion platform with modern web technologies.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    role: "Team Lead",
    featured: true,
    githubUrl: "https://github.com/username/rtfkt-clone",
  },
  {
    id: 3,
    title: "Alpha-Spy Discord Bot",
    description: "A Discord bot featuring cross-server message synchronization and advanced user analytics.",
    technologies: ["Python", "Discord.py", "MongoDB"],
    featured: true,
    githubUrl: "https://github.com/username/alpha-spy-bot",
  },
  {
    id: 4,
    title: "Secure Authentication System",
    description: "Implemented a secure multi-factor authentication system with biometric verification.",
    technologies: ["Node.js", "Express", "JWT", "Biometrics API"],
    githubUrl: "https://github.com/username/secure-auth",
  },
  {
    id: 5,
    title: "Vulnerability Scanner",
    description: "Developed an automated vulnerability scanner for web applications with detailed reporting.",
    technologies: ["Python", "Docker", "REST API"],
    githubUrl: "https://github.com/username/vuln-scanner",
  },
  {
    id: 6,
    title: "Encrypted Messaging App",
    description: "End-to-end encrypted messaging application with self-destructing messages.",
    technologies: ["React Native", "Firebase", "Signal Protocol"],
    githubUrl: "https://github.com/username/encrypted-messenger",
  },
];

export const education: Education[] = [
  {
    id: 1,
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Technology",
    location: "London, UK",
    startDate: "2016",
    endDate: "2020",
    description: "Specialized in Cybersecurity and Software Engineering."
  },
  {
    id: 2,
    degree: "Diploma in Ethical Hacking",
    institution: "Cybersecurity Institute",
    location: "Online",
    startDate: "2020",
    endDate: "2021",
    description: "Advanced penetration testing and vulnerability assessment."
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
    name: "JavaScript",
    category: "language",
    level: "expert"
  },
  {
    id: 3,
    name: "Bash",
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
  },
  {
    id: 8,
    name: "Problem Solving",
    category: "soft",
    level: "expert"
  }
];

export const socialLinks = {
  github: "https://github.com/username",
  linkedin: "https://linkedin.com/in/username",
  email: "siam@example.com",
  pgpKey: "https://keybase.io/username"
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
