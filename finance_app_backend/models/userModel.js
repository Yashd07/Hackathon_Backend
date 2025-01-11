import db from '../config/database.js';

// Create a new user
export const createUser = (username, email, hashedPassword) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
      [username, email, hashedPassword],
      function (err) {
        if (err) return reject(err);
        resolve(this.lastID); // Returns the ID of the newly inserted user
      }
    );
  });
};

// Find a user by email
export const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM users WHERE email = ?`,
      [email],
      (err, row) => {
        if (err) return reject(err);
        resolve(row); // Returns the user row if found, otherwise null
      }
    );
  });
};
