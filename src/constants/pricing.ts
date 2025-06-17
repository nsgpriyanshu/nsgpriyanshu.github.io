export type PlanFeature = {
  text: string
  included: boolean
}

export type Plan = {
  name: string
  description: string
  price: {
    monthly: number
    yearly: number
  }
  features: PlanFeature[]
  popular?: boolean
}

export const PRICING_PLANS: Plan[] = [
  {
    name: 'Starter',
    description: 'Perfect for individuals or small businesses getting started online.',
    price: {
      monthly: 999,
      yearly: 9999,
    },
    features: [
      { text: '1 Static Website (Up to 5 pages)', included: true },
      { text: 'Responsive Design', included: true },
      { text: 'Basic SEO Optimization', included: true },
      { text: 'Support via Email', included: true },
      { text: 'Custom Domain Setup', included: false },
    ],
  },
  {
    name: 'Professional',
    description: 'Great for growing brands needing advanced features.',
    price: {
      monthly: 1999,
      yearly: 19999,
    },
    popular: true,
    features: [
      { text: 'Dynamic Website (Up to 10 pages)', included: true },
      { text: 'Responsive + Optimized UI', included: true },
      { text: 'Advanced SEO & Analytics Integration', included: true },
      { text: 'Custom Domain & Hosting Setup', included: true },
      { text: 'Priority Email & Chat Support', included: true },
    ],
  },
  {
    name: 'Enterprise',
    description: 'Full-scale solutions for serious businesses & startups.',
    price: {
      monthly: 3999,
      yearly: 39999,
    },
    features: [
      { text: 'Unlimited Pages & Custom Features', included: true },
      { text: 'CMS & Admin Panel Integration', included: true },
      { text: 'E-commerce or Web App Support', included: true },
      { text: 'Performance Optimization & Security', included: true },
      { text: '24/7 Premium Support & Maintenance', included: true },
    ],
  },
]
