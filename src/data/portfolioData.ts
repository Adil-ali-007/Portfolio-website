import { Project, SkillCategory, JourneyMilestone, ExperienceItem } from '../types';

export interface CarouselSkill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Programming & Data' | 'Creative 3D';
  description: string;
  level: string;
  badge: string;
  color: string;
}

export const PERSONAL_INFO = {
  name: 'Adil Ali',
  label: 'CREATIVE DEVELOPER / SOFTWARE ENGINEER',
  headline: 'Adil Ali',
  subtext: 'B.Tech student in AI & Machine Learning. Designing software, training models, and shipping useful things on the web.',
  email: 'adil798267@gmail.com',
  github: 'https://github.com/Adil-ali-007',
  githubUsername: 'Adil-ali-007',
  linkedin: 'https://www.linkedin.com/in/adil-ali-3183a8377/',
  linkedinUsername: 'adil-ali-3183a8377',
  phone: '7982678397',
  phoneFormatted: '+91 7982678397',
  education: {
    degree: 'B.Tech in Computer Science and Engineering (AI & ML)',
    degreeShort: 'B.Tech CSE (AI & ML)',
    university: 'Shri Vishwakarma Skill University',
    graduation: '2029',
    timeline: '2025 – 2029',
  },
  interests: [
    'Building practical AI-powered applications',
    'Developing full-stack web applications',
    'Turning ideas into functional projects',
    'Exploring AI engineering and creative development',
    'Learning by building, experimenting, and solving real problems',
  ],
  aboutIntro: "I'm Adil Ali, a B.Tech CSE (AI & ML) student at Shri Vishwakarma Skill University (Graduating 2029). I build practical AI-powered applications, full-stack web experiences, and interactive digital products. Passionate about turning ideas into reality, exploring modern AI engineering, and learning by building.",
  availabilityStatus: 'Available for Select Projects & Engineering Roles',
  location: 'Open to Remote & Global Engagements',
};

