// Get all registered users and display their credentials
const users = JSON.parse(localStorage.getItem('users') || '[]');
console.log('Registered users:');
users.forEach((user, index) => {
  console.log(`\nUser ${index + 1}:`);
  console.log(`Email: ${user.email}`);
  console.log(`Password: ${user.password}`);
});