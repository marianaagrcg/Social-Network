export const getRandomColor = (username) => {
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#8e44ad', '#e67e22'];
    const charCodeSum = username.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charCodeSum % colors.length];
  };
  