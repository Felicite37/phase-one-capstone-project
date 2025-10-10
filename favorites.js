

document.addEventListener('DOMContentLoaded', function() {
  const favoritesGrid = document.getElementById('favorites-grid');

  
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if(favorites.length === 0) {
    favoritesGrid.innerHTML = '<p class="col-span-full text-center text-gray-500 text-lg py-8">You have no favorite books yet. Search and add books from the Home page!</p>';
  } else {
    favorites.forEach((book, index) => {
      const card = document.createElement('div');
      card.className = 'bg-white rounded-xl shadow hover:shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105';
      card.innerHTML = `
        <img src="${book.image}" class="h-60 w-full object-cover" alt="${book.title}">
        <div class="p-4">
          <h4 class="font-semibold">${book.title}</h4>
          <p class="text-sm text-gray-500">By ${book.author}</p>
          <button class="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 remove-btn" data-index="${index}">Remove</button>
        </div>
      `;
      
      // Add click event to open book (except when clicking remove button)
      card.addEventListener('click', function(e) {
        if (!e.target.classList.contains('remove-btn')) {
          openBookInfo(book.title, book.author, book.image);
        }
      });
      
      favoritesGrid.appendChild(card);

      card.querySelector('.remove-btn').addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent card click event
        const idx = parseInt(this.getAttribute('data-index'));
        favorites.splice(idx, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        location.reload(); 
      });
    });
  }

  // Function to open book info modal
  function openBookInfo(title, author, image) {
    let modal = document.getElementById('bookInfoModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'bookInfoModal';
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
      modal.style.display = 'none';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div class="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h3 class="text-2xl font-bold text-pink-700">Book Information</h3>
          <button onclick="document.getElementById('bookInfoModal').style.display='none'" class="text-gray-500 hover:text-gray-700 text-3xl">&times;</button>
        </div>
        <div class="p-6">
          <div class="flex flex-col md:flex-row gap-6">
            <img src="${image}" alt="${title}" class="w-full md:w-48 h-auto object-cover rounded-lg shadow-md">
            <div class="flex-1">
              <h4 class="text-xl font-bold mb-2">${title}</h4>
              <p class="text-gray-600 mb-4">By ${author}</p>
              <p class="text-gray-700 text-sm mb-6">This is one of your favorite books! Click the button below to search for it on Google Books to read or preview it.</p>
              <a href="https://www.google.com/search?q=${encodeURIComponent(title + ' ' + author + ' book')}" target="_blank" class="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors inline-flex items-center gap-2">
                🔍 Search on Google
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.style.display = 'flex';
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
});
