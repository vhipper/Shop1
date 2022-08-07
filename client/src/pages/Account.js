import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Container, Image} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {Context} from "../index";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import AccountIcon from "../assets/AccountIcon.svg";
import "../Styles/Account.css";

const Account = observer(() => {
    const navigate = useNavigate();
    const {user} = useContext(Context)

    const logOut = () => {
        user.setUser({})
        user.setIsUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
        window.location.reload();
        navigate(LOGIN_ROUTE)
    }

    return (
        <Container className="Cont">
            <Image src={AccountIcon} className="Acc"/>
            <Button
                className="mt-4 p-2"
                variant={"outline-dark"}
                onClick={() => navigate(ADMIN_ROUTE)}
            >
                Партнерство
            </Button>
            <Button
                className="mt-4 p-2"
                variant={"outline-dark"}
                onClick={() => navigate(BASKET_ROUTE)}
            >
                Корзина
            </Button>
            <Button
                className="mt-4 p-2"
                variant={"outline-dark"}
                onClick={() => logOut()}
            >
                Выйти из аккаунта
            </Button>
        </Container>
    );
});

export default Account;