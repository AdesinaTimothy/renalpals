import { Ionicons } from "@expo/vector-icons";

export type IoniconName = keyof typeof Ionicons.glyphMap;

export interface LearningTopic {
  id: string;
  title: string;
  description: string;
  icon: IoniconName;
  color: string;
  content: {
    introduction: string;
    sections: {
      title: string;
      content: string;
      keyPoints?: string[];
    }[];
  };
}

export const learningTopics: LearningTopic[] = [
  {
    id: 'what-is-dialysis',
    title: 'What is Dialysis?',
    description: 'Understanding dialysis and how it works',
    icon: 'heart-outline',
    color: '#ef4444',
    content: {
      introduction: 'Dialysis is a treatment that filters and purifies the blood using a machine. This helps keep your fluids and electrolytes in balance when the kidneys can\'t do their job.',
      sections: [
        {
          title: 'Why is Dialysis Needed?',
          content: 'When kidneys fail, they can no longer remove waste products and excess fluid from your blood. Dialysis takes over this vital function.',
          keyPoints: [
            'Removes waste and toxins from blood',
            'Controls blood pressure',
            'Maintains proper balance of minerals',
            'Helps keep safe levels of chemicals',
          ],
        },
        {
          title: 'Types of Dialysis',
          content: 'There are two main types of dialysis: hemodialysis and peritoneal dialysis. Each has its own process and benefits.',
          keyPoints: [
            'Hemodialysis: Uses a machine to filter blood',
            'Peritoneal dialysis: Uses the lining of your abdomen',
            'Both are effective treatments',
            'Choice depends on lifestyle and health',
          ],
        },
      ],
    },
  },
  {
    id: 'hemodialysis',
    title: 'Hemodialysis',
    description: 'Learn about hemodialysis treatment',
    icon: 'school-outline',
    color: '#3b82f6',
    content: {
      introduction: 'Hemodialysis is the most common type of dialysis. It uses a dialyzer (artificial kidney) to filter your blood.',
      sections: [
        {
          title: 'How It Works',
          content: 'During hemodialysis, your blood flows through tubes into a dialyzer that filters out wastes and extra fluids. The cleaned blood then flows back into your body.',
          keyPoints: [
            'Usually done 3 times per week',
            'Each session lasts 3-5 hours',
            'Performed at a dialysis center or home',
            'Requires vascular access',
          ],
        },
        {
          title: 'Vascular Access',
          content: 'To perform hemodialysis, you need access to your bloodstream. There are three types of access points.',
          keyPoints: [
            'Fistula: Connection between artery and vein',
            'Graft: Synthetic tube connecting vessels',
            'Catheter: Tube inserted into large vein',
            'Fistula is the preferred option',
          ],
        },
      ],
    },
  },
  {
  id: "peritoneal-dialysis",
  title: "Peritoneal Dialysis",
  description: "Learn about home-based peritoneal dialysis",
  icon: "water-outline",
  color: "#22c55e",
  content: {
    introduction:
      "Peritoneal dialysis is a type of dialysis that uses the lining of your abdomen (the peritoneum) and a special cleansing fluid to remove waste and excess fluid from your blood. It is usually done at home and offers greater flexibility.",
    sections: [
      {
        title: "How Peritoneal Dialysis Works",
        content:
          "A cleansing fluid called dialysate is placed into your abdomen through a catheter. Waste products and extra fluid pass from your blood into the dialysate, which is then drained and replaced.",
        keyPoints: [
          "Uses the abdomen’s natural lining as a filter",
          "Dialysate absorbs waste and excess fluid",
          "Fluid is drained and replaced regularly",
          "No blood is removed from the body",
        ],
      },
      {
        title: "Types of Peritoneal Dialysis",
        content:
          "There are different types of peritoneal dialysis, and the choice depends on your lifestyle, schedule, and medical needs.",
        keyPoints: [
          "CAPD: Manual exchanges done during the day",
          "APD: Uses a machine overnight",
          "Both can be done at home",
          "Allows greater independence",
        ],
      },
      {
        title: "Daily Care and Infection Prevention",
        content:
          "Proper hygiene and catheter care are essential to prevent infection, especially peritonitis.",
        keyPoints: [
          "Wash hands before exchanges",
          "Keep the catheter site clean and dry",
          "Watch for signs of infection",
          "Follow training instructions carefully",
        ],
      },
      {
        title: "Lifestyle Considerations",
        content:
          "Peritoneal dialysis allows more flexibility but requires responsibility and daily commitment.",
        keyPoints: [
          "Can be done at home or while traveling",
          "Fits better with work or school schedules",
          "Requires storage space for supplies",
          "Regular follow-up with healthcare team",
        ],
      },
    ],
  },
},

  {
    id: 'diet-nutrition',
    title: 'Diet & Nutrition',
    description: 'Important dietary guidelines for dialysis patients',
    icon: 'fast-food-outline',
    color: '#10b981',
    content: {
      introduction: 'Following a special diet is an important part of your dialysis treatment. The right foods help you feel better and stay healthier.',
      sections: [
        {
          title: 'Fluid Intake',
          content: 'Limiting fluids is essential because your kidneys can\'t remove extra fluid effectively. Too much fluid can cause swelling and strain your heart.',
          keyPoints: [
            'Monitor daily fluid intake',
            'Count all liquids including soup, ice cream',
            'Watch for signs of fluid overload',
            'Work with your dietitian on limits',
          ],
        },
        {
          title: 'Protein Requirements',
          content: 'Dialysis removes protein from your body, so you need to eat high-quality protein to stay healthy and maintain muscle.',
          keyPoints: [
            'Include protein at every meal',
            'Choose lean meats, fish, eggs',
            'Plant proteins are also beneficial',
            'Follow recommended daily amounts',
          ],
        },
        {
          title: 'Potassium Control',
          content: 'High potassium levels can cause dangerous heart rhythms. Many foods contain potassium, so careful monitoring is important.',
          keyPoints: [
            'Limit high-potassium foods',
            'Bananas, oranges, potatoes are high',
            'Get regular blood tests',
            'Learn low-potassium alternatives',
          ],
        },
        {
          title: 'Phosphorus Management',
          content: 'Too much phosphorus can weaken bones and cause calcium deposits. Taking binders with meals helps control phosphorus.',
          keyPoints: [
            'Limit dairy, nuts, and beans',
            'Take phosphate binders as prescribed',
            'Read food labels carefully',
            'Choose lower-phosphorus options',
          ],
        },
      ],
    },
  },
  {
    id: 'living-with-dialysis',
    title: 'Living with Dialysis',
    description: 'Tips for daily life and well-being',
    icon: "sparkles-outline",
    color: '#f59e0b',
    content: {
      introduction: 'Living with dialysis requires adjustments, but many people lead full, active lives. Understanding how to manage your treatment helps you feel your best.',
      sections: [
        {
          title: 'Daily Routine',
          content: 'Creating a routine around your dialysis schedule helps maintain normalcy in your life.',
          keyPoints: [
            'Plan activities around treatment',
            'Get adequate rest after sessions',
            'Stay active when you feel well',
            'Maintain social connections',
          ],
        },
        {
          title: 'Mental Health',
          content: 'It\'s normal to have emotional ups and downs. Taking care of your mental health is just as important as physical health.',
          keyPoints: [
            'Talk about your feelings',
            'Join support groups',
            'Stay connected with loved ones',
            'Consider counseling if needed',
          ],
        },
        {
          title: 'Staying Active',
          content: 'Regular physical activity can improve your energy, mood, and overall health. Start slowly and build up gradually.',
          keyPoints: [
            'Walking is excellent exercise',
            'Consult your doctor before starting',
            'Exercise on non-dialysis days when possible',
            'Listen to your body',
          ],
        },
      ],
    },
  },
  
];
