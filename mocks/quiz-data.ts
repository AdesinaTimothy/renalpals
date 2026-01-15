import { Ionicons } from "@expo/vector-icons";


export type IoniconName = keyof typeof Ionicons.glyphMap;

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}



export interface QuizCategory {
  id: string;
  title: string;
  description: string;
  icon: IoniconName;
  color: string;
  questions: QuizQuestion[];
}

export const quizCategories: QuizCategory[] = [
  {
    id: 'basics',
    title: 'Dialysis Basics',
    description: 'Learn the fundamentals of dialysis treatment',
    icon: 'heart-outline',
    color: '#4A90E2',
    questions: [
      {
        id: 'basics-1',
        question: 'What is the primary function of dialysis?',
        options: [
          'To regulate blood sugar',
          'To filter waste and excess fluid from blood',
          'To produce red blood cells',
          'To digest food'
        ],
        correctAnswer: 1,
        explanation: 'Dialysis filters waste products and excess fluid from your blood when your kidneys can no longer do this effectively.'
      },
      {
        id: 'basics-2',
        question: 'How many main types of dialysis are there?',
        options: ['1', '2', '3', '4'],
        correctAnswer: 1,
        explanation: 'There are two main types of dialysis: Hemodialysis and Peritoneal Dialysis.'
      },
      {
        id: 'basics-3',
        question: 'What does hemodialysis use to filter blood?',
        options: [
          'The liver',
          'A dialyzer (artificial kidney)',
          'The stomach lining',
          'Medications only'
        ],
        correctAnswer: 1,
        explanation: 'Hemodialysis uses a dialyzer, also called an artificial kidney, to filter your blood.'
      },
      {
        id: 'basics-4',
        question: 'How often is hemodialysis typically performed?',
        options: [
          'Once a month',
          'Once a week',
          'Three times a week',
          'Every day'
        ],
        correctAnswer: 2,
        explanation: 'Most patients undergo hemodialysis three times a week, with each session lasting 3-5 hours.'
      },
      {
        id: 'basics-5',
        question: 'What is peritoneal dialysis?',
        options: [
          'A type of kidney transplant',
          'Dialysis using the lining of your abdomen',
          'A medication treatment',
          'A surgical procedure'
        ],
        correctAnswer: 1,
        explanation: 'Peritoneal dialysis uses the lining of your abdomen (peritoneum) as a natural filter to clean your blood.'
      }
    ]
  },
  {
    id: 'treatment',
    title: 'Treatment & Care',
    description: 'Understanding your treatment process',
    icon: 'heart-outline',
    color: '#E94B3C',
    questions: [
      {
        id: 'treatment-1',
        question: 'What is a vascular access for hemodialysis?',
        options: [
          'A medication',
          'An entry point to your bloodstream',
          'A type of diet',
          'An exercise routine'
        ],
        correctAnswer: 1,
        explanation: 'Vascular access is a surgically created entry point that allows blood to be removed and returned during hemodialysis.'
      },
      {
        id: 'treatment-2',
        question: 'What is the most common type of permanent vascular access?',
        options: [
          'Catheter',
          'AV fistula',
          'IV line',
          'Port'
        ],
        correctAnswer: 1,
        explanation: 'An AV (arteriovenous) fistula is the preferred type of permanent access, connecting an artery to a vein.'
      },
      {
        id: 'treatment-3',
        question: 'How long does a typical hemodialysis session last?',
        options: [
          '30 minutes to 1 hour',
          '1 to 2 hours',
          '3 to 5 hours',
          '6 to 8 hours'
        ],
        correctAnswer: 2,
        explanation: 'A typical hemodialysis session lasts between 3 to 5 hours, depending on your specific needs.'
      },
      {
        id: 'treatment-4',
        question: 'What should you monitor at your access site?',
        options: [
          'Temperature only',
          'Color only',
          'Signs of infection and blood flow',
          'Nothing needs monitoring'
        ],
        correctAnswer: 2,
        explanation: 'You should monitor your access site for signs of infection, proper blood flow (thrill), and any unusual changes.'
      },
      {
        id: 'treatment-5',
        question: 'Can you perform peritoneal dialysis at home?',
        options: [
          'No, only in hospitals',
          'Yes, after proper training',
          'Only with a nurse present',
          'Only during daytime'
        ],
        correctAnswer: 1,
        explanation: 'Peritoneal dialysis can be performed at home after you receive proper training from your healthcare team.'
      }
    ]
  },
  {
    id: 'diet',
    title: 'Diet & Lifestyle',
    description: 'Nutrition and healthy living tips',
    icon: 'heart-outline',
    color: '#6BBF59',
    questions: [
      {
        id: 'diet-1',
        question: 'Why is limiting fluid intake important for dialysis patients?',
        options: [
          'It is not important',
          'To prevent fluid overload between treatments',
          'To lose weight',
          'To avoid medications'
        ],
        correctAnswer: 1,
        explanation: 'Limiting fluid intake prevents fluid overload, which can cause swelling, high blood pressure, and heart problems.'
      },
      {
        id: 'diet-2',
        question: 'Which mineral needs to be limited in a dialysis diet?',
        options: [
          'Iron',
          'Calcium',
          'Potassium',
          'Zinc'
        ],
        correctAnswer: 2,
        explanation: 'Potassium needs to be limited because high levels can cause dangerous heart rhythm problems when kidneys are not working properly.'
      },
      {
        id: 'diet-3',
        question: 'Why is phosphorus control important?',
        options: [
          'It affects blood sugar',
          'It can weaken bones and cause heart problems',
          'It causes weight gain',
          'It has no effect'
        ],
        correctAnswer: 1,
        explanation: 'High phosphorus levels can pull calcium from bones, making them weak, and can cause dangerous calcium deposits in blood vessels and heart.'
      },
      {
        id: 'diet-4',
        question: 'What type of diet is typically recommended for dialysis patients?',
        options: [
          'High sodium, low protein',
          'Low protein, high potassium',
          'Adequate protein, controlled potassium and phosphorus',
          'No restrictions'
        ],
        correctAnswer: 2,
        explanation: 'Dialysis patients need adequate protein for strength and healing, but should control potassium, phosphorus, sodium, and fluids.'
      },
      {
        id: 'diet-5',
        question: 'Is exercise recommended for dialysis patients?',
        options: [
          'No, complete rest is required',
          'Yes, with approval from your care team',
          'Only intense exercise',
          'Only on dialysis days'
        ],
        correctAnswer: 1,
        explanation: 'Regular, moderate exercise is beneficial for dialysis patients and can improve strength, mood, and overall health. Always consult your care team first.'
      }
    ]
  },
  {
    id: 'living',
    title: 'Living with Dialysis',
    description: 'Managing daily life and well-being',
    icon: 'heart-outline',
    color: '#F5A623',
    questions: [
      {
        id: 'living-1',
        question: 'Can you travel while on dialysis?',
        options: [
          'No, travel is not possible',
          'Yes, with proper planning',
          'Only by car',
          'Only within your city'
        ],
        correctAnswer: 1,
        explanation: 'You can travel while on dialysis by arranging treatment at dialysis centers in your destination or using portable dialysis options.'
      },
      {
        id: 'living-2',
        question: 'What is important to bring to every dialysis session?',
        options: [
          'Entertainment and snacks',
          'Your medications list',
          'Comfortable clothing',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'Bring entertainment for the long sessions, your current medications list, comfortable clothing, and approved snacks if allowed.'
      },
      {
        id: 'living-3',
        question: 'How can you manage fatigue from dialysis?',
        options: [
          'Stop treatment',
          'Get adequate rest, stay active, and eat well',
          'Sleep all day',
          'Ignore it'
        ],
        correctAnswer: 1,
        explanation: 'Managing fatigue involves getting adequate rest, staying moderately active, following your diet, and communicating with your care team.'
      },
      {
        id: 'living-4',
        question: 'Why is it important to keep all dialysis appointments?',
        options: [
          'To avoid charges',
          'It is not important',
          'Skipping can lead to dangerous buildup of waste and fluid',
          'Only for insurance reasons'
        ],
        correctAnswer: 2,
        explanation: 'Missing dialysis treatments can cause dangerous buildup of waste, excess fluid, and electrolyte imbalances that can be life-threatening.'
      },
      {
        id: 'living-5',
        question: 'Who is part of your dialysis care team?',
        options: [
          'Only the doctor',
          'Doctor, nurses, dietitian, social worker, and more',
          'Only nurses',
          'Only family members'
        ],
        correctAnswer: 1,
        explanation: 'Your care team typically includes nephrologists, dialysis nurses, dietitians, social workers, and other specialists working together for your care.'
      }
    ]
  }
];
