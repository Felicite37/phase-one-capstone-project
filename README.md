# 📚 Book Explorer

A modern, interactive web application for discovering, searching, and managing your favorite books using the Google Books API.

## 🌟 Features

- **Book Search**: Search for books using the Google Books API with real-time results
- **Featured Books**: Browse curated collections of featured books
- **Favorites Management**: Save and manage your favorite books locally
- **Book Details**: View detailed information about each book including descriptions, authors, and cover images
- **Preview & Read**: Access book previews and online reading options when available
- **Responsive Design**: Fully responsive UI built with TailwindCSS that works on all devices
- **Modern UI**: Clean, intuitive interface with smooth animations and transitions

## 🚀 Live Demo

Simply open `index.html` in your web browser to start exploring books!

## 📸 Screenshots

### Home Page
![Home Page](screenshoot%20of%20Home%20page.png)

### Favorites Page
![Favorites Page](screenshoots%20of%20Favorites%20page.png)

### About Page
![About Page](screenshoot%20of%20About%20page.png)

## 📋 Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for Google Books API and TailwindCSS CDN)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/Felicite37/Phase-One-Capstone-Project.git
```

2. Navigate to the project directory:
```bash
cd phase-one-capstone-project
```

3. Open `index.html` in your web browser:
```bash
# On Windows
start index.html

# On macOS
open index.html

# On Linux
xdg-open index.html
```

## 📁 Project Structure

```
phase-one-capstone-project/
│
├── index.html          # Main landing page
├── Home.html           # Alternative home page
├── Favorites.html      # Favorites page displaying saved books
├── About.html          # About page with project information
├── home.js             # Main JavaScript for home page functionality
├── fetchBooks.js       # API integration for Google Books
├── favorites.js        # Favorites management functionality
├── image.jpg           # Hero image
└── README.md           # Project documentation
```

## 💻 Usage

### Searching for Books
1. Enter a book title, author, or keyword in the search bar
2. Click the "Search" button or press Enter
3. Browse through the search results
4. Click on any book card to view detailed information

### Adding to Favorites
1. Click the "Add to Favorites" button on any book card
2. The book will be saved to your local storage
3. Access your favorites anytime from the Favorites page

### Managing Favorites
1. Navigate to the Favorites page from the navigation menu
2. View all your saved books
3. Click the "Remove" button to delete a book from favorites
4. Click on a book card to view more information

## 🔧 Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Custom styling
- **TailwindCSS**: Utility-first CSS framework (via CDN)
- **JavaScript (ES6+)**: Modern JavaScript features
- **Google Books API**: Book data and information
- **LocalStorage**: Client-side data persistence

## 🌐 API Reference

This project uses the [Google Books API](https://developers.google.com/books) to fetch book data.

**Endpoint Used:**
```
https://www.googleapis.com/books/v1/volumes?q={query}&maxResults=20
```

## ✨ Key Features Explained

### Search Functionality
- Real-time search with instant results
- Displays up to 20 books per search
- Fallback images for books without covers
- Error handling for failed API requests

### Book Details Modal
- Comprehensive book information
- Direct links to preview or read books online
- Responsive design for all screen sizes
- Click outside to close functionality

### Favorites System
- Persistent storage using LocalStorage
- Duplicate detection to prevent adding the same book twice
- Visual feedback when adding/removing books
- Empty state message when no favorites exist

## 🎨 Design Features

- **Color Scheme**: Pink/Orange theme with clean white backgrounds
- **Typography**: Clear, readable fonts with proper hierarchy
- **Animations**: Smooth hover effects and transitions
- **Responsive**: Mobile-first design approach
- **Accessibility**: Semantic HTML and proper contrast ratios

## 🐛 Known Issues

- Books without preview links will show "No preview available"
- Some books may have limited information from the API
- LocalStorage has a size limit (typically 5-10MB per domain)

## 🔮 Future Enhancements

- [ ] Add user authentication
- [ ] Implement book ratings and reviews
- [ ] Add reading lists and categories
- [ ] Include advanced search filters (genre, publication date, etc.)
- [ ] Add dark mode toggle
- [ ] Implement pagination for search results
- [ ] Add book recommendations based on favorites

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Felicite37**

- GitHub: [@Felicite37](https://github.com/Felicite37)

## 🙏 Acknowledgments

- Google Books API for providing book data
- TailwindCSS for the styling framework
- All book lovers who inspired this project

## 📞 Support

If you have any questions or run into issues, please open an issue on the GitHub repository.

---
![grid](./screenshoot of About page.png)
![grid](./screenshoot of Home page.png)
![grid](./screenshoot of Favorites page.png)

**Happy Reading! 📖✨**
