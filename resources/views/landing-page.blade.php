<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Revolutionize your business with our powerful ERP system">
  <title>ERP System Landing Page</title>
  
  <!-- TailwindCSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Framer Motion & AOS (Animate on Scroll) for Animations -->
  <script src="https://cdn.jsdelivr.net/npm/framer-motion@4.1.17/dist/framer-motion.umd.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" rel="stylesheet">

  <!-- Slick Slider -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"/>

  <!-- Custom Styling -->
  <style>
    .bg-pattern {
      background: url('https://source.unsplash.com/1600x900/?technology') center/cover no-repeat;
    }
  </style>
</head>
<body class="font-sans antialiased text-gray-900">
  <!-- Header -->
  <header class="w-full bg-indigo-600 py-6 shadow-lg">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-3xl text-white font-bold">ERP Solution</h1>
      <nav class="space-x-6">
        <a href="#features" class="text-white hover:text-gray-300">Features</a>
        <a href="#pricing" class="text-white hover:text-gray-300">Pricing</a>
        <a href="#testimonials" class="text-white hover:text-gray-300">Testimonials</a>
        <a href="#cta" class="text-white hover:text-gray-300">Get Started</a>
        <a href="register" class="text-white hover:text-gray-300 bg-blue-500 p-2 rounded-lg hover">Create Account</a>
        <a href="login" class="text-white hover:text-gray-300">Login</a>
      </nav>
    </div>
  </header>

  <!-- Hero Section -->
  <section id="hero" class="bg-pattern bg-cover bg-center h-screen flex items-center text-center text-black">
    <div class="container mx-auto">
      <h2 class="text-5xl font-bold mb-4">Transform Your Business with Our ERP System</h2>
      <p class="text-lg mb-8">Streamline operations, improve productivity, and gain deep insights into your business operations with our cutting-edge ERP solution.</p>
      <a href="#cta" class="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition">Get Started</a>
    </div>
  </section>

  <!-- Features Section -->
  <section id="features" class="py-20 bg-gray-50" data-aos="fade-up">
    <div class="container mx-auto text-center mb-10">
      <h3 class="text-4xl font-bold mb-4">Core Features</h3>
      <p class="text-gray-700">Powerful tools to help you manage your entire business effortlessly</p>
    </div>
    <div class="grid md:grid-cols-3 gap-8 px-8">
      <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
        <div class="mb-4">
          <img src="https://source.unsplash.com/300x200/?analytics" alt="Analytics" class="w-full h-48 object-cover rounded-lg">
        </div>
        <h4 class="text-2xl font-bold mb-2">Real-Time Analytics</h4>
        <p class="text-gray-700">Monitor your business with detailed analytics and real-time dashboards.</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
        <div class="mb-4">
          <img src="https://source.unsplash.com/300x200/?automation" alt="Automation" class="w-full h-48 object-cover rounded-lg">
        </div>
        <h4 class="text-2xl font-bold mb-2">Process Automation</h4>
        <p class="text-gray-700">Automate repetitive tasks to save time and reduce manual errors.</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
        <div class="mb-4">
          <img src="https://source.unsplash.com/300x200/?cloud" alt="Cloud" class="w-full h-48 object-cover rounded-lg">
        </div>
        <h4 class="text-2xl font-bold mb-2">Cloud Integration</h4>
        <p class="text-gray-700">Access your data anywhere, anytime with seamless cloud integration.</p>
      </div>
    </div>
  </section>

  <!-- Slider Section -->
  <section id="slider" class="bg-white py-20">
    <div class="container mx-auto text-center mb-8">
      <h3 class="text-4xl font-bold">Explore Our ERP System in Action</h3>
    </div>
    <div class="slider-container">
      <div class="slick-slider">
        <div><img src="https://unsplash.com/photos/a-person-typing-on-a-laptop-on-a-desk-mKhPLJ5JQI4" alt="Software Demo" class="w-full h-64 object-cover"></div>
        <div><img src="https://www.istockphoto.com/photo/meeting-success-two-business-persons-shaking-hands-standing-outside-gm1916729901-555092734?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fbusiness&utm_medium=affiliate&utm_source=unsplash&utm_term=business%3A%3Areduced-affiliates%3Aquarter" alt="Team Collaboration" class="w-full h-64 object-cover"></div>
        <div><img src="https://www.istockphoto.com/photo/white-arrow-flows-on-cube-stair-shape-against-blue-backdrop-business-way-concept-gm2075742031-564882229?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fgrowth&utm_medium=affiliate&utm_source=unsplash&utm_term=growth%3A%3Areduced-affiliates%3Aquarter" alt="Business Growth" class="w-full h-64 object-cover"></div>
      </div>
    </div>
  </section>

  <!-- Pricing Section -->
  <section id="pricing" class="py-20 bg-indigo-600 text-white">
    <div class="container mx-auto text-center">
      <h3 class="text-4xl font-bold mb-10">Pricing Plans</h3>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-indigo-500 p-8 rounded-lg shadow-lg hover:shadow-xl transition">
          <h4 class="text-2xl font-bold mb-4">Basic</h4>
          <p class="text-lg mb-6">$29/month</p>
          <ul class="mb-6">
            <li class="mb-2">Basic ERP Features</li>
            <li class="mb-2">Real-time Analytics</li>
            <li class="mb-2">Support via Email</li>
          </ul>
          <a href="#" class="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition">Select Plan</a>
        </div>
        <div   class="bg-indigo-700 p-8 rounded-lg shadow-lg hover:shadow-xl transition">
          <h4 class="text-2xl font-bold mb-4">Pro</h4>
          <p class="text-lg mb-6">$59/month</p>
          <ul class="mb-6">
            <li class="mb-2">All Basic Features</li>
            <li class="mb-2">Automation Tools</li>
            <li class="mb-2">Priority Support</li>
          </ul>
          <a href="#" class="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition">Select Plan</a>
        </div>
        <div class="bg-indigo-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition">
          <h4 class="text-2xl font-bold mb-4">Enterprise</h4>
          <p class="text-lg mb-6">$99/month</p>
          <ul class="mb-6">
            <li class="mb-2">All Pro Features</li>
            <li class="mb-2">Custom Integrations</li>
            <li class="mb-2">24/7 Support</li>
          </ul>
          <a href="#" class="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition">Select Plan</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section id="testimonials" class="py-20 bg-gray-100" data-aos="fade-left">
    <div class="container mx-auto text-center">
      <h3 class="text-4xl font-bold mb-10">What Our Customers Say</h3>
      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <p class="text-gray-700 mb-4">"The ERP system has transformed our business processes and saved us countless hours every month. Highly recommend!"</p>
          <p class="font-bold text-gray-900">- Alex J., CEO of XYZ Corp</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
          <p class="text-gray-700 mb-4">"Our operations have become more efficient thanks to the ERP solution. The support team is fantastic!"</p>
          <p class="font-bold text-gray-900">- Sarah L., Operations Manager</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Call to Action Section -->
  <section id="cta" class="py-20 bg-indigo-600 text-white text-center">
    <div class="container mx-auto">
      <h3 class="text-4xl font-bold mb-4">Ready to Take Your Business to the Next Level?</h3>
      <p class="mb-8">Get started with our ERP system today and see immediate results.</p>
      <a href="#" class="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition">Get Started Now</a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-6 bg-gray-800 text-white text-center">
    <p>&copy; 2024 ERP Solution. All rights reserved.</p>
  </footer>

  <!-- Slick Slider Script -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"></script>
  <script>
    $(document).ready(function(){
      $('.slick-slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
      });
    });
  </script>

  <!-- AOS (Animate on Scroll) Initialization -->
  <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>
  <script>
    AOS.init();
  </script>
</body>
</html>
