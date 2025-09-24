# LibraryManagement

## 📦 Project

A simple .Net ASP & Angular application to manage books and their categories.
Books can belong to multiple categories, and users can add, edit, search, and filter both books and categories.

---

## 🚀 Features

-📚 Books Management – Add, edit, delete, and view books with detailed information

-🏷️ Categories Management – Create, update, and remove categories for better organization

-🔗 Book Categorization – Assign one or multiple categories to each book for flexible grouping

-🔍 Search & Filtering – Quickly find books or categories by title, author, or category

-📑 Category-based Book View – Browse books by selected categories for focused exploration

---

## 🛠️ Tech Stack

- Angular v19+.

---

## 🧾 Assumptions Made

- User authentication is handled externally. The app assumes that a valid user session or token already exists and does not include login or authentication logic.

- No CSS framework (like Bootstrap or Tailwind) was specified in the instructions, so I implemented the required styles manually using SCSS for full control and customization.

- Assumed API returns paginated responses

## 📦 Setup Instructions

### ✅ Prerequisites

- Node v20+
- Angular CLI v19+
- Package Manager v10+

---

### 🔧 Installation

```bash
# 1. Clone the repository
git clone https://github.com/yaqeenby/LibraryManagement.git

# 2. Navigate to the project
cd Frontend

# 3. Install dependencies
npm install
```

### Run

Run `npm start` and then navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

---

### 🤖 AI Tools Usage

ChatGPT (OpenAI) → Helped design project structure, write search & filtering logic, create confirmation message flows, and draft this README.

Example Prompts (Chat History)

“lets start working on this task 
Technical Task: You are required to build a Library Management System using .NET Core API + Angular, 
following the principles of Onion Architecture, Domain-Driven Design (DDD), Repository Pattern, EF Core, and ADO.NET with Stored Procedures. 
You can use any AI tool like ChatGPT, Claude, Copilot and others. 
Requirements Features Manage Books (Add, Update, Delete, List, Get by Id). 
Manage Categories (Add, Update, Delete, List). 
A Book can belong to multiple Categories. 
Backend (.NET Core API) Onion Architecture with DDD (Domain, Application, Infrastructure, API). 
Use EF Core for most operations. 
Use ADO.NET + Stored Procedure for “Get All Books with Category.” 
Enable Swagger for API documentation.
based on this task help me to start build the structure of project and layers”

  - after he give me the plan and i review it i ask some questions like "where i should pul repo interfaces like IBookRepo in projec" .. etc.
  - then i build the project and folders and files after that i ask to give me the implementation for each file from conroller to service to repo
  - i review each line of code and start to ask him to edit some point like to handle general api response, add search an filtering, add api's line remove book from category
  - for categor's api i do it manualy since i blocked due to my limited subscription so i try to follow same design we use it in book api's

for the frontend i ask them something like:
“using angular material & form builder create form to add book”

also i give them image for the theme i want to apply and ask them: 
"based on the theme in the image i want to create table to view list of books using angular material and edit it's design to follow the theme"
"i want to create search input using angular material with same design as the image"

The AI tools didn’t always generate results identical to the design, but with some final touches I was able to achieve the desired outcome.

---

### ⏳ Time Estimation vs. Actual Time Spent
Task	                              Estimated Time	          Actual Time    Notes   
Project setup & environment config	30 min	                  40 min         Issues in diff versions
Backend Structure and full api's	  8 hrs (1 working day)     2 hrs          Using ai tool speed up development
 - Book CRUD implementation	          
 - Category CRUD implementation	      
 - Book–Category relationship	     

Frontend Structure                  2 - 4 hrs                 2 - 4 hr's     Using AI tools helped me plan and make better decisions while building the project structure.
 - build modules & routing          
 - connect to backend list api's
 - using angular material

UI styling (Angular Material)       8 hrs (1 working day)     6 - 8 hr's     Since I already had the design built in PrimeNG, adapting it to Angular Material took me about one extra day. However, once I started working on it, the process went smoothly and I didn’t face many challenges.
 - Apply design and theme        

Search & filtering	                1 hr	                    1 hr

Total	                              2 - 3 working days        2 working days   

---

## 📌 Important Note

Using AI tools helped speed up the development process. 
However, due to my limited subscription, I couldn’t rely on them throughout the entire process as I was occasionally blocked.

---

## 🗄️ Database Setup
1. Open SQL Server.
2. Run the script inside `/db/library_db.sql`.
3. Database will be created with tables and stored procedures.

