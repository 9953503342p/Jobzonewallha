import { useEffect } from "react";
import SectionCanChat from "../sections/chat/section-can-chat";
import SectionCanChatList from "../sections/chat/section-can-chat-list";
import { loadScript } from "../../../../globals/constants";

import { useNavigate } from "react-router-dom"; 

function CanChatPage() {

    const navigate = useNavigate();
    
    useEffect(() => {
        // Check for candidateId in cookies
        const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
            const [key, value] = cookie.split("=");
            acc[key] = value;
            return acc;
        }, {});

        if (!cookies.candidateId) {
            // Redirect to login page if candidateId cookie is not present
            navigate("/after-login");
        }
    }, [navigate]);

    useEffect(()=>{
        loadScript("js/custom.js")
    })

    return (
        <>
            <div className="twm-right-section-panel site-bg-gray">
                <div className="wt-admin-dashboard-msg-2  twm-dashboard-style-2">
                    
                    {/*Left Msg section*/}
                    <SectionCanChatList />

                    {/*Right Msg section*/}
                    <SectionCanChat />

                </div>
            </div>

        </>
    )
}

export default CanChatPage;