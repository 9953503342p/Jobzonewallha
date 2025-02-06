function SectionFaqReturn() {
    return (
        <>
            <div className="tw-faq-section">
                <div className="accordion tw-faq" id="sf-faq-accordion-4">
                    {/*one*/}
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ1-4" aria-expanded="false">
                        Can I get a refund for a job service payment?
                        </button>
                        <div id="FAQ1-4" className="accordion-collapse collapse" data-bs-parent="#sf-faq-accordion-4">
                            <div className="accordion-body">
                            Refunds are available if the service you purchased was not delivered as expected. Please contact our support team within 7 days of the payment for a refund.
                            </div>
                        </div>
                    </div>
                    {/*two*/}
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ2-4" aria-expanded="false">
                            What is your cancellation policy?
                        </button>
                        <div id="FAQ2-4" className="accordion-collapse collapse" data-bs-parent="#sf-faq-accordion-4">
                            <div className="accordion-body">
                            To request a refund, please email our support team with your payment details and reason for the request. We will process your refund within 7-10 business days.
                            </div>
                        </div>
                    </div>
                    {/*three*/}
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ3-4" aria-expanded="false">
                        Can I cancel my job application service after payment?
                        </button>
                        <div id="FAQ3-4" className="accordion-collapse collapse" data-bs-parent="#sf-faq-accordion-4">
                            <div className="accordion-body">
                            Job application service payments are non-refundable once the service is delivered. Please make sure you review all services before completing your payment.
                            </div>
                        </div>
                    </div>
                    {/*four*/}
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ4-4" aria-expanded="false">
                        How long does it take to receive a refund?
                        </button>
                        <div id="FAQ4-4" className="accordion-collapse collapse" data-bs-parent="#sf-faq-accordion-4">
                            <div className="accordion-body">
                            Refunds are processed within 7-10 business days after approval. You will be notified via email once your refund has been issued.
                            </div>
                        </div>
                    </div>
                    {/*five*/}
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ5-4" aria-expanded="false">
                        What happens if I am charged for a service I did not use?
                        </button>
                        <div id="FAQ5-4" className="accordion-collapse collapse" data-bs-parent="#sf-faq-accordion-4">
                            <div className="accordion-body">
                            If you are charged for a service you did not use, please contact our support team immediately. We will review your case and process a refund if applicable.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionFaqReturn;