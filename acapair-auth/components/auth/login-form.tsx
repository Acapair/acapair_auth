import CardWrapper from "./card-wrapper";

const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="Tekrar Hoş Geldiniz!"
      backButtonLabel="Hesabınız yok mu?"
      backButtonHref="/auth/register"
      showSocial
    >
      Login
    </CardWrapper>
  );
};

export default LoginForm;
