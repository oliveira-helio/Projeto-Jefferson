import Container from "../../components/Container";
import FormWrap from "../../components/FormWrap";
import LoginForm from "./LoginForm";


const login = () => {
    return ( 
    <Container>
        <FormWrap>
            <LoginForm/>
        </FormWrap>
    </Container> );
}
 
export default login;