import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";

const Payment = ({ cart }) => {
  // console.log(cart.totalPrice);
  function formatRupiah(number) {
    var formattedRupiah = number
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `Rp ${formattedRupiah}`;
  }
  const totals = cart.reduce(function (result, item) {
    return result + item.totalPrice;
  }, 0);
  return (
    // <div //className="fixed-bottom"> 
    
      <Form>
        <Row className="mb-3">
          <Col className="px-3 mt-2 " >
          <FloatingLabel controlId="BuyerCash" label="Cash" style={{fontSize:'20px'} }>
            <Form.Control
              type="text"
              // id="BuyerCash"
              aria-describedby="passwordHelpBlock"
              className="border-0  border-bottom border-success shadow-none rounded-0"
              style={{textAlign:'right'}}
            />
          </FloatingLabel>
          </Col>
        </Row>
        <Row >
          <Col  className="px-3">
            <h5>Total Harga : </h5>
            <h5 style={{ textAlign: "right" }}>
              <strong>{formatRupiah(totals)}</strong>
            </h5>
            <Button 
              variant="outline-success"
              style={{width:'100%', marginBottom : 10, borderRadius:0}} 
              // onClick={}  
            >
              <FontAwesomeIcon icon={faShoppingCart} /> <strong>Checkout</strong>
            </Button>
          </Col>
        </Row>
      </Form>
  );
};

export default Payment;
