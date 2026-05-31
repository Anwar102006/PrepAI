import { PrismaClient, Role, Plan, InterviewType, Difficulty } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ── 1. Create Admin User ──
  const adminPassword = await hash('admin123!@#', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@prepai.com' },
    update: {},
    create: {
      email: 'admin@prepai.com',
      name: 'PrepAI Admin',
      passwordHash: adminPassword,
      role: Role.SUPER_ADMIN,
      emailVerified: new Date(),
      onboardingDone: true,
      subscription: {
        create: {
          plan: Plan.ENTERPRISE,
          status: 'ACTIVE',
        },
      },
    },
  });
  console.log(`  ✅ Admin user created: ${admin.email}`);

  // ── 2. Create Demo User ──
  const demoPassword = await hash('demo123!@#', 12);
  const demo = await prisma.user.upsert({
    where: { email: 'demo@prepai.com' },
    update: {},
    create: {
      email: 'demo@prepai.com',
      name: 'Demo User',
      passwordHash: demoPassword,
      role: Role.USER,
      emailVerified: new Date(),
      onboardingDone: true,
      subscription: {
        create: {
          plan: Plan.PRO,
          status: 'ACTIVE',
        },
      },
    },
  });
  console.log(`  ✅ Demo user created: ${demo.email}`);

  // ── 3. Seed Question Banks ──
  const questionBanks = [
    {
      title: 'Behavioral Interview — General',
      type: InterviewType.BEHAVIORAL,
      questions: JSON.parse(JSON.stringify([
        { q: 'Tell me about a time you had to deal with a difficult coworker.', category: 'Teamwork' },
        { q: 'Describe a situation where you had to meet a tight deadline.', category: 'Time Management' },
        { q: 'Give an example of a time you showed leadership.', category: 'Leadership' },
        { q: 'Tell me about a project that failed. What did you learn?', category: 'Resilience' },
        { q: 'Describe a time you had to learn something new quickly.', category: 'Adaptability' },
      ])),
    },
    {
      title: 'Technical Interview — Frontend',
      type: InterviewType.TECHNICAL,
      role: 'Frontend Engineer',
      questions: JSON.parse(JSON.stringify([
        { q: 'Explain the difference between SSR and CSR in React.', category: 'React' },
        { q: 'How does the virtual DOM work?', category: 'React' },
        { q: 'What is the event loop in JavaScript?', category: 'JavaScript' },
        { q: 'Explain CSS specificity and how it works.', category: 'CSS' },
        { q: 'What are Web Workers and when would you use them?', category: 'Browser APIs' },
      ])),
    },
    {
      title: 'System Design — Scalable Systems',
      type: InterviewType.SYSTEM_DESIGN,
      role: 'Senior Software Engineer',
      questions: JSON.parse(JSON.stringify([
        { q: 'Design a URL shortener like bit.ly.', category: 'System Design' },
        { q: 'Design a real-time chat application.', category: 'System Design' },
        { q: 'Design a rate limiter.', category: 'System Design' },
        { q: 'Design an e-commerce checkout system.', category: 'System Design' },
        { q: 'Design a notification service.', category: 'System Design' },
      ])),
    },
  ];

  for (const qb of questionBanks) {
    await prisma.questionBank.create({ data: qb });
  }
  console.log(`  ✅ ${questionBanks.length} question banks created`);

  // ── 4. Seed Coding Challenges ──
  const challenges = [
    {
      title: 'Two Sum',
      slug: 'two-sum',
      description: '## Two Sum\n\nGiven an array of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`.\n\n### Example\n```\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: nums[0] + nums[1] = 2 + 7 = 9\n```\n\n### Constraints\n- 2 <= nums.length <= 10^4\n- -10^9 <= nums[i] <= 10^9\n- Only one valid answer exists.',
      difficulty: Difficulty.EASY,
      category: 'Arrays',
      tags: ['arrays', 'hash-map'],
      starterCode: JSON.parse(JSON.stringify({
        python: 'def two_sum(nums: list[int], target: int) -> list[int]:\n    # Your code here\n    pass',
        javascript: 'function twoSum(nums, target) {\n  // Your code here\n}',
        typescript: 'function twoSum(nums: number[], target: number): number[] {\n  // Your code here\n}',
      })),
      solution: 'def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []',
      hints: ['Think about using a hash map.', 'What if you store each number and its index as you iterate?'],
      timeLimit: 15,
      testCases: {
        create: [
          { input: '[2,7,11,15]\n9', expected: '[0,1]', isHidden: false, order: 1 },
          { input: '[3,2,4]\n6', expected: '[1,2]', isHidden: false, order: 2 },
          { input: '[3,3]\n6', expected: '[0,1]', isHidden: true, order: 3 },
        ],
      },
    },
    {
      title: 'Valid Parentheses',
      slug: 'valid-parentheses',
      description: '## Valid Parentheses\n\nGiven a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\n### Example\n```\nInput: s = "()[]{}"\nOutput: true\n```\n\n### Constraints\n- 1 <= s.length <= 10^4\n- s consists of parentheses only.',
      difficulty: Difficulty.EASY,
      category: 'Stacks',
      tags: ['stack', 'string'],
      starterCode: JSON.parse(JSON.stringify({
        python: 'def is_valid(s: str) -> bool:\n    # Your code here\n    pass',
        javascript: 'function isValid(s) {\n  // Your code here\n}',
        typescript: 'function isValid(s: string): boolean {\n  // Your code here\n}',
      })),
      hints: ['Use a stack data structure.', 'Push opening brackets and pop for closing ones.'],
      timeLimit: 15,
      testCases: {
        create: [
          { input: '"()[]{}"', expected: 'true', isHidden: false, order: 1 },
          { input: '"(]"', expected: 'false', isHidden: false, order: 2 },
          { input: '"([)]"', expected: 'false', isHidden: true, order: 3 },
          { input: '"{[]}"', expected: 'true', isHidden: true, order: 4 },
        ],
      },
    },
    {
      title: 'Merge Two Sorted Lists',
      slug: 'merge-two-sorted-lists',
      description: '## Merge Two Sorted Lists\n\nMerge two sorted linked lists and return it as a sorted list.\n\n### Example\n```\nInput: list1 = [1,2,4], list2 = [1,3,4]\nOutput: [1,1,2,3,4,4]\n```',
      difficulty: Difficulty.EASY,
      category: 'Linked Lists',
      tags: ['linked-list', 'recursion'],
      starterCode: JSON.parse(JSON.stringify({
        python: 'def merge_two_lists(list1, list2):\n    # Your code here\n    pass',
        javascript: 'function mergeTwoLists(list1, list2) {\n  // Your code here\n}',
      })),
      hints: ['Compare heads of both lists.', 'Consider using recursion or a dummy head node.'],
      timeLimit: 20,
      testCases: {
        create: [
          { input: '[1,2,4]\n[1,3,4]', expected: '[1,1,2,3,4,4]', isHidden: false, order: 1 },
          { input: '[]\n[]', expected: '[]', isHidden: false, order: 2 },
          { input: '[]\n[0]', expected: '[0]', isHidden: true, order: 3 },
        ],
      },
    },
  ];

  for (const challenge of challenges) {
    await prisma.codingChallenge.create({ data: challenge });
  }
  console.log(`  ✅ ${challenges.length} coding challenges created`);

  console.log('\n✨ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
