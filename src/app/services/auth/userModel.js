const users = [
    { id: 1, username: 'student1', password: 'pass123', role: 'student' },
    { id: 2, username: 'faculty1', password: 'pass456', role: 'faculty' }
  ];
  
  export const findUser = (username) => users.find(u => u.username === username);
  