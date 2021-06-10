import classes from './Footer.module.css'
import ContactsRestaurant from './ContactsRestaurant'
import FollowRestaurant from './FollowRestaurant'
const Footer=()=>{

    return(
        <div className={classes.footer}>
            <ContactsRestaurant/>
            {/*<FollowRestaurant></FollowRestaurant>*/}
        </div>
    )
}

export default Footer