<?php

namespace App\Providers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'favicon' => function () {
                return DB::table('settings')->where('key', 'branding_favicon')->value('value');
            },
            'logo' => function () {
                return DB::table('settings')->where('key', 'branding_logo')->value('value');
            },
            'socials' => function () {
                return DB::table('settings')->whereIn('key', ['site_facebook_url', 'site_twitter_url', 'site_instagram_url', 'site_linkedin_url'])->get()->pluck('value', 'key');
            },
            'footer' => function () {
                return DB::table('settings')->whereIn('key', ['show_footer', 'footer_text'])->get()->pluck('value', 'key');
            },
        ]);
    }
}
