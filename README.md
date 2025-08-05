# 🍽️ FoodieExpress - Food Ordering App

A modern React-based food ordering application with user authentication and admin dashboard functionality.

## Features

### Customer Features
- Browse food menu by categories (Main Course, Appetizer, Dessert, Beverage)
- Add items to cart with quantity management
- Secure checkout process with customer information
- Order tracking and confirmation
- Responsive design for mobile and desktop

### Authentication System
- User registration (signup) with comprehensive form validation
- User login with demo credentials
- Role-based access control (Admin/User)
- Secure session management with localStorage
- Protected admin routes
- Email duplication prevention

### Admin Dashboard
- Order management system
- Real-time order status updates
- Revenue and analytics overview
- **User Management**: View all registered users with detailed information
- Customer information management
- Order history tracking

## How to Use the Application

### For New Users (Signup Process)
1. **Access Signup**: Click "Login" in navbar, then "Create one here"
2. **Fill Registration Form**: Complete all required fields:
   - First Name & Last Name
   - Email Address (must be unique)
   - Phone Number (10 digits)
   - Full Address
   - Password (minimum 6 characters)
   - Confirm Password
3. **Account Creation**: Submit form to create your account
4. **Login**: Automatically redirected to login page after successful signup
5. **Start Ordering**: Login with your new credentials to access the full menu

### For Existing Users
- **Quick Demo Login**: Use provided demo credentials or your registered account
- **Browse Menu**: Explore food categories and add items to cart
- **Secure Checkout**: Complete orders with customer information
- **Order Tracking**: Receive confirmation and track your order

### For Administrators
- **Admin Access**: Login with admin credentials to access dashboard
- **Order Management**: View and update order statuses in real-time
- **User Management**: Monitor all registered users and their information
- **Analytics**: Access comprehensive business metrics and reports

## Demo Credentials & Account Types

### Admin Access
- **Email**: admin@foodorder.com
- **Password**: admin123
- **Features**: Full admin dashboard access, order management, user management, analytics

### Regular User  
- **Email**: user@foodorder.com  
- **Password**: user123
- **Features**: Standard customer ordering experience

### Create Your Own Account
- **Signup Process**: Click "Login" → "Create one here"
- **Account Type**: All new registrations are regular user accounts
- **Immediate Access**: Login immediately after successful registration
- **Full Features**: Complete access to menu, cart, and checkout functionality

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Food_Web
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Tech Stack

- **Frontend**: React 18 with Hooks
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Custom React Hooks
- **Authentication**: Custom useAuth hook with localStorage
- **Routing**: Custom useNavigation hook

## Project Structure

```
src/
├── components/
│   ├── AdminDashboard.jsx    # Admin panel with order and user management
│   ├── Login.jsx             # Authentication page with demo credentials
│   ├── Signup.jsx            # User registration with validation
│   ├── MenuPage.jsx          # Main menu container
│   ├── Navbar.jsx            # Navigation with auth controls
│   ├── Payment.jsx           # Checkout process
│   ├── ProductCard.jsx       # Individual food items
│   ├── ProductList.jsx       # Menu display
│   └── Cart.jsx              # Shopping cart
├── hooks/
│   ├── useAuth.js            # Authentication & user management logic
│   ├── useCart.js            # Cart state management
│   └── useNavigation.js      # Page routing with auth states
├── Data/
│   └── Product.json          # Food items database
└── App.jsx                   # Main application component
```

## Admin Dashboard Features

The admin dashboard provides comprehensive order management capabilities:

### Overview Tab
- Total orders and revenue statistics
- Today's orders count
- Pending orders tracking
- **Total users count** (including registered users)
- Recent orders preview

### Orders Tab
- Complete order listing with customer details
- Real-time status updates (Pending → Preparing → Completed)
- Order item details and totals
- Customer contact information

### Users Tab
- **Complete user management interface**
- Default system accounts (Admin, Demo User)
- All registered users with full details
- User role badges and registration dates
- Contact information and addresses

### Analytics Tab
- Revenue tracking and reporting
- Order trends and patterns
- Performance metrics (Coming Soon)

## Authentication Flow

1. **Signup Process**: New users can create accounts with comprehensive validation
   - Email uniqueness verification
   - Password strength requirements  
   - Complete profile information collection
   - Automatic account creation and confirmation

2. **Login Process**: Multiple authentication options
   - Custom registered accounts
   - Demo credentials for testing
   - Role-based redirect (Admin → Dashboard, User → Menu)

3. **Session Management**: Persistent authentication
   - Login state maintained across browser sessions
   - Secure logout with complete data cleanup
   - Role-based UI element rendering

4. **Admin Access**: Enhanced administrative capabilities
   - Dashboard button visible only to admin users
   - Complete user management interface
   - Order tracking and management tools

## Currency

All prices are displayed in Indian Rupees (₹) for better localization.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Organization

The application follows React best practices:
- **Custom Hooks**: Separate business logic from UI components
- **Component Composition**: Reusable and maintainable components
- **State Management**: Centralized state with custom hooks
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Future Enhancements

- Backend API integration
- Real-time order notifications
- Payment gateway integration
- Advanced analytics and reporting
- Customer order history
- Restaurant management features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request
