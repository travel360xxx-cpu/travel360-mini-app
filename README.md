# 360° Travel

A minimalist travel application built with React, TypeScript, and Next.js that provides quick access to travel services worldwide.

## 🚀 Features

- **Hotel Search**: Direct link to Booking.com for hotel bookings
- **Flight Search**: Direct link to Kayak for flight comparisons
- **Car Rental**: Direct link to RentalCars.com for vehicle rentals
- **Contact Support**: Direct link to Telegram support channel
- **Rules & FAQ**: Access to travel policies and frequently asked questions

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **UI Components**: Custom components with shadcn/ui patterns
- **Deployment**: Ready for Vercel deployment

## 🎨 Design

- **Primary Background**: Sky blue (#e0f7fa)
- **Accent Color**: Marine blue (#0077b6)
- **Typography**: Clean, readable fonts with proper hierarchy
- **Responsive**: Mobile-first design with desktop optimization
- **Accessibility**: Proper contrast ratios and semantic HTML

## 📱 Responsive Design

- **Mobile**: Single column layout with optimized touch targets
- **Tablet**: Two-column grid for better space utilization
- **Desktop**: Three-column grid with full-width FAQ section

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd travel360
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

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── button.tsx       # Button component
│   │   └── card.tsx         # Card components
│   └── TravelServiceCard.tsx # Travel service card component
└── lib/
    └── utils.ts             # Utility functions
```

## 🔗 External Services

- **Hotels**: [Booking.com](https://www.booking.com)
- **Flights**: [Kayak](https://www.kayak.com)
- **Car Rental**: [RentalCars.com](https://www.rentalcars.com)
- **Support**: [Telegram Channel](https://t.me/travel360net)
- **FAQ**: [Telegraph Page](https://telegra.ph/360Travel-Rules-and-FAQ-08-01)

## 🎯 Future Enhancements

- [ ] Search filters (countries, dates, etc.)
- [ ] Google authentication integration
- [ ] Internal Telegram bot support
- [ ] Travel booking history
- [ ] Price comparison features
- [ ] Multi-language support

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support and questions, please contact us via [Telegram](https://t.me/travel360net).
# Updated Fri Aug  1 14:16:49 EDT 2025
