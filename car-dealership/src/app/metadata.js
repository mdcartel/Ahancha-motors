export const metadata = {
    title: 'Ahancha Motors Dealership | Find Your Dream Car',
    description: 'Discover your perfect vehicle at our dealership. Browse our extensive inventory of new, used, and certified pre-owned cars, trucks, and SUVs. Get the best deals and financing options available.',
    metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'),
    // Dynamic metadata for different pages
    dynamic: {
        title: (pageTitle) => `${pageTitle} | Ahancha Motors Dealership`,
        description: (pageDescription) => `${pageDescription} - Your Trusted Car Dealer`,
    },

  }
