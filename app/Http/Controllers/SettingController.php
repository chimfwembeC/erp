<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Setting;
use Inertia\Inertia;

class SettingController extends Controller
{
    function getSetting($key, $default = null)
    {
        $setting = Setting::where('key', $key)->first();
        return $setting ? $setting->value : $default;
    }

    public function uploadFiles(Request $request)
    {
        // Validate the incoming files
        $request->validate([
            'branding_logo' => 'nullable|file|mimes:jpg,jpeg,png,gif|max:2048',
            'branding_favicon' => 'nullable|file|mimes:ico,png,jpeg|max:1024',
            'custom_css' => 'nullable|file|mimes:css|max:1024',
            'custom_js' => 'nullable|file|mimes:js|max:1024',
        ]);

        // Initialize response array
        $response = [];

        // Process Branding Logo Upload
        if ($request->hasFile('branding_logo')) {
            $brandingLogo = $request->file('branding_logo');
            $brandingLogoName = Str::random(40) . '.' . $brandingLogo->getClientOriginalExtension();
            // Move the file to the desired location
            $brandingLogo->move(storage_path('app/public/uploads/logos'), $brandingLogoName);
            // Return the file URL for frontend (using Storage facade)
            $response['branding_logo'] = Storage::url('uploads/logos/' . $brandingLogoName);
        }

        // Process Branding Favicon Upload
        if ($request->hasFile('branding_favicon')) {
            $brandingFavicon = $request->file('branding_favicon');
            $brandingFaviconName = Str::random(40) . '.' . $brandingFavicon->getClientOriginalExtension();
            // Move the file to the desired location
            $brandingFavicon->move(storage_path('app/public/uploads/favicons'), $brandingFaviconName);
            // Return the file URL for frontend (using Storage facade)
            $response['branding_favicon'] = Storage::url('uploads/favicons/' . $brandingFaviconName);
        }

        // Process Custom CSS Upload
        if ($request->hasFile('custom_css')) {
            $customCss = $request->file('custom_css');
            $customCssName = Str::random(40) . '.' . $customCss->getClientOriginalExtension();
            // Move the file to the desired location
            $customCss->move(storage_path('app/public/uploads/css'), $customCssName);
            // Return the file URL for frontend (using Storage facade)
            $response['custom_css'] = Storage::url('uploads/css/' . $customCssName);
        }

        // Process Custom JS Upload
        if ($request->hasFile('custom_js')) {
            $customJs = $request->file('custom_js');
            $customJsName = Str::random(40) . '.' . $customJs->getClientOriginalExtension();
            // Move the file to the desired location
            $customJs->move(storage_path('app/public/uploads/js'), $customJsName);
            // Return the file URL for frontend (using Storage facade)
            $response['custom_js'] = Storage::url('uploads/js/' . $customJsName);
        }

        return response()->json($response);  // Return the file URL of the uploaded files
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


    public function getCustomizationSettings()
    {
        // Fetch customization-related settings from the database
        $settings = Setting::whereIn('key', [
            'branding_logo',
            'branding_favicon',
            'ui_primary_color',
            'ui_secondary_color',
            'ui_neutral_color',
            'ui_font_family',
            'enable_dark_mode',
            'ui_layout_type',
            'show_footer',
            'footer_text',
            'enable_custom_css',
            'custom_css_path',
            'enable_custom_js',
            'custom_js_path'
        ])->get()->pluck('value', 'key');

        return response()->json($settings);
    }


    public function updateCustomizationSettings(Request $request)
    {
        // Update or create the customization settings in the database
        Setting::updateOrCreate(
            ['key' => 'branding_logo'],
            ['value' => $request->input('branding_logo')]
        );

        Setting::updateOrCreate(
            ['key' => 'branding_favicon'],
            ['value' => $request->input('branding_favicon')]
        );

        Setting::updateOrCreate(
            ['key' => 'ui_primary_color'],
            ['value' => $request->input('ui_primary_color')]
        );

        Setting::updateOrCreate(
            ['key' => 'ui_secondary_color'],
            ['value' => $request->input('ui_secondary_color')]
        );

        Setting::updateOrCreate(
            ['key' => 'ui_neutral_color'],
            ['value' => $request->input('ui_neutral_color')]
        );

        Setting::updateOrCreate(
            ['key' => 'ui_font_family'],
            ['value' => $request->input('ui_font_family')]
        );

        Setting::updateOrCreate(
            ['key' => 'enable_dark_mode'],
            ['value' => $request->input('enable_dark_mode')]
        );

        Setting::updateOrCreate(
            ['key' => 'ui_layout_type'],
            ['value' => $request->input('ui_layout_type')]
        );

        Setting::updateOrCreate(
            ['key' => 'show_footer'],
            ['value' => $request->input('show_footer')]
        );

        Setting::updateOrCreate(
            ['key' => 'footer_text'],
            ['value' => $request->input('footer_text')]
        );

        // Handle branding logo upload
        if ($request->hasFile('branding_logo')) {
            // Validate file type and size if necessary
            $validated = $request->validate([
                'branding_logo' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',  // Validate image types
            ]);

            // Store the file in 'public/logos' folder and get its path
            $brandingLogoPath = $request->file('branding_logo')->store('public/logos');

            // Store the file path in the database (hash name for uniqueness)
            Setting::updateOrCreate(
                ['key' => 'branding_logo'],
                ['value' => $brandingLogoPath]
            );
        }

        // Handle branding favicon upload
        if ($request->hasFile('branding_favicon')) {
            // Validate file type and size if necessary
            $validated = $request->validate([
                'branding_favicon' => 'image|mimes:ico,png,jpg,gif|max:1024',  // Validate favicon types
            ]);

            // Store the file in 'public/favicons' folder and get its path
            $brandingFaviconPath = $request->file('branding_favicon')->store('public/favicons');

            // Store the file path in the database (hash name for uniqueness)
            Setting::updateOrCreate(
                ['key' => 'branding_favicon'],
                ['value' => $brandingFaviconPath]
            );
        }

        // Handle custom CSS file upload
        if ($request->hasFile('custom_css')) {
            // Validate CSS file type and size if necessary
            $validated = $request->validate([
                'custom_css' => 'mimes:css|max:5120',  // Validate CSS files (5MB limit)
            ]);

            // Store the file in 'public/css' folder and get its path
            $customCssPath = $request->file('custom_css')->store('public/css');

            // Store the file path in the database
            Setting::updateOrCreate(
                ['key' => 'custom_css_path'],
                ['value' => $customCssPath]
            );
        }

        // Handle custom JS file upload
        if ($request->hasFile('custom_js')) {
            // Validate JS file type and size if necessary
            $validated = $request->validate([
                'custom_js' => 'mimes:js,js|text/javascript|max:5120',  // Validate JS files (5MB limit)
            ]);

            // Store the file in 'public/js' folder and get its path
            $customJsPath = $request->file('custom_js')->store('public/js');

            // Store the file path in the database
            Setting::updateOrCreate(
                ['key' => 'custom_js_path'],
                ['value' => $customJsPath]
            );
        }


        return response()->json(['message' => 'Customization settings updated successfully.']);
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

//
