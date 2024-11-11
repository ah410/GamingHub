# 1. Site Layout (in order top to bottom)
1. Navbar
    - Left: Logo (links to Home)
    - Middle: Search Bar (Search by title)
    - Right: Links
        - Home
        - Create Post
2. Home Page
    - Header
        - describes purpose of GamingHub
    - Sorting and Filtering
        - Order By: Upvote Count, Date Posted
        - Filter By: tags (game type, character, etc.)
    - Scroll up button
        - appear in bottom right corner after scrolling past the header

# 2. Post Cards Structure
1. Contents
    - Title
    - Creation Time
    - Upvotes/downvotes (interactive)
    - Comment Count
2. On Click
    - Uniue url to show the entire post
    - Provides
        - Title and Description
        - Image/Video
        - Tags
        - Upvote/Downvote Buttons
        - Comments Section

# 3. Create Post Page
1. Title (required)
2. Description (optional)
3. Images (optional)
4. Tags (optional) (prepopulated, can't create tags)

# 4. Postgres Tables
1. Posts
    - Title
        - must be unique
        - character limit at 100
        - not null
    - Description
        - doesn't need to be unique
        - character limit at 600
        - can be null
    - Images/Videos
        - doesn't need to be unique
        - url to access is stored here
        - can be null
    - Tags
        - doesn't need to be unique
        - textual JSON data
        - can be null

# 5. Documentation That helped
1. [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
2. [Tailwind CSS](https://tailwindcss.com/)
3. [useNavigate and useLocation](https://dev.to/esedev/how-to-pass-and-access-data-from-one-route-to-another-with-uselocation-usenavigate-usehistory-hooks-1g5m)
4. [Date() In JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)