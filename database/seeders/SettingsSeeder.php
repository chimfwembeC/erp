<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $settings = [
            // General Settings
            ['key' => 'site_name', 'value' => 'My Application', 'type' => 'string'],
            ['key' => 'timezone', 'value' => 'UTC', 'type' => 'string'],
            ['key' => 'maintenance_mode', 'value' => '0', 'type' => 'boolean'],

            // User Management
            ['key' => 'default_user_role', 'value' => 'user', 'type' => 'string'],
            ['key' => 'allow_user_registration', 'value' => '1', 'type' => 'boolean'],
            ['key' => 'user_password_min_length', 'value' => '8', 'type' => 'integer'],

            // Notifications
            ['key' => 'email_notifications_enabled', 'value' => '1', 'type' => 'boolean'],
            ['key' => 'sms_notifications_enabled', 'value' => '0', 'type' => 'boolean'],
            ['key' => 'notification_email', 'value' => 'admin@example.com', 'type' => 'string'],

            // System Logs
            ['key' => 'enable_logging', 'value' => '1', 'type' => 'boolean'],
            ['key' => 'log_retention_days', 'value' => '30', 'type' => 'integer'],

            // Language Preferences
            ['key' => 'default_language', 'value' => 'en', 'type' => 'string'],
            ['key' => 'available_languages', 'value' => '[{\"code\":\"en\",\"label\":\"English\",\"flag\":\"\\ud83c\\uddec\\ud83c\\udde7\"},{\"code\":\"bem\",\"label\":\"Bemba\",\"flag\":\"\\ud83c\\uddff\\ud83c\\uddf2\"},{\"code\":\"nya\",\"label\":\"Nyanja\",\"flag\":\"\\ud83c\\uddff\\ud83c\\uddf2\"}]', 'type' => 'json'],

            // Storage Settings
            ['key' => 'upload_storage_path', 'value' => 'storage/app/uploads', 'type' => 'string'],
            ['key' => 'max_upload_size_mb', 'value' => '10', 'type' => 'integer'],
            ['key' => 'allowed_file_types', 'value' => '["jpg", "png", "pdf", "docx"]', 'type' => 'json'],
            ['key' => 'enable_cloud_storage', 'value' => '0', 'type' => 'boolean'],
            ['key' => 'cloud_storage_provider', 'value' => 's3', 'type' => 'string'],

            // Access Control
            ['key' => 'enable_access_control', 'value' => '1', 'type' => 'boolean'],
            ['key' => 'default_access_level', 'value' => 'user', 'type' => 'string'],
            ['key' => 'session_timeout', 'value' => '30', 'type' => 'integer'],

            // Integrations
            ['key' => 'api_key', 'value' => '', 'type' => 'string'], // Generic API key for external services
            ['key' => 'third_party_integration_enabled', 'value' => '0', 'type' => 'boolean'], // Enable or disable third-party integrations

            // Authentication
            ['key' => 'oauth_google_enabled', 'value' => '0', 'type' => 'boolean'], // Enable Google OAuth
            ['key' => 'oauth_github_enabled', 'value' => '0', 'type' => 'boolean'], // Enable GitHub OAuth

            // Communication
            ['key' => 'email_service_provider', 'value' => 'smtp', 'type' => 'string'], // e.g., SMTP or a provider
            ['key' => 'sms_service_provider', 'value' => '', 'type' => 'string'], // Open-source SMS gateway (optional)

            // Monitoring and Error Reporting
            ['key' => 'error_reporting_enabled', 'value' => '0', 'type' => 'boolean'], // Enable error reporting
            ['key' => 'error_reporting_tool', 'value' => '', 'type' => 'string'], // e.g., Sentry or similar tools

            // Analytics
            ['key' => 'analytics_enabled', 'value' => '0', 'type' => 'boolean'], // Enable analytics
            ['key' => 'analytics_tool', 'value' => 'matomo', 'type' => 'string'], // Default: Matomo (open-source analytics)

            // Storage
            ['key' => 'storage_driver', 'value' => 'local', 'type' => 'string'], // Options: local, S3-compatible
            ['key' => 'storage_max_size', 'value' => '10485760', 'type' => 'integer'], // Max file size in bytes (default: 10 MB)

            // Security
            ['key' => 'firewall_enabled', 'value' => '0', 'type' => 'boolean'], // Enable application-level firewall
            ['key' => 'captcha_enabled', 'value' => '0', 'type' => 'boolean'], // Enable CAPTCHA (e.g., Google reCAPTCHA alternative)

            // Open-Source Integrations
            ['key' => 'openai_enabled', 'value' => '0', 'type' => 'boolean'], // Enable OpenAI-based services (if applicable)
            ['key' => 'openai_api_key', 'value' => '', 'type' => 'string'], // OpenAI API key
            ['key' => 'chatbot_enabled', 'value' => '0', 'type' => 'boolean'], // Enable open-source chatbot (e.g., Rasa, Botpress)

            // Data Management
            ['key' => 'data_retention_period_days', 'value' => '365', 'type' => 'integer'],
            ['key' => 'enable_data_export', 'value' => '1', 'type' => 'boolean'],

            // Billing and Subscriptions
            ['key' => 'enable_billing', 'value' => '1', 'type' => 'boolean'],
            ['key' => 'billing_currency', 'value' => 'USD', 'type' => 'string'],
            ['key' => 'subscription_plans', 'value' => '["basic", "pro", "enterprise"]', 'type' => 'json'],

            // Security Settings
            ['key' => 'enable_two_factor_auth', 'value' => '1', 'type' => 'boolean'],
            ['key' => 'password_policy', 'value' => '{"min_length":8,"uppercase":1,"numbers":1}', 'type' => 'json'],

            // Customization
            ['key' => 'enable_theme_customization', 'value' => '1', 'type' => 'boolean'],
            ['key' => 'default_theme', 'value' => 'light', 'type' => 'string'],
            // Enable/Disable custom branding options
            ['key' => 'enable_branding', 'value' => '1', 'type' => 'boolean'],
            // Branding: Company logo
            ['key' => 'branding_logo', 'value' => 'uploads/logo.png', 'type' => 'string'],
            // Branding: Favicon
            ['key' => 'branding_favicon', 'value' => 'uploads/favicon.ico', 'type' => 'string'],
            // Primary color for UI elements
            ['key' => 'ui_primary_color', 'value' => '#0052CC', 'type' => 'string'], // Hexadecimal format
            // Secondary color for UI elements
            ['key' => 'ui_secondary_color', 'value' => '#FF5722', 'type' => 'string'], // Hexadecimal format
            // Default font for the application
            ['key' => 'ui_font_family', 'value' => 'Arial, sans-serif', 'type' => 'string'],
            // Enable dark mode
            ['key' => 'enable_dark_mode', 'value' => '1', 'type' => 'boolean'],
            // Default layout type: Fixed or Fluid
            ['key' => 'ui_layout_type', 'value' => 'fixed', 'type' => 'string'], // Options: fixed, fluid
            // Show or hide the application footer
            ['key' => 'show_footer', 'value' => '1', 'type' => 'boolean'],
            // Footer text customization
            ['key' => 'footer_text', 'value' => '© 2025 My Application. All rights reserved.', 'type' => 'string'],
            // Enable/Disable custom CSS
            ['key' => 'enable_custom_css', 'value' => '1', 'type' => 'boolean'],
            // Path to custom CSS file
            ['key' => 'custom_css_path', 'value' => 'uploads/custom.css', 'type' => 'string'],
            // Enable/Disable custom JavaScript
            ['key' => 'enable_custom_js', 'value' => '1', 'type' => 'boolean'],
            // Path to custom JavaScript file
            ['key' => 'custom_js_path', 'value' => 'uploads/custom.js', 'type' => 'string'],
        ];


        DB::table('settings')->insert($settings);
    }
}
