   // hash_password.js
   import { bcrypt } from 'bcryptjs';

   const password = 'sicomono';
   const saltRounds = 10;
   
   bcrypt.hash(password, saltRounds, (err, hash) => {
	 if (err) {
	   console.error('Error hashing password:', err);
	 } else {
	   console.log('Hashed password:', hash);
	   // Insert this hash into your D1 users table
	 }
	});