

document.addEventListener('DOMContentLoaded', function() {
  
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const clearSearchBtn = document.getElementById('clearSearch');
  const booksSection = document.getElementById('books');
  const searchResultsSection = document.getElementById('searchResults');
  const searchResultsGrid = document.getElementById('searchResultsGrid');

  async function searchGoogleBooks(query) {
    if (!query.trim()) {
      showDefaultBooks();
      return;
    }

    try {
    
      searchResultsGrid.innerHTML = '<p class="col-span-full text-center text-gray-500 text-lg py-8">Searching books...</p>';
      booksSection.style.display = 'none';
      searchResultsSection.style.display = 'block';

      
      const books = await fetchBooks(query);

      
      if (books && books.length > 0) {
        displaySearchResults(books);
      } else {
        searchResultsGrid.innerHTML = '<p class="col-span-full text-center text-gray-500 text-lg py-8">No books found. Try a different search term.</p>';
      }

  
      searchResultsSection.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      searchResultsGrid.innerHTML = '<p class="col-span-full text-center text-red-500 text-lg py-8">Error searching books. Please try again.</p>';
      console.error('Search error:', error);
    }
  }

  function displaySearchResults(books) {
    searchResultsGrid.innerHTML = '';

    books.forEach(book => {
      const volumeInfo = book.volumeInfo;
      const title = volumeInfo.title || 'Unknown Title';
      const authors = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author';
      const thumbnail = volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/400x600/FF6B35/FFFFFF?text=No+Cover';
      const description = volumeInfo.description || 'No description available';
      const previewLink = volumeInfo.previewLink || volumeInfo.infoLink || null;
      const webReaderLink = book.accessInfo?.webReaderLink || null;

      const bookCard = document.createElement('div');
      bookCard.className = 'bg-white rounded-xl shadow hover:shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105';
      bookCard.innerHTML = `
        <img src="${thumbnail}" alt="${title}" class="h-60 w-full object-cover">
        <div class="p-4">
          <h4 class="font-semibold line-clamp-2">${title}</h4>
          <p class="text-sm text-gray-500 line-clamp-1">By ${authors}</p>
          <button class="mt-3 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 add-favorite-btn-api" 
                  data-title="${title}" 
                  data-author="${authors}" 
                  data-image="${thumbnail}">
            Add to Favorites
          </button>
        </div>
      `;
      
      // Add click event to open book details
      bookCard.addEventListener('click', function(e) {
        if (!e.target.classList.contains('add-favorite-btn-api')) {
          openBookModal(title, authors, thumbnail, description, previewLink, webReaderLink);
        }
      });
      
      searchResultsGrid.appendChild(bookCard);
    });


    attachFavoriteListeners();
  }

  function showDefaultBooks() {
    booksSection.style.display = 'block';
    searchResultsSection.style.display = 'none';
    searchInput.value = '';
  }

  
  searchButton.addEventListener('click', () => {
    searchGoogleBooks(searchInput.value);
  });

  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchGoogleBooks(searchInput.value);
    }
  });

  
  clearSearchBtn.addEventListener('click', showDefaultBooks);


  async function loadFeaturedBooks() {
    try {
      const books = await fetchBooks('cooking kitchen recipes');
      if (books && books.length > 0) {
        displayFeaturedBooks(books.slice(0, 8)); 
      }
    } catch (error) {
      console.error('Error loading featured books:', error);
    }
  }
  
  function displayFeaturedBooks(books) {
    const booksGrid = document.querySelector('#books .grid');
    booksGrid.innerHTML = '';

    books.forEach(book => {
      const volumeInfo = book.volumeInfo;
      const title = volumeInfo.title || 'Unknown Title';
      const authors = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author';
      const thumbnail = volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/400x600/FF6B35/FFFFFF?text=No+Cover';
      const description = volumeInfo.description || 'No description available';
      const previewLink = volumeInfo.previewLink || volumeInfo.infoLink || null;
      const webReaderLink = book.accessInfo?.webReaderLink || null;

      const bookCard = document.createElement('div');
      bookCard.className = 'bg-white rounded-xl shadow hover:shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105';
      bookCard.innerHTML = `
        <img src="${thumbnail}" alt="${title}" class="h-60 w-full object-cover">
        <div class="p-4">
          <h4 class="font-semibold line-clamp-2">${title}</h4>
          <p class="text-sm text-gray-500 line-clamp-1">By ${authors}</p>
          <button class="mt-3 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 add-favorite-btn-featured" 
                  data-title="${title}" 
                  data-author="${authors}" 
                  data-image="${thumbnail}">
            Add to Favorites
          </button>
        </div>
      `;
      
      // Add click event to open book details
      bookCard.addEventListener('click', function(e) {
        if (!e.target.classList.contains('add-favorite-btn-featured')) {
          openBookModal(title, authors, thumbnail, description, previewLink, webReaderLink);
        }
      });
      
      booksGrid.appendChild(bookCard);
    });
    attachFeaturedFavoriteListeners();
  }

  
  const browseBooksBtn = document.getElementById('browseBooksBtn');
  if (browseBooksBtn) {
    browseBooksBtn.addEventListener('click', function(e) {
      e.preventDefault();
      loadFeaturedBooks();
      setTimeout(() => {
        document.getElementById('books').scrollIntoView({ behavior: 'smooth' });
      }, 500);
    });
  }

  
  function attachFeaturedFavoriteListeners() {
    const featuredButtons = document.querySelectorAll('.add-favorite-btn-featured');
    featuredButtons.forEach(button => {
      button.addEventListener('click', function() {
        addToFavorites(this);
      });
    });
  }

  
  function attachFavoriteListeners() {
    const apiFavoriteButtons = document.querySelectorAll('.add-favorite-btn-api');
    apiFavoriteButtons.forEach(button => {
      button.addEventListener('click', function() {
        addToFavorites(this);
      });
    });
  }

  
  function addToFavorites(button) {
    const title = button.getAttribute('data-title');
    const author = button.getAttribute('data-author');
    const image = button.getAttribute('data-image')
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  
    const exists = favorites.some(book => book.title === title && book.author === author);

    if (exists) {
      alert('This book is already in your favorites!');
    } else {
  
      favorites.push({ title, author, image });
      localStorage.setItem('favorites', JSON.stringify(favorites));
    
      button.textContent = '✓ Added!';
      button.classList.remove('bg-pink-600');
      button.classList.add('bg-green-600');
      
      setTimeout(() => {
        button.textContent = 'Add to Favorites';
        button.classList.remove('bg-green-600');
        button.classList.add('bg-pink-600');
      }, 2000);
    }
  }

  // Book Modal Functions
  function openBookModal(title, authors, thumbnail, description, previewLink, webReaderLink) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('bookModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'bookModal';
      modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
      modal.style.display = 'none';
      document.body.appendChild(modal);
    }

    // Truncate description if too long
    const maxLength = 500;
    let displayDescription = description;
    if (description.length > maxLength) {
      displayDescription = description.substring(0, maxLength) + '...';
    }

    modal.innerHTML = `
      <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div class="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h3 class="text-2xl font-bold text-pink-700">Book Details</h3>
          <button onclick="document.getElementById('bookModal').style.display='none'" class="text-gray-500 hover:text-gray-700 text-3xl">&times;</button>
        </div>
        <div class="p-6">
          <div class="flex flex-col md:flex-row gap-6">
            <img src="${thumbnail}" alt="${title}" class="w-full md:w-48 h-auto object-cover rounded-lg shadow-md">
            <div class="flex-1">
              <h4 class="text-xl font-bold mb-2">${title}</h4>
              <p class="text-gray-600 mb-4">By ${authors}</p>
              <p class="text-gray-700 text-sm leading-relaxed mb-6">${displayDescription}</p>
              <div class="flex flex-wrap gap-3">
                ${webReaderLink ? `<a href="${webReaderLink}" target="_blank" class="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors inline-flex items-center gap-2">
                  📖 Read Online
                </a>` : ''}
                ${previewLink ? `<a href="${previewLink}" target="_blank" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
                  👁️ Preview Book
                </a>` : ''}
                ${!webReaderLink && !previewLink ? '<p class="text-gray-500 italic">No preview available for this book</p>' : ''}
              </div>
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
