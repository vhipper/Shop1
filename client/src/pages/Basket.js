import React, {useEffect, useState} from 'react';
import { useContext } from 'react';
import { Context } from '..';
import {deleteFromBasket, getBasket} from '../http/deviceAPI';
import {Button, Card, Col, Container, Image, Row} from 'react-bootstrap'
import { observer } from 'mobx-react-lite';
import Stop from "../assets/Stop.svg";
import "../Styles/Basket.css";

const Basket = observer(() => {
    const {device} = useContext(Context)

    useEffect(() => {
        getBasket().then(data => device.setBaskets(data))
    }, [])

    const refreshPage = () => {
        window.location.reload();
    }

    const _delete = (id) => {
        deleteFromBasket(id).then().then(response => refreshPage())

    }

    const addDelivery = () => {
        alert("Ваш заказ будет доставлен вам в ближайшее время")
    }

    let prices = 0;
    {device.basket.map(price =>
        prices += Number(price.device.price)
    )}

    return (
        <Container
            className="Cont1"
        >
            <h1 className="Korzina">Корзина</h1>
            {device.basket.map(product =>
                <Card className="Card1" key={product.id}>
                    <Row className="d-flex w-100">
                        <Col>
                            <div className="d-flex flex-row align-items-center">
                                <Image className="StopIcon" src={Stop} onClick={() => _delete(product.id)}/>
                                <img src={process.env.REACT_APP_API_URL + product.device.img} width={90} style={{marginLeft: '40px'}}/>
                                <h1 className="pl-3">{product.device.name}</h1>
                            </div>
                        </Col>
                        <Col>
                            <div className="d-flex h-100 flex-row justify-content-end align-items-center">
                                <h2 className="font-weight-light" style={{fontSize: '30px'}}>{product.device.price} ₽</h2>
                            </div>
                        </Col>
                    </Row>
                </Card>
            )}
            <Card className="Card2 ">
                <h1 className="hh1">Итого: {prices} ₽</h1>
                <Button
                    variant={"outline-success"}
                    className="btn1"
                    onClick={addDelivery}
                >
                    Заказать
                </Button>
            </Card>
        </Container>
    );
});

export default Basket;