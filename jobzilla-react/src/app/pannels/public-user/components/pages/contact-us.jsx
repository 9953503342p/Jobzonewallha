function ContactUsPage() {
    return (
        <>
            <div className="section-full twm-contact-one">
                <div className="section-content">
                    <div className="container">
                        {/* CONTACT FORM*/}
                        <div className="contact-one-inner">
                            <div className="row">
                                <div className="col-lg-6 col-md-12">
                                    <div className="contact-form-outer">
                                        {/* title="" START*/}
                                        <div className="section-head left wt-small-separator-outer">
                                            <h2 className="wt-title">Send Us a Message</h2>
                                            <p>Feel free to contact us and we will get back to you as soon as we can.</p>
                                        </div>
                                        {/* title="" END*/}
                                        <form className="cons-contact-form" method="post">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group mb-3">
                                                        <input name="username" type="text" required className="form-control" placeholder="Name" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group mb-3">
                                                        <input name="email" type="text" className="form-control" required placeholder="Email" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group mb-3">
                                                        <input name="phone" type="text" className="form-control" required placeholder="Phone" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <div className="form-group mb-3">
                                                        <input name="subject" type="text" className="form-control" required placeholder="Subject" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-group mb-3">
                                                        <textarea name="message" className="form-control" rows={3} placeholder="Message" defaultValue={""} />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <button type="submit" className="site-button">Submit Now</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12">
                                    <div className="contact-info-wrap">
                                        <div className="contact-info">
                                            <div className="contact-info-section">
                                                <div className="c-info-column">
                                                    <div className="c-info-icon"><i className=" fas fa-map-marker-alt" /></div>
                                                    <h3 className="twm-title">In the bay area?</h3>
                                                    <p>Suite No. 1164, 15A, 4th Floor, A Building City Vista, Fountain Road Kharadi, Pune - 411014</p>
                                                </div>
                                                <div className="c-info-column">
                                                    <div className="c-info-icon custome-size"><i className="fas fa-mobile-alt" /></div>
                                                    <h3 className="twm-title">Feel free to contact us</h3>
                                                    <p><a href="tel:+216-761-8331">9527793571</a></p>
                                                </div>
                                                <div className="c-info-column">
                                                    <div className="c-info-icon"><i className="fas fa-envelope" /></div>
                                                    <h3 className="twm-title">Support</h3>
                                                    <p>info@jobzonwallah.com</p>
                                                </div>
                                                <div className="c-info-column">
                                                  <a href="https://www.instagram.com/jobzonwallah?igsh=MWtuYmthM2hoazY4dg==">  <div className="c-info-icon"><i className="fab fa-instagram" /></div></a>
                                                    <h3 className="twm-title">Instagram</h3>
                                                    <p><a href="https://www.instagram.com/jobzonwallah?igsh=MWtuYmthM2hoazY4dg==">jobzonwallah</a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="gmap-outline">
                <div className="google-map">
                    <div style={{ width: '100%' }}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d7564.729298521983!2d73.94167734136255!3d18.557591980172468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sSuite%20No.%201164%2C%2015A%2C%204th%20Floor%2C%20A%20Building%20City%20Vista%2C%20Fountain%20Road%20Kharadi%2C%20Pune%20-%20411014!5e0!3m2!1sen!2sin!4v1738314720139!5m2!1sen!2sin" style={{width:'100%',height:'450px' ,border:'0px'  }}  />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactUsPage;