// ============================================================
// In-Memory Data Store for Prem Portfolio OS
// ============================================================

import { generateId } from "./utils";

// ── Types ──────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "owner" | "admin" | "editor" | "viewer";
  avatar?: string;
  bio?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  longDescription: string;
  features: string[];
  techStack: string[];
  image: string;
  screenshot?: string;
  repoUrl: string;
  liveUrl?: string;
  status: "active" | "archived" | "in-progress";
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  replied: boolean;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
}

export interface Skill {
  name: string;
  icon: string;
  level: number;
  category: "languages" | "frontend" | "backend" | "database" | "tools";
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  startDate: string;
  endDate: string;
  description: string;
  responsibilities: string[];
  location: string;
}

export interface Achievement {
  id: string;
  label: string;
  value: string;
  numericValue: number;
  icon: string;
  color: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface Role {
  id: string;
  name: string;
  permissions: string[];
  description: string;
}

export interface AnalyticsData {
  totalViews: number;
  totalVisitors: number;
  totalProjects: number;
  totalBlogs: number;
  totalContacts: number;
  viewsByPage: { page: string; views: number }[];
  viewsByMonth: { month: string; views: number }[];
  topReferrers: { source: string; visits: number }[];
}

// ── Seeded Data ────────────────────────────────────────────

const users: User[] = [
  {
    id: "usr_001",
    name: "Prem Kumar",
    email: "kumarmehta7370@gmail.com",
    password: "password123",
    role: "owner",
    bio: "Full Stack Developer | MERN Stack Developer | Problem Solver",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "usr_002",
    name: "Admin User",
    email: "admin@premportfolio.com",
    password: "admin123",
    role: "admin",
    bio: "Site Administrator",
    createdAt: "2024-06-01T00:00:00Z",
  },
];

const projects: Project[] = [
  {
    id: "proj_001",
    title: "QuickHammer",
    slug: "quickhammer",
    category: "Auction Bidding Platform",
    description: "Web application for running online auctions. Auctioneers list items, bidders place bids, super admin reviews commission proofs.",
    longDescription:
      "QuickHammer is a full-featured online auction bidding platform where auctioneers list items, bidders place bids in real-time, and super admin reviews commission proofs. Built with the MERN stack with JWT authentication and Cloudinary image hosting.",
    features: [
      "Auction item listing",
      "Real-time bidding",
      "Bidder/auctioneer roles",
      "Scheduling",
      "Leaderboard",
      "JWT auth",
      "Admin commission",
      "Email notifications",
    ],
    techStack: ["React.js", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "Cloudinary", "Tailwind CSS"],
    image: "/images/projects/QuickHammer.jpg",
    screenshot: "/images/projects/QuickHammer.jpg",
    repoUrl: "https://github.com/premkr7370/Quick-Hammer",
    liveUrl: "https://quickhammer.netlify.app/",
    status: "active",
    createdAt: "2024-08-15T00:00:00Z",
    updatedAt: "2024-12-01T00:00:00Z",
  },
  {
    id: "proj_002",
    title: "AutoMate AI",
    slug: "automate-ai",
    category: "AI Agent Platform",
    description: "Full-stack AI productivity platform for creating/managing intelligent agents with AI model integrations, auth, payments.",
    longDescription:
      "AutoMate AI is a cutting-edge full-stack AI productivity platform that empowers users to create, manage, and interact with autonomous intelligent agents powered by Groq and Gemini APIs with Firebase authentication and Razorpay billing.",
    features: [
      "AI agent creation",
      "AI conversations",
      "Groq/Gemini integration",
      "Vision",
      "Firebase auth",
      "OAuth",
      "Razorpay payments",
      "Integration management",
    ],
    techStack: ["React.js", "Vite", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Firebase", "Groq API", "Gemini API", "Razorpay"],
    image: "/images/projects/AutomateAI.jpg",
    screenshot: "/images/projects/AutomateAI.jpg",
    repoUrl: "https://github.com/premkr7370/Automate--ai",
    liveUrl: "https://automate-ai-1-lbc2.onrender.com/",
    status: "active",
    createdAt: "2024-09-10T00:00:00Z",
    updatedAt: "2024-12-15T00:00:00Z",
  },
  {
    id: "proj_003",
    title: "QueueLess",
    slug: "queueless",
    category: "Services Booking & Queue Platform",
    description: "Smart local services marketplace with real-time virtual queues and appointment booking.",
    longDescription:
      "QueueLess is a smart marketplace for local services featuring real-time virtual queueing, appointment scheduling, conflict detection, and commission tracking built with Next.js, Prisma ORM, and PostgreSQL.",
    features: [
      "Business discovery",
      "Search/filtering",
      "Appointment booking",
      "Time-slot conflict detection",
      "Queue management",
      "Wait times",
      "Dashboards",
      "Commission tracking",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Prisma ORM", "PostgreSQL", "Tailwind CSS", "Zod", "Vitest", "Playwright"],
    image: "/images/projects/QueueLess.jpg",
    screenshot: "/images/projects/QueueLess.jpg",
    repoUrl: "https://github.com/premkr7370/queueless",
    liveUrl: "https://queueless-premkr.vercel.app/",
    status: "active",
    createdAt: "2024-10-01T00:00:00Z",
    updatedAt: "2025-01-10T00:00:00Z",
  },
  {
    id: "proj_004",
    title: "ZeeCare",
    slug: "zeecare",
    category: "Doctor Appointment System",
    description: "Doctor appointment management with patient website, admin dashboard, and REST API.",
    longDescription:
      "ZeeCare is a comprehensive doctor appointment management platform connecting patients and medical professionals. Features patient registration, doctor schedule browsing, appointment booking, and admin management dashboard.",
    features: [
      "Patient registration/login",
      "Doctor browsing",
      "Appointment booking",
      "Admin dashboard",
      "Doctor/appointment management",
      "Messaging",
    ],
    techStack: ["MERN Stack", "React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    image: "/images/projects/ZeeCare.jpg",
    screenshot: "/images/projects/ZeeCare.jpg",
    repoUrl: "https://github.com/premkr7370/Zee-Health-Care",
    liveUrl: "https://doctor-appointment-prem.netlify.app/",
    status: "active",
    createdAt: "2024-06-10T00:00:00Z",
    updatedAt: "2024-11-20T00:00:00Z",
  },
  {
    id: "proj_005",
    title: "Workbench RBAC Studio",
    slug: "workbench-rbac-studio",
    category: "RBAC Platform",
    description: "Modern RBAC management platform for creating/managing/visualizing user roles and permissions.",
    longDescription:
      "Workbench RBAC Studio provides an intuitive, high-performance visual interface for managing role-based access control, permission hierarchies, and user role assignments across complex application suites.",
    features: [
      "Custom role creation",
      "Permission builder",
      "Role assignment",
      "Multiple roles",
      "Permission resolution",
      "Visualization",
      "Admin dashboard",
    ],
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS"],
    image: "/images/projects/WorkBench.png",
    screenshot: "/images/projects/WorkBench.png",
    repoUrl: "https://github.com/premkr7370/The-Internet-Folks-Assignment",
    liveUrl: "https://the-internet-folks-assignment-pearl.vercel.app/",
    status: "active",
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-02-15T00:00:00Z",
  },
];

const blogPosts: BlogPost[] = [
  {
    id: "blog_001",
    title: "Building Scalable REST APIs with Node.js and Express",
    slug: "building-scalable-rest-apis",
    excerpt:
      "Learn the best practices for building production-ready REST APIs using Node.js and Express, including authentication, error handling, and database optimization.",
    content: `# Building Scalable REST APIs with Node.js and Express

Building a production-ready REST API requires careful planning and adherence to best practices. In this post, I'll share key lessons from building APIs at A2Infotech.

## Project Structure

A well-organized project structure is crucial for maintainability:

\`\`\`
src/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
└── app.js
\`\`\`

## Authentication with JWT

Secure your endpoints using JSON Web Tokens. Always store sensitive data in environment variables and implement proper token refresh mechanisms.

## Error Handling

Create a centralized error handling middleware that catches all errors and returns consistent response formats. This makes debugging much easier.

## Database Optimization

Use MongoDB indexes strategically, implement pagination for large datasets, and consider using aggregation pipelines for complex queries.

## Conclusion

Building scalable APIs is both an art and a science. Focus on clean architecture, proper error handling, and security from day one.`,
    coverImage: "/blog/rest-api.png",
    category: "Backend",
    tags: ["Node.js", "Express", "REST API", "MongoDB"],
    author: "Prem Kumar",
    published: true,
    createdAt: "2025-03-15T00:00:00Z",
    updatedAt: "2025-03-15T00:00:00Z",
  },
  {
    id: "blog_002",
    title: "Mastering React.js: From Hooks to Advanced Patterns",
    slug: "mastering-reactjs-hooks-patterns",
    excerpt:
      "A deep dive into React.js hooks, custom hooks, render patterns, and state management strategies for building complex applications.",
    content: `# Mastering React.js: From Hooks to Advanced Patterns

React has evolved significantly since the introduction of hooks. Let's explore advanced patterns that will level up your React development.

## Custom Hooks

Custom hooks allow you to extract component logic into reusable functions. They follow the same rules as built-in hooks but let you share stateful logic.

## State Management

For complex applications, consider using useReducer for local state and Context API for shared state. Libraries like Zustand offer a simpler alternative to Redux.

## Performance Optimization

Use React.memo, useMemo, and useCallback strategically. Profile your components with React DevTools to identify performance bottlenecks.

## Conclusion

Mastering these patterns will make you a more effective React developer and help you build more maintainable applications.`,
    coverImage: "/blog/react-patterns.png",
    category: "Frontend",
    tags: ["React.js", "Hooks", "JavaScript", "Performance"],
    author: "Prem Kumar",
    published: true,
    createdAt: "2025-04-20T00:00:00Z",
    updatedAt: "2025-04-20T00:00:00Z",
  },
  {
    id: "blog_003",
    title: "My Journey: 500+ DSA Problems and Counting",
    slug: "dsa-journey-500-problems",
    excerpt:
      "How solving 500+ problems on GeeksforGeeks and 260+ on LeetCode transformed my problem-solving skills and prepared me for technical interviews.",
    content: `# My Journey: 500+ DSA Problems and Counting

When I first started solving DSA problems, I could barely solve easy-level questions. Today, with 500+ problems on GeeksforGeeks and 260+ on LeetCode, I want to share my journey.

## Getting Started

I started with basic arrays and strings. The key was consistency — solving at least 2-3 problems daily, regardless of difficulty.

## The Breakthrough

Around the 100-problem mark, patterns started emerging. I could recognize problem types and apply appropriate algorithms without hints.

## My Strategy

1. **Topic-wise approach**: Master one topic before moving to the next
2. **Contest participation**: Weekly contests for time-pressure practice
3. **Revision**: Revisit solved problems to reinforce patterns

## Key Takeaways

- Consistency beats intensity
- Understanding patterns is more important than memorizing solutions
- Teaching others (through blogs) reinforces your own understanding

## What's Next

My goal is 1000+ total problems by the end of 2025. The journey continues!`,
    coverImage: "/blog/dsa-journey.png",
    category: "Career",
    tags: ["DSA", "LeetCode", "GeeksforGeeks", "Interview Prep"],
    author: "Prem Kumar",
    published: true,
    createdAt: "2025-05-10T00:00:00Z",
    updatedAt: "2025-05-10T00:00:00Z",
  },
];

const contacts: Contact[] = [
  {
    id: "cnt_001",
    name: "Recruiter at TechCorp",
    email: "hiring@techcorp.com",
    message: "Hi Prem, we were impressed by your portfolio and would love to discuss a full-stack developer position.",
    read: true,
    replied: true,
    createdAt: "2025-05-20T10:30:00Z",
  },
  {
    id: "cnt_002",
    name: "Sarah Chen",
    email: "sarah@startup.io",
    message: "Your QuickHammer project looks amazing! Would you be interested in a freelance collaboration?",
    read: true,
    replied: false,
    createdAt: "2025-06-01T14:15:00Z",
  },
  {
    id: "cnt_003",
    name: "Dev Community",
    email: "events@devcommunity.com",
    message: "We'd love to feature your DSA journey blog post in our newsletter. Can we get your permission?",
    read: false,
    replied: false,
    createdAt: "2025-06-15T09:00:00Z",
  },
];

const notifications: Notification[] = [
  {
    id: "notif_001",
    title: "New Contact Message",
    message: "You received a new message from Dev Community",
    type: "info",
    read: false,
    createdAt: "2025-06-15T09:00:00Z",
  },
  {
    id: "notif_002",
    title: "Blog Published",
    message: "Your blog post 'DSA Journey' has been published successfully",
    type: "success",
    read: true,
    createdAt: "2025-05-10T00:00:00Z",
  },
  {
    id: "notif_003",
    title: "Project Updated",
    message: "QuickHammer project has been updated with new features",
    type: "info",
    read: true,
    createdAt: "2025-04-01T00:00:00Z",
  },
];

const skills: Skill[] = [
  // Languages
  { name: "C", icon: "code-2", level: 75, category: "languages" },
  { name: "C++", icon: "code-2", level: 80, category: "languages" },
  { name: "JavaScript", icon: "file-json", level: 90, category: "languages" },
  { name: "SQL", icon: "database", level: 70, category: "languages" },
  // Frontend
  { name: "React.js", icon: "atom", level: 90, category: "frontend" },
  { name: "Next.js", icon: "globe", level: 85, category: "frontend" },
  { name: "HTML5", icon: "code", level: 95, category: "frontend" },
  { name: "CSS3", icon: "palette", level: 90, category: "frontend" },
  { name: "Tailwind CSS", icon: "wind", level: 88, category: "frontend" },
  { name: "TypeScript", icon: "file-type", level: 82, category: "frontend" },
  // Backend
  { name: "Node.js", icon: "server", level: 88, category: "backend" },
  { name: "Express.js", icon: "route", level: 85, category: "backend" },
  { name: "REST APIs", icon: "plug", level: 90, category: "backend" },
  { name: "JWT Auth", icon: "shield", level: 85, category: "backend" },
  // Database
  { name: "MongoDB", icon: "database", level: 85, category: "database" },
  // Tools
  { name: "Git", icon: "git-branch", level: 88, category: "tools" },
  { name: "GitHub", icon: "github", level: 90, category: "tools" },
  { name: "VS Code", icon: "code-2", level: 92, category: "tools" },
  { name: "Postman", icon: "send", level: 85, category: "tools" },
  { name: "Thunder Client", icon: "zap", level: 80, category: "tools" },
  { name: "Cloudinary", icon: "cloud", level: 75, category: "tools" },
  { name: "Render", icon: "server", level: 78, category: "tools" },
  { name: "Netlify", icon: "globe", level: 80, category: "tools" },
  { name: "Canva", icon: "image", level: 70, category: "tools" },
];

const experiences: Experience[] = [
  {
    id: "exp_001",
    company: "A2Infotech Pvt. Ltd.",
    role: "Full Stack Developer Intern",
    duration: "3 Months",
    startDate: "January 2026",
    endDate: "March 2026",
    description:
      "Worked as a Full Stack Web Developer Intern, developing scalable web applications and REST APIs using the MERN stack.",
    responsibilities: [
      "Developed responsive web applications using React.js",
      "Built RESTful APIs with Node.js and Express.js",
      "Managed MongoDB database operations and optimization",
      "Improved application scalability and performance",
      "Collaborated on full-stack development projects with the team",
    ],
    location: "Bhopal, Madhya Pradesh",
  },
];

const achievements: Achievement[] = [
  {
    id: "ach_001",
    label: "LeetCode Problems",
    value: "260+",
    numericValue: 260,
    icon: "code",
    color: "#FFA116",
  },
  {
    id: "ach_002",
    label: "GeeksforGeeks Problems",
    value: "500+",
    numericValue: 500,
    icon: "braces",
    color: "#2F8D46",
  },
  {
    id: "ach_003",
    label: "Projects Built",
    value: "5+",
    numericValue: 5,
    icon: "folder-kanban",
    color: "#6366F1",
  },
  {
    id: "ach_004",
    label: "Internship Experience",
    value: "3 Months",
    numericValue: 3,
    icon: "briefcase",
    color: "#06B6D4",
  },
];

const certifications: Certification[] = [
  {
    id: "cert_001",
    title: "Full Stack Web Development",
    issuer: "A2Infotech Pvt. Ltd.",
    date: "March 2026",
  },
  {
    id: "cert_002",
    title: "MERN Stack Development",
    issuer: "Online Certification",
    date: "December 2025",
  },
  {
    id: "cert_003",
    title: "Data Structures & Algorithms",
    issuer: "GeeksforGeeks",
    date: "August 2025",
  },
];

const testimonials: Testimonial[] = [
  {
    id: "test_001",
    name: "Rahul Sharma",
    role: "Senior Developer",
    company: "A2Infotech Pvt. Ltd.",
    content:
      "Prem is an exceptional developer with a strong grasp of the MERN stack. His ability to quickly learn new technologies and deliver quality code made him a valuable member of our team.",
    avatar: "",
    rating: 5,
  },
  {
    id: "test_002",
    name: "Priya Patel",
    role: "Project Manager",
    company: "A2Infotech Pvt. Ltd.",
    content:
      "Working with Prem was a great experience. He consistently delivered features on time, wrote clean code, and was always eager to take on challenging tasks.",
    avatar: "",
    rating: 5,
  },
  {
    id: "test_003",
    name: "Amit Verma",
    role: "Fellow Intern",
    company: "A2Infotech Pvt. Ltd.",
    content:
      "Prem's problem-solving skills are outstanding. His DSA knowledge really shines through in the efficiency of his code. A great teammate and collaborator!",
    avatar: "",
    rating: 5,
  },
];

const roles: Role[] = [
  {
    id: "role_001",
    name: "Owner",
    description: "Full access to all features and settings",
    permissions: ["all"],
  },
  {
    id: "role_002",
    name: "Admin",
    description: "Manage content, projects, and view analytics",
    permissions: ["manage_content", "manage_projects", "view_analytics"],
  },
  {
    id: "role_003",
    name: "Editor",
    description: "Create blogs, edit projects, upload content",
    permissions: ["create_blogs", "edit_projects", "upload_content"],
  },
  {
    id: "role_004",
    name: "Viewer",
    description: "Read-only access to dashboard",
    permissions: ["read_only"],
  },
];

const analyticsData: AnalyticsData = {
  totalViews: 12847,
  totalVisitors: 4523,
  totalProjects: projects.length,
  totalBlogs: blogPosts.length,
  totalContacts: contacts.length,
  viewsByPage: [
    { page: "Home", views: 5230 },
    { page: "Projects", views: 3120 },
    { page: "Blog", views: 2340 },
    { page: "About", views: 1280 },
    { page: "Contact", views: 877 },
  ],
  viewsByMonth: [
    { month: "Jan", views: 820 },
    { month: "Feb", views: 1050 },
    { month: "Mar", views: 1340 },
    { month: "Apr", views: 1580 },
    { month: "May", views: 1920 },
    { month: "Jun", views: 2100 },
    { month: "Jul", views: 1850 },
    { month: "Aug", views: 2200 },
    { month: "Sep", views: 2450 },
    { month: "Oct", views: 2780 },
    { month: "Nov", views: 3100 },
    { month: "Dec", views: 3500 },
  ],
  topReferrers: [
    { source: "Google", visits: 1850 },
    { source: "LinkedIn", visits: 1240 },
    { source: "GitHub", visits: 890 },
    { source: "Twitter", visits: 450 },
    { source: "Direct", visits: 320 },
  ],
};

// ── Data Store (CRUD helpers) ──────────────────────────────

export const dataStore = {
  // Users
  getUsers: () => [...users],
  getUserById: (id: string) => users.find((u) => u.id === id),
  getUserByEmail: (email: string) => users.find((u) => u.email === email),
  createUser: (data: Omit<User, "id" | "createdAt">) => {
    const user: User = { ...data, id: generateId(), createdAt: new Date().toISOString() };
    users.push(user);
    return user;
  },
  updateUser: (id: string, data: Partial<User>) => {
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) return null;
    users[idx] = { ...users[idx], ...data };
    return users[idx];
  },
  deleteUser: (id: string) => {
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) return false;
    users.splice(idx, 1);
    return true;
  },

  // Projects
  getProjects: () => [...projects],
  getProjectById: (id: string) => projects.find((p) => p.id === id),
  getProjectBySlug: (slug: string) => projects.find((p) => p.slug === slug),
  createProject: (data: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
    const project: Project = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    projects.push(project);
    return project;
  },
  updateProject: (id: string, data: Partial<Project>) => {
    const idx = projects.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    projects[idx] = { ...projects[idx], ...data, updatedAt: new Date().toISOString() };
    return projects[idx];
  },
  deleteProject: (id: string) => {
    const idx = projects.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    projects.splice(idx, 1);
    return true;
  },

  // Blog Posts
  getBlogPosts: (publishedOnly = false) =>
    publishedOnly ? blogPosts.filter((b) => b.published) : [...blogPosts],
  getBlogPostById: (id: string) => blogPosts.find((b) => b.id === id),
  getBlogPostBySlug: (slug: string) => blogPosts.find((b) => b.slug === slug),
  createBlogPost: (data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">) => {
    const post: BlogPost = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    blogPosts.push(post);
    return post;
  },
  updateBlogPost: (id: string, data: Partial<BlogPost>) => {
    const idx = blogPosts.findIndex((b) => b.id === id);
    if (idx === -1) return null;
    blogPosts[idx] = { ...blogPosts[idx], ...data, updatedAt: new Date().toISOString() };
    return blogPosts[idx];
  },
  deleteBlogPost: (id: string) => {
    const idx = blogPosts.findIndex((b) => b.id === id);
    if (idx === -1) return false;
    blogPosts.splice(idx, 1);
    return true;
  },

  // Contacts
  getContacts: () => [...contacts],
  getContactById: (id: string) => contacts.find((c) => c.id === id),
  createContact: (data: Omit<Contact, "id" | "read" | "replied" | "createdAt">) => {
    const contact: Contact = {
      ...data,
      id: generateId(),
      read: false,
      replied: false,
      createdAt: new Date().toISOString(),
    };
    contacts.push(contact);
    // Also create a notification
    notifications.push({
      id: generateId(),
      title: "New Contact Message",
      message: `New message from ${data.name}`,
      type: "info",
      read: false,
      createdAt: new Date().toISOString(),
    });
    return contact;
  },
  updateContact: (id: string, data: Partial<Contact>) => {
    const idx = contacts.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    contacts[idx] = { ...contacts[idx], ...data };
    return contacts[idx];
  },
  deleteContact: (id: string) => {
    const idx = contacts.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    contacts.splice(idx, 1);
    return true;
  },

  // Notifications
  getNotifications: () => [...notifications].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
  markNotificationRead: (id: string) => {
    const idx = notifications.findIndex((n) => n.id === id);
    if (idx === -1) return null;
    notifications[idx].read = true;
    return notifications[idx];
  },
  markAllNotificationsRead: () => {
    notifications.forEach((n) => (n.read = true));
  },
  getUnreadNotificationCount: () => notifications.filter((n) => !n.read).length,

  // Skills
  getSkills: () => [...skills],
  getSkillsByCategory: (category: Skill["category"]) => skills.filter((s) => s.category === category),

  // Experiences
  getExperiences: () => [...experiences],

  // Achievements
  getAchievements: () => [...achievements],

  // Certifications
  getCertifications: () => [...certifications],

  // Testimonials
  getTestimonials: () => [...testimonials],

  // Roles
  getRoles: () => [...roles],
  getRoleById: (id: string) => roles.find((r) => r.id === id),

  // Analytics
  getAnalytics: (): AnalyticsData => ({
    ...analyticsData,
    totalProjects: projects.length,
    totalBlogs: blogPosts.filter((b) => b.published).length,
    totalContacts: contacts.length,
  }),
};
