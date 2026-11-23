import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { signToken, verifyToken, getTokenFromHeader } from "../lib/auth";
import { dataStore } from "../lib/data-store";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../../");

describe("1. Auth Utilities QA Tests", () => {
  it("should sign and verify valid JWT tokens correctly", () => {
    const payload = { userId: "test-user-1", email: "kumarmehta7370@gmail.com", role: "admin" };
    const token = signToken(payload);
    expect(token).toBeDefined();
    expect(token.split(".").length).toBe(3);

    const verified = verifyToken(token);
    expect(verified).not.toBeNull();
    expect(verified?.userId).toBe("test-user-1");
    expect(verified?.email).toBe("kumarmehta7370@gmail.com");
    expect(verified?.role).toBe("admin");
  });

  it("should reject corrupted or malformed tokens", () => {
    expect(verifyToken("invalid.token")).toBeNull();
    expect(verifyToken("")).toBeNull();
    expect(verifyToken("a.b.c")).toBeNull();
  });

  it("should extract token from authorization header correctly", () => {
    expect(getTokenFromHeader("Bearer my-secret-token")).toBe("my-secret-token");
    expect(getTokenFromHeader("Basic my-token")).toBeNull();
    expect(getTokenFromHeader(null)).toBeNull();
    expect(getTokenFromHeader("")).toBeNull();
  });
});

describe("2. Data Store & API QA Tests", () => {
  it("should have all 5 featured projects with complete data structures", () => {
    const projects = dataStore.getProjects();
    expect(projects.length).toBe(5);

    const expectedSlugs = [
      "quickhammer",
      "automate-ai",
      "queueless",
      "zeecare",
      "workbench-rbac-studio",
    ];

    projects.forEach((proj) => {
      expect(expectedSlugs).toContain(proj.slug);
      expect(proj.title).toBeTruthy();
      expect(proj.category).toBeTruthy();
      expect(proj.description).toBeTruthy();
      expect(proj.features.length).toBeGreaterThan(0);
      expect(proj.techStack.length).toBeGreaterThan(0);
      expect(proj.liveUrl?.startsWith("https://")).toBe(true);
      expect(proj.repoUrl.startsWith("https://github.com/")).toBe(true);
      expect(proj.image.startsWith("/images/projects/")).toBe(true);
    });
  });

  it("should create and retrieve contact messages properly", () => {
    const newContact = {
      name: "QA Automated Tester",
      email: "qa-tester@example.com",
      message: "Testing contact message dispatch functionality.",
    };

    const created = dataStore.createContact(newContact);
    expect(created.id).toBeTruthy();
    expect(created.name).toBe(newContact.name);
    expect(created.email).toBe(newContact.email);
    expect(created.message).toBe(newContact.message);
    expect(created.read).toBe(false);

    const allContacts = dataStore.getContacts();
    const found = allContacts.find((c) => c.id === created.id);
    expect(found).toBeDefined();
  });

  it("should verify experiences data structure", () => {
    const exp = dataStore.getExperiences();
    expect(exp.length).toBeGreaterThan(0);
    expect(exp[0].company).toBe("A2Infotech Pvt. Ltd.");
    expect(exp[0].role).toBe("Full Stack Developer Intern");
    expect(exp[0].responsibilities.length).toBeGreaterThan(0);
  });
});

describe("3. Assets & Public Files Verification", () => {
  it("should verify resume.pdf exists in public directory and is non-empty", () => {
    const resumePath = path.join(rootDir, "public/resume.pdf");
    expect(fs.existsSync(resumePath)).toBe(true);
    const stats = fs.statSync(resumePath);
    expect(stats.size).toBeGreaterThan(1000);
  });

  it("should verify cartoon-workspace image exists in public directory", () => {
    const workspaceImgPath = path.join(rootDir, "public/images/cartoon-workspace.png");
    expect(fs.existsSync(workspaceImgPath)).toBe(true);
  });

  it("should verify all 5 project screenshots exist in public/images/projects/", () => {
    const projectFiles = [
      "AutomateAI.jpg",
      "QueueLess.jpg",
      "QuickHammer.jpg",
      "WorkBench.png",
      "ZeeCare.jpg",
    ];

    projectFiles.forEach((filename) => {
      const filePath = path.join(rootDir, "public/images/projects", filename);
      expect(fs.existsSync(filePath)).toBe(true);
      const stats = fs.statSync(filePath);
      expect(stats.size).toBeGreaterThan(500);
    });
  });

  it("should verify audio file exists in public/audio/", () => {
    const audioPath = path.join(rootDir, "public/audio/love-story-indila.mp3");
    expect(fs.existsSync(audioPath)).toBe(true);
    const stats = fs.statSync(audioPath);
    expect(stats.size).toBeGreaterThan(100000);
  });
});

describe("4. Form Validation & Security Logic", () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  it("should validate emails correctly", () => {
    expect(emailRegex.test("kumarmehta7370@gmail.com")).toBe(true);
    expect(emailRegex.test("john.doe@company.co.in")).toBe(true);
    expect(emailRegex.test("invalid-email")).toBe(false);
    expect(emailRegex.test("missing@domain")).toBe(false);
    expect(emailRegex.test("@no-local.com")).toBe(false);
    expect(emailRegex.test("spaces in@email.com")).toBe(false);
  });

  it("should enforce minimum name and message lengths", () => {
    const validateForm = (name: string, email: string, message: string) => {
      if (!name.trim() || name.trim().length < 2) return false;
      if (!email.trim() || !emailRegex.test(email.trim())) return false;
      if (!message.trim() || message.trim().length < 10) return false;
      return true;
    };

    expect(validateForm("Prem", "kumarmehta7370@gmail.com", "Hello Prem, let's discuss a project!")).toBe(true);
    expect(validateForm("P", "kumarmehta7370@gmail.com", "Valid message text here")).toBe(false);
    expect(validateForm("Prem", "invalid", "Valid message text here")).toBe(false);
    expect(validateForm("Prem", "kumarmehta7370@gmail.com", "Too short")).toBe(false);
  });

  it("should verify zero phone numbers in source code files", () => {
    const srcDir = path.join(rootDir, "src");
    const scanDir = (dir: string): string[] => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      const files: string[] = [];
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          files.push(...scanDir(fullPath));
        } else if (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) {
          files.push(fullPath);
        }
      }
      return files;
    };

    const files = scanDir(srcDir);
    const phonePattern = /\b(?:\+?91[\s-]?)?[6789]\d{9}\b/;
    const phoneTelPattern = /tel:[+0-9-]+/;

    files.forEach((file) => {
      const content = fs.readFileSync(file, "utf8");
      expect(phoneTelPattern.test(content)).toBe(false);
      // Ignore git hash or timestamps, check phone numbers
      const matches = content.match(phonePattern);
      if (matches) {
        // Ensure not just random numeric IDs
        matches.forEach((m) => {
          expect(m).not.toMatch(/^(\+?91)?[6789]\d{9}$/);
        });
      }
    });
  });
});

describe("5. UI Layout, Word Wrapping & Responsive Safety", () => {
  it("should verify global overflow-wrap rules in globals.css", () => {
    const cssPath = path.join(rootDir, "src/app/globals.css");
    const css = fs.readFileSync(cssPath, "utf8");
    expect(css).toContain("overflow-wrap: break-word");
    expect(css).toContain("word-wrap: break-word");
    expect(css).toContain("scroll-margin-top: 100px");
    expect(css).toContain(".section-container");
    expect(css).toContain("max-width: 1280px");
  });

  it("should verify all sections have scroll offset and semantic IDs", () => {
    const sectionFiles = [
      { name: "about.tsx", id: "about" },
      { name: "skills.tsx", id: "skills" },
      { name: "experience.tsx", id: "experience" },
      { name: "projects.tsx", id: "projects" },
      { name: "education.tsx", id: "education" },
      { name: "achievements.tsx", id: "achievements" },
      { name: "contact.tsx", id: "contact" },
    ];

    sectionFiles.forEach(({ name, id }) => {
      const filePath = path.join(rootDir, "src/components/sections", name);
      expect(fs.existsSync(filePath)).toBe(true);
      const content = fs.readFileSync(filePath, "utf8");
      expect(content).toContain(`id="${id}"`);
      expect(content).toContain("scroll-mt-28");
    });
  });

  it("should verify project card layout standards in projects.tsx", () => {
    const projectsPath = path.join(rootDir, "src/components/sections/projects.tsx");
    const content = fs.readFileSync(projectsPath, "utf8");
    expect(content).toContain("aspect-[16/10]");
    expect(content).toContain("line-clamp-2");
    expect(content).toContain("mt-auto");
    expect(content).toContain("min-w-0");
    expect(content).toContain("tilt-card");
  });

  it("should verify experience section card container responsiveness in experience.tsx", () => {
    const expPath = path.join(rootDir, "src/components/sections/experience.tsx");
    const content = fs.readFileSync(expPath, "utf8");
    expect(content).toContain("max-w-4xl mx-auto");
    expect(content).toContain("p-8 sm:p-11 md:p-14");
    expect(content).toContain("Key Responsibilities & Contributions");
    expect(content).toContain("Tech Stack");
  });

  it("should verify skills section grid structure in skills.tsx", () => {
    const skillsPath = path.join(rootDir, "src/components/sections/skills.tsx");
    const content = fs.readFileSync(skillsPath, "utf8");
    expect(content).toContain("grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6");
    expect(content).toContain("h-[132px] sm:h-[136px]");
    expect(content).toContain("line-clamp-2");
    expect(content).not.toContain("truncate");
  });

  it("should verify contact section form and column balancing in contact.tsx", () => {
    const contactPath = path.join(rootDir, "src/components/sections/contact.tsx");
    const content = fs.readFileSync(contactPath, "utf8");
    expect(content).toContain("grid-cols-1 lg:grid-cols-2 items-stretch");
    expect(content).toContain("input-field");
    expect(content).toContain("btn-primary");
    expect(content).toContain("/api/contacts");
  });
});
