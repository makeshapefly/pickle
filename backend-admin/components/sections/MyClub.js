export default function MyClub({ user }) {

    return (
        <>

            <div className="wg-goal">
                <div className="image">
                    <img src="/images/images-section/goal.jpg" alt="" />
                </div>
                <div className="left">
                    <h5 className="mb-14">Hello {user && user.firstName}</h5>
                    <div className="body-text mb-14">
                        <div className="block-not-available" style={{ background: '#FFF', color: '#000', fontSize: '18px' }}>{user && user.orgName}</div>
                    </div>
                </div>
                <div className="left">
                
                </div>
            </div>
        </>
    )
}
