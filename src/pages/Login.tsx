import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import bgImg from "../assets/loginBg.png";
import logo from "../assets/logo 1.png";
import { Form, Input, Button, Card, message } from "antd";
import { ErrorResponse, LoginData } from "../types/Login";



const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 

    const handleLogin = async (values: LoginData) => {
        setLoading(true);
        try {
            const loginResponse = await login(values);
            console.log("Login successful:", loginResponse);

            localStorage.setItem("token", loginResponse.access);
            localStorage.setItem("refresh_token", loginResponse.refresh);
            localStorage.setItem("user_id", loginResponse.user_id);
            localStorage.setItem("user_role", loginResponse.user_role);


            message.success("Login successful!");

            navigate("/dashboard");
        } catch (err: any) {
            const error = err as ErrorResponse; 
            if (error.response && error.response.status === 401) {
                message.error("Incorrect username or password.");
            } else {
                message.error("An error occurred. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgImg})` }}>
            <Card className="w-96 shadow-2xs" title={<img src={logo} alt="Success Academy Logo" className="mx-auto w-[70%] mt-10" />}>
                <h2 className="text-2xl text-[#334D6E] font-bold text-center">Welcome!</h2>
                <Form layout="vertical" onFinish={handleLogin}>
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[
                            { required: true, message: "Please enter your username!" },
                            { min: 3, message: "Username must be at least 3 characters long!" }
                        ]}
                    >
                        <Input placeholder="Input Login" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            { required: true, message: "Please enter your password!" },
                            { min: 6, message: "Password must be at least 6 characters long!" }
                        ]}
                    >
                        <Input.Password placeholder="Input Password" />
                    </Form.Item>
                    <div className="text-right mb-2">
                        <a href="#" className="text-sm text-blue-500">Forgot Password?</a>
                    </div>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            {loading ? "Loading..." : "Confirm"}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
