

async function fetchBooks(query) {
  if (!query.trim()) {
    return null;
  }

  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20`);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      return data.items;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
}


function formatBookData(book) {
  const volumeInfo = book.volumeInfo;
  return {
    title: volumeInfo.title || 'Unknown Title',
    authors: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author',
    thumbnail: volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/400x600/FF6B35/FFFFFF?text=No+Cover',
    description: volumeInfo.description || 'No description available',
    publishedDate: volumeInfo.publishedDate || 'Unknown',
    pageCount: volumeInfo.pageCount || 'N/A',
    previewLink: book.volumeInfo.previewLink || book.volumeInfo.infoLink || null,
    webReaderLink: book.accessInfo?.webReaderLink || null
  };
}
