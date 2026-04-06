App Overview
This To-Do App is a functional, category-based task management tool designed with a clean, modern "soft-blue" aesthetic. It allows users to organize their daily lives by segmenting tasks into specific life areas while providing essential tracking and editing features.

Key Features
Categorization System: Unlike a simple list, your app organizes tasks into Personal, Study, and Work categories. Users can filter by these categories or view a bird's-eye "ALL" perspective.

Task Status Filtering: You've implemented a secondary filtering layer that allows users to toggle between All, Active, and Completed tasks within their chosen category.

Dynamic Task Management:

Deadlines: Users can set due dates; the app includes logic to highlight tasks in red if they are overdue.

Inline Editing: Tasks can be modified after creation through a hidden "modes" menu.

Persistence: Uses localStorage to ensure that tasks remain saved even after the browser is refreshed.

Smart Feedback: The app provides real-time updates on the number of remaining tasks and automatically disables interaction with completed items to prevent accidental changes.

Technical Stack
HTML5: Semantic structure for the task interface and category sidebars.

CSS3: Utilizes CSS Variables for a consistent color palette, flexbox for layout, and smooth transitions for a high-quality user experience.

JavaScript (Vanilla): Handles the state management, filtering logic, and DOM manipulation without the need for external libraries.

Summary of User Flow
Select a Category using the # toggle.

Add a Task via the input field (Enter key or Add button).

Manage Tasks by checking them off, deleting them, or using the > menu to set a deadline or modify the text.

Clean up using "Clear Completed" to remove finished items or "Reset" to wipe a specific category.

It’s a solid, well-structured application that balances functionality with a user-friendly interface!

[View Live Demo](https://n1ckna-me.github.io/todo_app/)
