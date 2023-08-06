import React from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import Payment from "./payments";
const ResultComp = ({cart}) => {
  function formatRupiah(number) {
    var formattedRupiah = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `Rp ${formattedRupiah}`;
  }
  return(
      <Col md={3} mt={2}>
        <h4><strong>Cart Order's</strong></h4>
        <hr />
        <Row className="px-2">
          <Col className="text-left "><strong > Qty</strong></Col>
          <Col className="text-left"><strong>Item</strong></Col>
          <Col className="text-center"><strong>Total</strong></Col>
        </Row>
        <Row style={{
          borderBottom: '1px solid',
          borderColor : 'rgba(25, 135, 84, 0.8)',
          maxHeight : '60vh',
          minHeight : '60vh',
          overflow:'auto',
          margin : 'auto',
          scrollbarColor : 'rgba(25, 135, 84, 0.6) rgba(25, 135, 84, 0.07)',
          scrollbarWidth : 'thin'
          }}>
          {cart.length !== 0 && (
            <ListGroup variant="flush">
              
              {cart.map((menuCart) => (
                <ListGroup.Item action variant='light' style={{fontSize:'10px'}}>
                  {/* {menuCart.productName} */}
                  <Row>
                    <Col xs={2}>
                      <h6>
                        <Badge bg="success">
                          {menuCart.qty}
                        </Badge>
                      </h6>
                    </Col>
                    <Col style={{textAlign:'left'}}>
                      <h6>{menuCart.productName}</h6>
                      <p>{formatRupiah(menuCart.productPrice)}</p>
                    </Col>
                    <Col style={{textAlign:'right'}}>
                    <p>{formatRupiah(menuCart.totalPrice)}</p>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Row>
        <Payment cart={cart}/>
      </Col>
  )
}

export default ResultComp;

