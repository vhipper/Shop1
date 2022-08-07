import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import star from "../assets/star.svg"
import {useParams} from 'react-router-dom'
import {addToBasket, createBrand, createRating, fetchOneDevice} from "../http/deviceAPI";
import {observer} from "mobx-react-lite";
import "../Styles/Device.css";

const DevicePage = observer(() => {
    const [device, setDevice] = useState({info: []})
    const [value, setValue] = useState('')
    const {id} = useParams()

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])

    const add = () => {
        const formData = new FormData()
        formData.append('deviceId', id)
        addToBasket(formData).then(response => alert(`Товар ` + device.name + ` был добавлен в вашу корзину!`))
    }

    const addRating = () => {
        createRating({name: value}).then(data => {
            setValue('')
        })
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <div
                            className="rating d-flex align-items-center justify-content-center"
                            data-total-value="0"
                        >
                            <div className="rating__item" setValue="5" onClick={addRating} onChange={e => setValue(e.target.value)}><img src={star} width={20}/></div>
                            <div className="rating__item" setValue="4" onClick={addRating}><img src={star} width={20}/></div>
                            <div className="rating__item" setValue="3" onClick={addRating}><img src={star} width={20}/></div>
                            <div className="rating__item" setValue="2" onClick={addRating}><img src={star} width={20}/></div>
                            <div className="rating__item" setValue="1" onClick={addRating}><img src={star} width={20}/></div>
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>{device.price} ₽.</h3>
                        <Button variant={"outline-dark"} onClick={add} >Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
});

export default DevicePage;