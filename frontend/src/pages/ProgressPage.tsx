import React, { useEffect, useState } from 'react';
import { Container, Table, ProgressBar } from 'react-bootstrap';
import axios from '../utils/axiosInstance';

interface Subtopic {
  name: string;
  leetcodeLink: string;
  articleLink: string;
  level: 'Easy' | 'Medium' | 'Hard';
}

interface Topic {
  id: string;
  title: string;
  subtopics: Subtopic[];
}

interface UserProgress {
  [topicId: string]: {
    [subtopicIndex: string]: boolean;
  };
}

interface DifficultyStats {
  Easy: { total: number; completed: number };
  Medium: { total: number; completed: number };
  Hard: { total: number; completed: number };
}

const topics: Topic[] = [
  {
    id: 'algorithms',
    title: 'Algorithms',
    subtopics: [
      { name: 'Sorting', leetcodeLink: '', articleLink: '', level: 'Easy' },
      { name: 'Searching', leetcodeLink: '', articleLink: '', level: 'Medium' },
    ],
  },
  {
    id: 'data-structures',
    title: 'Data Structures',
    subtopics: [
      { name: 'Arrays', leetcodeLink: '', articleLink: '', level: 'Easy' },
      { name: 'Trees', leetcodeLink: '', articleLink: '', level: 'Hard' },
    ],
  },
];

const ProgressPage: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>({});
  const [stats, setStats] = useState<DifficultyStats>({
    Easy: { total: 0, completed: 0 },
    Medium: { total: 0, completed: 0 },
    Hard: { total: 0, completed: 0 },
  });

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get('/api/progress/all'); // Endpoint to get all topic progress
        setProgress(res.data);
      } catch (err) {
        console.error('Failed to fetch user progress');
      }
    };
    fetchProgress();
  }, []);

  useEffect(() => {
    const newStats: DifficultyStats = {
      Easy: { total: 0, completed: 0 },
      Medium: { total: 0, completed: 0 },
      Hard: { total: 0, completed: 0 },
    };

    topics.forEach((topic) => {
      topic.subtopics.forEach((subtopic, index) => {
        const level = subtopic.level;
        newStats[level].total += 1;

        if (progress[topic.id]?.[index]) {
          newStats[level].completed += 1;
        }
      });
    });

    setStats(newStats);
  }, [progress]);

  const getPercentage = (level: keyof DifficultyStats) => {
    const { total, completed } = stats[level];
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  return (
    <Container className="mt-4">
      <h2>Progress Summary</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Difficulty</th>
            <th>Completed</th>
            <th>Total</th>
            <th>Percentage</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {(['Easy', 'Medium', 'Hard'] as const).map((level) => (
            <tr key={level}>
              <td>{level}</td>
              <td>{stats[level].completed}</td>
              <td>{stats[level].total}</td>
              <td>{getPercentage(level)}%</td>
              <td>
                <ProgressBar
                  now={getPercentage(level)}
                  label={`${getPercentage(level)}%`}
                  variant={
                    level === 'Easy' ? 'success' :
                    level === 'Medium' ? 'warning' : 'danger'
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ProgressPage;
