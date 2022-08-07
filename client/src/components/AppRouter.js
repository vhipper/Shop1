import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {Context} from "../index";
import Shop from "../pages/Shop";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
              <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
              <Route key={path} path={path} element={<Component/>}/>
            )}
            <Route path="*" element={<Shop/>}/>
        </Routes>
    );
});

export default AppRouter;








