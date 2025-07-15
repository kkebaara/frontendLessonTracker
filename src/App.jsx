import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/tutors/1/students`).then((res) => {
      setStudents(res.data);
    });
  }, []);

  const handleComplete = (studentId) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId ? { ...s, lesson_completed: true } : s
      )
    );

    axios.patch(`${API_URL}/students/${studentId}/lesson_complete`);
  };

  return (
    <div className="p-4 font-sans">
      <h1 className="text-2xl mb-4">Tutor Dashboard</h1>
      {students.map((student) => (
        <div
          key={student.id}
          className="border p-4 mb-2 rounded shadow bg-white"
        >
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Lesson:</strong> {student.lesson_title}</p>
          <p><strong>Progress:</strong> {student.progress}%</p>
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            onClick={() => handleComplete(student.id)}
            disabled={student.lesson_completed}
          >
            {student.lesson_completed ? "Completed" : "Mark Complete"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
