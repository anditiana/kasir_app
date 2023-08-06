import React from "react";
import { Card, Button, Col, Row } from 'react-bootstrap'
const ItemCard = ({details, addToCart}) => {
  function formatRupiah(number) {
    var formattedRupiah = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `Rp ${formattedRupiah}`;
  }
  return(
      <Col sm={6}>
        <Card 
          style={{borderRadius:'0px', boxShadow:'0 1px 1px rgba(0,0,0,0.19), 0 1px 1px rgba(0,0,0,0.23)' }}
        >
          <Card.Img src={`http://localhost:8000/productImg/${details.productImg}`}  style={{width:'100%', height:'160px',objectFit:'cover', borderRadius:'0px'}} />
          <Card.Body>
            <Card.Title className="text-truncate" style={{fontSize:'15px'}}><strong>{details.productName}</strong></Card.Title>
            <Card.Subtitle style={{fontSize:'12px', textAlign: "right"}} >{formatRupiah(details.productPrice)}</Card.Subtitle>
            <Card.Text className="text-truncate" style={{fontSize:'13px', maxHeight:'5vh', overflow:"hidden", marginTop:'2px'}}>{details.productDesc}</Card.Text>
            <div className="d-grid gap-2" style={{textAlign:'center', margin:'0'}}>
              <Button className="btn-block" size="sm" variant="outline-success" style={{borderRadius:'0px'}} onClick={()=> addToCart(details)}>Tambah</Button>
            </div>   
          </Card.Body>
        </Card>
      </Col>
  );
}

export default ItemCard;