# Human Resource Management System (HRMS)

## Overview

The Human Resource Management System (HRMS) is a comprehensive platform designed to manage employee information, track attendance, handle leave requests, manage new hires, and publish announcements. This system is particularly tailored for organizations to streamline HR processes and improve administrative efficiency. The system supports both Admin and Regular User roles, with role-specific functionalities and access permissions.

## Features

* Employee Profile Management
* Attendance Tracking
* Leave Request Management
* New Hire Processing
* Announcement Posting and Viewing
* Role-based Access Control (Admin and Regular User)

## Technologies Used

* **Frontend:** React.js, CoreUI React Components
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Deployment:** CyberPanel, PM2
* **Version Control:** Git, GitHub

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/freight-capstone/hr1.git
   ```
2. Navigate to the project directory:

   ```bash
   cd hr1
   ```
3. Install dependencies:

   ```bash
   npm install
   ```
4. Run the server:

   ```bash
   npm start
   ```

## Usage

* Admin users can manage employee profiles, attendance records, leave requests, and announcements.
* Regular users can view their attendance, apply for leave, and access announcements.

## CRUD Operations

### Create

* The system can create records for attendance, leave requests, new hires, and announcements. Employee data is not manually created as it is sourced from another system.

### Read

* Data retrieval includes displaying employee profiles, attendance logs, leave histories, new hire records, and company announcements.

### Update

* The system supports updating employee details, attendance logs, leave request statuses, and announcements.

### Delete

* Outdated or incorrect records can be deleted to maintain data integrity.

## ER Diagram

The ER diagram outlines the relationships between users, employees, attendance, leave requests, new hires, and announcements.

## Contribution

Feel free to fork the project, make changes, and submit pull requests. All contributions are welcome!

## License

This project is licensed under the MIT License.
