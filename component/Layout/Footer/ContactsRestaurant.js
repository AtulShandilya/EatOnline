
import classes from './ContactsRestaurant.module.css'

const ContactRestaurant =()=>{

        return(
            <div className={classes.aboutRestaurant}>
                <h1> ABOUT US</h1>
                <h2>______</h2>
                <div className={classes.aboutRestaurant__desc}>
                    <p>In the 1950s, all that stood in this iconic location was a car park with a small kiosk.
                        Even then it was the best spot for uninterrupted pan-oramic views of Adelaide, with the
                        address a tourist destination in itself. In October 1985,
                        JazzRestaurant as we know it today opened.</p>
                    <p>Every detail was custom designed to maximise the benefits of this stunning location.
                        Open all week from 10:30 AM until 12:00 PM. On Friday and Saturday until 1:00 AM.
                        Kitchen open 11:30 AM until 10:30 PM. Fridays and Saturdays until 11:30 PM.
                        Free WiFi available!</p>
                </div>
            </div>
        )
}

export default ContactRestaurant