export const CAROUSEL_SKILLS: CarouselSkill[] = [
  {
    id: 'react',
    name: 'React',
    category: 'Frontend',
    description: 'Building reactive interfaces and modular high-performance component architectures.',
    level: 'Production',
    badge: 'v19 Ready',
    color: '#61DAFB',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Frontend',
    description: 'Modern ESNext development, asynchronous workflows, and DOM optimization.',
    level: 'Core',
    badge: 'ESNext',
    color: '#F7DF1E',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Frontend',
    description: 'Server-side rendering, static generation, and scalable App Router architecture.',
    level: 'Proficient',
    badge: 'App Router',
    color: '#E0E0E0',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend',
    description: 'Event-driven server runtimes, microservices, and asynchronous architecture.',
    level: 'Production',
    badge: 'Runtime',
    color: '#5FA04E',
  },
  {
    id: 'express',
    name: 'Express',
    category: 'Backend',
    description: 'RESTful API pipelines, middleware controllers, and server endpoints.',
    level: 'Production',
    badge: 'REST API',
    color: '#EEEEEE',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Backend',
    description: 'Document schemas, aggregation pipelines, and high-performance data storage.',
    level: 'Proficient',
    badge: 'NoSQL',
    color: '#47A248',
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'Programming & Data',
    description: 'High-performance systems programming, memory control, and STL algorithms.',
    level: 'Core',
    badge: 'Systems',
    color: '#00599C',
  },
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    category: 'Programming & Data',
    description: 'Algorithmic problem-solving, asymptotic efficiency, and optimal data modeling.',
    level: 'Core',
    badge: 'Algorithms',
    color: '#FF6B35',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Programming & Data',
    description: 'Data processing pipelines, automation scripting, and backend system utilities.',
    level: 'Proficient',
    badge: 'General',
    color: '#3776AB',
  },
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'Programming & Data',
    description: 'Vectorized array computations and multi-dimensional numerical operations.',
    level: 'Proficient',
    badge: 'Math Array',
    color: '#4DABCF',
  },
  {
    id: 'pandas',
    name: 'pandas',
    category: 'Programming & Data',
    description: 'Data analysis, tabular transformations, and structured dataset manipulation.',
    level: 'Proficient',
    badge: 'Analytics',
    color: '#E70488',
  },
  {
    id: 'threejs',
    name: 'Three.js',
    category: 'Creative 3D',
    description: 'Interactive WebGL 3D scenes, custom shaders, and spatial canvas graphics.',
    level: 'Proficient',
    badge: 'Spatial 3D',
    color: '#FF7A45',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'tomato-food',
    title: 'Tomato — Food Ordering Platform',
    subtitle: 'Full-Stack Delivery & Culinary Commerce',
    category: 'Full-Stack',
    description: 'Modern food delivery platform with real-time cart state, restaurant directory, and checkout.',
    longDescription: 'Tomato is engineered to deliver lightning-fast item browsing with sub-second page transitions. Built on React and a robust Node/Express REST API with MongoDB persistence, it models a real-world restaurant ordering workflow with category taxonomy, pricing computations, order history, and simulated payment confirmation.',
    tags: ['React', 'Node.js', 'MongoDB'],
    features: [
      'Reactive cart management with local caching and optimistic UI updates',
      'Dynamic multi-tier category navigation and dietary filtering',
      'RESTful backend architecture for dish catalogs and order records',
      'Fully responsive, mobile-first ordering interface'
    ],
    architectureNotes: [
      'Client-side state synchronized with server validation for price calculations',
      'MongoDB schemas normalized for rapid category indexing and order status tracking',
      'Modular component separation for menu items, cart drawers, and checkout modals'
    ],
    liveUrl: 'https://example.com/demo/tomato',
    githubUrl: 'https://github.com/Adil-ali-007/tomato-food-platform',
    accentColor: '#FF6B35',
    status: 'Featured'
  },
  {
    id: 'swiggy-clone',
    title: 'Swiggy Clone — Hyperlocal Platform',
    subtitle: 'Food & Essentials Ordering Engine',
    category: 'Full-Stack',
    description: 'Hyperlocal ordering engine with dynamic restaurant exploration, customizer, and dispatch tracking.',
    longDescription: 'Inspired by leading on-demand delivery platforms, this project implements a full ordering lifecycle: restaurant geolocation filtering, dish add-ons with dynamic pricing multipliers, persistent cart storage, and order state dispatching with clean REST contracts.',
    tags: ['React', 'Express', 'MongoDB'],
    features: [
      'Dynamic restaurant discovery with category tags and dietary filters',
      'Multi-item customization drawer (size, toppings, spice level)',
      'Simulated delivery status pipeline from prep to doorstep',
      'Instant search with debounced backend query handling'
    ],
    architectureNotes: [
      'Modular component tree separating catalog browsing from transaction workflows',
      'Express routing structured into middleware, validators, and service layers',
      'Normalized MongoDB data models with compound indexing'
    ],
    liveUrl: 'https://example.com/demo/swiggy-clone',
    githubUrl: 'https://github.com/Adil-ali-007/swiggy-delivery-platform',
    accentColor: '#FC8019',
    status: 'Featured'
  },
  {
    id: 'mern-crud',
    title: 'MERN Resource Management Platform',
    subtitle: 'Data Integrity & REST Architecture',
    category: 'Full-Stack',
    description: 'Full-stack resource management dashboard with server pagination, filtering, and schema validation.',
    longDescription: 'A clean, high-performance web application designed for enterprise resource tracking. Features server-side pagination, atomic database transactions, strict validation schemas, and real-time dashboard visualizations for rapid administrative workflows.',
    tags: ['MongoDB', 'React', 'Node.js'],
    features: [
      'Full Create, Read, Update, and Delete lifecycles with error boundaries',
      'Multi-column search, sorting, and cursor/offset server pagination',
      'Granular form validations with instant visual feedback',
      'Tabular data visualization with export and batch selection'
    ],
    architectureNotes: [
      'Express routing organized into controllers, middleware validators, and service layers',
      'MongoDB aggregation pipelines for summary metrics and analytical widgets',
      'Zero-layout-shift UI built with Tailwind CSS'
    ],
    liveUrl: 'https://example.com/demo/mern-crud',
    githubUrl: 'https://github.com/Adil-ali-007/mern-resource-manager',
    accentColor: '#E25B2D',
    status: 'Production'
  },
  {
    id: 'interactive-3d-portfolio',
    title: 'Interactive 3D Portfolio Experience',
    subtitle: 'Spatial WebGL & Creative Direction',
    category: 'Creative 3D',
    description: 'Spatial WebGL portfolio featuring procedural Three.js geometry, metallic shaders, and camera parallax.',
    longDescription: 'Designed to challenge conventional 2D web portfolios. By combining React Three Fiber, custom GLSL materials, and zero-404 procedural asset generation, this platform constructs a responsive digital world that adapts to cursor movement, scroll depth, and user interaction.',
    tags: ['Three.js', 'React', 'GLSL'],
    features: [
      'Real-time procedural 3D sculpture with interactive exploded and wireframe modes',
      'Cinematic lighting pipeline featuring warm key lights and cool environment reflections',
      'Smooth scroll-triggered scene transitions with exponential damping',
      'Accessible fallback for low-power devices and prefers-reduced-motion'
    ],
    architectureNotes: [
      'Zero garbage-collection allocations in the per-frame render loop',
      'Dedicated WebGL canvas container preventing React re-render stalls',
      'Custom PBR material shaders with emissive neon core channels'
    ],
    liveUrl: 'https://example.com/demo/3d-portfolio',
    githubUrl: 'https://github.com/Adil-ali-007/cinematic-3d-portfolio',
    accentColor: '#FF7A45',
    status: 'Featured'
  },
  {
    id: 'ai-dev-tool',
    title: 'Neural Workspace — AI Developer Engine',
    subtitle: 'Intelligent Code Intelligence & AST Graphs',
    category: 'Systems & AI',
    description: 'AI developer workspace visualizing abstract syntax trees, algorithm state graphs, and explanations.',
    longDescription: 'Neural Workspace investigates how modern language models and graphical compilers can elevate developer comprehension. It parses complex algorithms into interactive node graphs, rendering execution traces alongside token-by-token code annotations in an obsidian dark IDE environment.',
    tags: ['React', 'TypeScript', 'Python'],
    features: [
      'Interactive syntax tree visualization with step-by-step debugger playback',
      'Context-aware code explanations with formatted markdown syntax',
      'Algorithm complexity profiler comparing time and space tradeoffs',
      'Dark obsidian developer interface with keyboard shortcuts'
    ],
    architectureNotes: [
      'Client-side tree layout algorithms optimized for linear rendering performance',
      'Stateless REST backend proxying language parser outputs',
      'Strict separation of execution engine and visualization presentation'
    ],
    liveUrl: 'https://example.com/demo/neural-workspace',
    githubUrl: 'https://github.com/Adil-ali-007/neural-code-workspace',
    accentColor: '#FF9466',
    status: 'Prototype'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Frontend',
    description: 'Constructing performant, accessible, and responsive user interfaces with modern reactive paradigms.',
    skills: [
      { name: 'React', level: 'Production', note: 'Hooks, concurrent features, component lifecycles' },
      { name: 'JavaScript', level: 'Core', note: 'ESNext, asynchronous event loop, functional patterns' },
      { name: 'Next.js', level: 'Proficient', note: 'App router, server components, SSR/SSG' },
      { name: 'HTML5 & CSS3', level: 'Production', note: 'Semantic structure, modern responsive layouts' },
      { name: 'Tailwind CSS', level: 'Production', note: 'Utility architecture, design tokens' }
    ]
  },
  {
    name: 'Backend',
    description: 'Architecting scalable server-side systems, RESTful microservices, and database persistence.',
    skills: [
      { name: 'Node.js', level: 'Production', note: 'Event-driven I/O, streams, middleware' },
      { name: 'Express', level: 'Production', note: 'RESTful API routing, security, controllers' },
      { name: 'REST APIs', level: 'Production', note: 'HTTP status design, idempotency, data contracts' },
      { name: 'MongoDB', level: 'Proficient', note: 'Document schemas, indexing, aggregation' }
    ]
  },
  {
    name: 'Programming & Data',
    description: 'Algorithmic fundamentals, memory considerations, numerical computing, and data manipulation.',
    skills: [
      { name: 'C++', level: 'Core', note: 'Object-oriented architectures, STL containers, RAII' },
      { name: 'Data Structures & Algorithms', level: 'Core', note: 'Trees, graphs, DP, asymptotic Big-O analysis' },
      { name: 'Python', level: 'Proficient', note: 'Scripting, backend utilities, data pipelines' },
      { name: 'NumPy', level: 'Proficient', note: 'N-dimensional arrays, vectorization' },
      { name: 'pandas', level: 'Proficient', note: 'DataFrames, series transformations, ETL' }
    ]
  },
  {
    name: 'Creative Development',
    description: 'Transforming digital products into cinematic, tactile 3D experiences with WebGL and motion design.',
    skills: [
      { name: 'Three.js', level: 'Proficient', note: 'Scene graphs, lighting, BufferGeometry, PBR' },
      { name: 'React Three Fiber', level: 'Proficient', note: 'Declarative 3D hierarchies, frame hooks' },
      { name: 'GSAP', level: 'Proficient', note: 'Timeline orchestration, ScrollTrigger pinning' },
      { name: 'Framer Motion', level: 'Production', note: 'Spring kinematics, layout transitions' }
    ]
  }
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    period: 'Foundational Rigor',
    title: 'Systems Fundamentals & Algorithmic Foundations',
    role: 'Computer Science & Software Foundations',
    summary: 'Deep immersion in low-level programming with C and C++, focusing on memory allocation, pointer arithmetic, and algorithmic time/space complexity.',
    takeaways: [
      'Mastered core data structures (balanced trees, graphs, heaps) and dynamic programming',
      'Developed strong instincts for CPU cache locality and zero-allocation critical loops',
      'Built custom console tools and algorithmic simulators from first principles'
    ],
    techStack: ['C', 'C++', 'Data Structures & Algorithms']
  },
  {
    period: 'Web Architectures',
    title: 'Full-Stack Web & Scalable APIs',
    role: 'Full-Stack Developer (MERN Ecosystem)',
    summary: 'Transitioned computational foundations into modern web software engineering, mastering React, Node.js, Express, and MongoDB.',
    takeaways: [
      'Engineered complete client-server architectures with clean REST conventions',
      'Developed real-world platforms including the Tomato food delivery system',
      'Implemented secure authentication, optimistic UI states, and database validation'
    ],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS']
  },
  {
    period: 'Spatial Interfaces',
    title: 'Creative Technology & 3D WebGL Worlds',
    role: 'Creative Developer & 3D Technologist',
    summary: 'Expanded the boundaries of web development into 3D space, combining Three.js, React Three Fiber, and motion choreography.',
    takeaways: [
      'Designed interactive procedural sculptures and cinematic lighting environments',
      'Bridged artistic creative direction with strict 60fps rendering budgets',
      'Crafted seamless viewport transitions and tactile cursor responsiveness'
    ],
    techStack: ['Three.js', 'React Three Fiber', 'GLSL', 'Framer Motion', 'TypeScript']
  },
  {
    period: 'Intelligent Systems',
    title: 'AI Integration & Modern Developer Tools',
    role: 'Software Engineer & AI Explorer',
    summary: 'Investigating the synthesis of generative AI, computational graph visualization, and high-performance frontend architectures.',
    takeaways: [
      'Creating developer-centric tools that translate code logic into intuitive visual models',
      'Leveraging Python, data manipulation libraries, and REST APIs for intelligent backends',
      'Constantly pushing the envelope for responsive, impactful software engineering'
    ],
    techStack: ['Python', 'NumPy', 'pandas', 'React', 'TypeScript', 'REST APIs']
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'inamigos-foundation',
    role: 'Web Developer Intern',
    organization: 'InAmigos Foundation',
    period: 'May 8, 2026 – May 22, 2026',
    fullDates: 'May 8, 2026 – May 22, 2026',
    type: 'Internship',
    description: 'Applied web development skills in a professional internship environment and strengthened my practical development experience.',
  },
];
