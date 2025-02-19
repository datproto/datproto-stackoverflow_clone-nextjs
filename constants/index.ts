export const themes = [
  { value: 'light', label: 'Light', icon: '/icons/sun.svg' },
  { value: 'dark', label: 'Dark', icon: '/icons/moon.svg' },
  { value: 'system', label: 'System', icon: '/icons/computer.svg' }
]

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: '/icons/home.svg',
    route: '/',
    label: 'Home'
  },
  {
    imgURL: '/icons/users.svg',
    route: '/community',
    label: 'Community'
  },
  {
    imgURL: '/icons/star.svg',
    route: '/collection',
    label: 'Collections'
  },
  {
    imgURL: '/icons/suitcase.svg',
    route: '/jobs',
    label: 'Find Jobs'
  },
  {
    imgURL: '/icons/tag.svg',
    route: '/tags',
    label: 'Tags'
  },
  {
    imgURL: '/icons/user.svg',
    route: '/profile',
    label: 'Profile'
  },
  {
    imgURL: '/icons/question.svg',
    route: '/ask-question',
    label: 'Ask a question'
  }
]

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000
  }
}

export const questions = [
  {
    id: '1',
    title: 'How do I use express as a custom server in NextJS?',
    tags: [
      { id: '1', name: 'nextjs' },
      { id: '2', name: 'expressjs' }
    ],
    author: {
      id: '1',
      name: 'John Doe',
      picture: 'profile.jpg'
    },
    upVotes: 10,
    views: 100,
    answers: [],
    createdAt: new Date('2023-08-23T12:00:00.00Z')
  },
  {
    id: '2',
    title: 'Cascading Deletes in SQLAlchemy?',
    tags: [
      { id: '3', name: 'python' },
      { id: '4', name: 'sql' }
    ],
    author: {
      id: '2',
      name: 'Jane Smith',
      picture: 'profile.jpg'
    },
    upVotes: 10,
    views: 100,
    answers: [],
    createdAt: new Date('2023-08-23T12:00:00.00Z')
  },
  {
    id: '3',
    title: 'How to Perfectly Center a Div with Tailwind CSS?',
    tags: [
      { id: '5', name: 'css' },
      { id: '6', name: 'tailwind' }
    ],
    author: {
      id: '3',
      name: 'Alice Johnson',
      picture: 'profile.jpg'
    },
    upVotes: 10,
    views: 100,
    answers: [],
    createdAt: new Date('2023-08-23T12:00:00.00Z')
  },
  {
    id: '4',
    title: 'Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?',
    tags: [
      { id: '1', name: 'nextjs' },
      { id: '7', name: 'ssr' }
    ],
    author: {
      id: '4',
      name: 'Bob Wilson',
      picture: 'profile.jpg'
    },
    upVotes: 10,
    views: 100,
    answers: [],
    createdAt: new Date('2023-08-23T12:00:00.00Z')
  },
  {
    id: '5',
    title: 'Redux Toolkit Not Updating State as Expected',
    tags: [
      { id: '8', name: 'redux' }
    ],
    author: {
      id: '5',
      name: 'Eve Brown',
      picture: 'profile.jpg'
    },
    upVotes: 1245,
    views: 100,
    answers: [],
    createdAt: new Date('2023-08-23T12:00:00.00Z')
  }
]

export const popularTags = [
  { id: '1', name: 'javascript', totalQuestions: 5 },
  { id: '2', name: 'react', totalQuestions: 5 },
  { id: '3', name: 'next', totalQuestions: 5 },
  { id: '4', name: 'vue', totalQuestions: 2 },
  { id: '5', name: 'redux', totalQuestions: 10 }
]

export const filters = [
  { id: 1, name: 'newest', filter: 'newest' },
  { id: 2, name: 'recommended questions', filter: 'recommended' },
  { id: 3, name: 'frequent', filter: 'freq' },
  { id: 4, name: 'unanswered', filter: 'unanswered' }
]

export const AUTH_FIELD_TYPES = {
  username: "text",
  name: "text",
  email: "email",
  password: "password",
};

export const AUTH_FIELD_NAMES = {
  username: "Username",
  name: "Name",
  email: "Email",
  password: "Password",
};

export const AUTH_FIELD_PLACEHOLDER = {
  username: "Your favorite username",
  name: "Your full name",
  email: "Your email address",
  password: "Your password",
}