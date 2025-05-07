import Container from "../../components/Container";
import FormWrap from "../../components/Forms/FormWrap";
import LoginForm from "../../components/Forms/LoginForm/LoginForm";


const login = () => {
    return ( 
    <Container>
        <FormWrap>
            <LoginForm/>
        </FormWrap>
    </Container> );
}
 
export default login;