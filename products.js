const PRODUCTS = [
  {
    id: "p1",
    name: "Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones",
    category: "electronics",
    price: 348.00,
    originalPrice: 399.99,
    rating: 4.8,
    reviewCount: 14250,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    badge: "Overall Pick",
    inStock: true,
    fastDelivery: true,
    claimed: 78,
    isDeal: true,
    colors: ["Black", "Silver", "Midnight Blue"],
    sizes: ["Standard"],
    description: "Industry-leading noise cancellation optimized to two processors and 8 microphones for unprecedented noise canceling quality and exceptional call quality.",
    features: [
      "Auto NC Optimizer automatically adjusts noise canceling",
      "Magnificent Sound engineered with the new Integrated Processor V1",
      "Up to 30-hour battery life with quick charging (3 min charge for 3 hours of playback)",
      "Ultra-comfortable, lightweight design with soft fit leather"
    ],
    specs: {
      "Brand": "Sony",
      "Connectivity": "Wireless Bluetooth 5.2",
      "Battery Life": "30 Hours",
      "Weight": "250 grams"
    },
    starBreakdown: { 5: 82, 4: 12, 3: 4, 2: 1, 1: 1 },
    reviews: [
      { name: "Alex Mercer", rating: 5, date: "August 2, 2026", title: "Best Noise Canceling Headphones Ever Owned", comment: "The noise cancellation block out plane engine sound completely. Worth every penny." },
      { name: "Sarah K.", rating: 5, date: "July 28, 2026", title: "Incredible sound clarity and comfort", comment: "Super lightweight and battery lasts for days of heavy use." }
    ]
  },
  {
    id: "p2",
    name: "Apple Watch Series 9 GPS 45mm Smartwatch w/ Midnight Aluminum Case",
    category: "wearables",
    price: 399.00,
    originalPrice: 429.00,
    rating: 4.9,
    reviewCount: 8920,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    badge: "Best Seller",
    inStock: true,
    fastDelivery: true,
    claimed: 62,
    isDeal: false,
    colors: ["Midnight", "Starlight", "RED", "Silver"],
    sizes: ["41mm", "45mm"],
    description: "Powerful S9 SiP enables a super-bright display and a magical new way to quickly and easily interact with your Apple Watch without touching the screen.",
    features: [
      "Advanced health sensors for ECG and Blood Oxygen measuring",
      "Double tap gesture control for one-handed operation",
      "Crash Detection and Fall Detection for safety alerts",
      "Water resistant to 50 meters"
    ],
    specs: {
      "Brand": "Apple",
      "Display": "Always-On Retina OLED",
      "Water Resistance": "50m",
      "Processor": "S9 SiP"
    },
    starBreakdown: { 5: 88, 4: 8, 3: 2, 2: 1, 1: 1 },
    reviews: [
      { name: "David Miller", rating: 5, date: "August 5, 2026", title: "Double tap gesture is game changing", comment: "Super handy when holding grocery bags. Battery life is noticeably better." }
    ]
  },
  {
    id: "p3",
    name: "Dell XPS 15 9530 Laptop 15.6\" OLED Touch 4K Intel i9 32GB RAM 1TB SSD RTX 4060",
    category: "computers",
    price: 1899.99,
    originalPrice: 2249.00,
    rating: 4.7,
    reviewCount: 3410,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80",
    badge: "Save 15%",
    inStock: true,
    fastDelivery: true,
    claimed: 85,
    isDeal: true,
    colors: ["Platinum Silver", "Graphite"],
    sizes: ["16GB / 512GB", "32GB / 1TB", "64GB / 2TB"],
    description: "The XPS 15 is the perfect balance of power and portability, delivering stellar visuals and immersive sound for creators and power users.",
    features: [
      "15.6-inch 3.5K OLED touchscreen display with 100% DCI-P3 color gamut",
      "13th Gen Intel Core i9 processor with NVIDIA GeForce RTX 4060 graphics",
      "Machined aluminum chassis with carbon fiber palm rest",
      "Quad-speaker design with Waves Nx 3D audio"
    ],
    specs: {
      "Brand": "Dell",
      "RAM": "32 GB DDR5",
      "Storage": "1 TB PCIe NVMe SSD",
      "Graphics": "NVIDIA RTX 4060"
    },
    starBreakdown: { 5: 79, 4: 15, 3: 4, 2: 1, 1: 1 },
    reviews: [
      { name: "Michael B.", rating: 5, date: "July 15, 2026", title: "Unreal OLED screen for video editing", comment: "Colors pop like nowhere else. Snappy performance with 32GB RAM." }
    ]
  },
  {
    id: "p4",
    name: "Keychron Q1 Pro Wireless Custom Mechanical Keyboard RGB Hot-Swappable",
    category: "computers",
    price: 199.99,
    originalPrice: 219.99,
    rating: 4.8,
    reviewCount: 1890,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
    badge: "Limited Time Deal",
    inStock: true,
    fastDelivery: false,
    claimed: 45,
    isDeal: true,
    colors: ["Carbon Black", "Shell White", "Silver Grey"],
    sizes: ["Red Linear Switch", "Brown Tactile Switch", "Banana Switch"],
    description: "Full aluminum CNC body Q1 Pro with QMK/VIA programmable custom mechanical keys, Bluetooth 5.1 & Type-C wired connectivity.",
    features: [
      "Double-gasket mount design for cushioned acoustic typing feel",
      "South-facing RGB LED lights with customizable lighting modes",
      "Hot-swappable PCB allows switch replacement without soldering",
      "Compatible with macOS, Windows, and Linux"
    ],
    specs: {
      "Brand": "Keychron",
      "Switch Type": "Gateron Jupiter Brown",
      "Layout": "75% Compact",
      "Connectivity": "Bluetooth 5.1 & USB-C"
    },
    starBreakdown: { 5: 85, 4: 10, 3: 3, 2: 1, 1: 1 },
    reviews: [
      { name: "TechEnthusiast", rating: 5, date: "June 20, 2026", title: "Heavy, premium acoustic thock", comment: "The sound out of the box is incredible without needing mods." }
    ]
  },
  {
    id: "p5",
    name: "Canon EOS R6 Mark II Full-Frame Mirrorless Camera Body 4K 60p",
    category: "electronics",
    price: 2299.00,
    originalPrice: 2499.00,
    rating: 4.9,
    reviewCount: 940,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80",
    badge: "Top Rated",
    inStock: true,
    fastDelivery: true,
    claimed: 30,
    isDeal: false,
    colors: ["Matte Black"],
    sizes: ["Body Only", "Body + 24-105mm Lens"],
    description: "Never miss a moment with high-speed continuous shooting up to 40 fps, subject tracking AI, and uncropped 4K 60p video recording.",
    features: [
      "24.2 Megapixel Full-Frame CMOS Sensor",
      "Dual Pixel CMOS AF II with Deep Learning AI algorithm",
      "In-Body Image Stabilizer with up to 8 stops of shake correction",
      "Dual UHS-II SD Memory Card slots"
    ],
    specs: {
      "Brand": "Canon",
      "Sensor": "Full-Frame CMOS",
      "Video Resolution": "4K UHD 60fps",
      "ISO Range": "100-102400"
    },
    starBreakdown: { 5: 90, 4: 7, 3: 2, 2: 1, 1: 0 },
    reviews: [
      { name: "Elena R.", rating: 5, date: "August 1, 2026", title: "Autofocus tracking is magic", comment: "Locks onto eyes effortlessly even in dark environments." }
    ]
  },
  {
    id: "p6",
    name: "Nike Air Max 270 Men's Running Shoes Lightweight Athletic Trainers",
    category: "fashion",
    price: 129.95,
    originalPrice: 160.00,
    rating: 4.6,
    reviewCount: 22100,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    badge: "Best Seller",
    inStock: true,
    fastDelivery: true,
    claimed: 91,
    isDeal: true,
    colors: ["Triple Red", "Black / White", "Pure Platinum"],
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    description: "Nike's first lifestyle Air Max delivers style, comfort and big attitude in the Nike Air Max 270 with extraordinary heel cushioning.",
    features: [
      "Large Max Air unit delivers responsive cushioning",
      "Neoprene stretch bootie structure creates a snug fit",
      "3-piece midsole offers durability and smooth transitions",
      "Breathable mesh upper keeps your feet cool"
    ],
    specs: {
      "Brand": "Nike",
      "Outer Material": "Mesh & Synthetic",
      "Closure": "Lace-Up",
      "Sole": "Rubber Air Cushion"
    },
    starBreakdown: { 5: 75, 4: 16, 3: 5, 2: 2, 1: 2 },
    reviews: [
      { name: "Jason P.", rating: 5, date: "July 10, 2026", title: "Most comfortable everyday sneakers", comment: "Super bouncy heel air unit. Fits true to size." }
    ]
  },
  {
    id: "p7",
    name: "Nespresso VertuoPlus Coffee and Espresso Machine by De'Longhi with Aeroccino",
    category: "home",
    price: 179.00,
    originalPrice: 219.00,
    rating: 4.7,
    reviewCount: 31400,
    image: "https://images.unsplash.com/photo-1517668808822-9ebe02f2a698?w=600&auto=format&fit=crop&q=80",
    badge: "Amazon's Choice",
    inStock: true,
    fastDelivery: true,
    claimed: 55,
    isDeal: false,
    colors: ["Matte Black", "Titanium", "Red"],
    sizes: ["Machine + Frother", "Machine Only"],
    description: "Brew single-serve coffee or espresso at the touch of a button with Centrifusion technology for rich crema formation.",
    features: [
      "Brews 5 cup sizes: Espresso, Double Espresso, Gran Lungo, Coffee, and Alto",
      "Includes Aeroccino3 Milk Frother for cappuccinos and lattes",
      "Fast 20-second heat up time and automatic capsule ejection",
      "Smart barcode reading technology for customized pod brewing"
    ],
    specs: {
      "Brand": "Nespresso",
      "Capacity": "60 oz Water Reservoir",
      "Special Feature": "Centrifusion Extraction",
      "Color": "Matte Black"
    },
    starBreakdown: { 5: 80, 4: 12, 3: 4, 2: 2, 1: 2 },
    reviews: [
      { name: "Claire D.", rating: 5, date: "August 3, 2026", title: "Barista quality coffee at home", comment: "The crema layer is thick and silky every time." }
    ]
  },
  {
    id: "p8",
    name: "Peak Design Everyday Backpack 20L Zip for Camera & Tech Gear",
    category: "fashion",
    price: 219.95,
    originalPrice: 239.95,
    rating: 4.8,
    reviewCount: 4120,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    badge: "Top Rated",
    inStock: true,
    fastDelivery: true,
    claimed: 40,
    isDeal: false,
    colors: ["Black", "Charcoal", "Midnight Blue", "Bone"],
    sizes: ["15L", "20L", "30L"],
    description: "An aesthetically clean, ultra-versatile 20-liter daily backpack engineered for photographers, tech lovers, and urban commuters.",
    features: [
      "UltraZip weather-proof external zipper built to withstand decades of use",
      "FlexFold dividers provide customizable internal organization",
      "Dedicated padded sleeve fits up to 15-inch laptops",
      "100% recycled 400D weatherproof nylon canvas shell"
    ],
    specs: {
      "Brand": "Peak Design",
      "Capacity": "20 Liters",
      "Material": "Weatherproof Nylon",
      "Laptop Sleeve": "Fits up to 15\""
    },
    starBreakdown: { 5: 84, 4: 11, 3: 3, 2: 1, 1: 1 },
    reviews: [
      { name: "Robert T.", rating: 5, date: "June 29, 2026", title: "The ultimate travel bag", comment: "FlexFold dividers make organizing camera body and 3 lenses a breeze." }
    ]
  },
  {
    id: "p9",
    name: "Amazon Echo Studio - High-Fidelity Smart Speaker with Spatial Audio & Alexa",
    category: "home",
    price: 199.99,
    originalPrice: 219.99,
    rating: 4.6,
    reviewCount: 18500,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=600&auto=format&fit=crop&q=80",
    badge: "Amazon Device",
    inStock: true,
    fastDelivery: true,
    claimed: 70,
    isDeal: true,
    colors: ["Charcoal", "Glacier White"],
    sizes: ["Single Unit", "2-Pack Stereo Pair"],
    description: "5 speakers produce powerful bass, dynamic midrange, and crisp highs. Dolby Atmos technology adds space, clarity, and depth.",
    features: [
      "Spatial audio processing engine creates an immersive sound stage",
      "Built-in Smart Home Hub allows voice control of Zigbee compatible devices",
      "Automatically senses room acoustics and fine-tunes playback",
      "Voice control music streaming from Amazon Music, Apple Music, Spotify"
    ],
    specs: {
      "Brand": "Amazon",
      "Audio Format": "Dolby Atmos, 3D Audio",
      "Voice Assistant": "Alexa Built-in",
      "Weight": "7.7 lbs"
    },
    starBreakdown: { 5: 76, 4: 14, 3: 5, 2: 3, 1: 2 },
    reviews: [
      { name: "Samantha L.", rating: 5, date: "July 24, 2026", title: "Fills the living room with punchy bass", comment: "3D Spatial audio sounds like a high-end soundbar setup." }
    ]
  },
  {
    id: "p10",
    name: "Ray-Ban Classic Wayfarer Polarized Sunglasses UV Protection",
    category: "fashion",
    price: 163.00,
    originalPrice: 185.00,
    rating: 4.7,
    reviewCount: 16800,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80",
    badge: "Trending",
    inStock: true,
    fastDelivery: true,
    claimed: 50,
    isDeal: false,
    colors: ["Black Frame / G-15 Lens", "Tortoise Frame / Brown Lens"],
    sizes: ["50mm Standard", "54mm Large"],
    description: "Iconic Ray-Ban Original Wayfarer RB2140 sunglasses crafted with durable acetate frame and high-quality polarized G-15 glass lenses.",
    features: [
      "100% UV400 Protection coating blocks 100% of harmful UVA & UVB rays",
      "Polarized lenses eliminate glare and reduce eye strain",
      "Handcrafted in Italy with premium acetate construction",
      "Includes protective leather case and cleaning cloth"
    ],
    specs: {
      "Brand": "Ray-Ban",
      "Frame Material": "Acetate",
      "Lens Material": "Polarized Glass",
      "Frame Color": "Black"
    },
    starBreakdown: { 5: 78, 4: 14, 3: 5, 2: 2, 1: 1 },
    reviews: [
      { name: "Daniel K.", rating: 5, date: "August 6, 2026", title: "Timeless classic", comment: "Solid acetate weight and super crisp polarized view when driving." }
    ]
  },
  {
    id: "p11",
    name: "Anker Prime 20,000mAh Power Bank 200W Output w/ Smart Digital Display",
    category: "electronics",
    price: 129.99,
    originalPrice: 149.99,
    rating: 4.9,
    reviewCount: 5430,
    image: "https://images.unsplash.com/photo-1609592424074-9c026e6ef1e6?w=600&auto=format&fit=crop&q=80",
    badge: "Overall Pick",
    inStock: true,
    fastDelivery: true,
    claimed: 82,
    isDeal: true,
    colors: ["Matte Anodized Gray"],
    sizes: ["20,000mAh 200W", "27,650mAh 250W"],
    description: "Charge 2 laptops at high speed simultaneously with 200W total output and keep track of real-time power metrics on the intuitive LCD display.",
    features: [
      "200W total output with dual USB-C ports providing up to 100W each",
      "Recharges 7x faster than standard portable chargers",
      "Smart digital display shows remaining battery, input/output wattage",
      "Compact size with airline safety approval"
    ],
    specs: {
      "Brand": "Anker",
      "Capacity": "20,000 mAh",
      "Total Wattage": "200W Max",
      "Ports": "2x USB-C, 1x USB-A"
    },
    starBreakdown: { 5: 91, 4: 6, 3: 2, 2: 1, 1: 0 },
    reviews: [
      { name: "TechExplorer", rating: 5, date: "July 30, 2026", title: "Charges my MacBook Pro at full 100W speed", comment: "The LCD display showing wattage intake and output is awesome." }
    ]
  },
  {
    id: "p12",
    name: "Philips Hue Smart LED Starter Kit Color Ambiance (4 Bulbs + Bridge)",
    category: "home",
    price: 179.99,
    originalPrice: 199.99,
    rating: 4.7,
    reviewCount: 11200,
    image: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=600&auto=format&fit=crop&q=80",
    badge: "Save 10%",
    inStock: true,
    fastDelivery: true,
    claimed: 60,
    isDeal: false,
    colors: ["White & Color Ambiance"],
    sizes: ["E26 Standard Base"],
    description: "Transform your home lighting with 16 million colors and shades of white light. Sync lights with movies, music, and gaming.",
    features: [
      "Voice control via Alexa, Google Assistant, and Apple HomeKit",
      "Hue Bridge unlocks automations, timers, and out-of-home control",
      "Energy efficient LED technology lasting up to 25,000 hours",
      "Instant wireless dimming and light scenes setup"
    ],
    specs: {
      "Brand": "Philips Hue",
      "Bulb Count": "4 Smart A19 LED Bulbs",
      "Hub Included": "Hue Bridge V2",
      "Color Output": "16 Million Colors"
    },
    starBreakdown: { 5: 81, 4: 12, 3: 4, 2: 2, 1: 1 },
    reviews: [
      { name: "Jordan W.", rating: 5, date: "August 4, 2026", title: "Atmosphere in the living room is next level", comment: "Syncing with movies during sports matches creates an incredible mood." }
    ]
  }
];

