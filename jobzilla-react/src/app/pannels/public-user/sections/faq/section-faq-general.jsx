function SectionFaqGeneral() {
    return (
        <>
            <div className="tw-faq-section">
                <div className="accordion tw-faq" id="sf-faq-accordion">
                    {/*One*/}
                    <div className="accordion-item">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" aria-expanded="true" data-bs-target="#FAQ1">
                        What is the best way to search for jobs?
                        </button>
                        <div id="FAQ1" className="accordion-collapse collapse show" data-bs-parent="#sf-faq-accordion">
                            <div className="accordion-body">
                            Use online job platforms, networking, and company career pages. Tailor your resume for each role and apply to positions that match your skills and interests.
                            </div>
                        </div>
                    </div>
                    {/*Two*/}
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ2" aria-expanded="false">
                        How can I improve my resume?
                        </button>
                        <div id="FAQ2" className="accordion-collapse collapse" data-bs-parent="#sf-faq-accordion">
                            <div className="accordion-body">
                            Highlight your skills, experience, and achievements relevant to the job. Keep it concise, professional, and formatted for easy readability.
                            </div>
                        </div>
                    </div>
                    {/*Three*/}
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ3" aria-expanded="false">
                        What should I include in a cover letter?
                        </button>
                        <div id="FAQ3" className="accordion-collapse collapse" data-bs-parent="#sf-faq-accordion">
                            <div className="accordion-body">
                            Your cover letter should introduce yourself, explain why you’re interested in the role, and highlight your relevant skills and experience. Keep it concise and tailored to the job description.
                            </div>
                        </div>
                    </div>
                    {/*Four*/}
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ4" aria-expanded="false">
                        How do I find remote job opportunities?
                        </button>
                        <div id="FAQ4" className="accordion-collapse collapse" data-bs-parent="#sf-faq-accordion">
                            <div className="accordion-body">
                            Many platforms offer remote job filters. Use keywords like "remote," "work from home," or "virtual" when searching for jobs.
                            </div>
                        </div>
                    </div>
                    {/*Five*/}
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ5" aria-expanded="false">
                        What is the difference between a full-time job and an internship?
                        </button>
                        <div id="FAQ5" className="accordion-collapse collapse" data-bs-parent="#sf-faq-accordion">
                            <div className="accordion-body">
                            A full-time job offers permanent employment with benefits, while an internship is typically a temporary role focused on learning and gaining experience, often for students or recent graduates.
                            </div>
                        </div>
                    </div>
                    {/*Six*/}
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ6" aria-expanded="false">
                        How do I negotiate my salary?
                        </button>
                        <div id="FAQ6" className="accordion-collapse collapse" data-bs-parent="#sf-faq-accordion">
                            <div className="accordion-body">
                            Research industry standards for the role and location. Be confident, and highlight your skills and experience when discussing compensation.
                            </div>
                        </div>
                    </div>
                    {/*Seven*/}
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ7" aria-expanded="false">
                        How do I know if a job posting is legitimate?
                        </button>
                        <div id="FAQ7" className="accordion-collapse collapse" data-bs-parent="#sf-faq-accordion">
                            <div className="accordion-body">
                            Look for detailed job descriptions, company contact information, and professional communication. Avoid postings that request payment or personal information upfront.
                            </div>
                        </div>
                    </div>
                    {/*Eight*/}
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ8" aria-expanded="false">
                        What should I do if I don’t hear back after applying?
                        </button>
                        <div id="FAQ8" className="accordion-collapse collapse" data-bs-parent="#sf-faq-accordion">
                            <div className="accordion-body">
                            Follow up with the employer after one to two weeks. Use a polite email or phone call to express your interest and inquire about the status of your application.


                            </div>
                        </div>
                    </div>
                    {/*Nine*/}
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ9" aria-expanded="false">
                        How can I stand out as a candidate?
                        </button>
                        <div id="FAQ9" className="accordion-collapse collapse" data-bs-parent="#sf-faq-accordion">
                            <div className="accordion-body">
                            To stand out, customize your resume and cover letter for each job, showcase your accomplishments with measurable results, maintain a professional online presence, and prepare thoroughly for interviews to demonstrate your enthusiasm and expertise.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionFaqGeneral;