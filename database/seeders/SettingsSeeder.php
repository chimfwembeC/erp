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
            ['key' => 'available_languages', 'value' => '["en","es","fr"]', 'type' => 'json'],

            // Storage Settings
            ['key' => 'upload_storage_path', 'value' => 'storage/app/uploads', 'type' => 'string'],
            ['key' => 'max_upload_size_mb', 'value' => '10', 'type' => 'integer'], // Maximum file size in MB
            ['key' => 'allowed_file_types', 'value' => '["jpg", "png", "pdf", "docx"]', 'type' => 'json'],
            ['key' => 'enable_cloud_storage', 'value' => '0', 'type' => 'boolean'], // 1 for cloud storage enabled, 0 for disabled
            ['key' => 'cloud_storage_provider', 'value' => 's3', 'type' => 'string'], // If enabled, specify the cloud storage provider (e.g., s3, google-drive)
        ];

        DB::table('settings')->insert($settings);
    }
}
