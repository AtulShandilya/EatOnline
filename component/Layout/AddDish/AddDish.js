import AddDishForm from "./AddDishForm";
import Card from '../../UI/Card/Card'
import './AddDish.css'
const AddDish=(props)=>{
    return(
        <Card className={'new-dish'}>
            <div className={"dish-note"}>Add New Dish</div>
            <AddDishForm />
        </Card>
    )

}
export default AddDish