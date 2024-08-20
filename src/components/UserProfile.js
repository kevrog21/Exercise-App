import BackButton from "./BackButton"

export default function UserProfile() {
    return (
        <main>
            <div className='page-margin-top'>
                <BackButton />
                <div>username: </div>
                <div>email: </div>
                <div>account created on: </div>
                <div>active challenges: </div>
                <div className="red">delete account</div>
                <div></div>
            </div>
        </main>
    )
}