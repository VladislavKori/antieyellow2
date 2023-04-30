import { useRoutes } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux';

// types
import { RootState } from '../redux/store'

// rotes
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { adminRoutes } from './admin';

const AppRoutes = () => {

    const {isAuth, isAdmin} = useAppSelector(state => state.auth);

    const routes = isAuth ? [...protectedRoutes, ...publicRoutes] : publicRoutes;
    const allroutes = isAdmin ? [...routes, ...adminRoutes] : [...protectedRoutes, ...publicRoutes];
    const element = useRoutes([...allroutes]);
    return <>{element}</>

}

export { AppRoutes }