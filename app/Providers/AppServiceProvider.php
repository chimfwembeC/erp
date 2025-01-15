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
        ]);
    }
}
