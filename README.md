# Tour Management System - Frontend

A modern, responsive **React + TypeScript** frontend for a **Full-Stack Tour Booking & Management System**. Provides feature-rich dashboards for Super Admins, Admins, and Users with real-time state management, secure payment integration, and intuitive UI.

> **Built with:** React 19 • TypeScript • Redux Toolkit • React Router • TailwindCSS • Shadcn UI

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Setup & Installation](#setup--installation)
- [Project Structure](#project-structure)
- [Pages & Features](#pages--features)
- [Components Overview](#components-overview)
- [State Management](#state-management)
- [Routing](#routing)
- [Authentication](#authentication)
- [Styling & Theme](#styling--theme)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Project Overview

**Tour Management System Frontend** is a production-ready React application that provides:

- 🏠 **User Experience**: Browse tours, view details, book and pay securely
- 🛡️ **Admin Dashboards**: Manage tours, pricing, destinations, and analytics
- 📱 **Responsive Design**: Seamless experience across all devices
- 🎨 **Modern UI**: Built with Shadcn UI and Tailwind CSS
- 🔐 **Secure Authentication**: Token-based auth with refresh mechanism
- 💾 **Smart Caching**: Redux RTK Query for efficient API calls
- 🌓 **Dark Mode**: Full theme support (light/dark/system)

---

## ✨ Features

### 👥 User Features

- **Tour Discovery**:
  - Browse all available tours with filters
  - View detailed tour information (itinerary, amenities, pricing)
  - Search and filter by division/destination
  - Featured tours carousel on homepage
- **Booking Management**:
  - Easy tour booking interface
  - Guest count selector with validation
  - Real-time cost calculation
  - View booking history and status
- **Payment Integration**:
  - Secure SSLCommerz payment gateway
  - Payment success/failure handling
  - Transaction confirmation
- **Profile Management**:
  - View and update user profile
  - Change password
  - Account settings
- **Authentication**:
  - Email/password login
  - User registration
  - OTP-based email verification
  - Session management

### 👨‍💼 Admin Features

- **Tour Management**:
  - Create, edit, delete tours
  - Multiple image uploads (Cloudinary)
  - Set pricing, duration, guest limits
  - Define amenities, itinerary, and tour plan
- **Tour Type Management**:
  - Create and organize tour categories
  - Delete tour types
- **Division Management**:
  - Create geographic divisions/destinations
  - Organize tours by location
- **Analytics Dashboard**:
  - View user metrics
  - Monitor tour bookings
  - Track payment statistics
  - Revenue insights (placeholder for expansion)

### 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach, works on all screen sizes
- **Theme Switching**: Toggle between light/dark/system themes
- **Dark Mode**: Full dark mode support
- **Loading States**: Skeleton loaders for better UX
- **Toast Notifications**: User feedback via sonner
- **Modal Dialogs**: Smooth inline operations
- **Image Galleries**: Tour image carousels and grids
- **Form Validation**: Real-time form validation with error messages

### 🔐 Security Features

- **Token-Based Authentication**: JWT access and refresh tokens
- **Protected Routes**: Role-based access control
- **Secure API Calls**: Axios interceptors for token management
- **Session Management**: Automatic logout on token expiration
- **Input Validation**: Zod schemas for data validation

---

## 🛠️ Tech Stack

### Frontend Framework

- **React 19.1.1** - Modern UI library with latest hooks
- **TypeScript ~5.8.3** - Type-safe JavaScript
- **React Router 7.8.2** - Client-side routing and navigation
- **Vite 7.1.2** - Lightning-fast build tool
- **@vitejs/plugin-react** - React support in Vite

### State Management

- **Redux Toolkit 2.8.2** - Simplified Redux setup
- **Redux RTK Query** - Server state management and caching
- **axios 1.11.0** - HTTP client with interceptors

### Styling & UI

- **TailwindCSS 4.1.12** - Utility-first CSS framework
- **Radix UI** - Unstyled accessible components
- **shadcn/ui** - Copy-paste React component library
- **lucide-react** - Icon library
- **next-themes** - Dark mode support
- **class-variance-authority** - Component variants
- **clsx & tailwind-merge** - CSS class utilities

### Forms & Validation

- **react-hook-form 7.62.0** - Efficient form state management
- **@hookform/resolvers** - Validation schema integration
- **Zod 4.1.5** - TypeScript-first schema validation

### Utilities

- **date-fns 4.1.0** - Modern date utility library
- **Embla Carousel** - Carousel library with autoplay
- **react-to-pdf** - PDF export functionality
- **sonner** - Beautiful toast notifications
- **cmdk** - Command menu component

### Development Tools

- **ESLint** - Code quality and style linting
- **TypeScript ESLint** - Type-aware linting

---

## 🏗️ Architecture

### Component Structure

```
Presentational Components (UI primitives)
  ↓
Smart Components (with Redux/API hooks)
  ↓
Page Components (route handlers)
  ↓
Layout Wrappers (CommonLayout, DashboardLayout)
  ↓
Root App (Router + Providers)
```

### Data Flow (Redux RTK Query)

```
Page Component
  ↓
useGetToursQuery(params) ← RTK Query hook
  ↓
baseApi with axios interceptors
  ↓
Backend API
  ↓
Response → Cache → Component → UI
```

### Authentication Flow

```
App Boots
  ↓
AuthProvider loads
  ↓
useUserInfoQuery() called
  ↓
If user exists → isAuthenticated = true
  ↓
withAuth HOC protects routes
  ↓
If not authenticated → redirect to /login
If authenticated + role check → show page
```

---

## 📦 Setup & Installation

### Prerequisites

- **Node.js** v18+ (with npm or pnpm)
- **Backend API** running on `http://localhost:5000`
- **Git** for version control

### 1. Clone the Repository

```bash
git clone <repository-url>
cd frontend-tour/tour-management-system-client
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the project root:

```env
# Backend API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# Frontend URLs
VITE_FRONTEND_URL=http://localhost:5173
```

### 4. Start Development Server

```bash
pnpm run dev
```

The app will open at `http://localhost:5173`

### 5. Build for Production

```bash
pnpm run build
```

---

## 📂 Project Structure

```
tour-management-system-client/
├── src/
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # Application entry point
│   ├── index.css                  # Global styles
│   ├── vite-env.d.ts             # Vite type definitions
│   ├── components/
│   │   ├── app-sidebar.tsx        # Sidebar component (routes)
│   │   ├── DeleteConfirmation.tsx # Delete confirmation modal
│   │   ├── MultipleImageUploader.tsx
│   │   ├── SingleImageUploader.tsx
│   │   ├── layout/
│   │   │   ├── CommonLayout.tsx   # Public pages layout (Navbar + Content + Footer)
│   │   │   ├── DashboardLayout.tsx # Admin/User dashboards (Sidebar + Content)
│   │   │   ├── Navbar.tsx         # Top navigation bar
│   │   │   └── Footer.tsx         # Footer component
│   │   ├── modules/
│   │   │   ├── Admin/             # Admin-specific components
│   │   │   │   ├── Analytics/     # Dashboard metrics
│   │   │   │   ├── Tour/          # Tour management UI
│   │   │   │   ├── TourType/      # Tour type management
│   │   │   │   └── Division/      # Division management
│   │   │   ├── User/              # User-specific components
│   │   │   │   ├── Profile/       # User profile
│   │   │   │   ├── MyBookings/    # Booking history
│   │   │   │   └── Tours/         # Tour browsing
│   │   │   ├── Authentication/    # Auth pages/forms
│   │   │   ├── Home/              # Homepage components
│   │   │   └── Navbar/            # Navigation components
│   │   ├── skeletons/             # Loading skeleton placeholders
│   │   └── ui/                    # Radix UI wrapped components
│   ├── pages/
│   │   ├── User/
│   │   │   ├── HomePage.tsx       # Landing page
│   │   │   ├── Tours.tsx          # All tours list
│   │   │   ├── TourDetails.tsx    # Single tour details
│   │   │   ├── Bookings.tsx       # Booking form
│   │   │   ├── MyBookings.tsx     # User's bookings
│   │   │   ├── Profile.tsx        # User profile
│   │   │   └── AboutUs.tsx        # About page
│   │   ├── Admin/
│   │   │   ├── Analytics.tsx      # Dashboard
│   │   │   ├── Tours.tsx          # Tour CRUD
│   │   │   ├── TourTypes.tsx      # Type management
│   │   │   └── Divisions.tsx      # Division management
│   │   ├── Authentication/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── Verify.tsx         # OTP verification
│   │   ├── Payment/
│   │   │   ├── Success.tsx        # Payment confirmation
│   │   │   └── Failure.tsx        # Payment error
│   │   ├── Unauthorized.tsx       # 403 page
│   │   └── NotFound.tsx           # 404 page
│   ├── redux/
│   │   ├── store.ts               # Redux store configuration
│   │   ├── hook.ts                # useAppDispatch, useAppSelector
│   │   ├── baseApi.ts             # RTK Query API setup
│   │   ├── axiosBaseQuery.ts      # Axios integration
│   │   └── features/
│   │       ├── auth/
│   │       │   └── auth.api.ts    # Auth endpoints
│   │       ├── tour/
│   │       │   └── tour.api.ts    # Tour endpoints
│   │       ├── booking/
│   │       │   └── booking.api.ts # Booking endpoints
│   │       └── division/
│   │           └── division.api.ts # Division endpoints
│   ├── routes/
│   │   ├── index.tsx              # Main router configuration
│   │   ├── adminSidebarItems.ts   # Admin dashboard navigation
│   │   ├── userSidebarItems.ts    # User dashboard navigation
│   │   └── publicRoutes.ts        # Public route items
│   ├── context/
│   │   ├── auth.context.tsx       # Authentication context & hook
│   │   └── theme.context.ts       # Theme context
│   ├── providers/
│   │   └── theme.provider.tsx     # Theme provider wrapper
│   ├── lib/
│   │   ├── axios.ts               # Axios instance with interceptors
│   │   └── utils.ts               # Utility functions
│   ├── utils/
│   │   ├── withAuth.tsx           # Route protection HOC
│   │   ├── generateRoutes.ts      # Dynamic route generation
│   │   └── helpers.ts
│   ├── hooks/
│   │   ├── use-file-upload.ts     # File upload hook
│   │   ├── use-mobile.ts          # Mobile detection
│   │   └── useTheme.ts            # Theme hook
│   ├── types/
│   │   ├── index.ts               # Common types
│   │   ├── auth.type.ts           # Auth types
│   │   ├── booking.type.ts        # Booking types
│   │   └── tour.type.ts           # Tour types
│   ├── constants/
│   │   └── role.ts                # Role definitions
│   ├── config/
│   │   └── index.ts               # Configuration
│   └── assets/
│       └── icons/                 # SVG and icon assets
├── public/                        # Static assets
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.app.json             # App-specific TS config
├── tsconfig.node.json            # Node-specific TS config
├── eslint.config.js              # ESLint configuration
├── components.json               # Shadcn UI components config
├── tailwind.config.js            # Tailwind CSS configuration
├── index.html                    # HTML entry point
├── package.json
├── pnpm-lock.yaml
└── README.md
```

---

## 📄 Pages & Features

### Public Pages (No Auth Required)

#### 1. **HomePage** (`/`)

- Featured tours carousel
- Top destinations grid
- Tour search/filter
- "View All Tours" CTA

#### 2. **Unauthorized** (`/unauthorized`)

- Access denied message
- Navigation back to home

#### 3. **AboutUs** (`/about`)

- Company information
- Mission statement

### Authentication Pages

#### 1. **Login** (`/login`)

- Email/password form
- Validation & error messages
- Forgot password link
- Register link
- Loading state

#### 2. **Register** (`/register`)

- User registration form
- Name, email, password fields
- Form validation
- Login link
- Success → verify OTP

#### 3. **Verify** (`/verify`)

- OTP verification form
- Email display
- OTP input field
- Resend OTP option
- Success → redirect to dashboard

### User Pages (Auth Required, Role: USER)

#### 1. **Tours** (`/tours`)

- List all available tours
- Filters: division, price, search
- Tour cards with: image, title, location, price, guests
- "View Details" link
- Pagination

#### 2. **Tour Details** (`/tours/:slug`)

- Full tour information:
  - Image gallery
  - Title, description, location
  - Price, duration, guest limits
  - Amenities, included/excluded items
  - Detailed tour plan
  - Start/end dates
  - Departure location
- "Book Now" button → `/booking/:slug`

#### 3. **Bookings** (`/booking/:slug`)

- Tour summary (image, title, price)
- Guest count selector (min: 1, max: tour max)
- Real-time total cost calculation
- "Confirm Booking" button
- Loading state during booking
- Redirects to payment on success

#### 4. **My Bookings** (`/user/my-bookings`)

- Booking history table/list
- Display: tour name, date, status, cost
- Filter by status
- View details option

#### 5. **Profile** (`/user/profile`)

- User information display
- Name, email, phone
- Edit profile form
- Change password section
- Success/error notifications

### Admin Pages (Auth Required, Role: SUPER_ADMIN)

#### 1. **Analytics Dashboard** (`/admin/analytics`)

- Key metrics cards:
  - Total users
  - Total tours
  - Total bookings
  - Revenue
- Charts (placeholder for future enhancement)
- Time-based filters

#### 2. **Tour Management** (`/admin/tours`)

- Tour list/table view
- Create tour button → modal
- Edit tour → modal with form
- Delete tour → confirmation
- Table columns: title, location, price, status, actions
- **Add/Edit Tour Modal**:
  - Tour title, description
  - Multiple image uploads
  - Tour type & division selectors
  - Pricing, duration
  - Guest limits, age restrictions
  - Amenities, included/excluded items
  - Tour plan details
  - Save/Cancel buttons

#### 3. **Tour Types** (`/admin/tour-types`)

- List all tour types
- Create tour type → modal
- Delete tour type → confirmation
- Simple table: type name, actions

#### 4. **Divisions** (`/admin/divisions`)

- List all divisions
- Create division → modal
- Delete division → confirmation
- Table: division name, slug, actions

### Payment Pages

#### 1. **Payment Success** (`/payment/success`)

- Transaction details display
- Transaction ID, amount, status
- Booking confirmation
- Print/PDF option
- "View Bookings" link

#### 2. **Payment Failure** (`/payment/fail`)

- Failure message
- Error details
- "Retry Booking" link
- Support contact info

---

## 🧩 Components Overview

### Layout Components

| Component         | Purpose              | Props    |
| ----------------- | -------------------- | -------- |
| `CommonLayout`    | Public pages wrapper | children |
| `DashboardLayout` | Admin/User dashboard | children |
| `Navbar`          | Top navigation       | -        |
| `Footer`          | Site footer          | -        |
| `AppSidebar`      | Sidebar with routes  | -        |

### UI Components (Shadcn/Radix)

- **Button** - CTA buttons
- **Card** - Content containers
- **Dialog/Modal** - Forms and confirmations
- **Input** - Text input fields
- **Select** - Dropdown selectors
- **Label** - Form labels
- **Badge** - Status badges
- **Separator** - Dividers
- **Avatar** - User avatars
- **Tooltip** - Helper tooltips
- **Popover** - Floating panels
- **Dropdown Menu** - Context menus

### Form Components

- **react-hook-form** integration
- **Input fields** with validation
- **Select/Combo boxes**
- **Date pickers**
- **File input** with preview
- **Checkbox/Radio** options
- **Textarea** for descriptions
- **Error messages** display

### Module Components

| Module              | Components                                       |
| ------------------- | ------------------------------------------------ |
| **Admin Tour**      | AddTourModal, TourTable, TourCard                |
| **Admin TourType**  | AddTourTypeModal, TypeList                       |
| **Admin Division**  | AddDivisionModal, DivisionList                   |
| **Admin Analytics** | MetricsCard, ChartPlaceholder                    |
| **User Tours**      | TourCard, TourFilters, TourGallery               |
| **User Bookings**   | BookingForm, BookingCard, BookingTable           |
| **Authentication**  | LoginForm, RegisterForm, OTPForm                 |
| **Home**            | FeaturedTours, DestinationGrid, HerobannerBanner |

### Special Components

| Component               | Purpose                 |
| ----------------------- | ----------------------- |
| `DeleteConfirmation`    | Confirm deletion modal  |
| `SingleImageUploader`   | Single image upload     |
| `MultipleImageUploader` | Multiple image uploads  |
| `ImageGallery`          | Image carousel          |
| `LoadingSkeleton`       | Content placeholder     |
| `EmptyState`            | No data message         |
| `ErrorBoundary`         | Error handling (future) |

---

## 🔄 State Management (Redux & RTK Query)

### Store Structure

```typescript
store
  └── baseApi (RTK Query)
      ├── auth endpoints
      │   ├── register
      │   ├── login
      │   ├── logout
      │   ├── sendOTP
      │   ├── verifyOTP
      │   ├── userInfo (query)
      │   └── updateUser
      ├── tour endpoints
      │   ├── getTours
      │   ├── getSingleTour
      │   ├── getTourTypes
      │   ├── createTour
      │   ├── createTourType
      │   ├── deleteTour
      │   └── deleteTourType
      ├── booking endpoints
      │   ├── createBooking
      │   └── getMyBookings
      └── division endpoints
          ├── getDivisions
          ├── createDivision
          └── deleteDivision
```

### Cache Invalidation

```typescript
// Tag-based invalidation
Tags: ["USER", "TOUR", "TOUR_TYPE", "DIVISION", "BOOKING"];

// Example: Creating a tour invalidates TOUR cache
invalidatesTags: ["TOUR"];
```

### Usage Examples

```typescript
// Read hooks
const { data: tours, isLoading } = useGetToursQuery(params);
const { data: user } = useUserInfoQuery();

// Write hooks
const [createTour] = useCreateTourMutation();
const [login] = useLoginMutation();

// Error handling built-in
// Loading state built-in
// Caching automatic
```

---

## 🛣️ Routing

### Route Structure

```
/ (CommonLayout)
├── / → HomePage
├── /tours → Tours
├── /tours/:slug → TourDetails
├── /booking/:slug → Bookings
├── /about → AboutUs
├── /login → Login
├── /register → Register
├── /verify → Verify OTP
├── /unauthorized → Unauthorized
├── /payment
│   ├── /success → Success
│   └── /fail → Failure
├── /admin (withAuth, SUPER_ADMIN role)
│   └── DashboardLayout
│       ├── /analytics → Analytics
│       ├── /tour-types → TourTypes
│       ├── /tours → Tours CRUD
│       └── /divisions → Divisions
└── /user (withAuth, USER role)
    └── DashboardLayout
        ├── /profile → Profile
        └── /my-bookings → MyBookings
```

### Protection Mechanisms

**`withAuth` HOC:**

```typescript
withAuth(Component, requiredRole?)

// Checks:
- Is user authenticated?
- Is user role sufficient?
- If loading → show spinner
- If not auth → redirect /login
- If insufficient role → redirect /unauthorized
```

**Layout Components:**

```typescript
<Route element={withAuth(DashboardLayout, role.superAdmin)}>
  {/* Protected admin routes */}
</Route>
```

---

## 🔐 Authentication

### Features

- **Multi-Step Auth**: Register → OTP Verify → Login
- **Token Management**: Access & Refresh tokens
- **Auto Refresh**: Axios interceptors handle token refresh
- **Session Persistence**: User data cached
- **Logout**: Clears tokens and user data

### Auth Context

```typescript
useAuth() {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  logout: () => void
}
```

### Protected Routes Example

```typescript
// Component needs authentication
export default withAuth(MyComponent);

// Component needs specific role
export default withAuth(AdminComponent, role.superAdmin);
```

### Token Refresh Flow

```
API Request with AccessToken
  ↓
If 401 (Unauthorized)
  ↓
Use RefreshToken to get new AccessToken
  ↓
Retry original request
  ↓
If refresh fails → Logout & redirect /login
```

---

## 🎨 Styling & Theme

### TailwindCSS

- **Utility-first** CSS approach
- **Responsive** design (mobile → desktop)
- **Dark mode** support with `dark:` prefix
- **Custom config** in `tailwind.config.js`

### Theme System

**Providers:**

- `ThemeProvider` - Wraps app in `main.tsx`
- Supports: `light`, `dark`, `system`

**Usage:**

```typescript
const { setTheme } = useTheme();

// Switch theme
setTheme("dark"); // Dark mode
setTheme("light"); // Light mode
setTheme("system"); // Follow system preference
```

**Component Styling:**

```jsx
// Light mode (default)
<Button className="bg-white text-black">

// Dark mode style
<Button className="dark:bg-gray-900 dark:text-white">
```

### Design Token System

```
Colors     → Semantic naming (primary, secondary, muted)
Typography → Heading, body, caption sizes
Spacing    → Consistent margins/padding (Tailwind scale)
Shadows    → Depth and hierarchy
Borders    → Radius and width utilities
```

---

## ⚙️ Environment Variables

Create `.env` file:

```env
# Backend API
VITE_API_BASE_URL=http://localhost:5000/api

# Frontend URL
VITE_FRONTEND_URL=http://localhost:5173

# Optional: Cloudinary (for direct uploads)
# VITE_CLOUDINARY_NAME=your_cloudinary_name
# VITE_CLOUDINARY_PRESET=your_upload_preset
```

---

## 🚀 Running the Application

### Development

```bash
pnpm run dev
```

- Opens `http://localhost:5173`
- Hot module replacement enabled
- Debug tools available

### Production Build

```bash
pnpm run build
```

Creates optimized build in `dist/` folder.

### Preview Build

```bash
pnpm run preview
```

Test production build locally.

### Linting

```bash
pnpm run lint
pnpm run lint:fix
```

---

## 👨‍💻 Development

### Project Scripts

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint . --ext ts,tsx",
  "lint:fix": "eslint . --ext ts,tsx --fix",
  "preview": "vite preview"
}
```

### Code Organization

**Importing:**

```typescript
// ✅ Organized imports
import { Button } from "@/components/ui/button";
import { useGetToursQuery } from "@/redux/features/tour/tour.api";
import { ITour } from "@/types/tour.type";
import { cn } from "@/lib/utils";

// ❌ Avoid scattered imports
import Button from "./components/ui/button";
```

**Component Structure:**

```typescript
// Functional component with typed props
interface ComponentProps {
  title: string
  onAction?: () => void
}

export const Component: React.FC<ComponentProps> = ({
  title,
  onAction
}) => {
  return <div>{title}</div>
}
```

### Best Practices

1. **Type Safety**: Define interfaces for all props and data
2. **Component Reusability**: Extract reusable logic
3. **Custom Hooks**: Create hooks for complex state
4. **Memoization**: Use `React.memo` for heavy components
5. **Error Boundaries**: Wrap routes with error handling (future)
6. **Code Splitting**: Use lazy imports for routes
7. **Accessibility**: Semantic HTML, ARIA labels
8. **Performance**: Optimize re-renders, lazy load images

### Adding New Features

**1. Create Redux Slice:**

```typescript
// features/newFeature/newFeature.api.ts
export const newFeatureApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => "/endpoint",
    }),
  }),
});

export const { useGetItemsQuery } = newFeatureApi;
```

**2. Create Page Component:**

```typescript
// pages/NewPage.tsx
export const NewPage = () => {
  const { data, isLoading } = useGetItemsQuery()

  return <div>{/* Render */}</div>
}
```

**3. Add Route:**

```typescript
// routes/index.tsx
{
  path: '/new-page',
  element: <NewPage />,
  errorElement: <NotFound />
}
```

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m "Add amazing feature"`
4. **Push** branch: `git push origin feature/amazing-feature`
5. **Submit** Pull Request

### Guidelines

- Follow existing code style
- Update documentation
- Test before submitting
- Write clear commit messages
- Ensure ESLint passes

---

## 📝 License

This project is licensed under the **MIT License** - see LICENSE for details.

---

## 📞 Support

For issues or questions:

- Create [GitHub Issue](https://github.com/yourusername/frontend-tour/issues)
- Contact: your.email@example.com

---

**Built with ❤️ using React & TypeScript**
