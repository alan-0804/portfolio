import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const NAV_LINKS = ['About', 'Skills', 'Experience', 'Projects', 'Certifications', 'Contact'];

const SKILLS = {
  Frontend: ['React.js', 'Redux Toolkit', 'Next.js', 'HTML5', 'CSS3', 'JavaScript'],
  Backend: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'MongoDB', 'Mongoose'],
  Tools: ['Git', 'GitHub', 'Vercel', 'CI/CD', 'Docker basics', 'Postman'],
  Soft: ['Problem Solving', 'Team Collaboration', 'Communication', 'Leadership'],
};

const PROJECTS = [
  {
    name: 'SmartStock',
    tag: 'B2B Platform',
    desc: 'A full B2B inventory & order management platform connecting shopkeepers and distributors. Features role-based JWT auth, Redux cart, real-time price comparison, and grouped order management.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Redux', 'JWT', 'Express.js'],
    color: '#00ff9d',
    status: 'In Progress',
    github: 'https://github.com/alanjose',
  },
  {
    name: 'OldaXe',
    tag: 'Cloud PaaS',
    desc: 'A Platform-as-a-Service solution with containerisation, CI/CD automation, and auto-scaling. Implemented load balancing and cloud-native deployment using Next.js frontend.',
    tech: ['Next.js', 'Node.js', 'CI/CD', 'Docker', 'Cloud'],
    color: '#00c2ff',
    status: 'Completed',
    github: 'https://github.com/alanjose',
  },
  {
    name: 'AdWeb',
    tag: 'Ad Platform',
    desc: 'Scalable web platform for managing advertising campaigns and targeted ad delivery. Designed backend APIs for campaign creation, ad management, and multi-user handling.',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    color: '#ff6b6b',
    status: 'Completed',
    github: 'https://github.com/alanjose',
  },
  {
    name: 'E-Commerce App',
    tag: 'Full Stack',
    desc: 'Full-stack e-commerce platform with JWT authentication, RESTful APIs for product/order management, and a responsive React frontend with efficient CRUD operations.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'JWT', 'Express.js'],
    color: '#a78bfa',
    status: 'Completed',
    github: 'https://github.com/alanjose',
  },
];

