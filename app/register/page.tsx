import Container from "../../components/Container";
import FormWrap from "../../components/FormWrap";
import RegisterForm from "./RegisterForm";

const register = () => {
    return ( 
    <Container>
        <FormWrap>
            <RegisterForm/>
        </FormWrap>
    </Container> );
}
 
export default register;