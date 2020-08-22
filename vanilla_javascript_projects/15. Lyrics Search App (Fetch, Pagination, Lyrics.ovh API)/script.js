const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

// Search by song or artist
async function searchSongs(term) {
  //   fetch(`${apiURL}/suggest/${term}`)
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));

  console.log(term);

  const res = await fetch(`${apiURL}/suggest/${term}`);

  console.log(res);

  const data = await res.json();

  console.log(data);
  showData(data);
}

// Show songs and artists in DOM
function showData(data) {
  result.innerHTML = `
  <ul class="songs">
  ${data.data
    .map(
      (song) => `<li>
    <span><strong>${song.title}</strong><small> - ${song.artist.name}</small></span>
    <button class='btn' data-artist="${song.artist.name}" data-songtitle="${song.title}">Lyrics <small>| 가사</small></button>
    </li>`
    )
    .join("")}
  </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
      ${
        data.prev
          ? `<button class='btn' onclick="getMoreSongs('${data.prev}')">Prev</button>`
          : ""
      }
      ${
        data.next
          ? `<button class='btn' onclick="getMoreSongs('${data.next}')">Next</button>`
          : ""
      }
      `;
  } else {
    more.innerHTML = "";
  }
}

// Get prev and next page
async function getMoreSongs(url) {
  const res = await fetch(url);
  const data = await res.json();

  showData(data);
}

// Event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert("Please type in a search term");
  } else {
    searchSongs(searchTerm);
  }
});