const CERTS = [
  { name: "NCC 'C' Certificate", org: 'Ministry of Defence, India', icon: '🎖️' },
  { name: 'Python Essentials 1', org: 'Cisco Academy', icon: '🐍' },
  { name: 'Introduction to Cybersecurity', org: 'Cisco Academy', icon: '🔐' },
  { name: 'MERN Stack Development', org: 'Stackup Learning Hub', icon: '⚡' },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Section({ id, children, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <section id={id} ref={ref} className={`section ${inView ? 'visible' : ''} ${className}`}>
      {children}
    </section>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState('About');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [typed, setTyped] = useState('');
  const roles = ['Full-Stack Developer', 'MERN Stack Engineer', 'React.js Developer', 'Node.js Developer'];
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const role = roles[roleIdx];
    let i = 0;
    setTyped('');
    const interval = setInterval(() => {
      setTyped(role.slice(0, i + 1));
      i++;
      if (i === role.length) {
        clearInterval(interval);
        setTimeout(() => setRoleIdx(idx => (idx + 1) % roles.length), 1800);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [roleIdx]);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveNav(e.target.id); });
    }, { threshold: 0.4 });
    NAV_LINKS.forEach(id => {
      const el = document.getElementById(id.toLowerCase());
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="app">
      {/* Noise overlay */}
      <div className="noise" />

      {/* Grid background */}
      <div className="grid-bg" />

      {/* Nav */}
      <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-logo" onClick={() => scrollTo('about')}>
          <span className="logo-bracket">&lt;</span>AJ<span className="logo-bracket">/&gt;</span>
        </div>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map(link => (
            <button key={link} className={`nav-link ${activeNav === link.toLowerCase() ? 'active' : ''}`}
              onClick={() => scrollTo(link)}>
              {link}
            </button>
          ))}
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)}>
          <span /><span /><span />
        </button>
      </nav>

      {/* Hero */}
      <section id="about" className="hero">
        <div className="hero-content">
          <div className="hero-tag">👋 Available for opportunities</div>
          <h1 className="hero-name">Alan<br /><span className="name-accent">Jose</span></h1>
          <div className="hero-role">
            <span className="role-prefix">$ </span>
            <span className="typed">{typed}</span>
            <span className="cursor">_</span>
          </div>
          <p className="hero-desc">
            CS graduate & full-stack developer building responsive, production-ready web apps with the MERN stack.
            Currently at <span className="highlight">Stackup Learning Hub</span> — open to new challenges across India.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo('projects')}>View Projects</button>
            <button className="btn-ghost" onClick={() => scrollTo('contact')}>Get in Touch</button>
          </div>
          <div className="hero-stats">
            <div className="stat"><span className="stat-num">11+</span><span className="stat-label">Months Exp.</span></div>
            <div className="stat-divider" />
            <div className="stat"><span className="stat-num">4+</span><span className="stat-label">Projects Built</span></div>
            <div className="stat-divider" />
            <div className="stat"><span className="stat-num">MERN</span><span className="stat-label">Stack Expert</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="avatar-ring">
            <div className="avatar-inner">
              <span className="avatar-initials">AJ</span>
            </div>
            <div className="ring ring-1" />
            <div className="ring ring-2" />
            <div className="ring ring-3" />
          </div>
          <div className="floating-chip chip-1">React.js</div>
          <div className="floating-chip chip-2">Node.js</div>
          <div className="floating-chip chip-3">MongoDB</div>
          <div className="floating-chip chip-4">Redux</div>
        </div>
      </section>

      {/* Skills */}
      <Section id="skills">
        <div className="section-header">
          <span className="section-tag">02. Skills</span>
          <h2>Technical Arsenal</h2>
        </div>
        <div className="skills-grid">
          {Object.entries(SKILLS).map(([cat, items]) => (
            <div key={cat} className="skill-card">
              <div className="skill-cat">{cat}</div>
              <div className="skill-pills">
                {items.map(s => <span key={s} className="skill-pill">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience">
        <div className="section-header">
          <span className="section-tag">03. Experience</span>
          <h2>Where I've Worked</h2>
        </div>
        <div className="exp-card">
          <div className="exp-left">
            <div className="exp-dot" />
            <div className="exp-line" />
          </div>
          <div className="exp-right">
            <div className="exp-meta">
              <span className="exp-date">Aug 2025 – Present</span>
              <span className="exp-badge">Internship</span>
            </div>
            <h3 className="exp-role">MERN Stack Developer Intern</h3>
            <div className="exp-company">Stackup Learning Hub · Thiruvananthapuram</div>
            <ul className="exp-bullets">
              <li>Developing full-stack web applications using the MERN stack</li>
              <li>Building and testing RESTful APIs for handling application data</li>
              <li>Implementing JWT-based authentication and authorization</li>
              <li>Designing responsive user interfaces with React.js</li>
              <li>Debugging and optimising application performance</li>
            </ul>
            <div className="exp-tech">
              {['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT'].map(t => (
                <span key={t} className="exp-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="edu-card">
          <div className="edu-icon">🎓</div>
          <div className="edu-info">
            <div className="edu-degree">BSc Computer Science</div>
            <div className="edu-school">College of Applied Sciences Perissery · University of Kerala</div>
            <div className="edu-year">2022 – 2025</div>
          </div>
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects">
        <div className="section-header">
          <span className="section-tag">04. Projects</span>
          <h2>What I've Built</h2>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p) => (
            <div key={p.name} className="project-card" style={{ '--accent': p.color }}>
              <div className="project-top">
                <div className="project-tag">{p.tag}</div>
                <span className={`project-status ${p.status === 'In Progress' ? 'wip' : 'done'}`}>
                  {p.status === 'In Progress' ? '⚡ In Progress' : '✓ Completed'}
                </span>
              </div>
              <h3 className="project-name">{p.name}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-tech">
                {p.tech.map(t => <span key={t} className="project-pill">{t}</span>)}
              </div>
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link">
                View on GitHub →
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* Certifications */}
      <Section id="certifications">
        <div className="section-header">
          <span className="section-tag">05. Certifications</span>
          <h2>Credentials</h2>
        </div>
        <div className="certs-grid">
          {CERTS.map(c => (
            <div key={c.name} className="cert-card">
              <div className="cert-icon">{c.icon}</div>
              <div className="cert-info">
                <div className="cert-name">{c.name}</div>
                <div className="cert-org">{c.org}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact">
        <div className="section-header">
          <span className="section-tag">06. Contact</span>
          <h2>Let's Connect</h2>
        </div>
        <div className="contact-wrap">
          <p className="contact-intro">
            I'm actively looking for full-stack, backend, or frontend roles — remote or on-site across India.
            If you have an opportunity or just want to chat, reach out!
          </p>
          <div className="contact-links">
            <a href="mailto:alanmathewjose5@gmail.com" className="contact-card">
              <span className="contact-icon">✉️</span>
              <div>
                <div className="contact-label">Email</div>
                <div className="contact-val">alanmathewjose5@gmail.com</div>
              </div>
            </a>
            <a href="https://www.linkedin.com/in/alanjose-3b9946369" target="_blank" rel="noopener noreferrer" className="contact-card">
              <span className="contact-icon">💼</span>
              <div>
                <div className="contact-label">LinkedIn</div>
                <div className="contact-val">linkedin.com/in/alanjose-3b9946369</div>
              </div>
            </a>
            <a href="https://github.com/alanjose-0804" target="_blank" rel="noopener noreferrer" className="contact-card">
              <span className="contact-icon">🐙</span>
              <div>
                <div className="contact-label">GitHub</div>
                <div className="contact-val">github.com/alanjose-0804</div>
              </div>
            </a>
            <a href="tel:+917736336895" className="contact-card">
              <span className="contact-icon">📱</span>
              <div>
                <div className="contact-label">Phone</div>
                <div className="contact-val">+91 77363 36895</div>
              </div>
            </a>
          </div>
          <a href="mailto:alanmathewjose5@gmail.com" className="btn-primary cta-btn">
            Say Hello 👋
          </a>
        </div>
      </Section>

      <footer className="footer">
        <span className="logo-bracket">&lt;</span>AJ<span className="logo-bracket">/&gt;</span>
        <span className="footer-copy">Built with React · Deployed on Vercel · © 2026 Alan Jose</span>
      </footer>
    </div>
  );
}
