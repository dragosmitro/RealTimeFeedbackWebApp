# Continuous Feedback Application

Overview
The Continuous Feedback Application is an innovative web-based platform designed to revolutionize the way feedback is given and received during educational activities like courses and seminars. Built with a robust combination of React and TailwindCSS for a sleek and responsive front-end, and Node.js with Express for a seamless and efficient back-end, this application stands out for its user-friendly interface and powerful features.

The application adopts a Single Page Application (SPA) architecture, ensuring a smooth and uninterrupted user experience. It's meticulously crafted to be responsive and accessible across various devices including desktops, tablets, and mobile phones, catering to the diverse preferences of its users.

Key Features
Activity Management (For Professors): Professors can effortlessly create activities, specifying the date, a detailed description, and a unique access code. They have control over the activity's availability, setting a specific duration for accessibility.

Secure Access to Activities (For Students): Students can join an activity by entering a unique code, which remains valid for the entire duration of the activity. This feature ensures that feedback is organized and associated with the correct activity.

Interactive Feedback Interface (For Students): Students are welcomed by an intuitive interface divided into four quadrants, each featuring a distinct emoticon: smiley face, frowny face, surprised face, and confused face. This design allows students to provide instantaneous feedback at any moment during the activity, with the freedom to submit multiple feedback instances.

Real-Time Feedback Monitoring (For Professors): Professors have access to a live stream of feedback, displayed anonymously to maintain the confidentiality of students' responses. The feedback is presented along with precise timestamps, and is accessible not only during the activity but also after its completion.

JWT-Based Authentication: The application ensures secure access through JWT (JSON Web Tokens), offering a secure way to handle authentication and maintain session integrity.

Persistent Sessions: Users don't have to worry about losing their session after leaving the site. The application intelligently maintains active sessions, automatically logging users back in when they return, enhancing the user experience by providing convenience and continuity.

Encrypted Password Storage: Security is paramount. The application employs advanced encryption techniques to store passwords securely in the database, ensuring that user credentials are always protected.
