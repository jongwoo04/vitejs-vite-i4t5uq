import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([
    {
      text: '크리스마스 홈 파티',
      done: true,
      date: '2024-12-25',
      priority: '중요',
    },
    {
      text: '훈련소 입대',
      done: true,
      date: '2024-12-30',
      priority: '매우 중요',
    },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newPriority, setNewPriority] = useState('중요');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('date'); // 초기 정렬 옵션은 날짜 순서로 진행

  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = !updatedTodos[index].done;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const addTodo = () => {
    if (newTodo.trim() && newDate) {
      const newTodoItem = {
        text: newTodo,
        done: false,
        date: newDate,
        priority: newPriority,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
      setNewDate('');
      setNewPriority('중요');
    }
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.done));
  };

  const filteredTodos = todos
    .filter((todo) =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'date') return a.date.localeCompare(b.date); // 날짜 기준 정렬
      const priorityOrder = { '매우 중요': 1, 중요: 2, 낮음: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority]; // 중요도 기준 정렬
    });

  const groupedTodos = filteredTodos.reduce((acc, todo) => {
    acc[todo.date] = acc[todo.date] || [];
    acc[todo.date].push(todo);
    return acc;
  }, {});

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '600px',
      margin: 'auto',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
    },
    searchContainer: { display: 'flex', gap: '10px', marginBottom: '20px' },
    searchInput: {
      flex: 1,
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    inputGroup: { display: 'flex', gap: '10px', marginBottom: '20px' },
    input: {
      flex: 1,
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '10px 15px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#007BFF',
      color: 'white',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    todoItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '10px',
      padding: '10px',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    completedText: { textDecoration: 'line-through', color: '#999' },
    priority: {
      '매우 중요': { color: 'red', fontWeight: 'bold' },
      중요: { color: 'orange' },
      낮음: { color: 'green' },
    },
    sortButtons: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'center',
      marginBottom: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>스케줄 표</h1>

      {/* 검색 기능 */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="검색어를 입력하세요"
          style={styles.searchInput}
        />
      </div>

      {/* 정렬 버튼 */}
      <div style={styles.sortButtons}>
        <button
          onClick={() => setSortOption('date')}
          style={{
            ...styles.button,
            backgroundColor: sortOption === 'date' ? '#0056b3' : '#007BFF',
          }}
        >
          날짜순 정렬
        </button>
        <button
          onClick={() => setSortOption('priority')}
          style={{
            ...styles.button,
            backgroundColor: sortOption === 'priority' ? '#0056b3' : '#007BFF',
          }}
        >
          중요도순 정렬
        </button>
      </div>

      {/* 입력 폼 */}
      <div style={styles.inputGroup}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="추가 일정을 입력하세요"
          style={styles.input}
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          style={styles.input}
        />
        <select
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
          style={styles.input}
        >
          <option value="매우 중요">매우 중요</option>
          <option value="중요">중요</option>
          <option value="낮음">낮음</option>
        </select>
        <button onClick={addTodo} style={styles.button}>
          추가
        </button>
      </div>

      {/* 할 일 목록 */}
      {Object.keys(groupedTodos).map((date) => (
        <div key={date} style={{ marginBottom: '20px' }}>
          <h3>{date}</h3>
          {groupedTodos[date].map((todo) => {
            const actualIndex = todos.indexOf(todo); // todos 배열의 실제 인덱스
            return (
              <div key={actualIndex} style={styles.todoItem}>
                <span
                  onClick={() => toggleTodo(actualIndex)} // 실제 인덱스를 사용
                  sty
                  le={{
                    flex: 1,
                    cursor: 'pointer',
                    ...(todo.done ? styles.completedText : {}),
                  }}
                >
                  [{todo.done ? 'X' : ' '}] {todo.text}{' '}
                  <span style={styles.priority[todo.priority]}>
                    ({todo.priority})
                  </span>
                </span>
                <button
                  onClick={() => deleteTodo(actualIndex)} // 삭제도 실제 인덱스를 사용
                  style={styles.button}
                >
                  삭제
                </button>
              </div>
            );
          })}
        </div>
      ))}

      {/* 통계 및 완료된 일정 삭제 */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        남은 일정: {todos.filter((todo) => !todo.done).length}개 /{' '}
        {todos.length}개
      </div>
      <button
        onClick={clearCompleted}
        style={{ ...styles.button, marginTop: '10px' }}
      >
        완료된 일정 삭제
      </button>
    </div>
  );
}

export default App;
