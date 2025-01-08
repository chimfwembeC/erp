import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { InputNumber } from "primereact/inputnumber";
import Swal from "sweetalert2";

const LogSettings = () => {
    const [logRetentionDays, setLogRetentionDays] = useState();
    const [enableLogging, setEnableLogging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Fetch existing settings from the server
        axios.get("/api/settings/logs").then((response) => {
            const settings = response.data;
            setLogRetentionDays(settings.log_retention_days || "");
            setEnableLogging(!!settings.enable_logging);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Show confirmation dialog before submitting
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to save these changes?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, save it!",
            cancelButtonText: "No, cancel",
        });

        if (result.isConfirmed) {
            setIsLoading(true);

            try {
                await axios.post("/api/settings/logs/update", {
                    log_retention_days: logRetentionDays,
                    enable_logging: enableLogging,
                });
                Swal.fire("Saved!", "Your settings have been updated.", "success");
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
            <h2>Log Settings</h2>
            <p>Manage logging preferences and retention policies.</p>

            <form onSubmit={handleSubmit}>
                {/* Enable Logging */}
                <div className="flex justify-end">
                    <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                        <label className="block text-md font-medium text-gray-700">
                            Enable Logging
                        </label>
                        <div className="text-sm text-gray-800">Toggle to enable or disable logs</div>
                        <div className="mt-2">
                            <label className="inline-flex items-center">
                                <InputSwitch
                                    checked={enableLogging}
                                    onChange={(e) => setEnableLogging(e.value)}
                                    className="text-blue-600"
                                />
                                <span className="ml-3 text-md">Enable Logging</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Log Retention Days */}
                <div className="flex justify-end">
                    <div className="w-1/2 bg-white p-4 rounded-lg shadow-md my-4">
                        <label
                            htmlFor="log_retention_days"
                            className="block text-md font-medium text-gray-700"
                        >
                            Log Retention Days
                        </label>
                        <div className="text-sm text-gray-800">Add log retention days</div>
                        <InputNumber
                            type="number"
                            id="log_retention_days"
                            name="log_retention_days"
                            onValueChange={(e) => setLogRetentionDays(e.value)}
                            value={logRetentionDays}
                            mode="decimal"
                            min={0}
                            className="p-d-block p-mt-2 mt-2 rounded-lg w-full"
                            placeholder="Enter number of days"
                            showButtons
                            buttonLayout="horizontal"
                            decrementButtonClassName="p-button-secondary"
                            incrementButtonClassName="p-button-secondary"
                        />
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

export default LogSettings;
