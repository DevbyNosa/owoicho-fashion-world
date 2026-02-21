# 🧵 OWoicho Fashion World

> *Crafting Elegance, Defining Style*, A modern web platform for OWoicho Fashion World, specializing in bespoke African fashion.

![OWoicho Fashion World](https://via.placeholder.com/800x400/035446/ffffff?text=OWoicho+Fashion+World)

## ✨ Features

### 🎨 **Frontend**
- **Responsive Design**: Mobile-first approach with modern CSS
- **Dynamic Homepage**: Customizable hero section, about content, and images
- **Interactive Elements**: Smooth animations and user-friendly navigation
- **Contact Integration**: WhatsApp chat integration for customer inquiries

### 🔐 **Admin Panel**
- **Secure Authentication**: Passport.js local strategy with bcrypt hashing
- **Content Management**: Edit homepage text, location, contact info
- **Media Uploads**: Manage logos and images with Multer
- **Maintenance Mode**: Toggle site availability with custom messages
- **Chat Management**: View and respond to customer messages

### 💬 **Customer Features**
- **Contact Forms**: Easy inquiry submission
- **Live Chat**: Real-time communication system
- **Service Requests**: Multiple service categories (Tailoring, Alterations, etc.)

### 🛠 **Technical Features**
- **Session Management**: PostgreSQL-backed sessions with 7-day persistence
- **File Uploads**: Secure image handling with Multer
- **Database Integration**: Robust PostgreSQL setup with connection pooling
- **Error Handling**: Comprehensive error pages and logging
- **Security**: CSRF protection, input validation, and secure headers

## 🚀 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Passport.js** - Authentication
- **Multer** - File uploads
- **bcrypt** - Password hashing

### Frontend
- **EJS** - Templating engine
- **CSS3** - Styling with responsive design
- **JavaScript** - Client-side interactions

### DevOps
- **Nodemon** - Development server
- **dotenv** - Environment variables

## 📋 Prerequisites

- Node.js v16 or higher
- PostgreSQL v12 or higher
- npm or yarn

## 🛠 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/owoicho-fashion-world.git
   cd owoicho-fashion-world
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PG_USER=your_postgres_username
   PG_PASSWORD=your_postgres_password
   PG_DATABASE=owoicho_db
   PG_HOST=localhost
   PG_PORT=5432
   SESSION_SECRET=your_super_secret_session_key
   ```

4. **Database Setup**
   ```bash
   # Create database
   createdb owoicho_db

   # Run schema
   psql -d owoicho_db -f data/query.sql
   ```

5. **Start the server**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Admin Panel: Access via secure admin login

## 📖 Usage

### For Customers
1. Visit the homepage to explore services
2. Use the contact form or WhatsApp for inquiries
3. Browse the about section to learn about the brand

### For Admins
1. Login to the admin panel with credentials
2. Manage content, upload images, and toggle maintenance mode
3. View and respond to customer messages

## 🗄 Database Schema

### Tables
- **adminCredentials**: Admin authentication
- **content_upload**: Homepage content and media
- **chats**: Customer inquiries
- **user_sessions**: Session storage

### Key Relationships
- Content uploads linked to homepage display
- Chat messages with service categories
- Admin sessions for authentication

## 🔗 API Endpoints

### Public Routes
- `GET /` - Homepage
- `POST /chat` - Submit contact form
- `GET /404` - Error page

### Admin Routes
- `GET /backend` - Admin login
- `POST /backend` - Admin authentication
- Protected admin panel routes (authentication required)

## 🎨 Customization

### Styling
- Edit CSS files in `public/css/`
- Modify EJS templates in `views/`
- Update responsive breakpoints as needed

### Content
- Use admin panel for text content
- Upload images via admin interface
- Configure contact information

### Features
- Add new services in chat forms
- Extend admin panel with additional management tools
- Integrate payment systems for future e-commerce

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**DevbyNosa** - *Full-Stack Developer*
- GitHub: [@devbynosa](https://github.com/devbynosa)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- OWoicho Fashion World for the inspiration
- Open source community for amazing tools
- All contributors and users

---

<div align="center">

**Made with ❤️ for the fashion-forward gentleman**

⭐ Star this repo if you found it helpful!

</div></content>
<parameter name="filePath">c:\Users\HP\OneDrive\Desktop\owoicho\README.md
