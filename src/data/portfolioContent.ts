import { RENDERS } from './renderAssets';

export type ServiceId = 'software' | '3d' | 'vr';

export interface PortfolioProject {
  id: string;
  title: string;
  agency: string;
  brand: string;
  role: string;
  image: string;
  category: string;
  discipline: ServiceId;
  tags: string[];
  year: string;
  caseStudy?: {
    overview: string;
    challenge: string;
    approach: string;
    outcome: string;
    contributions: string[];
    deliverables: string[];
    gallery: string[];
    tools: string[];
  };
}

export interface ServiceDefinition {
  id: ServiceId;
  index: string;
  title: string;
  shortTitle: string;
  description: string;
  deliverables: string[];
  image: string;
}

export const services: ServiceDefinition[] = [
  {
    id: 'software',
    index: '01',
    title: 'Software Development',
    shortTitle: 'Software',
    description: 'Custom digital products and software systems spanning websites, web applications, mobile applications, platforms, frontend systems, backend services, APIs, integrations, and interactive web experiences.',
    deliverables: [
      'Websites and web applications',
      'Mobile applications',
      'Product platforms and internal systems',
      'Frontend engineering',
      'Backend services and APIs',
      'Integrations and automation',
      'Real-time and 3D web experiences'
    ],
    image: RENDERS.services1
  },
  {
    id: '3d',
    index: '02',
    title: '3D Design & Visualization',
    shortTitle: '3D Design',
    description: '3D production for products, environments, branded experiences, exhibitions, visualization, animation, characters, cloth, and spatial concepts developed from briefs, drawings, references, and brand systems.',
    deliverables: [
      '3D modeling',
      'UV unwrapping and texturing',
      'Spatial and exhibition design',
      'Visualization and rendering',
      'Lighting and material development',
      'Animation and motion',
      'Character and cloth work'
    ],
    image: RENDERS.services2
  },
  {
    id: 'vr',
    index: '03',
    title: 'VR Solutions',
    shortTitle: 'VR Solutions',
    description: 'Immersive real-time experiences that combine spatial design, interaction, 3D content, and application development for virtual environments and interactive products.',
    deliverables: [
      'VR environment design',
      'Interactive immersive experiences',
      'Real-time prototypes and applications',
      'Unity, Unreal, and WebXR-oriented delivery',
      'Spatial interaction systems',
      'Training and experiential solutions',
      'Branded immersive experiences'
    ],
    image: RENDERS.services3
  }
];

export const processSteps = [
  {
    index: '01',
    title: 'Discover',
    description: 'Understand the goals, users, source material, technical constraints, and success criteria before choosing the production approach.'
  },
  {
    index: '02',
    title: 'Define',
    description: 'Turn the brief into a clear structure, scope, visual direction, system plan, and delivery path.'
  },
  {
    index: '03',
    title: 'Design',
    description: 'Shape the interface, spatial experience, assets, interactions, and visual language around the real requirements.'
  },
  {
    index: '04',
    title: 'Develop',
    description: 'Build, integrate, refine, and test the software, 3D content, or immersive system at production quality.'
  },
  {
    index: '05',
    title: 'Deliver',
    description: 'Prepare the agreed production files, application build, assets, documentation, and final review output.'
  }
];

export const capabilities = [
  {
    index: '01',
    title: 'Software systems',
    description: 'Websites, applications, platforms, frontend systems, backend services, APIs, integrations, interactive 3D web, and product implementation.'
  },
  {
    index: '02',
    title: '3D production',
    description: 'Modeling, UV work, texturing, lighting, rendering, animation, spatial design, branded environments, and production visualization.'
  },
  {
    index: '03',
    title: 'Immersive delivery',
    description: 'VR applications, real-time environments, spatial interaction, experiential prototypes, and XR-oriented experiences.'
  },
  {
    index: '04',
    title: 'Creative direction',
    description: 'A single design language carried across interface, spatial, 3D, and immersive execution when a project spans more than one discipline.'
  }
];

export const tools = [
  { name: 'Blender', category: '3D modeling, materials, animation, rendering' },
  { name: 'SketchUp', category: 'Spatial and experience design' },
  { name: 'Unreal Engine', category: 'Real-time and immersive development' },
  { name: 'Unity', category: 'VR and interactive application development' },
  { name: 'Marvelous Designer', category: 'Cloth simulation and garment assets' },
  { name: 'Three.js', category: 'Interactive 3D web experiences' },
  { name: 'React / TypeScript', category: 'Web and application development' },
  { name: 'Node.js', category: 'Backend services and application systems' },
  { name: 'Figma', category: 'Interface and product design' },
  { name: 'Adobe Creative Suite', category: 'Design and post-production' }
];

export const projects: PortfolioProject[] = [
  {
    id: '1',
    title: 'Netflix Multi-Show Launch Display',
    agency: 'JHDS (Contract)',
    brand: 'Netflix',
    role: '3D modeling, UV unwrapping, van concept design and texturing',
    image: RENDERS.netflixHero,
    category: 'Branded Vehicles',
    discipline: '3d',
    tags: ['Moodboard', 'Brand Identity', 'POVs'],
    year: '2024',
    caseStudy: {
      overview: 'Designed launch display installations for multiple Netflix flagship shows including Stranger Things, Wednesday, One Piece and Squid Game. The project involved branded vehicle concepts and detailed 3D assets for promotional activations.',
      challenge: 'Create a cohesive multi-show launch display that could represent four distinct properties while maintaining a consistent Netflix identity across the overall activation.',
      approach: 'Built display assets and installations in 3D, prepared UVs for texture application, developed van concepts, and applied show-specific visual treatments while keeping the larger system visually coherent.',
      outcome: 'Delivered complete 3D models, van concept designs, UV-ready assets, textured approval renders, and production-ready files for the activation workflow.',
      contributions: [
        '3D modeling of display assets and installations',
        'UV unwrapping for texture application',
        'Van concept design for mobile activations',
        'Texturing with show-specific branding',
        'Asset optimization for production'
      ],
      deliverables: [
        'Complete 3D models for all four shows',
        'Van concept designs and renders',
        'UV unwrapped assets ready for texturing',
        'Final textured renders for approval',
        'Production-ready files'
      ],
      gallery: [RENDERS.netflixHero, RENDERS.netflix, RENDERS.netflix2, RENDERS.netflix3, RENDERS.netflix4, RENDERS.netflix5],
      tools: ['Blender', 'SketchUp', 'Unreal Engine', 'Adobe Creative Suite']
    }
  },
  {
    id: '2',
    title: 'Arknights: Endfield - Gamescom 2025 Stand',
    agency: 'JHDS (Contract)',
    brand: 'Arknights: Endfield',
    role: '3D modeling, UV unwrapping, texturing, staff population and character cutouts',
    image: RENDERS.arknitghtsEndfieldHero,
    category: 'Game/Entertainment IP',
    discipline: '3d',
    tags: ['Plan Layout', 'Elevations', 'Grid'],
    year: '2025',
    caseStudy: {
      overview: 'Created an installation booth for Arknights: Endfield at Gamescom 2025. The work translated in-game environments into a large-scale physical display with character cutouts and branded staff elements.',
      challenge: 'Translate the visual identity and spatial language of the game into a physical Gamescom installation while keeping the environment legible, buildable, and recognizably connected to the source material.',
      approach: 'Modeled the installation environment, prepared UVs and textures, populated staff elements, and created character cutouts and branded visual components for the physical experience.',
      outcome: 'Delivered booth models, display designs, character cutout files, staff population assets, textured final renders, and construction documentation.',
      contributions: [
        '3D modeling of the installation booth from the game',
        'UV unwrapping for detailed texturing',
        'Texturing to match the game aesthetic',
        'Modeling human figures with branded t-shirts',
        'Creating character cutouts of game characters',
        'Technical documentation'
      ],
      deliverables: [
        'Complete booth 3D models',
        'Installation display designs',
        'Character cutout files',
        'Staff population models',
        'Textured final renders',
        'Construction documentation'
      ],
      gallery: [RENDERS.arknitghtsEndfieldHero, RENDERS.arknitghtsEndfield, RENDERS.arknitghtsEndfieldBooth],
      tools: ['Blender', 'SketchUp', 'Unreal Engine', 'Adobe Creative Suite']
    }
  },
  {
    id: '3',
    title: 'Sonic Racing: CrossWorlds Stand - Gamescom 2025',
    agency: 'JHDS (Contract)',
    brand: 'SEGA',
    role: 'UV unwrapping, texture corrections, character cutouts and game item creation',
    image: RENDERS.sonicHero,
    category: 'Game/Entertainment IP',
    discipline: '3d',
    tags: ['Brand Identity', 'Touchpoints', 'POVs'],
    year: '2025',
    caseStudy: {
      overview: 'Developed the Sonic Racing: CrossWorlds exhibition stand for Gamescom 2025, with a focus on technical asset preparation, texture corrections, character cutouts and game items.',
      challenge: 'Prepare and refine exhibition assets so the stand could translate the game identity into a physical environment without losing the clarity of the source characters, items, and visual language.',
      approach: 'Unwrapped stand assets, corrected and optimized textures, created character cutouts, modeled game items and props, and prepared files for production.',
      outcome: 'Delivered UV-ready stand models, optimized texture maps, character cutout designs, game item models, and production-ready files.',
      contributions: [
        'UV unwrapping of stand assets',
        'Fixing and optimizing textures',
        'Creating cutouts of game characters',
        'Modeling game items and props',
        'Technical preparation for production'
      ],
      deliverables: [
        'UV unwrapped stand models',
        'Optimized texture maps',
        'Character cutout designs',
        'Game item models',
        'Production-ready files'
      ],
      gallery: [RENDERS.sonicHero, RENDERS.sonic, RENDERS.sonic2, RENDERS.sonic3, RENDERS.sonic4],
      tools: ['Blender', 'SketchUp', 'Unreal Engine', 'Adobe Creative Suite']
    }
  },
  {
    id: '4',
    title: 'Genshin Impact Exhibition Booth',
    agency: 'JHDS (Contractor)',
    brand: 'Genshin Impact',
    role: 'Stand design from client specifications',
    image: RENDERS.genshinImpact,
    category: 'Game/Entertainment IP',
    discipline: '3d',
    tags: ['Stand Design', 'Exhibition', 'Client Spec'],
    year: '2025',
    caseStudy: {
      overview: 'Created a large-scale exhibition booth for Genshin Impact with character displays, audience areas, and an environment shaped around the source visual identity.',
      challenge: 'Turn the client specifications and source game identity into a coherent exhibition environment with audience areas, character presentation, and practical spatial organization.',
      approach: 'Developed the spatial layout, modeled character display environments, considered interactive zones, and carried the game-world atmosphere into the booth design.',
      outcome: 'Delivered the booth design, character display environment, interactive station layouts, lighting and atmosphere studies, and technical spatial documentation.',
      contributions: [
        'Spatial layout design for audience flow',
        'Character display environment modeling',
        'Interactive zone conceptualization',
        'Game-world atmosphere development',
        'Technical documentation for construction'
      ],
      deliverables: [
        'Complete booth 3D model',
        'Character display design',
        'Interactive station layouts',
        'Lighting and atmosphere studies',
        'Construction plans and elevations'
      ],
      gallery: [RENDERS.genshinImpact],
      tools: ['Blender', 'SketchUp', 'Unreal Engine', 'Adobe Creative Suite']
    }
  },
  {
    id: '5',
    title: 'CeraVe Event Environment',
    agency: 'JHDS (Contractor)',
    brand: 'CeraVe',
    role: '3D product modeling, UV unwrapping and texturing in Blender. Created the initial design concept, with the final design retaining the product models.',
    image: RENDERS.cerave,
    category: 'Events/Experiences',
    discipline: '3d',
    tags: ['3D Modeling', 'Texturing', 'Blender'],
    year: '2025'
  },
  {
    id: '6',
    title: 'Hulu Deli Boys Food Truck',
    agency: 'JHDS (Contractor)',
    brand: 'Hulu',
    role: 'Design and build from client specifications, 3D product modeling and lighting setup',
    image: RENDERS.deliBoys,
    category: 'Branded Vehicles',
    discipline: '3d',
    tags: ['3D Modeling', 'Design', 'Lighting'],
    year: '2025'
  },
  {
    id: '7',
    title: 'Heineken Pop-up Experience',
    agency: 'JHDS (Contractor)',
    brand: 'Heineken',
    role: 'UV unwrapping and retexturing of an existing SketchUp file',
    image: RENDERS.heineken,
    category: 'Retail Pop-ups',
    discipline: '3d',
    tags: ['UV Mapping', 'Texturing', 'SketchUp'],
    year: '2025'
  },
  {
    id: '8',
    title: 'Pepsi Event Stand',
    agency: 'JHDS (Contractor)',
    brand: 'Pepsi',
    role: 'Design and build from client specifications using Blender and SketchUp',
    image: RENDERS.pepsi,
    category: 'Events/Experiences',
    discipline: '3d',
    tags: ['3D Modeling', 'Design', 'Blender', 'SketchUp'],
    year: '2025'
  },
  {
    id: '9',
    title: 'Discovery Bank Video Ad',
    agency: 'JHDS (Contractor)',
    brand: 'Discovery Bank',
    role: 'Motion tracking, rotoscoping, 3D building modeling from video references, tracked 3D integration and plane animation',
    image: RENDERS.discoveryVideo,
    category: 'Animation/Video',
    discipline: '3d',
    tags: ['Motion Tracking', 'Rotoscoping', '3D Modeling', 'Animation'],
    year: '2025'
  },
  {
    id: '10',
    title: 'Mercedes-Benz Conference Hall',
    agency: 'JHDS (Contractor)',
    brand: 'Mercedes-Benz',
    role: 'Conference hall design developed from live client instructions, including modeling, UV work, texturing, lighting and spatial design',
    image: RENDERS.daimler,
    category: 'Events/Experiences',
    discipline: '3d',
    tags: ['3D Modeling', 'Space Design', 'Texturing', 'Lighting'],
    year: '2025'
  },
  {
    id: '11',
    title: 'GAC Automotive Showroom',
    agency: 'GAC Motor',
    brand: 'GAC',
    role: 'Showroom layout, vehicle displays and customer experience planning',
    image: RENDERS.gacShowroom,
    category: 'Retail Pop-ups',
    discipline: '3d',
    tags: ['Brand Identity', 'Plans', 'Touchpoints'],
    year: '2023'
  }
];

export const featuredProjectIds = ['1', '2', '3'];
export const caseStudyProjectIds = projects.filter((project) => project.caseStudy).map((project) => project.id);

export const contactProjectTypes = [
  'Software Development',
  '3D Design & Visualization',
  'VR Solutions',
  'Multidisciplinary / Combined'
];

export const pageIndex = {
  work: '/ 01 - WORK',
  services: '/ 02 - SERVICES',
  about: '/ 03 - ABOUT',
  contact: '/ 04 - CONTACT'
};
