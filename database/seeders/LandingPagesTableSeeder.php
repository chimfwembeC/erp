<?php

namespace Database\Seeders;

use App\Models\LandingPages;
use App\Models\Template;
use Illuminate\Database\Seeder;

class LandingPagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get template
        $defaultTemplate = Template::where('slug', 'default-landing-page')->first();

        LandingPages::create([
            'template_id' => $defaultTemplate->id,
            'title' => 'Welcome to Our ERP Solution',
            'slug' => 'erp-landing',
            'custom_data' => json_encode([
                'header_text' => 'Revolutionize Your Business',
                'subheader_text' => 'Integrate all your processes into one powerful platform.',
                'cta_button_text' => 'Get Started',
                'cta_button_link' => '/get-started',        
            ]),
            'css' => '', // Tailwind CSS will be included in your project globally
            'html' => '
            <div class="min-h-screen bg-gray-100 flex flex-col">
                <header class="bg-white shadow">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex justify-between items-center py-6">
                            <h1 class="text-3xl font-bold text-gray-900">ERP Solution</h1>
                            <nav>
                                <a href="/" class="text-gray-600 hover:text-gray-900">Home</a>
                                <a href="#features" class="ml-4 text-gray-600 hover:text-gray-900">Features</a>
                                <a href="#testimonials" class="ml-4 text-gray-600 hover:text-gray-900">Testimonials</a>
                            </nav>
                        </div>
                    </div>
                </header>
                
                <main class="flex-grow flex flex-col justify-center items-center bg-white py-20">
                    <h2 class="text-5xl font-extrabold text-gray-800 mb-4">{header_text}</h2>
                    <p class="text-lg text-gray-600 mb-6">{subheader_text}</p>
                    <a href="{cta_button_link}" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">{cta_button_text}</a>
                </main>
                
                <section id="features" class="py-20">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h3 class="text-4xl font-bold text-gray-800 text-center mb-10">Features</h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div class="bg-white p-6 rounded-lg shadow">
                                <h4 class="font-semibold text-xl mb-2">Streamlined Operations</h4>
                                <p class="text-gray-600">Optimize your business processes for maximum efficiency.</p>
                            </div>
                            <div class="bg-white p-6 rounded-lg shadow">
                                <h4 class="font-semibold text-xl mb-2">Real-Time Analytics</h4>
                                <p class="text-gray-600">Gain insights and make informed decisions quickly.</p>
                            </div>
                            <div class="bg-white p-6 rounded-lg shadow">
                                <h4 class="font-semibold text-xl mb-2">Customizable Dashboards</h4>
                                <p class="text-gray-600">Tailor your experience to fit your unique business needs.</p>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section id="testimonials" class="bg-gray-200 py-20">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h3 class="text-4xl font-bold text-gray-800 text-center mb-10">What Our Clients Say</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <blockquote class="bg-white p-6 rounded-lg shadow">
                                <p class="text-lg text-gray-600">"This ERP has changed the way we do business!"</p>
                                <footer class="mt-4 text-gray-500">- John Doe</footer>
                            </blockquote>
                            <blockquote class="bg-white p-6 rounded-lg shadow">
                                <p class="text-lg text-gray-600">"Highly recommend for any business looking to improve efficiency."</p>
                                <footer class="mt-4 text-gray-500">- Jane Smith</footer>
                            </blockquote>
                        </div>
                    </div>
                </section>
                
                <footer class="bg-white py-6">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p class="text-gray-600">&copy; 2024 ERP Solution. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        ',
            'is_published' => true,
        ]);

        // Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit illum, perferendis impedit non rerum ipsam nisi mollitia ut tempora voluptate ipsa laudantium accusantium quo quibusdam adipisci. Eveniet accusantium est ratione.
    }
}
