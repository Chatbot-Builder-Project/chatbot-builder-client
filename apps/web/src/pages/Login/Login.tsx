import { useLoginMutation } from "@chatbot-builder/store/API/Auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Container,
  FormWrapper,
  Title,
  Input,
  ErrorMessage,
  SubmitButton,
  FormContainer,
} from "./Login.styles";
import { LoginFormInputs } from "./types";
import { useNavigate, useLocation } from "react-router-dom";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    login(data)
      .unwrap()
      .then((response) => {
        if (response) {
          localStorage.setItem("token", response.accessToken);
          navigate(location.state?.from || "/");
        }
      })
      .catch(() => {
        /* empty */
      });
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Login</Title>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input {...register("email")} type="email" placeholder="Email" />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>

          <div>
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </SubmitButton>
        </FormContainer>
      </FormWrapper>
    </Container>
  );
};

export default Login;
