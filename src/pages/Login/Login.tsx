import Swal from "sweetalert2";
import { Button, Checkbox, Form, Grid, Input, theme, Typography } from "antd";
const { useBreakpoint } = Grid;
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router";

import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useRef } from "react";
import { useCaptcha } from "../../hooks/useCaptcha";
import { validateUser } from "../../utils/user";
const { useToken } = theme;
const { Text, Title, Link } = Typography;

const SITE_KEY = import.meta.env.VITE_SITE_KEY;

interface loginData {
  email: string;
  password: string;
  remember: boolean;
}
export function Login() {
  const { token } = useToken();
  const screens = useBreakpoint();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const navigate = useNavigate();
  const { handleCaptchaChange, isCaptchaVerified } = useCaptcha();

  const onFinish = (values: loginData) => {
    if (!isCaptchaVerified) {
      Swal.fire({
        title: "Error!",
        text: "Por favor, verifica que no eres un robot",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
      return;
    }

    if (validateUser(values.email, values.password)) {
      Swal.fire({
        title: "Bienvenido!",
        text: "Has iniciado sesión correctamente",
        icon: "success",
        confirmButtonText: "Cerrar",
      });
      // Redirect to characters page
      navigate("/characters");
    } else {
      Swal.fire({
        title: "Error!",
        text: "Usuario o contraseña incorrectos",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  const styles = {
    container: {
      margin: "0 auto",
      display: "flex",
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center",
      width: "100%",
    },
    forgotPassword: {
      float: "right",
    },
    header: {
      marginBottom: token.marginXL,
    },
    section: {
      backgroundColor: token.colorBgContainer,
      height: screens.sm ? "100vh" : "auto",
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
    login: {
      width: screens.sm && screens.md ? "40%" : "100%",
      display: "flex",
      flexDirection: "column",
      padding: screens.xl ? "140px 80px" : "80px 20px",
    },
    loginImage:
      screens.sm && screens.md
        ? {
            width: "60%",
            height: "100vh",
          }
        : {
            display: "none",
          },
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.loginImage}>
          <img
            style={{ width: "100%" }}
            src="https://images.unsplash.com/photo-1534239697798-120952b76f2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80"
            alt="React Logo"
          />
        </div>
        <div className="login-form" style={styles.login as any}>
          <div style={styles.header}>
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.464294"
                width="24"
                height="24"
                rx="4.8"
                fill="#1890FF"
              />
              <path
                d="M14.8643 3.6001H20.8643V9.6001H14.8643V3.6001Z"
                fill="white"
              />
              <path
                d="M10.0643 9.6001H14.8643V14.4001H10.0643V9.6001Z"
                fill="white"
              />
              <path
                d="M4.06427 13.2001H11.2643V20.4001H4.06427V13.2001Z"
                fill="white"
              />
            </svg>

            <Title style={styles.title}>Inicio de sesión</Title>
            <Text style={styles.text}>
              Inicia sesión para acceder a tu cuenta
            </Text>
          </div>
          <Form
            name="normal_login"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            layout="vertical"
            requiredMark="optional"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Por favor ingrese su correo electrónico!",
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Correo" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese su contraseña!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Contraseña"
              />
            </Form.Item>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={SITE_KEY}
              onChange={handleCaptchaChange}
            />
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Recordarme</Checkbox>
              </Form.Item>
              <a style={styles.forgotPassword as any} href="">
                ¿Olvidaste tu contraseña?
              </a>
            </Form.Item>
            <Form.Item style={{ marginBottom: "0px" }}>
              <Button block={true} type="primary" htmlType="submit">
                Iniciar sesión
              </Button>
              <div style={styles.footer as any}>
                <Text style={styles.text}>¿No tienes una cuenta? </Text>
                <Link href="">Registrate ahora</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
}
