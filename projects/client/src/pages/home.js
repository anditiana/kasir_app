import React, {useEffect, useState } from "react";
import { Col, Container, Form, FormControl, InputGroup, Pagination, Row } from "react-bootstrap";
import {ItemCard, ListCategories, NavbarComponents, ResultComp} from "../components"
import Axios from "axios";
import swal from 'sweetalert'

const Home = () => {
  const [products, setProducts] = useState([]); //menus
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState([]);
  const getProducts = async () =>{ 
    try {
      // localhost:8000/api/user/products
      const response = await Axios.get(`http://localhost:8000/api/user/products`);
      setProducts(response.data.getProducts);
      getListCart();
    } catch (error) {
      console.log(error);
    }    
  }
  //pengerjaan disini
  const addToCart = async (value) => {
    try {
      const checkCart = await Axios.get(`http://localhost:8000/api/user/cart?productId=${value.id}`)
      
      if (checkCart.data.isExist === null) {
        const cart = {
          qty : 1,
          totalPrice : value.productPrice,
          detail : value
        }

        const setCart = await Axios.put("http://localhost:8000/api/user/cart", cart)
        .then(res => {
          getListCart();
          swal({
            title: "Sukses masuk keranjang",
            text: `${cart.detail.productName} Berhasil ditambah`,
            icon: "success",
            button: false,
            timer : 1500
          });
        })
      }else{
        const prodId = checkCart.data.isExist.productId;
        const cart = {
          qty : Number(checkCart.data.isExist.qty) + 1,
          totalPrice : Number(value.productPrice) + Number(checkCart.data.isExist.totalPrice) ,
          detail : value
        }
        const setCart = await Axios.put(`http://localhost:8000/api/user/cart/${prodId}`, cart)
        .then(res =>{
          getListCart();
          swal({
            title: "Sukses masuk keranjang",
            text: `${cart.detail.productName} Berhasil ditambah`,
            icon: "success",
            button: false,
            timer : 1500
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const changeCategory = async (value) => {
    try {
      setProducts([]);
      setCategory(value); 
      // localhost:8000/api/user/products
      const response = await Axios.get(`http://localhost:8000/api/user/products?categoryId=${value}`);
      setProducts(response.data.getProducts);
    } catch (error) {
      console.log(error);
    } 
  }


  async function getListCart() { //update list cart
    const getCart = await Axios.get('http://localhost:8000/api/user/getCart');
    setCart(getCart.data.result)
  }

  useEffect(()=>{
    getProducts();
    addToCart();
  }, []);
  
  function formatRupiah(number) {
    var formattedRupiah = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `Rp ${formattedRupiah}`;
  }
  const handleChange = async (event) => {
    setSearch(event.target.value);
    const findProduct = await Axios.get(`http://localhost:8000/api/user/search?key=${search}&cat=${category}`)
    setProducts(findProduct.data.result);
  }

  return( 
    <>
    <NavbarComponents />
    <div className="mt-4">
      <Container fluid>
        <Row>
          <ListCategories 
            changeCategory = {changeCategory}
            pickedCategory= {category}
          />
          <Col className="border py-2 m-2">
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Search Menu's"
                aria-label="Search Menu's"
                aria-describedby="basic-addon2"
                onChange={handleChange}
              />
              <InputGroup.Text id="basic-addon2">Search</InputGroup.Text>
            </InputGroup>

            
            {products.length > 0 ? (
              <Row xs={1} sm={4} md={3} lg={5} className="g-2">
                {products.map((value)=>{
                  return(
                    <ItemCard 
                    key={value.id}
                    details={value}
                    addToCart={addToCart}
                    />
                  )
                })}
              </Row>
            ):(<p></p>)}
            
          </Col>
          <ResultComp cart = {cart} />
        </Row>
      </Container>

    </div>
 </>
  );
}

export default Home;

