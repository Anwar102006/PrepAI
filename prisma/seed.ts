import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { config } from 'dotenv';

config({ path: '.env.local' });

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // Create Users
  const user1 = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      progress: {
        create: {
          interviewsCount: 2,
          averageScore: 85.5,
        }
      }
    },
  });

  // Create Skills
  const skillReact = await prisma.skill.upsert({
    where: { name: 'React' },
    update: {},
    create: { name: 'React' },
  });

  await prisma.skill.upsert({
    where: { name: 'Node.js' },
    update: {},
    create: { name: 'Node.js' },
  });

  // Link Skills to User
  await prisma.userSkill.upsert({
    where: {
      userId_skillId: {
        userId: user1.id,
        skillId: skillReact.id,
      }
    },
    update: {},
    create: {
      userId: user1.id,
      skillId: skillReact.id,
      proficiency: 4,
    }
  });

  // Create Interview
  await prisma.interview.create({
    data: {
      userId: user1.id,
      title: 'Senior Frontend Engineer Interview',
      scheduledAt: new Date(),
      status: 'COMPLETED',
      feedback: {
        create: {
          strengths: 'Strong React knowledge, good communication.',
          weaknesses: 'System design needs improvement.',
          overallScore: 8.5,
        }
      }
    }
  });

  // Create Questions
  const q1 = await prisma.question.create({
    data: {
      content: 'Explain the React component lifecycle.',
      type: 'TECHNICAL',
      difficulty: 'MEDIUM',
    }
  });

  const q2 = await prisma.question.create({
    data: {
      content: 'Tell me about a time you had a conflict with a coworker.',
      type: 'BEHAVIORAL',
      difficulty: 'MEDIUM',
    }
  });

  // Create Mock Session
  await prisma.mockSession.create({
    data: {
      userId: user1.id,
      status: 'COMPLETED',
      score: 9.0,
      questions: {
        create: [
          {
            questionId: q1.id,
            userAnswer: 'I explained useEffect and class components lifecycle.',
            aiFeedback: 'Good explanation, missed some details on concurrent mode.',
            score: 8.0,
          },
          {
            questionId: q2.id,
            userAnswer: 'I resolved the conflict by scheduling a 1-on-1.',
            aiFeedback: 'Excellent application of the STAR method.',
            score: 10.0,
          }
        ]
      }
    }
  });

  // Create Resume Analysis
  await prisma.resumeAnalysis.create({
    data: {
      userId: user1.id,
      resumeUrl: 'https://example.com/resume.pdf',
      score: 75.0,
      suggestions: 'Add more quantifiable metrics to your work experience.',
    }
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
