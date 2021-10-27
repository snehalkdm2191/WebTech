import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Container } from 'reactstrap';
import IPageProps from '../interfaces/page';
import { useUsers } from "../state/UsersProvider";

const HomePage: React.FunctionComponent<IPageProps> = props => {
    const { user }:any = useUsers();
    console.log("user",user);
    return (
        <Container>
            <Card>
                <CardBody>
                    <p>
                        Welcome to our page @<b>{user.role}</b>@
                    </p>
                    <p>
                        Change your password <Link to="/change">here</Link>.
                    </p>
                    <p>
                        Click <Link to='/logout'>here</Link> to logout.
                    </p>
                </CardBody>
            </Card>
        </Container>
    );
}

export default HomePage;