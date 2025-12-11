const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

let allPosts = [];
let filteredPosts = [];
let currentIndex = 0;
let isLoading = false;

const titleEl = document.getElementById("post-title");
const bodyEl = document.getElementById("post-body");
const counterEl = document.getElementById("post-counter");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const loaderEl = document.getElementById("loader");
const searchInput = document.getElementById("search-input");

// helpers

function showLoader(isVisible) {
  loaderEl.classList.toggle("hidden", !isVisible);
  prevBtn.disabled = isVisible;
  nextBtn.disabled = isVisible;
}

function updateButtons() {
  const length = filteredPosts.length;

  prevBtn.disabled = length === 0 || currentIndex === 0;
  nextBtn.disabled = length === 0 || currentIndex === length - 1;
}

function renderPost() {
  if (filteredPosts.length === 0) {
    titleEl.textContent = "No posts found";
    bodyEl.textContent =
      "Try to change your search query or clear the search field.";
    counterEl.textContent = "0 / 0";
    updateButtons();
    return;
  }

  const post = filteredPosts[currentIndex];

  titleEl.textContent = post.title;
  bodyEl.textContent = post.body;
  counterEl.textContent = `${currentIndex + 1} / ${filteredPosts.length}`;

  // localStorage
  localStorage.setItem("currentPostId", String(post.id));

  updateButtons();
}

function applySearch(query) {
  const q = query.trim().toLowerCase();

  if (!q) {
    filteredPosts = [...allPosts];
  } else {
    filteredPosts = allPosts.filter((post) => {
      return (
        post.title.toLowerCase().includes(q) ||
        post.body.toLowerCase().includes(q)
      );
    });
  }

  // if id not found – start from  0
  const savedId = Number(localStorage.getItem("currentPostId"));
  const savedIndex = filteredPosts.findIndex((p) => p.id === savedId);

  currentIndex = savedIndex >= 0 ? savedIndex : 0;
  renderPost();
}

//  get posts

async function getPosts() {
  showLoader(true);
  //await new Promise((r) => setTimeout(r, 3000));
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error("Failed to load posts");
    }

    const data = await response.json();
    allPosts = data;
    filteredPosts = [...allPosts];

    //  postId from localStorage
    const savedId = Number(localStorage.getItem("currentPostId"));
    const savedIndex = filteredPosts.findIndex((p) => p.id === savedId);

    currentIndex = savedIndex >= 0 ? savedIndex : 0;
    renderPost();
  } catch (error) {
    console.error(error);
    titleEl.textContent = "Error loading posts";
    bodyEl.textContent = "Please try to reload the page later.";
    counterEl.textContent = "0 / 0";
  } finally {
    showLoader(false);
  }
}

// event listeners

prevBtn.addEventListener("click", async () => {
  if (isLoading || currentIndex <= 0) return;

  isLoading = true;
  prevBtn.disabled = true;
  nextBtn.disabled = true;
  currentIndex -= 1;
  renderPost();

  await new Promise(requestAnimationFrame);
  await new Promise(requestAnimationFrame);

  prevBtn.disabled = false;
  nextBtn.disabled = false;
  isLoading = false;
});

nextBtn.addEventListener("click", async () => {
  if (isLoading || currentIndex >= filteredPosts.length - 1) return;

  isLoading = true;
  prevBtn.disabled = true;
  nextBtn.disabled = true;

  currentIndex += 1;
  renderPost();
  await new Promise(requestAnimationFrame);
  await new Promise(requestAnimationFrame);

  prevBtn.disabled = false;
  nextBtn.disabled = false;
  isLoading = false;
});

// search
searchInput.addEventListener("input", (e) => {
  applySearch(e.target.value);
});

// start
getPosts();
