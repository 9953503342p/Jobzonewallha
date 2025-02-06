function SectionFaqJobs() {
    return (
        <>
            <div className="tw-faq-section">
                <div className="accordion tw-faq" id="sf-faq-accordion-2">
                    {/*one*/}
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ1-2" aria-expanded="false">
                        How do I start my job search?
                        </button>
                        <div id="FAQ1-2" className="accordion-collapse collapse" data-bs-parent="#sf-faq-accordion-2">
                            <div className="accordion-body">
                            Begin by identifying your career goals, updating your resume, and searching job boards, company websites, and networking platforms. Tailor your applications for each job you apply to.
                            </div>
                        </div>
                    </div>
                    {/*two*/}
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ2-2" aria-expanded="false">
                        How do I know which job is right for me?
                        </button>
                        <div id="FAQ2-2" className="accordion-collapse collapse" data-bs-parent="#sf-faq-accordion-2">
                            <div className="accordion-body">
                            Evaluate the job’s responsibilities, company culture, salary, location, and growth opportunities. Consider how the role aligns with your skills, values, and long-term career goals.
                            </div>
                        </div>
                    </div>
                    {/*three*/}
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ3-2" aria-expanded="false">
                        How can I improve my chances of getting hired?
                        </button>
                        <div id="FAQ3-2" className="accordion-collapse collapse" data-bs-parent="#sf-faq-accordion-2">
                            <div className="accordion-body">
                            Customize your resume and cover letter, practice interview skills, and ensure your online presence (e.g., LinkedIn) reflects your professional expertise. Networking and seeking referrals can also increase your chances.
                            </div>
                        </div>
                    </div>
                    {/*four*/}
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ4-2" aria-expanded="false">
                         Is it better to apply to many jobs or focus on a few?
                        </button>
                        <div id="FAQ4-2" className="accordion-collapse collapse" data-bs-parent="#sf-faq-accordion-2">
                            <div className="accordion-body">
                            While applying to multiple jobs increases your chances, it’s crucial to focus on quality. Tailor your applications to positions that truly match your skills and goals.
                            </div>
                        </div>
                    </div>
                    {/*five*/}
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ5-2" aria-expanded="false">
                        How should I prepare for a job interview?
                        </button>
                        <div id="FAQ5-2" className="accordion-collapse collapse" data-bs-parent="#sf-faq-accordion-2">
                            <div className="accordion-body">
                            Research the company, understand the job role, and prepare answers to common interview questions. Also, have a few questions ready to ask the interviewer to show your interest.
                            </div>
                        </div>
                    </div>
                    {/*six*/}
                    <div className="accordion-item">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#FAQ6-2" aria-expanded="false">
                        How do I negotiate my salary?
                        </button>
                        <div id="FAQ6-2" className="accordion-collapse collapse" data-bs-parent="#sf-faq-accordion-2">
                            <div className="accordion-body">
                            Research industry standards for the role you’re applying for. Be ready to discuss your skills, experience, and the value you bring. Approach the negotiation professionally and consider benefits, flexibility, and other perks.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionFaqJobs;