interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: 'calendar' | 'globe' | 'cpu' | 'users';
}

interface AlternateReality {
  scenario: string;
  headline: string;
  summary: string;
  timeline: TimelineEvent[];
  consequences: {
    cultural: string;
    technological: string;
    political: string;
  };
}

// Mock data generator - in production, this would call an AI API
export const generateReality = async (scenario: string): Promise<AlternateReality> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const realities: Record<string, AlternateReality> = {
    "What if the Internet was never invented?": {
      scenario: "The Internet Was Never Invented",
      headline: "Global Communications Network 'TeleGrid' Celebrates 30 Years of Satellite-Based Data Transfer",
      summary: "In this reality, the ARPANET project was defunded in 1972, leading to a world where physical media and satellite networks dominate global communication. Corporations control regional data networks, and information travels slower but more deliberately.",
      timeline: [
        {
          year: "1972",
          title: "ARPANET Shutdown",
          description: "Due to budget cuts, the US government defunds the ARPANET project, pivoting resources to space exploration.",
          icon: "calendar"
        },
        {
          year: "1985",
          title: "TeleGrid Launch",
          description: "A consortium of telecom companies launches TeleGrid, a satellite-based corporate communication network.",
          icon: "cpu"
        },
        {
          year: "1995",
          title: "The Video Disc Revolution",
          description: "Physical media becomes the primary method of software distribution. Video rental stores become tech hubs.",
          icon: "globe"
        },
        {
          year: "2024",
          title: "The Knowledge Keepers",
          description: "Libraries transform into information powerhouses, employing thousands of researchers and fact-checkers.",
          icon: "users"
        }
      ],
      consequences: {
        cultural: "Face-to-face interactions remain paramount. Letter writing experiences a renaissance, and local communities are stronger but more isolated from global trends.",
        technological: "Physical computing dominates. Floppy disks evolved into crystal storage. AI development is 20 years behind, limited by lack of distributed computing.",
        political: "Nations maintain stronger information borders. Propaganda is easier to contain but also easier to manufacture within borders."
      }
    },
    "What if dinosaurs never went extinct?": {
      scenario: "Dinosaurs Never Went Extinct",
      headline: "Velociraptor Service Animals Now Legal in 47 States",
      summary: "The asteroid missed Earth 66 million years ago. Dinosaurs continued to evolve alongside early mammals, leading to a world where intelligent saurian species share the planet with humans, having developed their own civilizations.",
      timeline: [
        {
          year: "65M BCE",
          title: "The Near Miss",
          description: "A massive asteroid passes close to Earth but doesn't impact, allowing dinosaur evolution to continue.",
          icon: "globe"
        },
        {
          year: "10M BCE",
          title: "Rise of the Saurians",
          description: "Troodon descendants develop tool use and primitive language, beginning the Saurian civilization.",
          icon: "users"
        },
        {
          year: "50,000 BCE",
          title: "First Contact",
          description: "Early humans encounter advanced Saurian civilizations in what is now South America.",
          icon: "calendar"
        },
        {
          year: "2024",
          title: "The United Species Council",
          description: "Humans and Saurians govern Earth together through the USC, balancing mammalian and reptilian interests.",
          icon: "cpu"
        }
      ],
      consequences: {
        cultural: "Temperature preferences divide cities into warm and cool zones. Art and music blend mammalian and saurian aesthetics in fascinating ways.",
        technological: "Biotechnology is 50 years ahead. Saurians' natural connection to their environment accelerated green energy adoption.",
        political: "The planet has two dominant intelligent species with different needs, leading to complex but functional power-sharing agreements."
      }
    },
    "What if humans could photosynthesize?": {
      scenario: "Humans Could Photosynthesize",
      headline: "Sunlight Tax Proposed: Should Those With Better Sun Access Pay More?",
      summary: "A genetic mutation in ancient humans allowed chlorophyll integration into skin cells. Humans now derive 40% of their energy from sunlight, fundamentally changing society's relationship with food, work, and shelter.",
      timeline: [
        {
          year: "100,000 BCE",
          title: "The Green Mutation",
          description: "A beneficial mutation allows proto-humans to produce chlorophyll, providing supplemental nutrition.",
          icon: "users"
        },
        {
          year: "3000 BCE",
          title: "Sun Temples Rise",
          description: "Civilizations build massive sun-gathering structures. Sun exposure becomes religious and practical.",
          icon: "globe"
        },
        {
          year: "1800 CE",
          title: "The Shade Wars",
          description: "Industrial revolution leads to conflicts over sun rights as factories block light from residential areas.",
          icon: "calendar"
        },
        {
          year: "2024",
          title: "Solar Equality Movement",
          description: "Activists fight for equal sunlight access as wealthy communities hoard prime sun-exposure real estate.",
          icon: "cpu"
        }
      ],
      consequences: {
        cultural: "Clothing is minimal and transparent. Green skin tones are the beauty standard. 'Sunbathing' is literally recharging.",
        technological: "Food industry is 70% smaller. Architecture prioritizes light access. Space colonization is easier with reduced food needs.",
        political: "Equatorial nations are superpowers. Northern countries invest heavily in artificial sun technology and migration south."
      }
    },
    "What if gravity was twice as strong?": {
      scenario: "Gravity Was Twice As Strong",
      headline: "New Exoskeleton Models Allow Citizens to Experience 'Normal' Movement",
      summary: "With double Earth's gravity, life evolved very differently. Humans are shorter, stronger, and more compact. Buildings are wide rather than tall, and flight remained impossible until very recent technology.",
      timeline: [
        {
          year: "4B BCE",
          title: "Compressed Evolution",
          description: "Life evolves in high gravity, producing denser bones, stronger muscles, and low-profile organisms.",
          icon: "globe"
        },
        {
          year: "50,000 BCE",
          title: "The Ground Dwellers",
          description: "Humans evolve to be 4 feet tall with extremely powerful legs and compact torsos.",
          icon: "users"
        },
        {
          year: "1500 CE",
          title: "The Dome Cities",
          description: "Architecture develops around wide, reinforced domes. Multi-story buildings are impossible.",
          icon: "calendar"
        },
        {
          year: "2024",
          title: "First Powered Flight",
          description: "After centuries of failed attempts, humanity achieves its first sustained 30-second flight.",
          icon: "cpu"
        }
      ],
      consequences: {
        cultural: "Dance and sports focus on ground-based movements. Music emphasizes bass. Fear of heights is virtually unknown.",
        technological: "Transportation relies on ground vehicles and tunnels. Rocketry is extremely advanced due to necessity. Drones only recently became viable.",
        political: "Mountain nations were isolated until tunnel technology advanced. Flat lands are prime real estate worth fighting over."
      }
    }
  };

  // Check if we have a pre-made reality
  if (realities[scenario]) {
    return realities[scenario];
  }

  // Generate a generic response for custom scenarios
  return {
    scenario: scenario.replace('What if ', '').replace('?', ''),
    headline: `Breaking: World Adapts to ${scenario.replace('What if ', '').replace('?', '')} Reality`,
    summary: `This alternate reality explores the profound implications of "${scenario}". The ripple effects have transformed every aspect of human civilization, from daily life to global politics.`,
    timeline: [
      {
        year: "Year 0",
        title: "The Divergence Point",
        description: "The moment when this reality split from our own, setting off a chain of unprecedented changes.",
        icon: "calendar"
      },
      {
        year: "+100 Years",
        title: "Early Adaptations",
        description: "Society begins reorganizing around the new reality, establishing new norms and institutions.",
        icon: "users"
      },
      {
        year: "+500 Years",
        title: "The New Normal",
        description: "Generations have now lived under these conditions. The old world is barely remembered.",
        icon: "globe"
      },
      {
        year: "Present Day",
        title: "Modern Implications",
        description: "Contemporary society reflects millennia of adaptation to this alternate reality.",
        icon: "cpu"
      }
    ],
    consequences: {
      cultural: "Cultural norms have fundamentally shifted to accommodate this reality, creating entirely new art forms, social structures, and ways of life.",
      technological: "Technology evolved along a completely different path, solving problems that don't exist in our reality while missing solutions we take for granted.",
      political: "Power structures reorganized around the resources and capabilities most relevant to this alternate world."
    }
  };
};
