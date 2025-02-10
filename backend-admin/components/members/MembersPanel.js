
import ChatList from "../chart/ChartList"

export default function MembersPanel() {
    return (
        <>
            <div className={`wg-chart-default`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap14">
                        <div className="image type-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width={48} height={52} viewBox="0 0 48 52" fill="none">
                                <path d="M19.1094 2.12943C22.2034 0.343099 26.0154 0.343099 29.1094 2.12943L42.4921 9.85592C45.5861 11.6423 47.4921 14.9435 47.4921 18.5162V33.9692C47.4921 37.5418 45.5861 40.8431 42.4921 42.6294L29.1094 50.3559C26.0154 52.1423 22.2034 52.1423 19.1094 50.3559L5.72669 42.6294C2.63268 40.8431 0.726688 37.5418 0.726688 33.9692V18.5162C0.726688 14.9435 2.63268 11.6423 5.72669 9.85592L19.1094 2.12943Z" fill="#22C55E" />
                            </svg>
                            <i className="icon-users" />
                        </div>
                        <div>
                            <div className="body-text mb-2">Total Members</div>
                            <h4>180</h4>
                        </div>
                    </div>
                    <div className="body-text mb-2">
                    <a class="tf-button style-1 w208" href="/members">List Members</a>
                    </div>
                </div>
                <div className="wrap-chart">
                    <ChatList style={1} color="#22C55E" />
                </div>
            </div>
        </>
    )
}