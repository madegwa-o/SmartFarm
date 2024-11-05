
import styles from './Settings.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


function Settings() {



        return (
        <div className={styles.settingsContainer}>
           <div className={styles.settingsCard} >
                <i className="fas fa-user-edit"></i>
                <h2>Change Profile</h2>
            </div>

            {/* Delete Account Button */}
            <div className={styles.settingsCard} >
                <i className="fas fa-trash-alt"></i>
                <h2>Delete My Account</h2>
            </div>

           <div className={styles.settingsCard} >
               <i className="fas fa-shield-alt"></i> {/* Icon for Security Settings */}
               <h2>Change password</h2>
           </div>

           <div className={styles.settingsCard}>
               <i className="fas fa-bell"></i> {/* Icon for Notification Settings */}
               <h2>Notification Settings</h2>
           </div>
           <div className={styles.settingsCard} >
               <i className="fas fa-user-secret"></i> {/* Icon for Privacy */}
               <h2>Privacy</h2>
           </div>

        </div>
    );
}

export default Settings;