const CURRENCIES = {
  USD: { symbol: "$", rate: 1.0 },
  EUR: { symbol: "€", rate: 0.92 },
  GBP: { symbol: "£", rate: 0.79 },
  INR: { symbol: "₹", rate: 83.50 },
  CAD: { symbol: "CA$", rate: 1.36 }
};

const HERO_SLIDES = [
  {
    title: "Upgrade Your Tech Setup",
    subtitle: "Save up to 40% on top audio, laptops, and wearables with free Prime shipping",
    badge: "Featured Tech Deals",
    bgGradient: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    btnText: "Shop Tech Deals",
    categoryFilter: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80"
  },
  {
    title: "Summer Fashion Collection",
    subtitle: "Discover fresh streetwear, activewear, and classic accessories",
    badge: "Trending Styles",
    bgGradient: "linear-gradient(135deg, #16222a, #3a6073)",
    btnText: "Explore Fashion",
    categoryFilter: "fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&auto=format&fit=crop&q=80"
  },
  {
    title: "Smart Living & Home Innovation",
    subtitle: "Transform your daily routine with automated home tech & premium appliances",
    badge: "Home Electronics",
    bgGradient: "linear-gradient(135deg, #1e3c72, #2a5298)",
    btnText: "Shop Home Tech",
    categoryFilter: "home",
    image: "https://images.unsplash.com/photo-1517668808822-9ebe02f2a698?w=1000&auto=format&fit=crop&q=80"
  }
];
