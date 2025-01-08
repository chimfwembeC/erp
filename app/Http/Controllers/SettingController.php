<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;
use Inertia\Inertia;

class SettingController extends Controller
{
    function getSetting($key, $default = null)
    {
        $setting = Setting::where('key', $key)->first();
        return $setting ? $setting->value : $default;
    }

    public function getGeneralSettings()
    {
        // Fetch settings from the database or return default values
        $settings = Setting::whereIn('key', ['site_name', 'timezone', 'maintenance_mode'])->get()->pluck('value', 'key');

        return response()->json($settings);
    }

    public function updateGeneralSettings(Request $request)
    {
        // Update the settings in the database
        Setting::updateOrCreate(
            ['key' => 'site_name'],
            ['value' => $request->input('site_name')]
        );

        Setting::updateOrCreate(
            ['key' => 'timezone'],
            ['value' => $request->input('timezone')]
        );

        Setting::updateOrCreate(
            ['key' => 'maintenance_mode'],
            ['value' => $request->input('maintenance_mode')]
        );

        // Handle logo upload logic here, if applicable

        return redirect()->back();
    }

    public function getStorageSettings()
    {
        // Fetch settings from the database or return default values
        $settings = Setting::whereIn('key', [
            'upload_storage_path',
            'max_upload_size_mb',
            'allowed_file_types',
            'enable_cloud_storage',
            'cloud_storage_provider'
        ])->get()->pluck('value', 'key');

        return response()->json($settings);
    }

    public function updateStorageSettings(Request $request)
    {
        // Update the settings in the database
        Setting::updateOrCreate(
            ['key' => 'upload_storage_path'],
            ['value' => $request->input('upload_storage_path')]
        );

        Setting::updateOrCreate(
            ['key' => 'max_upload_size_mb'],
            ['value' => $request->input('max_upload_size_mb')]
        );

        Setting::updateOrCreate(
            ['key' => 'allowed_file_types'],
            ['value' => $request->input('allowed_file_types')]
        );

        Setting::updateOrCreate(
            ['key' => 'enable_cloud_storage'],
            ['value' => $request->input('enable_cloud_storage')]
        );

        Setting::updateOrCreate(
            ['key' => 'cloud_storage_provider'],
            ['value' => $request->input('cloud_storage_provider')]
        );

        return redirect()->back();
    }

    public function getUserSettings()
    {
        // Fetch settings from the database or return default values
        $settings = Setting::whereIn('key', ['default_user_role', 'allow_user_registration', 'user_password_min_length'])->get()->pluck('value', 'key');

        return response()->json($settings);
    }

    public function updateUserSettings(Request $request)
    {
        // Update the settings in the database
        Setting::updateOrCreate(
            ['key' => 'default_user_role'],
            ['value' => $request->input('default_user_role')]
        );

        Setting::updateOrCreate(
            ['key' => 'allow_user_registration'],
            ['value' => $request->input('allow_user_registration')]
        );

        Setting::updateOrCreate(
            ['key' => 'user_password_min_length'],
            ['value' => $request->input('user_password_min_length')]
        );

        // Handle logo upload logic here, if applicable

        return redirect()->back();
    }

    public function getNotificationSettings()
    {
        // Fetch settings from the database or return default values
        $settings = Setting::whereIn('key', [
            'notifications_enabled',
            'email_notifications_enabled',
            'sms_notifications_enabled',
            'notification_email',
            'push_notifications',
            'smtp_server',
            'smtp_port',
            'email_sender'
        ])->get()->pluck('value', 'key');

        return response()->json($settings);
    }


    public function updateNotificationSettings(Request $request)
    {
        // Update the settings in the database
        Setting::updateOrCreate(
            ['key' => 'notifications_enabled'],
            ['value' => $request->input('notifications_enabled')]
        );

        Setting::updateOrCreate(
            ['key' => 'sms_notifications_enabled'],
            ['value' => $request->input('sms_notifications_enabled')]
        );

        Setting::updateOrCreate(
            ['key' => 'email_notifications_enabled'],
            ['value' => $request->input('email_notifications_enabled')]
        );

        // Setting::updateOrCreate(
        //     ['key' => 'email_notifications'],
        //     ['value' => $request->input('email_notifications')]
        // );

        Setting::updateOrCreate(
            ['key' => 'notification_email'],
            ['value' => $request->input('notification_email')]
        );

        Setting::updateOrCreate(
            ['key' => 'push_notifications'],
            ['value' => $request->input('push_notifications')]
        );

        Setting::updateOrCreate(
            ['key' => 'smtp_server'],
            ['value' => $request->input('smtp_server')]
        );

        Setting::updateOrCreate(
            ['key' => 'smtp_port'],
            ['value' => $request->input('smtp_port')]
        );

        Setting::updateOrCreate(
            ['key' => 'email_sender'],
            ['value' => $request->input('email_sender')]
        );
        // Handle logo upload logic here, if applicable

        return redirect()->back();
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch all settings and pass them to the Inertia component
        $settings = Setting::all();

        return Inertia::render('Settings/Index', [
            'settings' => $settings,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Render the Inertia component for creating a new setting
        return Inertia::render('Settings/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'key' => 'required|unique:settings|max:255',
            'value' => 'nullable',
            'type' => 'required|in:string,boolean,integer',
        ]);

        // Create a new setting
        Setting::create($request->all());

        return redirect()->route('settings.index')->with('success', 'Setting created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Fetch the setting by ID and pass it to the Inertia component
        $setting = Setting::findOrFail($id);

        return Inertia::render('Settings/Show', [
            'setting' => $setting,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Fetch the setting by ID and pass it to the Inertia component
        $setting = Setting::findOrFail($id);

        return Inertia::render('Settings/Edit', [
            'setting' => $setting,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validate the request
        $request->validate([
            'value' => 'nullable',
            'type' => 'required|in:string,boolean,integer',
        ]);

        // Update the setting
        $setting = Setting::findOrFail($id);
        $setting->update($request->all());

        return redirect()->route('settings.index')->with('success', 'Setting updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Delete the setting
        $setting = Setting::findOrFail($id);
        $setting->delete();

        return redirect()->route('settings.index')->with('success', 'Setting deleted successfully.');
    }
}
