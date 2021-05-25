import classes from './Footer.module.css'
const Footer=()=>{

    return(
        <div className={classes.footer}>
            <ContactsRestautant/>
            <FollowRestaurant></FollowRestaurant>
        </div>
    )
}

export default Footer