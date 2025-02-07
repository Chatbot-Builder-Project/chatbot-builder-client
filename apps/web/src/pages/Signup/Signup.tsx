import { useRegisterMutation } from "@chatbot-builder/store/API/Auth";
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
} from "./Signup.styles";
import { ApiError, SignupFormInputs } from "./types";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const Signup: React.FC = () => {
  const [register, { isLoading, error }] = useRegisterMutation();
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      const { _confirmPassword, ...registerData } = data;
      await register(registerData).unwrap();
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  const apiError = error as ApiError;

  return (
    <Container>
      <FormWrapper>
        <Title>Create Account</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              {...registerField("email")}
              type="email"
              placeholder="Email"
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>

          <div>
            <Input
              {...registerField("password")}
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          <div>
            <Input
              {...registerField("confirmPassword")}
              type="password"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
            )}
          </div>

          {apiError && (
            <ErrorMessage>
              {apiError.detail || "Registration failed"}
            </ErrorMessage>
          )}

          {apiError?.data?.errors &&
            Object.entries(apiError.data.errors).map(([key, value]) => (
              <ul key={key}>
                {value.map((err, index) => (
                  <li key={`${key}-${index}`}>
                    <ErrorMessage>{err}</ErrorMessage>
                  </li>
                ))}
              </ul>
            ))}

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </SubmitButton>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default Signup;
