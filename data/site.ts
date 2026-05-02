export type NavItem = {
  href: string;
  label: string;
};

export type Stat = {
  value: number;
  suffix: string;
  label: string;
};

export type Feature = {
  icon: IconKey;
  title: string;
  description: string;
};

export type Doctor = {
  name: string;
  role: string;
  qualification?: string;
  experience: string;
  badge?: string;
  specialties: string[];
  bio: string;
  image: string;
};

export type ServiceCategory =
  | 'All'
  | 'Preventive'
  | 'Cosmetic'
  | 'Restorative'
  | 'Orthodontic'
  | 'Surgical'
  | 'Emergency';

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  duration: string;
  category: Exclude<ServiceCategory, 'All'>;
  icon: IconKey;
  highlight: string;
};

export type BlogSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  publishedAt: string;
  coverLabel: string;
  seoDescription: string;
  sections: BlogSection[];
  takeaways: string[];
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type Review = {
  id: string;
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export type IconKey =
  | 'Sparkles'
  | 'ShieldCheck'
  | 'Smile'
  | 'Zap'
  | 'BadgeDollarSign'
  | 'Baby'
  | 'Syringe'
  | 'Crown'
  | 'AlarmClock'
  | 'Scan'
  | 'Stethoscope'
  | 'HeartPulse'
  | 'ShieldPlus'
  | 'PhoneCall'
  | 'MapPinned'
  | 'MessagesSquare'
  | 'CalendarCheck2'
  | 'Star'
  | 'Tooth';

export const siteConfig = {
  name: "Param's Dental",
  description:
    'Luxury, technology-led dental care with experienced clinicians, painless treatments, and a calm premium experience.',
  tagline: 'Your Perfect Smile Starts Here',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://paramsdental.com',
  email: 'paramsdental@gmail.com',
  phone: '081233 38324',
  phoneHref: 'tel:+918123338324',
  whatsapp: '919902535254',
  whatsappUrl:
    'https://wa.me/919902535254?text=Hi%20Param%27s%20Dental%2C%20I%20would%20like%20to%20book%20an%20appointment.',
  address: '1175, 1st A Main Rd, Hoshalli Extension, Vijayanagar, Bengaluru – 560040\nNear Hosahalli Metro Station',
  directionsUrl: 'https://share.google/fricUdGxm2tMZ3QDI',
  hours: [
    'Mon - Sat: 10:00 AM - 8:30 PM',
    'Sunday: Emergencies & prior bookings',
  ],
};

export const navItems: NavItem[] = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#dentists', label: 'Dentists' },
  { href: '#services', label: 'Services' },
  { href: '#blogs', label: 'Blogs' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

export const stats: Stat[] = [
  { value: 10, suffix: 'K+', label: 'Patients Treated' },
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 25, suffix: '+', label: 'Dental Services' },
  { value: 4.9, suffix: '', label: 'Google Rating' },
];

export const aboutFeatures: Feature[] = [
  {
    icon: 'Stethoscope',
    title: 'Experienced Dentists',
    description: 'Clinical excellence backed by smile design expertise and a patient-first consultation style.',
  },
  {
    icon: 'HeartPulse',
    title: 'Painless Treatments',
    description: 'Comfort-led dentistry with gentle protocols, sedation-ready options, and shorter chair time.',
  },
  {
    icon: 'BadgeDollarSign',
    title: 'Affordable Pricing',
    description: 'Transparent treatment plans, staged care options, and premium results without surprise costs.',
  },
];

export const modernEquipment = [
  'Laser',
  'iTero Lumina 5D Intraoral Scanner',
  'iTero Flex Intraoral Scanner',
  'RVG Digital X-Rays',
];

export const doctors: Doctor[] = [
  {
    name: 'Dr. Paramesh Gowda S.V',
    role: 'Founder / Orthodontist / Invisalign Specialist',
    experience: '12+ years of experience',
    badge: 'Gold Invisalign Provider',
    specialties: ['Founder', 'Orthodontist', 'Invisalign Specialist'],
    bio: 'Renowned for his expertise, precision, and patient-friendly approach, Dr. Paramesh Gowda provides high-quality dental care using advanced techniques and modern dentistry. From routine check-ups to specialized treatments, he ensures every patient receives comfortable, personalized, and reliable care at Params Dental Clinic.',
    image: '/images/dr-paramesh-gowda.jpg',
  },
  {
    name: 'Dr. Shylashree Paramesh',
    role: 'Orthodontist / Invisalign Specialist',
    experience: '10+ years of experience',
    specialties: ['Orthodontist', 'Invisalign Specialist'],
    bio: 'Known for her gentle approach and attention to detail, Dr. Shylashree provides compassionate, personalized dental care. She focuses on patient education, preventive dentistry, and treatment plans that support long-term oral health.',
    image: '/images/dr-shylashree-paramesh.jpg',
  },
  {
    name: 'Dr. Rakshitha',
    role: 'Dental Surgeon',
    qualification: 'BDS',
    experience: '5+ years experience',
    specialties: ['Dental Surgeon', 'BDS'],
    bio: 'Provides reliable dental care with a focus on patient comfort, careful diagnosis, and practical treatment planning.',
    image: '/images/dr-rakshitha.jpeg',
  },
  {
    name: 'Dr. Swapna',
    role: 'Dental Surgeon',
    qualification: 'BDS',
    experience: '5+ years experience',
    specialties: ['Dental Surgeon', 'BDS'],
    bio: 'Offers compassionate dental care with attention to detail, preventive guidance, and smooth patient communication.',
    image: '/images/dr-swapna.jpeg',
  },
  {
    name: 'Dr. Nithin S.B',
    role: 'Prosthodontist & Implantologist',
    experience: '12+ years experience',
    specialties: ['Prosthodontist', 'Implantologist'],
    bio: 'Specializes in prosthetic rehabilitation and implant dentistry with a focus on function, aesthetics, and long-term stability.',
    image: '/images/dr-nithin.png',
  },
  {
    name: 'Dr. Akhilesh',
    role: 'Endodontist / Root Canal Specialist',
    experience: '5+ years experience',
    specialties: ['Endodontist', 'Root Canal Specialist'],
    bio: 'Focuses on root canal care and tooth-saving treatments using a calm, precise, and patient-friendly approach.',
    image: '/images/dr-akhilesh-new.png',
  },
  {
    name: 'Dr. Suhas',
    role: 'Oral & Maxillofacial Surgeon',
    experience: '5+ years experience',
    specialties: ['Oral Surgeon', 'Maxillofacial Surgeon'],
    bio: 'Provides surgical dental care with careful planning, clear communication, and attention to patient comfort.',
    image: '/illustrations/doctor-2.svg',
  },
];

export const services: Service[] = [
  {
    slug: 'teeth-cleaning',
    title: 'Teeth Cleaning',
    shortDescription: 'Preventive cleaning and polishing for healthier gums and fresher breath.',
    description:
      'Professional scaling and polishing removes tartar, surface stains, and plaque while helping reduce inflammation and future decay risk.',
    benefits: ['Removes plaque and tartar', 'Freshens breath', 'Supports healthy gums', 'Brightens your smile'],
    duration: '30 to 45 minutes',
    category: 'Preventive',
    icon: 'ShieldCheck',
    highlight: 'Preventive care',
  },
  {
    slug: 'teeth-whitening',
    title: 'Teeth Whitening',
    shortDescription: 'Cosmetic whitening for a brighter, camera-ready smile.',
    description:
      'In-clinic whitening lifts common stains from coffee, tea, and lifestyle habits with a tailored shade enhancement plan.',
    benefits: ['Noticeably brighter teeth', 'Fast in-clinic results', 'Customized shade goals', 'Safe enamel-first protocols'],
    duration: '45 to 60 minutes',
    category: 'Cosmetic',
    icon: 'Sparkles',
    highlight: 'Popular makeover',
  },
  {
    slug: 'root-canal-treatment',
    title: 'Root Canal Treatment',
    shortDescription: 'Precision endodontic care to save infected teeth and relieve pain.',
    description:
      'Our root canal treatment removes infected tissue, disinfects the canal system, and restores the tooth to function with modern rotary tools.',
    benefits: ['Eliminates tooth pain', 'Saves the natural tooth', 'Restores chewing comfort', 'Prevents further infection'],
    duration: '60 to 90 minutes',
    category: 'Restorative',
    icon: 'Zap',
    highlight: 'Pain relief',
  },
  {
    slug: 'dental-implants',
    title: 'Dental Implants',
    shortDescription: 'Permanent tooth replacement with natural function and aesthetics.',
    description:
      'Implants replace missing teeth with a durable titanium root and aesthetic crown, restoring confidence, bite force, and bone support.',
    benefits: ['Natural appearance', 'Long-term solution', 'Supports jawbone health', 'Improves chewing stability'],
    duration: 'Multi-visit treatment',
    category: 'Restorative',
    icon: 'Tooth',
    highlight: 'Premium restoration',
  },
  {
    slug: 'braces-aligners',
    title: 'Braces & Aligners',
    shortDescription: 'Orthodontic planning for straighter teeth and balanced bites.',
    description:
      'Choose from discreet clear aligners or proven braces to correct alignment, spacing, and bite issues with a customized smile plan.',
    benefits: ['Straighter smile', 'Better bite alignment', 'Improved oral hygiene access', 'Personalized treatment options'],
    duration: '6 to 18 months',
    category: 'Orthodontic',
    icon: 'Smile',
    highlight: 'Smile design',
  },
  {
    slug: 'smile-makeover',
    title: 'Smile Makeover',
    shortDescription: 'Multi-treatment cosmetic planning for a complete transformation.',
    description:
      'A smile makeover combines whitening, veneers, contouring, and restorative work to shape a naturally elevated smile aesthetic.',
    benefits: ['Tailored facial harmony', 'Confidence boost', 'Holistic planning', 'High-impact cosmetic results'],
    duration: 'Treatment plan based',
    category: 'Cosmetic',
    icon: 'Sparkles',
    highlight: 'Bespoke planning',
  },
  {
    slug: 'pediatric-dentistry',
    title: 'Pediatric Dentistry',
    shortDescription: 'Gentle, child-friendly dentistry in a calming clinical environment.',
    description:
      'From preventive cleanings to growth monitoring, our pediatric care focuses on trust-building and age-appropriate oral health education.',
    benefits: ['Comfortable first visits', 'Preventive monitoring', 'Early issue detection', 'Parent guidance'],
    duration: '30 to 40 minutes',
    category: 'Preventive',
    icon: 'Baby',
    highlight: 'Kids friendly',
  },
  {
    slug: 'tooth-extraction',
    title: 'Tooth Extraction',
    shortDescription: 'Safe surgical extractions with gentle post-care planning.',
    description:
      'When a tooth cannot be preserved, we offer atraumatic extraction techniques and recovery guidance to protect surrounding tissue.',
    benefits: ['Relieves severe pain', 'Prepares for implants or braces', 'Controls infection spread', 'Guided recovery plan'],
    duration: '30 to 60 minutes',
    category: 'Surgical',
    icon: 'Syringe',
    highlight: 'Gentle surgery',
  },
  {
    slug: 'dental-crowns',
    title: 'Dental Crowns',
    shortDescription: 'Precision crowns for strength, durability, and natural aesthetics.',
    description:
      'Custom crowns restore cracked, treated, or worn teeth with shape-matched ceramic restorations built for long-term function.',
    benefits: ['Protects weakened teeth', 'Natural color matching', 'Long-lasting support', 'Restores full bite function'],
    duration: '2 visits',
    category: 'Restorative',
    icon: 'Crown',
    highlight: 'High-strength ceramic',
  },
  {
    slug: 'emergency-dental-care',
    title: 'Emergency Dental Care',
    shortDescription: 'Rapid response for swelling, trauma, fractures, and urgent pain.',
    description:
      'Emergency appointments focus on immediate diagnosis, pain management, and quick stabilization before definitive treatment.',
    benefits: ['Fast pain management', 'Same-day assessment', 'Trauma support', 'Emergency treatment planning'],
    duration: 'Immediate triage',
    category: 'Emergency',
    icon: 'AlarmClock',
    highlight: 'Priority access',
  },
];

export const faqs: FAQItem[] = [
  {
    question: 'Is dental treatment painful?',
    answer:
      'Most treatments today are far gentler than patients expect. We use modern anesthesia, careful pacing, and comfort-focused techniques to keep procedures calm and manageable.',
  },
  {
    question: 'How often should I visit the dentist?',
    answer:
      'For most patients, every six months is ideal for preventive care. If you have gum concerns, orthodontic treatment, or frequent sensitivity, we may recommend more frequent visits.',
  },
  {
    question: 'What is the cost of teeth whitening?',
    answer:
      'Whitening plans vary depending on stain severity and the shade target. We provide a clear quote after examining your teeth and confirming the best protocol for you.',
  },
  {
    question: 'Do you provide emergency dental care?',
    answer:
      'Yes. We keep room in our schedule for urgent pain, swelling, broken teeth, and trauma cases so you can be assessed quickly.',
  },
  {
    question: 'Are aligners better than braces?',
    answer:
      'Neither is universally better. Aligners are discreet and removable, while braces can be more effective for complex tooth movement. We will recommend the most predictable option for your case.',
  },
  {
    question: 'How long does a root canal take?',
    answer:
      'Most root canal appointments take around 60 to 90 minutes, though complex teeth may need more time or an additional appointment.',
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: '5-signs-you-need-a-dentist',
    title: '5 Signs You Need a Dentist',
    category: 'Dental Health',
    excerpt: 'Persistent sensitivity, bleeding gums, and lingering pain are all signals that your smile needs professional attention.',
    readTime: '5 min read',
    publishedAt: '2026-04-10',
    coverLabel: 'Warning signs',
    seoDescription:
      'Spot the early signs that it is time to book a dental consultation before small issues become complex treatments.',
    sections: [
      {
        title: 'Do not wait for severe pain',
        paragraphs: [
          'Dental issues often start quietly. Mild sensitivity, occasional bleeding, or a rough edge on a tooth can all point to a problem that is easier to treat early.',
          'If symptoms are present for more than a few days, an examination can help prevent a simple treatment from becoming a larger restoration.',
        ],
      },
      {
        title: 'Common signs to watch',
        paragraphs: ['These are the symptoms we recommend taking seriously:'],
        bullets: [
          'Bleeding gums when brushing or flossing',
          'Sensitivity to cold, sweets, or biting pressure',
          'Persistent bad breath or an unusual taste',
          'Visible chips, cracks, or dark spots on teeth',
          'Jaw discomfort, headaches, or clenching',
        ],
      },
    ],
    takeaways: ['Early care usually means simpler treatment.', 'Bleeding gums are not normal.', 'Sensitivity that lingers deserves an exam.'],
  },
  {
    slug: 'how-to-keep-your-teeth-white',
    title: 'How to Keep Your Teeth White',
    category: 'Cosmetic Dentistry',
    excerpt: 'A bright smile lasts longer when whitening is paired with smart habits, stain control, and regular cleanings.',
    readTime: '4 min read',
    publishedAt: '2026-03-28',
    coverLabel: 'Whitening tips',
    seoDescription: 'Simple daily habits and professional options to keep your teeth white and your enamel protected.',
    sections: [
      {
        title: 'Whitening starts with daily choices',
        paragraphs: [
          'Coffee, tea, red wine, and tobacco are common contributors to surface staining. Limiting contact time and rinsing with water after these habits can make a visible difference.',
          'A soft brush, low-abrasion toothpaste, and routine hygienist visits also help your smile stay bright without damaging enamel.',
        ],
      },
      {
        title: 'Best maintenance steps',
        paragraphs: ['Pair your whitening treatment with these habits:'],
        bullets: [
          'Drink staining beverages through a straw when possible',
          'Rinse with water after dark-colored foods or drinks',
          'Avoid harsh DIY whitening powders',
          'Schedule professional cleaning every 6 months',
        ],
      },
    ],
    takeaways: ['Protect enamel while whitening.', 'Maintenance matters more than one-time treatment.', 'Professional cleaning helps results last.'],
  },
  {
    slug: 'braces-vs-aligners',
    title: 'Braces vs Aligners',
    category: 'Orthodontics',
    excerpt: 'Both systems can create excellent results, but the right choice depends on complexity, lifestyle, and discipline.',
    readTime: '6 min read',
    publishedAt: '2026-03-12',
    coverLabel: 'Treatment comparison',
    seoDescription: 'Compare braces and aligners to understand which orthodontic option fits your smile goals and lifestyle.',
    sections: [
      {
        title: 'What makes them different',
        paragraphs: [
          'Braces stay fixed on the teeth and are often preferred when movements are more complex or require precise control.',
          'Aligners are removable and aesthetically subtle, but they rely on patient consistency to stay effective.',
        ],
      },
      {
        title: 'How to choose',
        paragraphs: ['A consultation helps evaluate bite, crowding, and compliance. General guidance includes:'],
        bullets: [
          'Choose aligners for flexibility and discretion',
          'Choose braces for complex movement or difficult rotations',
          'Consider daily wear discipline before starting aligners',
        ],
      },
    ],
    takeaways: ['The best option depends on your case.', 'Aligners require consistent wear.', 'Braces offer strong control for complex cases.'],
  },
  {
    slug: 'best-foods-for-healthy-teeth',
    title: 'Best Foods for Healthy Teeth',
    category: 'Nutrition',
    excerpt: 'Crunchy vegetables, dairy, and mineral-rich foods can support stronger enamel and healthier gums.',
    readTime: '4 min read',
    publishedAt: '2026-02-26',
    coverLabel: 'Smile nutrition',
    seoDescription: 'Learn which foods support enamel, saliva production, and better oral health between dental visits.',
    sections: [
      {
        title: 'Food supports oral health',
        paragraphs: [
          'Tooth-friendly foods do more than avoid sugar. They can stimulate saliva, provide calcium and phosphorus, and reduce the frequency of acidic attacks on enamel.',
        ],
      },
      {
        title: 'Good choices to include',
        paragraphs: ['Try building more of these into your routine:'],
        bullets: [
          'Plain yogurt and cheese for calcium support',
          'Leafy greens for minerals and vitamins',
          'Crunchy cucumbers and carrots for texture and saliva flow',
          'Nuts and seeds for nutrient density',
        ],
      },
    ],
    takeaways: ['Your diet affects enamel strength.', 'Frequent snacking matters as much as sugar.', 'Saliva-supporting foods are valuable.'],
  },
  {
    slug: 'root-canal-myths',
    title: 'Root Canal Myths',
    category: 'Restorative Care',
    excerpt: 'Modern root canal treatment is designed to remove infection and relieve pain, not create it.',
    readTime: '5 min read',
    publishedAt: '2026-02-14',
    coverLabel: 'Myth busting',
    seoDescription: 'Separate common myths from reality and understand how modern root canal treatment actually works.',
    sections: [
      {
        title: 'Why this treatment is misunderstood',
        paragraphs: [
          'Much of the fear around root canals comes from outdated stories. Today, diagnosis is faster, anesthesia is better, and treatment is designed to stop pain caused by infection.',
        ],
      },
      {
        title: 'What patients are often surprised to learn',
        paragraphs: ['Common misconceptions include:'],
        bullets: [
          'The tooth is not removed during a root canal',
          'Treatment usually feels similar to getting a filling',
          'Saving your natural tooth is often the best long-term option',
        ],
      },
    ],
    takeaways: ['Root canals relieve infection-related pain.', 'Modern techniques are far more comfortable.', 'Saving a tooth is usually worth it.'],
  },
  {
    slug: 'how-often-should-you-visit-the-dentist',
    title: 'How Often Should You Visit the Dentist?',
    category: 'Preventive Care',
    excerpt: 'Six-month visits work for many people, but your personal risk factors may mean a different schedule is better.',
    readTime: '4 min read',
    publishedAt: '2026-01-31',
    coverLabel: 'Routine visits',
    seoDescription: 'Understand why check-up frequency depends on your oral health, gum status, and treatment needs.',
    sections: [
      {
        title: 'A personalized schedule works best',
        paragraphs: [
          'Routine exams are not one-size-fits-all. People with gum disease, braces, dry mouth, or frequent decay may benefit from shorter recall intervals.',
        ],
      },
      {
        title: 'What a regular visit helps catch',
        paragraphs: ['Professional reviews help identify problems early, including:'],
        bullets: [
          'New cavities between teeth',
          'Gum inflammation or bone loss',
          'Grinding wear or bite imbalance',
          'Old restorations that need replacement',
        ],
      },
    ],
    takeaways: ['Six months is a strong starting point.', 'Higher-risk patients may need shorter intervals.', 'Routine visits prevent bigger problems.'],
  },
];

export const fallbackReviews: Review[] = [
  {
    id: 'review-1',
    author_name: 'Aarav Mehta',
    profile_photo_url: '/reviews/avatar-1.svg',
    rating: 5,
    relative_time_description: '2 weeks ago',
    text: 'Beautiful clinic, genuinely caring team, and the whitening results looked natural rather than overdone.',
    time: 1713052800,
  },
  {
    id: 'review-2',
    author_name: 'Nisha Rao',
    profile_photo_url: '/reviews/avatar-2.svg',
    rating: 5,
    relative_time_description: '1 month ago',
    text: 'The doctors explained every step before my root canal and made the whole visit surprisingly comfortable.',
    time: 1710374400,
  },
  {
    id: 'review-3',
    author_name: 'Karthik Iyer',
    profile_photo_url: '/reviews/avatar-3.svg',
    rating: 5,
    relative_time_description: '1 month ago',
    text: 'Premium experience from reception to treatment. Clean, modern, and very reassuring for nervous patients.',
    time: 1710115200,
  },
  {
    id: 'review-4',
    author_name: 'Sneha N',
    profile_photo_url: '/reviews/avatar-4.svg',
    rating: 5,
    relative_time_description: '2 months ago',
    text: 'My aligner journey has been smooth and organized. The follow-up support has been excellent.',
    time: 1707609600,
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Ritika Shah',
    role: 'Smile Makeover Patient',
    quote: 'Everything feels curated, calm, and deeply professional. I finally have the natural smile I wanted.',
  },
  {
    name: 'Vikram Jain',
    role: 'Implant Patient',
    quote: 'I came in worried about pain and left surprised by how precise and comfortable the entire experience felt.',
  },
  {
    name: 'Ananya Prabhu',
    role: 'Parent',
    quote: 'Our child actually enjoys visiting the dentist now. The team is patient, warm, and wonderfully organized.',
  },
];

export const transformationCase = {
  label: 'Smile Transformation',
  description:
    'Composite contouring, whitening, and ceramic finishing combined for a brighter, more balanced smile line.',
  beforeImage: '/illustrations/before-smile.svg',
  afterImage: '/illustrations/after-smile.svg',
};

export const appointmentSlots = [
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
  '04:30 PM',
  '05:00 PM',
  '05:30 PM',
  '06:00 PM',
  '06:30 PM',
  '07:00 PM',
  '07:30 PM',
  '08:00 PM',
  '08:30 PM',
];
