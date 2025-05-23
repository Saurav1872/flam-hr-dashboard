# HR Dashboard

A modern HR dashboard built with Next.js, Tailwind CSS, and TypeScript for tracking employee performance and managing bookmarks.

## Features

- 📊 Employee performance tracking with star ratings
- 🔍 Search and filter employees by name, email, or department
- 📌 Bookmark favorite employees
- 📈 Analytics dashboard with department performance and bookmark trends
- 📱 Responsive design for mobile and desktop
- 🌙 Dark/Light mode support
- ⚡ Fast page loads with Next.js App Router

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Charts:** Chart.js
- **Icons:** Heroicons
- **Animations:** Framer Motion

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd hr-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── analytics/         # Analytics dashboard
│   ├── bookmarks/         # Bookmarked employees
│   ├── employee/          # Employee details
│   └── page.tsx           # Main dashboard
├── components/            # Reusable components
├── hooks/                 # Custom hooks
├── store/                 # Zustand store
└── lib/                   # Utility functions
```

## Features in Detail

### Dashboard
- View all employees with their performance ratings
- Search and filter functionality
- Quick actions: View details, Bookmark, Promote

### Employee Details
- Comprehensive employee profile
- Performance history
- Projects and feedback tabs
- Bookmark management

### Bookmarks
- List of bookmarked employees
- Quick access to employee details
- Remove from bookmarks

### Analytics
- Department-wise performance charts
- Bookmark trends
- Key metrics summary

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 