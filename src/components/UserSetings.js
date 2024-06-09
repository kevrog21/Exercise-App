
export default function Settings() {
    return (
        <main>
            <div className='settings-contianer page-margin-top'>
                <div className='settings-header'>Settings</div>
                <form>
                    <label htmlFor="theme">Theme</label>
                    <select 
                        className='theme-input'
                        name="theme"
                        value={''}
                        onChange={console.log('changed')}
                    >
                        <option value="light-mode">light mode</option>
                        <option value="dark-mode">dark mode</option>
                        <option value="beast-mode">beast mode</option>
                    </select>
                </form>
            </div>
        </main>
    )
}