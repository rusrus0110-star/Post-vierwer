📘 

Posts Viewer — JavaScript Project

A simple JavaScript web application for browsing posts fetched from a public API.
Users can navigate between posts, perform dynamic search, and automatically return to the last viewed post thanks to localStorage support.

🚀 Features

✔ Fetching data from the server
Posts are loaded from the API:
Data is retrieved using fetch() with async / await.

✔ Post navigation
The interface includes two navigation buttons:
Prev — go to the previous post
Next — go to the next post
Buttons are automatically disabled when:
data is still loading
the user is on the first or last post

✔ Dynamic search
A search bar allows users to filter posts by:
title
body
Results update in real time as the user types.

✔ Loading indicator
During data loading:
a Loading… indicator is displayed
navigation buttons are disabled
This prevents unwanted clicks and improves user experience.

✔ Save last viewed post

The ID of the last opened post is saved in localStorage.
When the page is reloaded, the app automatically restores that post.


🧩 Technologies Used

HTML5 — structure
CSS3 — styling and layout
JavaScript (ES6+) — application logic
Fetch API — server communication
LocalStorage — persistent state
Async / Await — asynchronous logic


📌 Key JavaScript Functions
🔹 getPosts()
Fetches posts from the server and initializes the UI.
🔹 renderPost()
Displays the current post and updates title, body text, and post counter.
🔹 applySearch(query)
Filters posts based on the search query (case-insensitive search in title + body).
🔹 showLoader(isVisible)
Shows/hides the loading indicator and temporarily disables navigation buttons.

🎨 UI & Design
The UI uses:
clean light theme
soft shadows
blue accent buttons
responsive layout
subtle animations
