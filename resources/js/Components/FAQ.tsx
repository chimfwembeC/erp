import React from 'react'
import { Accordion, AccordionTab } from 'primereact/accordion';

export default function FAQ() {
    return (
        <div>
            {/* FAQ Section */}
            <section className="px-6 py-16">
                <h2 className="text-3xl font-bold text-primary text-center mb-8">
                    Frequently Asked Questions
                </h2>
                <div className="mx-4">
                    <Accordion>
                        <AccordionTab header="What is included in the free trial?">
                            <p className="text-gray-700 mt-2">
                                The free trial gives you access to all features for a
                                limited time.
                            </p>
                        </AccordionTab>
                        <AccordionTab header="Can I cancel my subscription?">
                            <p className="text-gray-700 mt-2">
                                Yes, you can cancel your subscription at any time from
                                your account settings.
                            </p>
                        </AccordionTab>
                        <AccordionTab header="Is my data secure with your platform?">
                            <p className="text-gray-700 mt-2">
                                Absolutely. We use industry-standard security measures to
                                protect your data.
                            </p>
                        </AccordionTab>
                        <AccordionTab header="Do you offer customer support?">
                            <p className="text-gray-700 mt-2">
                                Yes, we offer 24/7 support to assist you with any issues.
                            </p>
                        </AccordionTab>
                    </Accordion>
                </div>
            </section>
        </div>
    )
}
