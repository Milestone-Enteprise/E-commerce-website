const searchInput = document.getElementById('search');
const items = document.querySelectorAll('#items li');

searchInput.addEventListener('keyup', () => {
  const searchText = searchInput.value.toLowerCase();

  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    if (text.includes(searchText)) {
      item.classList.remove('hide');
    } else {
      item.classList.add('hide');
    }
  });
});
