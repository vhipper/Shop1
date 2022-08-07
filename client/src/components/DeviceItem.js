import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from '../assets/star.svg';
import { useNavigate } from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";

const DeviceItem = observer(({device}) => {
    const navigate = useNavigate();
    return (
        <Col md={3} className={'mt-3'} onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                       <div>{device.rating}</div>
                        <Image width={15} height={15} src={star}/>
                    </div>
                </div>
                <div>{device.name}</div>
                <div className="mt-3 "
                     style={{fontSize: '20px', color: "#e31c02", fontWeight: '550'}}>
                    {device.price} ₽
                </div>
            </Card>
        </Col>
    );
});

export default DeviceItem;