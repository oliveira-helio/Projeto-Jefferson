import RegisterForm from "@/components/Forms/RegisterForm/RegisterForm";
import Container from "../../components/Container";
import FormWrap from "../../components/Forms/FormWrap";

const register = () => {
    return ( 
    <Container>
        <FormWrap>
            <RegisterForm/>
        </FormWrap>
    </Container> );
}
 
export default register;