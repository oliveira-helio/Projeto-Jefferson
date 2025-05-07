import Container from "../../components/Container";
import FormWrap from "../../components/Forms/FormWrap";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

const register = () => {
    return ( 
    <Container>
        <FormWrap>
            <RegisterForm/>
        </FormWrap>
    </Container> );
}
 
export default register;