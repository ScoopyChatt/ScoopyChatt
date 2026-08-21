// Good / Better / Best lineup - see project notes for the pricing math behind these numbers.
export const TIERS = [
  {
    key: 'good',
    name: 'GOOD',
    tagline: 'Reliable and affordable',
    price: 529,
    sizeNote: 'XL/XXL dogs: $669 total, confirmed when we measure',
    product: 'Endura Flap door-mount pet door',
    features: [
      'Soft flap with a weatherproof magnetic seal',
      'Manufacturer warranty on the door itself',
      'Professionally measured and installed for your dog',
      'Great fit for one or two smaller dogs',
    ],
  },
  {
    key: 'better',
    name: 'BETTER',
    tagline: 'Our most-installed option',
    price: 699,
    product: 'Ideal Pet Products Deluxe rigid aluminum-frame door',
    features: [
      'Rigid aluminum frame with a lockable slide-in panel',
      'Better security than a soft flap alone',
      'Manufacturer warranty on the door itself',
      'Professionally measured and installed for your dog',
    ],
    popular: true,
  },
  {
    key: 'best',
    name: 'BEST',
    tagline: 'Smart, app-controlled access',
    price: 749,
    product: 'PetSafe SmartDoor, app-controlled',
    features: [
      'Lock and unlock access from your phone',
      'Set a schedule for when your dog can go out',
      'Get a text alert every time your dog uses it',
      'Professionally measured, installed, and paired with your WiFi',
    ],
  },
];
