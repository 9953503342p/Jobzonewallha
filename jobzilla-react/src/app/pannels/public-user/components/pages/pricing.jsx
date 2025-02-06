import SectionPricingMonthly from "../../sections/pricing/section-pricing-monthly";
import SectionPricingAnnual from "../../sections/pricing/section-pricing-annual";
import Sectionsubscription from "../../sections/about/sectionsubscription";
import Sectionsubcategory from "../../sections/about/Sectionsubcategory";

function PricingPage() {
    return (
        <>
            <div className="section-full p-t120 p-b90 site-bg-white tw-pricing-area">
                <div className="container">
                    {/* title="" START*/}
                    <div className="section-head left wt-small-separator-outer">
                        <div className="wt-small-separator site-text-primary">
                            <div>Choose Your Plan</div>
                        </div>
                        <h2 className="wt-title">Save up to 10%</h2>
                    </div>
                    {/* title="" END*/}
                    <div className="section-content">
                        <div className="twm-tabs-style-1">
                            <ul className="nav nav-tabs" id="myTab3" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="Monthly" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab">Paid User</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="annual" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile">Free User</button>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTab3Content">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="Monthly">
                                    <SectionPricingMonthly />
                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="annual">
                                    <SectionPricingAnnual />
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div>
                       <Sectionsubscription /> 
                    </div>
                    <div>
                       <Sectionsubcategory /> 
                    </div>
                </div>
             
            </div>

        </>
    )
}

export default PricingPage;