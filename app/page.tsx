"use client";

import { useEffect, useRef, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const EXPERIENCES = [
  {
    role: "Cloud Cybersecurity Consultant",
    company: "Deloitte France",
    period: "Jun — Dec 2025",
    location: "Paris, France",
    color: "#38bdf8",
    bullets: [
      "Multi-cloud security audit (AWS & GCP) using CIS, DORA and CCM frameworks",
      "Integrated CNAPP solution (Palo Alto Prisma Cloud) for enhanced security posture",
      "Analyzed security alerts and prioritized incidents on critical financial sector applications",
      "Provided compliance assessment and recommended remediation projects",
    ],
    tags: ["AWS", "GCP", "Prisma Cloud", "CIS", "DORA"],
  },
  {
    role: "DevSecOps Engineer",
    company: "Speedykom GmbH",
    period: "Aug 2024 — Apr 2025",
    location: "Erlangen, Germany",
    color: "#34d399",
    bullets: [
      "Built web application with NextJS frontend and Django backend",
      "Integrated GitHub Advanced Security — CodeQL for SAST, Dependabot for SCA",
      "Engineered CI/CD pipelines with GitHub Actions across multiple services",
      "Implemented multi-tenant Docker orchestration for data confidentiality",
      "Managed IAM with Keycloak and designed DataMesh architecture",
    ],
    tags: ["GitHub Actions", "Docker", "Django", "NextJS", "Keycloak"],
  },
  {
    role: "Azure Cloud Engineer",
    company: "Knowlepsy",
    period: "Jun — Aug 2024",
    location: "Marseille, France",
    color: "#818cf8",
    bullets: [
      "Established secure OpenVPN connection using Azure VPN Gateway",
      "Configured network infrastructure for a team of 15 developers",
    ],
    tags: ["Azure", "VPN Gateway", "OpenVPN"],
  },
  {
    role: "AWS Cloud Engineer",
    company: "Smartovate",
    period: "Apr — Jun 2024",
    location: "Remote",
    color: "#fbbf24",
    bullets: [
      "Managed 5 application pods using Kubernetes on AWS EKS",
      "Stored container images in Amazon ECR with automated deployment via ArgoCD (GitOps)",
    ],
    tags: ["AWS EKS", "Kubernetes", "ArgoCD", "ECR"],
  },
  {
    role: "Web Application Developer",
    company: "Axess Logistique",
    period: "Aug 2023 — Sep 2024",
    location: "Tunis, Tunisia",
    color: "#fb7185",
    bullets: [
      "Developed Symfony PHP application with Tailwind CSS",
      "Implemented unit tests with PHPUnit covering 8 different logistics flows",
    ],
    tags: ["PHP", "Symfony", "Tailwind", "PHPUnit"],
  },
];

const PROJECTS = [
  {
    title: "Cloud Computing with MicroVMs in 5G",
    description: "Orchestrated MicroVMs in Edge/Fog environments using Firecracker (AWS Lambda provider) and Cloud Init for templating in 5G architecture.",
    tags: ["Firecracker", "CloudInit", "5G", "Edge Computing"],
    icon: "~",
  },
  {
    title: "Malware Investigation Platform",
    description: "Security investigation using Security Onion tools — VirusTotal, OSINT, Sguil, Wireshark, and reverse engineering techniques.",
    tags: ["Security Onion", "Wireshark", "OSINT", "Blue Team"],
    icon: "!",
  },
  {
    title: "Automated Malware Analysis on Azure",
    description: "Built an automated malware analysis pipeline using Golang, Azure Functions, and serverless architecture with event-driven processing.",
    tags: ["Golang", "Azure Functions", "Serverless", "Pipeline"],
    icon: ">",
  },
  {
    title: "DevOps on Azure Cloud",
    description: "Implemented full DevOps lifecycle with Jenkins, Grafana, Prometheus monitoring, React/TypeScript frontend, and NodeJS/Express backend.",
    tags: ["Jenkins", "Grafana", "Prometheus", "React", "TypeScript"],
    icon: "$",
  },
];

const SKILL_GROUPS = [
  {
    label: "CLOUD & INFRA",
    color: "#38bdf8",
    items: ["AWS", "Azure", "GCP", "Kubernetes", "Docker", "Terraform", "ArgoCD"],
  },
  {
    label: "SECURITY",
    color: "#fb7185",
    items: ["Cybersecurity", "SAST/SCA", "Prisma Cloud", "Keycloak", "Security Onion"],
  },
  {
    label: "CI/CD & DEVOPS",
    color: "#34d399",
    items: ["GitHub Actions", "Jenkins", "CI/CD", "GitOps", "Grafana", "Prometheus"],
  },
  {
    label: "DEVELOPMENT",
    color: "#fbbf24",
    items: ["Python", "TypeScript", "Golang", "NextJS", "Django", "React", "PHP/Symfony"],
  },
];

// ─── Scroll reveal hook ──────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, style, delay = 0 }: { children: React.ReactNode; style?: React.CSSProperties; delay?: number }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="section-reveal" style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

// ─── Components ──────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 clamp(20px, 5vw, 48px)", height: "56px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(6, 8, 14, 0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(20px) saturate(1.2)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
    }}>
      <a href="#top" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "14px", fontWeight: 700,
          color: "var(--accent)", letterSpacing: "-0.02em",
        }}>
          ABR
        </span>
        <span style={{
          width: "6px", height: "6px", borderRadius: "50%", background: "var(--emerald)",
          boxShadow: "0 0 8px rgba(52, 211, 153, 0.5)",
          animation: "glowPulse 3s ease-in-out infinite",
        }} />
      </a>

      <div style={{ display: "flex", gap: "clamp(16px, 3vw, 32px)", alignItems: "center" }}>
        {["Experience", "Projects", "Skills", "Contact"].map(s => (
          <a key={s} href={`#${s.toLowerCase()}`} className="nav-link">{s}</a>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section id="top" style={{
      position: "relative", minHeight: "100vh",
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "120px clamp(20px, 8vw, 120px) 80px",
      overflow: "hidden",
    }}>
      {/* Grid background */}
      <div className="grid-bg" />

      {/* Gradient orb */}
      <div style={{
        position: "absolute", top: "15%", right: "10%",
        width: "clamp(300px, 40vw, 600px)", height: "clamp(300px, 40vw, 600px)",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(56, 189, 248, 0.06) 0%, rgba(52, 211, 153, 0.03) 40%, transparent 70%)",
        filter: "blur(60px)",
        animation: mounted ? "fadeIn 2s ease-out" : "none",
        pointerEvents: "none",
      }} />

      {/* Status line */}
      <div style={{
        display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px",
        opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
      }}>
        <span style={{
          width: "8px", height: "8px", borderRadius: "50%", background: "var(--emerald)",
          boxShadow: "0 0 12px rgba(52, 211, 153, 0.5)",
        }} />
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--emerald)",
          letterSpacing: "0.1em", textTransform: "uppercase",
        }}>
          Available for hire
        </span>
      </div>

      {/* Name */}
      <h1 style={{
        fontSize: "clamp(40px, 7vw, 80px)", fontWeight: 800,
        lineHeight: 1.05, letterSpacing: "-0.035em",
        color: "var(--text)",
        opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.35s",
      }}>
        Aziz Ben<br />
        <span style={{
          background: "linear-gradient(135deg, var(--accent), var(--emerald))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Rejeb
        </span>
      </h1>

      {/* Title */}
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: "clamp(14px, 2vw, 18px)",
        color: "var(--text-secondary)", marginTop: "20px",
        letterSpacing: "0.02em",
        opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.55s",
      }}>
        DevSecOps / Cloud Engineer
      </div>

      {/* Tagline */}
      <p style={{
        maxWidth: "680px", fontSize: "clamp(15px, 1.6vw, 17px)",
        color: "var(--text-muted)", lineHeight: 1.7, marginTop: "24px",
        opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.7s",
      }}>
        I build secure, scalable cloud infrastructure and automate everything in between.
        AWS certified. Multi-cloud fluent. Security-first mindset.
      </p>

      {/* CTAs */}
      <div style={{
        display: "flex", gap: "14px", marginTop: "40px", flexWrap: "wrap",
        opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.85s",
      }}>
        <a href="#contact" className="cta-btn cta-primary">Get in touch</a>
        <a href="#experience" className="cta-btn cta-outline">View experience</a>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
        opacity: mounted ? 0.4 : 0, transition: "opacity 1s ease 1.5s",
      }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.2em", color: "var(--text-muted)" }}>SCROLL</span>
        <div style={{ width: "1px", height: "32px", background: "linear-gradient(180deg, var(--accent), transparent)" }} />
      </div>
    </section>
  );
}

