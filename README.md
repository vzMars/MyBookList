# MyBookList

The front-end for a full-stack social media web application that uses the Google Books API and allows users to search for books and add them to their list and users can also share their list with others.

**Link to project:** https://mybooklist.vzmars.com

**Back-End:** https://github.com/vzMars/mybooklist-api

![alt text](https://i.imgur.com/XvYLDkI.png)
![alt text](https://i.imgur.com/IoTMXdM.png)

## How It's Made:

**Tech used:** JavaScript, React, Tailwind CSS

The front-end for this application was made using React. Tailwind CSS was used to style this application. React Router DOM was used to handle routing in this application. The Context API was used to manage the authentication state and manage the state of books that users have added to their list. The application is divided into public and private routes that use two helper components that check the current authentication state. If they aren't allowed to access that route the helper components then redirects the user to a route that they can access. There is also a custom 404 not found page that is used if the user tries to go to a page that does not exist.

Users can perform all the basic CRUD operations such as getting either their profile or another user's profile showcasing all their books or getting a list of books found by the Google Books API after searching or seeing the details of a book. They can add a new book to their list, they can also update the status of a book on their list, and also remove a book from their list.

## Optimizations:

I would like to add a feature that lets users review books and add a rating system to the application. With reviews and ratings in place, I would like to implement a dynamic list that renders the most popular books based on those ratings and reviews. I would also convert this application from using JavaScript to TypeScript.

## Lessons Learned:

This project allowed me to learn various aspects of React. I learned how to create custom hooks for user authentication (login, signup, and logout hooks). I also learned how to split parts of the application into different reusable components like the Error component that displays a different error message depending on the string message that was passed in as a prop or the UserCard component that displays a different user card depending on the user object that was passed in as a prop. I also learned how to use Context and useReducer together to authenticate users and keep track of the books of the application. Overall I definitely prefer using React over EJS since it looks cleaner and is easier to read and manage.

## More Projects:

Take a look at these other projects that I have in my portfolio:

**Employee CRM:** https://github.com/vzMars/employee-crm

**GameBlog:** https://github.com/vzMars/gameblog

**MangaNotifications:** https://github.com/vzMars/manga-notifications
