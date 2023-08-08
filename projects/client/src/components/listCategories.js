import React, {useEffect, useState} from "react";
import { Col, ListGroup } from "react-bootstrap";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faCoffee, faCheese } from "@fortawesome/free-solid-svg-icons";

const Icon = ({nama}) => {
  if(nama === 'Food') return <FontAwesomeIcon icon={faUtensils} />
  if(nama === 'Drink') return <FontAwesomeIcon icon={faCoffee} />
  if(nama === 'Dessert') return <FontAwesomeIcon icon={faCheese} className="mr-2"/>
}


const ListCategories = (props) => {
  const [categories, setCategories] = useState([]);
  const {changeCategory, pickedCategory} = props;
  const getCategories = async () => {
    try {
      const response = await Axios.get("http://localhost:8000/api/user/categories");
      setCategories(response.data.getCategories)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getCategories();
  },[]);

  return(
    <Col md={2} className="border py-2 m-2">
      <h4 ><strong>Category</strong></h4>
      <hr />
      <ListGroup >
        {categories && categories.map((v)=>{
          const cat = `${v.category.charAt(0).toUpperCase()}${v.category.slice(1)}`;
          return(
            <ListGroup.Item 
              key={v.id} 
              style={{borderRadius:'0px', cursor:"pointer"}} 
              onClick={()=>{changeCategory(v.id)}}
              className={pickedCategory === v.id && "category-aktif" }
            >
              <h5>
                <Icon nama={cat}/> {cat}
              </h5>
            </ListGroup.Item>
          )
        })}
      </ListGroup>
   </Col>
  );
}

export default ListCategories;