import React, {useContext, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Facebook from "../assets/Facebook.svg";
import Twitter from "../assets/twitter.svg";
import Google from "../assets/Google.svg";
import "../Styles/Auth.css";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(user)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card
                className="Card p-5"
            >
                <Row className="mt-5">
                    <h2 className="Login">
                        {isLogin ? 'Авторизация' : "Регистрация"}
                    </h2>
                    <h2 className="Please">
                        Пожалуйста введите логин и пароль!
                    </h2>
                </Row>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="Inp mt-5"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="Inp mt-4"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <div className="Button">
                        <button
                            className="Btn"
                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </button>
                    </div>
                    <div className="DivImg">
                        <img src={Facebook} className="Icon"/>
                        <img src={Twitter} className="Icon"/>
                        <img src={Google} className="Icon"/>
                    </div>
                        <Row className="d-flex m-auto mt-5">
                        {isLogin ?
                            <div style={{color: 'white'}}>
                                Нет аккаунта? <NavLink  to={REGISTRATION_ROUTE} style={{color: '#909090'}} >Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div style={{color: 'white'}}>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE} style={{color: '#909090'}}>Войдите!</NavLink>
                            </div>
                        }
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Auth;