function About() {
  return (
    <section style={{
      padding: "100px clamp(20px, 8vw, 120px) 80px",
      borderTop: "1px solid var(--border)",
    }}>
      <RevealSection>
        <div style={{ maxWidth: "1100px" }}>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.12em",
            color: "var(--accent)", marginBottom: "16px",
          }}>
            ABOUT
          </div>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700,
            lineHeight: 1.3, letterSpacing: "-0.02em", marginBottom: "24px",
          }}>
            Engineering graduate with a security-first
            <span style={{ color: "var(--accent)" }}> cloud native</span> approach.
          </h2>
          <p style={{
            fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.8,
            maxWidth: "800px",
          }}>
            I hold a Computer Networks Engineering degree specialized in Cybersecurity from INSAT Tunisia (equivalent Masters 2).
            With hands-on experience across Deloitte, Speedykom, and multiple cloud engineering roles, I bring
            a unique blend of security auditing, DevOps automation, and full-stack development.
          </p>

          {/* Credential badges */}
          <div style={{ display: "flex", gap: "12px", marginTop: "32px", flexWrap: "wrap" }}>
            {[
              { label: "AWS Certified Developer", sub: "DVA-C02", color: "#fbbf24" },
              { label: "INSAT Tunisia", sub: "Eq. Masters 2", color: "#38bdf8" },
              { label: "Multi-Cloud", sub: "AWS · Azure · GCP", color: "#34d399" },
            ].map((c, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "12px 18px", borderRadius: "8px",
                background: "var(--bg-card)", border: "1px solid var(--border)",
              }}>
                <div style={{
                  width: "8px", height: "8px", borderRadius: "2px",
                  background: c.color, boxShadow: `0 0 10px ${c.color}40`,
                }} />
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)" }}>{c.label}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-muted)", marginTop: "2px" }}>{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" style={{
      padding: "100px clamp(20px, 8vw, 120px) 80px",
      borderTop: "1px solid var(--border)",
    }}>
      <RevealSection>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.12em",
          color: "var(--accent)", marginBottom: "16px",
        }}>
          EXPERIENCE
        </div>
        <h2 style={{
          fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700,
          lineHeight: 1.3, letterSpacing: "-0.02em", marginBottom: "48px",
        }}>
          Where I&apos;ve shipped.
        </h2>
      </RevealSection>

      <div className="timeline">
        {EXPERIENCES.map((exp, i) => (
          <RevealSection key={i} delay={i * 100}>
            <div className="timeline-item" style={{ marginBottom: i < EXPERIENCES.length - 1 ? "8px" : 0 }}>
              <div className="timeline-marker">
                <div className="timeline-dot" style={{ color: exp.color, borderColor: exp.color }} />
                <div className="timeline-year">{exp.period.split("—")[0].trim().split(" ").pop()}</div>
              </div>
              <div className="exp-card">
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                  gap: "16px", flexWrap: "wrap", marginBottom: "16px",
                }}>
                  <div>
                    <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--text)", marginBottom: "4px" }}>
                      {exp.role}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                      <span style={{
                        fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 600,
                        color: exp.color,
                      }}>
                        {exp.company}
                      </span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}>
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)",
                    letterSpacing: "0.04em", flexShrink: 0, paddingTop: "4px",
                  }}>
                    {exp.period}
                  </span>
                </div>

                <ul style={{
                  listStyle: "none", padding: 0,
                  display: "flex", flexDirection: "column", gap: "8px",
                }}>
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} style={{
                      display: "flex", alignItems: "flex-start", gap: "10px",
                      fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6,
                    }}>
                      <span style={{
                        color: exp.color, fontSize: "8px", marginTop: "7px", flexShrink: 0,
                        opacity: 0.7,
                      }}>
                        &#9656;
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>

                <div style={{
                  display: "flex", gap: "6px", marginTop: "16px", flexWrap: "wrap",
                }}>
                  {exp.tags.map((t, ti) => (
                    <span key={ti} style={{
                      fontFamily: "var(--font-mono)", fontSize: "10px",
                      padding: "3px 8px", borderRadius: "4px",
                      color: exp.color, background: `${exp.color}10`,
                      border: `1px solid ${exp.color}20`,
                      letterSpacing: "0.02em",
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" style={{
      padding: "100px clamp(20px, 8vw, 120px) 80px",
      borderTop: "1px solid var(--border)",
    }}>
      <RevealSection>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.12em",
          color: "var(--accent)", marginBottom: "16px",
        }}>
          PROJECTS
        </div>
        <h2 style={{
          fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700,
          lineHeight: 1.3, letterSpacing: "-0.02em", marginBottom: "48px",
        }}>
          Research &amp; builds.
        </h2>
      </RevealSection>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
        gap: "20px", maxWidth: "1100px",
      }}>
        {PROJECTS.map((p, i) => (
          <RevealSection key={i} delay={i * 100}>
            <div className="project-card-lg">
              <div style={{
                display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px",
              }}>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: "20px", fontWeight: 700,
                  color: "var(--accent)", opacity: 0.4,
                  width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center",
                  background: "var(--accent-dim)", borderRadius: "8px",
                  border: "1px solid var(--border)",
                }}>
                  {p.icon}
                </div>
                <div style={{
                  fontSize: "17px", fontWeight: 700, color: "var(--text)",
                  lineHeight: 1.3,
                }}>
                  {p.title}
                </div>
              </div>
              <p style={{
                fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7,
                marginBottom: "auto", paddingBottom: "20px",
                position: "relative", zIndex: 1,
              }}>
                {p.description}
              </p>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
                {p.tags.map((t, ti) => (
                  <span key={ti} style={{
                    fontFamily: "var(--font-mono)", fontSize: "10px",
                    padding: "4px 10px", borderRadius: "4px",
                    color: "var(--text-muted)",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" style={{
      padding: "100px clamp(20px, 8vw, 120px) 80px",
      borderTop: "1px solid var(--border)",
    }}>
      <RevealSection>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.12em",
          color: "var(--accent)", marginBottom: "16px",
        }}>
          SKILLS
        </div>
        <h2 style={{
          fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700,
          lineHeight: 1.3, letterSpacing: "-0.02em", marginBottom: "48px",
        }}>
          Toolbox.
        </h2>
      </RevealSection>

      <div style={{
        display: "flex", flexDirection: "column", gap: "32px",
        maxWidth: "1100px",
      }}>
        {SKILL_GROUPS.map((group, gi) => (
          <RevealSection key={gi} delay={gi * 80}>
            <div>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.12em",
                color: group.color, marginBottom: "12px", fontWeight: 600,
              }}>
                {group.label}
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {group.items.map((s, si) => (
                  <span key={si} className="skill-pill" style={{
                    transitionDelay: `${si * 30}ms`,
                  }}>
                    <span style={{
                      width: "4px", height: "4px", borderRadius: "1px",
                      background: group.color, opacity: 0.6,
                    }} />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{
      padding: "100px clamp(20px, 8vw, 120px) 120px",
      borderTop: "1px solid var(--border)",
      position: "relative",
    }}>
      {/* Gradient glow */}
      <div style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "clamp(300px, 60vw, 800px)", height: "300px",
        background: "radial-gradient(ellipse at center bottom, rgba(56, 189, 248, 0.05), transparent 70%)",
        pointerEvents: "none",
      }} />

      <RevealSection>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "13px", letterSpacing: "0.12em",
          color: "var(--accent)", marginBottom: "16px",
        }}>
          CONTACT
        </div>
        <h2 style={{
          fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 800,
          lineHeight: 1.2, letterSpacing: "-0.03em", marginBottom: "20px",
        }}>
          Let&apos;s build<br />
          <span style={{
            background: "linear-gradient(135deg, var(--accent), var(--emerald))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            something solid.
          </span>
        </h2>
        <p style={{
          fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.7,
          maxWidth: "680px", marginBottom: "36px",
        }}>
          Available immediately for DevSecOps, Cloud Engineering, or Security Consulting roles.
          Open to full-time, contract, and freelance opportunities across Europe and remote.
        </p>
      </RevealSection>

      <RevealSection delay={100}>
        <div style={{
          display: "flex", flexDirection: "column", gap: "24px",
          maxWidth: "1100px",
        }}>
          {/* Big mailto CTA */}
          <a href="mailto:azizbenrejeb@gmail.com" className="cta-btn cta-primary" style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            width: "fit-content", fontSize: "16px",
          }}>
            <span style={{ fontSize: "18px" }}>@</span>
            Send me an email
          </a>

          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.12em",
            color: "var(--text-muted)", marginTop: "12px",
          }}>
            OR FIND ME HERE
          </div>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href="https://github.com/Makoorr" target="_blank" rel="noopener noreferrer" style={{
              display: "flex", alignItems: "center", gap: "12px", padding: "16px 20px",
              borderRadius: "8px", background: "var(--bg-card)", border: "1px solid var(--border)",
              textDecoration: "none", color: "var(--text)", transition: "all 0.2s", flex: "1", minWidth: "200px",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--text)"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600 }}>GitHub</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-muted)" }}>@Makoorr</div>
              </div>
            </a>
            <a href="https://linkedin.com/in/aziz-ben-rejeb" target="_blank" rel="noopener noreferrer" style={{
              display: "flex", alignItems: "center", gap: "12px", padding: "16px 20px",
              borderRadius: "8px", background: "var(--bg-card)", border: "1px solid var(--border)",
              textDecoration: "none", color: "var(--text)", transition: "all 0.2s", flex: "1", minWidth: "200px",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--text)"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600 }}>LinkedIn</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-muted)" }}>Aziz Ben Rejeb</div>
              </div>
            </a>
          </div>
        </div>
      </RevealSection>

      {/* Footer */}
      <div style={{
        fontFamily: "var(--font-mono)", fontSize: "11px",
        color: "var(--text-muted)", letterSpacing: "0.04em",
        paddingTop: "32px", marginTop: "64px", borderTop: "1px solid var(--border)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "12px",
      }}>
        <span>&copy; {new Date().getFullYear()} Aziz Ben Rejeb</span>
        <a href="mailto:azizbenrejeb@gmail.com" style={{
          fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent)",
          textDecoration: "none", letterSpacing: "0.04em",
          transition: "opacity 0.2s",
        }}>
          azizbenrejeb@gmail.com
        </a>
      </div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}
