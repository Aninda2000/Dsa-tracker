import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, ListGroup, Badge, Form } from "react-bootstrap";
import axios from "../utils/axiosInstance";

const problems = [
  {
    id: 1,
    title: "Two Sum",
    youtube: "#",
    leetcode: "#",
    article: "#",
    level: "Easy",
  },
  {
    id: 2,
    title: "Max Subarray",
    youtube: "#",
    leetcode: "#",
    article: "#",
    level: "Medium",
  },
];

const TopicDetailPage: React.FC = () => {
  const { topicId } = useParams();
  const [progress, setProgress] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchProgress = async () => {
      if (!topicId) return;

      const res = await axios.get(
        `/api/progress/${topicId}`,
      );
      setProgress(res.data);
    };

    fetchProgress();
  }, [topicId]);

  const handleCheck = async (problemId: number, checked: boolean) => {
    const token = localStorage.getItem("token");
    setProgress((prev) => ({ ...prev, [problemId]: checked }));

    await axios.post(
      "/api/progress/save",
      { topicId, problemId, checked },
    );
  };

  return (
    <Container className="mt-4">
      <h3>Problems for Topic: {topicId}</h3>
      <ListGroup>
        {problems.map((problem) => (
          <ListGroup.Item key={problem.id}>
            <Form.Check
              type="checkbox"
              checked={progress[problem.id] || false}
              onChange={(e) => handleCheck(problem.id, e.target.checked)}
              label={
                <>
                  <strong>{problem.title}</strong>{" "}
                  <Badge bg="secondary">{problem.level}</Badge>
                  <div>
                    <a href={problem.youtube} className="me-2">
                      📺 YouTube
                    </a>
                    <a href={problem.leetcode} className="me-2">
                      💻 LeetCode
                    </a>
                    <a href={problem.article}>📖 Article</a>
                  </div>
                </>
              }
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default TopicDetailPage;
