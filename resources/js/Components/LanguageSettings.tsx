import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import Swal from "sweetalert2";

const LanguageSettings = () => {
    const [defaultLanguage, setDefaultLanguage] = useState("");
    const [availableLanguages, setAvailableLanguages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Fetch existing settings from the server
        axios.get("/api/settings/languages").then((response) => {
            const settings = response.data;
            const defaultLangCode = settings.default_language || "en";

            // Set the default language by matching the language code
            setDefaultLanguage(defaultLangCode);

            // Parse the available languages properly
            const availableLangs = JSON.parse(settings.available_languages || '[{"code":"en","label":"English","flag":"🇬🇧"},{ code: "bem", label: "Bemba", flag: "🇿🇲" },{ code: "nya", label: "Nyanja", flag: "🇿🇲" }]');
            // console.log(settings.available_languages);
            setAvailableLanguages(availableLangs);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Show confirmation dialog before submitting
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to save these language settings?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, save it!",
            cancelButtonText: "No, cancel",
        });

        if (result.isConfirmed) {
            setIsLoading(true);

            try {
                // Post the full language data including code, label, and flag
                await axios.post("/api/settings/languages/update", {
                    default_language: defaultLanguage,
                    available_languages: [{ "code": "en", "label": "English", "flag": "🇬🇧" }, { code: "bem", label: "Bemba", flag: "🇿🇲" }, { code: "nya", label: "Nyanja", flag: "🇿🇲" }], // send full language objects
                });
                Swal.fire("Saved!", "Your language settings have been updated.", "success");
            } catch (error) {
                console.error("Failed to update settings:", error);
                Swal.fire("Error", "An error occurred while updating the settings.", "error");
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div>
            <h2>Language Settings</h2>
            <p>Manage default language and available language options.</p>

            <form onSubmit={handleSubmit}>
                {/* Default Language */}
                <div className="flex justify-end">
                    <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                        <label className="block text-md font-medium text-gray-700">
                            Default Language
                        </label>
                        <Dropdown
                            value={defaultLanguage}
                            options={[{ "code": "en", "label": "English", "flag": "🇬🇧" }, { code: "bem", label: "Bemba", flag: "🇿🇲" }, { code: "nya", label: "Nyanja", flag: "🇿🇲" }]}
                            onChange={(e) => setDefaultLanguage(e.value)}
                            optionLabel="label" // Use the label to display in the dropdown
                            optionValue="code" // Use the code as the value
                            itemTemplate={(lang) => (
                                <div className="flex items-center">
                                    <span className="mr-2">{lang.flag}</span>
                                    <span>{lang.label}</span>
                                </div>
                            )}
                            placeholder="Select a default language"
                            className="w-full border border-gray-300 rounded-lg mt-2"
                        />
                    </div>
                </div>

                {/* Available Languages */}
                <div className="flex justify-end">
                    <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                        <label className="block text-md font-medium text-gray-700">
                            Available Languages
                        </label>
                        <div className="mt-2">
                            {availableLanguages.map((lang, index) => (
                                <span
                                    key={index}
                                    className="inline-block bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                                >
                                    {lang.flag} {lang.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-4 flex justify-end">
                    <Button
                        label={isLoading ? "Saving..." : "Save Settings"}
                        type="submit"
                        className="bg-primary p-2 text-white rounded-lg"
                        disabled={isLoading}
                    />
                </div>
            </form>
        </div>
    );
};

export default LanguageSettings;
