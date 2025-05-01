import React, { useState } from 'react';
import {
  Accordion,
  Badge,
  Card,
  Col,
  Container,
  Row,
  Table,
} from 'react-bootstrap';

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

const topics: Topic[] = [
  {
    id: 'algorithms',
    title: 'Algorithms',
    subtopics: [
      {
        name: 'Sorting',
        leetcodeLink: 'https://leetcode.com/tag/sorting/',
        articleLink: 'https://www.geeksforgeeks.org/sorting-algorithms/',
        level: 'Easy',
      },
      {
        name: 'Searching',
        leetcodeLink: 'https://leetcode.com/tag/binary-search/',
        articleLink: 'https://www.geeksforgeeks.org/searching-algorithms/',
        level: 'Medium',
      },
    ],
  },
  {
    id: 'data-structures',
    title: 'Data Structures',
    subtopics: [
      {
        name: 'Arrays',
        leetcodeLink: 'https://leetcode.com/tag/array/',
        articleLink: 'https://www.geeksforgeeks.org/array-data-structure/',
        level: 'Easy',
      },
      {
        name: 'Trees',
        leetcodeLink: 'https://leetcode.com/tag/tree/',
        articleLink: 'https://www.geeksforgeeks.org/binary-tree-data-structure/',
        level: 'Hard',
      },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    subtopics: [
      {
        name: 'HTML/CSS',
        leetcodeLink: 'https://frontendmasters.com/books/front-end-handbook/2019/',
        articleLink: 'https://developer.mozilla.org/en-US/docs/Learn/HTML',
        level: 'Easy',
      },
      {
        name: 'JavaScript',
        leetcodeLink: 'https://leetcode.com/tag/javascript/',
        articleLink: 'https://javascript.info/',
        level: 'Medium',
      },
      {
        name: 'React',
        leetcodeLink: 'https://github.com/enaqx/awesome-react',
        articleLink: 'https://reactjs.org/docs/getting-started.html',
        level: 'Medium',
      },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    subtopics: [
      {
        name: 'Node.js',
        leetcodeLink: 'https://nodejs.org/en/docs',
        articleLink: 'https://www.geeksforgeeks.org/nodejs/',
        level: 'Medium',
      },
      {
        name: 'Express.js',
        leetcodeLink: 'https://expressjs.com/en/starter/installing.html',
        articleLink: 'https://www.geeksforgeeks.org/express-js/',
        level: 'Medium',
      },
      {
        name: 'Authentication',
        leetcodeLink: 'https://auth0.com/docs',
        articleLink: 'https://www.digitalocean.com/community/tutorial_series/authentication-in-node-js',
        level: 'Hard',
      },
    ],
  },
  {
    id: 'os',
    title: 'Operating Systems',
    subtopics: [
      {
        name: 'Processes & Threads',
        leetcodeLink: 'https://www.geeksforgeeks.org/process-thread-operating-system/',
        articleLink: 'https://www.javatpoint.com/os-processes',
        level: 'Medium',
      },
      {
        name: 'Memory Management',
        leetcodeLink: 'https://www.geeksforgeeks.org/memory-management-in-operating-system/',
        articleLink: 'https://www.javatpoint.com/os-memory-management',
        level: 'Hard',
      },
    ],
  },
  {
    id: 'dbms',
    title: 'Databases',
    subtopics: [
      {
        name: 'SQL Basics',
        leetcodeLink: 'https://leetcode.com/problemset/database/',
        articleLink: 'https://www.w3schools.com/sql/',
        level: 'Easy',
      },
      {
        name: 'Joins & Indexing',
        leetcodeLink: 'https://www.geeksforgeeks.org/sql-join-set-1-inner-left-right-and-full-joins/',
        articleLink: 'https://use-the-index-luke.com/',
        level: 'Medium',
      },
    ],
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    subtopics: [
      {
        name: 'Supervised Learning',
        leetcodeLink: 'https://scikit-learn.org/stable/supervised_learning.html',
        articleLink: 'https://towardsdatascience.com/supervised-learning-basics-classification-764b5abfa2f0',
        level: 'Medium',
      },
      {
        name: 'Unsupervised Learning',
        leetcodeLink: 'https://scikit-learn.org/stable/unsupervised_learning.html',
        articleLink: 'https://towardsdatascience.com/unsupervised-learning-f45587588294',
        level: 'Hard',
      },
    ],
  },
];


type ProgressState = {
  [topicId: string]: {
    [subtopicName: string]: boolean;
  };
};

const DashboardPage: React.FC = () => {
  const [progress, setProgress] = useState<ProgressState>({});
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  const toggleAccordion = (key: string) => {
    setActiveKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleCheckboxChange = (topicId: string, subtopicName: string) => {
    setProgress((prev) => {
      const topicProgress = prev[topicId] || {};
      return {
        ...prev,
        [topicId]: {
          ...topicProgress,
          [subtopicName]: !topicProgress[subtopicName],
        },
      };
    });
  };

  const getStatus = (topicId: string, subtopics: Subtopic[]) => {
    const topicProgress = progress[topicId] || {};
    const completed = subtopics.every((s) => topicProgress[s.name]);
    return completed ? (
      <Badge bg="success">Completed</Badge>
    ) : (
      <Badge bg="warning">Pending</Badge>
    );
  };

  return (
    <Container className="mt-4">
      <h2 className='text-center'> Topics</h2>
      <Accordion activeKey={activeKeys}>
        {topics.map((topic) => {
          const isOpen = activeKeys.includes(topic.id);
          return (
            <Card key={topic.id} className="mb-2">
              <Card.Header
                style={{ cursor: 'pointer' }}
                onClick={() => toggleAccordion(topic.id)}
              >
                <Row className="align-items-center">
                  <Col xs={10}>
                    <h5>
                      {topic.title}{' '}
                      <span style={{ fontSize: '1rem' }}>
                        {isOpen ? '▲' : '▼'}
                      </span>
                    </h5>
                  </Col>
                  <Col xs={2} className="text-end">
                    {getStatus(topic.id, topic.subtopics)}
                  </Col>
                </Row>
              </Card.Header>
              <Accordion.Collapse eventKey={topic.id}>
                <Card.Body>
                  <Table bordered responsive>
                    <thead>
                      <tr>
                        <th>Subtopic</th>
                        <th>Level</th>
                        <th>Leetcode</th>
                        <th>Article</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topic.subtopics.map((sub) => {
                        const isChecked =
                          progress[topic.id]?.[sub.name] || false;
                        return (
                          <tr key={sub.name}>
                            <td>
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() =>
                                  handleCheckboxChange(topic.id, sub.name)
                                }
                                className="me-2"
                              />
                              {sub.name}
                            </td>
                            <td>{sub.level}</td>
                            <td>
                              <a
                                href={sub.leetcodeLink}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Leetcode
                              </a>
                            </td>
                            <td>
                              <a
                                href={sub.articleLink}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Article
                              </a>
                            </td>
                            <td>
                              {isChecked ? (
                                <Badge bg="success">Completed</Badge>
                              ) : (
                                <Badge bg="secondary">-</Badge>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          );
        })}
      </Accordion>
    </Container>
  );
};

export default DashboardPage;
