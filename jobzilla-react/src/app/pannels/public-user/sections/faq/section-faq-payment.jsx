function SectionFaqPayments() {
    return (
        <>
            <div className="tw-faq-section">
                <div className="accordion tw-faq" id="sf-faq-accordion-3">
                    {/*one*/}
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ1-3" aria-expanded="false">
                        Are there any fees to apply for jobs?
                        </button>
                        <div id="FAQ1-3" className="accordion-collapse collapse" data-bs-parent="#sf-faq-accordion-3">
                            <div className="accordion-body">
                            No, applying for jobs through our platform is completely free. Employers may charge a small processing fee for certain premium job listings.
                            </div>
                        </div>
                    </div>
                    {/*two*/}
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ2-3" aria-expanded="false">
                        How do I make payments for job-related services (e.g., resume writing)?
                        </button>
                        <div id="FAQ2-3" className="accordion-collapse collapse" data-bs-parent="#sf-faq-accordion-3">
                            <div className="accordion-body">
                            You can make payments for job-related services such as resume writing or profile enhancement through our secure payment gateway, which supports credit/debit cards and PayPal.
                            </div>
                        </div>
                    </div>
                    {/*three*/}
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ3-3" aria-expanded="false">
                        Can I get a refund for job service payments?
                        </button>
                        <div id="FAQ3-3" className="accordion-collapse collapse" data-bs-parent="#sf-faq-accordion-3">
                            <div className="accordion-body">
                            Refunds are available for job-related services if the service has not been provided as described. Please contact support within 7 days of your payment to request a refund.
                            </div>
                        </div>
                    </div>
                    {/*four*/}
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ4-3" aria-expanded="false">
                        How can I track my payment for job services?
                        </button>
                        <div id="FAQ4-3" className="accordion-collapse collapse" data-bs-parent="#sf-faq-accordion-3">
                            <div className="accordion-body">
                            After completing a payment for job services, you will receive an email confirmation. You can also track payment details in your account under the "Payment History" section.
                            </div>
                        </div>
                    </div>
                    {/*five*/}
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ5-3" aria-expanded="false">
                        Are job application payments refundable if the employer doesn't respond?
                        </button>
                        <div id="FAQ5-3" className="accordion-collapse collapse" data-bs-parent="#sf-faq-accordion-3">
                            <div className="accordion-body">
                            We do not offer refunds for job application payments. However, we encourage you to apply for other available roles on the platform to maximize your chances.
                            </div>
                        </div>
                    </div>
                    {/*six*/}
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ6-3" aria-expanded="false">
                        What payment methods are accepted for job-related services?
                        </button>
                        <div id="FAQ6-3" className="accordion-collapse collapse" data-bs-parent="#sf-faq-accordion-3">
                            <div className="accordion-body">
                            We accept payments through credit/debit cards, PayPal, and other secure payment gateways. You can select your preferred method during the checkout process.
                            </div>
                        </div>
                    </div>
                    {/*seven*/}
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ7-3" aria-expanded="false">
                        How can I update my payment method?
                        </button>
                        <div id="FAQ7-3" className="accordion-collapse collapse" data-bs-parent="#sf-faq-accordion-3">
                            <div className="accordion-body">
                            You can update your payment method by logging into your account, going to the "Billing" or "Payment Settings" section, and selecting "Edit Payment Method.
                            </div>
                        </div>
                    </div>
                    {/*eight*/}
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ8-3" aria-expanded="false">
                        Can I get a discount for multiple job application services?
                        </button>
                        <div id="FAQ8-3" className="accordion-collapse collapse" data-bs-parent="#sf-faq-accordion-3">
                            <div className="accordion-body">
                            We occasionally offer promotional discounts for multiple applications or bundled services. Keep an eye on our site or subscribe to our newsletter for the latest deals.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionFaqPayments;