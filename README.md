# Web Development Final Project - *HobbyHub*

Submitted by: **Ali Hamad**

This web app: **Gaming Hub**

Time spent: **25** hours spent in total

## Required Features

The following **required** functionality is completed:

- [X] **A create form that allows the user to create posts**
- [X] **Posts have a title and optionally additional textual content and/or an image added as an external image URL**
- [X] **A home feed displaying previously created posts**
- [X] **By default, the time created, title, and number of upvotes for each post is shown on the feed**
- [X] **Clicking on a post shall direct the user to a new page for the selected post**
- [ ] **Users can sort posts by either their created time or upvotes count**
- [X] **Users can search for posts by title**
- [X] **A separate post page for each created post, where any additional information is shown is linked whenever a user clicks a post**
- [X] **Users can leave comments underneath a post on the post's separate page**
- [X] **Each post should have an upvote button on the post's page. Each click increases its upvotes count by one and users can upvote any number of times**
- [ ] **A previously created post can be edited or deleted from its post page**

The following **optional** features are implemented:

- [ ] Users can only edit and deleted posts or delete comments by entering the secret key, which is set by the user during post creation
- [ ] Upon launching the web app, the user is assigned a random user ID. It will be associated with all posts and comments that they make and displayed on them.
- [ ] Users can repost a previous post by referencing its post ID. On the post page of the new post, the referenced post is displayed and linked, creating a thread
- [ ] Users can customize the interface of the web app
- [ ] Users can share and view web videos
- [ ] Users can set flags while creating a post. Then users can filter posts by flags on the home feed.
- [ ] Users can upload images directly from their local machine as an image file
- [ ] Display a loading animation whenever data is being fetched

The following **additional** features are implemented:

* [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

**Upvote Count Sync Issue**
I encountered an issue with syncing the upvote count across pages. When a user clicked the upvote button on a post, the stats were updated correctly on the post details page. However, upon navigating back to the home page, the upvote count reverted to the original value instead of showing the updated one.

**Solution**:
I passed the `setPosts` function to the post details page. In the update logic, I used the `prevState` syntax and mapped over the previous state of posts. When updating the upvote count, I checked if the `post.id` matched the `post_id`. If it did, I updated the `upvotes` key by incrementing it, while keeping the rest of the posts unchanged. This ensured that the state was consistently updated across both pages.

--- 

**Comment State Update & Date Format Issue**
In my `CreateComment` component, I added functionality to dynamically update the comment list for a post after a user submits a comment. However, this caused a crash in the `formatDate` helper function. Specifically, I received a TypeError indicating that it couldn't read properties of `undefined` when trying to create a substring. The error pointed to line 9 in my `Comment` component.

**Solution**:
I traced the issue to the `commentObject` being passed to the `formatDate` function. I realized that the issue stemmed from the way I was creating and updating the comment in the state. Prior to submitting a comment, everything worked fine, but the state update was causing problems. I refactored the comment creation logic by appending `.select()` to the database insert to inspect the returned data. Upon testing, I found that the returned data was an array, but I needed a dictionary for each comment. I fixed this by accessing the first element of the array (`data[0]`) in the `setState` function to correctly store the comment as an object.

---

**Getting Filter and Sort Working Together**
I had an issue in my `Home` page where my filter and sort weren't working together. I managed to get both working independently, but when a page was sorted by either `created_at` or `upvotes`, the filter wouldn't work when I tried searching by title in my input field.

**Solution**:
Instead of having the state variable `sortedPosts` and its function `setSortedPosts` defined in `Home.jsx`, I instead defined them in `App.jsx` just like with the `filteredPosts` state variable. When I had `sortedPosts` in `Home.jsx`, the issue would stem from my ternary operators to figure out which posts to display. To break it down, if my `sortedPosts` wasn't empty, I would always render `sortedPosts`. This is true even if the user wanted to type something in the search bar. The page wouldn't re-render based on search input. So, my thought process was that anytime I was searching for a post in my search bar, I would reset my `sortedPosts` array to an empty array. That way, when I'm searching, I can properly display `filteredPosts` instead of `sortedPosts`. From there, when I clicked on the sort buttons, I would base the sorting off of a base array that is either `filteredPosts` or `posts` depending on if the `searchValue` is empty or not.


**Documentation that helped**
  - [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [useNavigate and useLocation](https://dev.to/esedev/how-to-pass-and-access-data-from-one-route-to-another-with-uselocation-usenavigate-usehistory-hooks-1g5m)
  - [Date() In JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
  - [Comparing Two Date Strings](https://www.geeksforgeeks.org/how-to-compare-two-date-strings-in-typescript/)
  - [Subtracting Dates](https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/)


## License

    Copyright [2024] [Ali Hamad]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
