import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Image, Nav, Navbar} from "react-bootstrap";
import {ACCOUNT_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import AccountIcon from "../assets/AccountIcon.svg"
import Shopping from "../assets/shopping.svg"

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate();



    return (
            <Navbar bg="dark" variant="dark">
                <Container className="m-auto">
                    <NavLink style={{color: "white"}} to={SHOP_ROUTE}>Утана</NavLink>
                    {user.isAuth ?
                        <Nav className="ms-auto" style={{color: "white"}}>
                            <button
                                onClick={() => navigate(ACCOUNT_ROUTE)}
                                style={{backgroundColor: '#212529', border: 'none'}}
                            >
                                <Image width={30} height={30} src={AccountIcon}/>
                            </button>
                            <button
                                onClick={() => navigate(BASKET_ROUTE)}
                                style={{backgroundColor: '#212529', border: 'none'}}
                            >
                                <Image width={30} height={30} src={Shopping}/>
                            </button>
                        </Nav>
                        :
                        <Nav className="ms-auto" style={{color: "white"}}>
                            <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                        </Nav>
                    }
                </Container>
            </Navbar>
    );
});

export default NavBar;