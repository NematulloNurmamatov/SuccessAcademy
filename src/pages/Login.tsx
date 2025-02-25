import { useState } from "react";
import { login } from "../services/auth";
import bgImg from "../assets/loginBg.png";
import logo from "../assets/logo 1.png";
import { Form, Input, Button, Card, message } from "antd";

const Login = () => {
    const [loading, setLoading] = useState(false);

    const handleLogin = async (values: { username: string; password: string }) => {
        setLoading(true);
        try {
            const data = await login(values);
            console.log("Login successful:", data);
            localStorage.setItem("token", data.token);
            message.success("Login successful!");
        } catch (err) {
            message.error("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgImg})` }}>
            <Card className="w-96 shadow-2xs" title={<img src={logo} alt="Success Academy Logo" className="mx-auto w-[70%] mt-10" />}>
                <h2 className="text-2xl text-[#334D6E] font-bold text-center">Welcome!</h2>
                <Form layout="vertical" onFinish={handleLogin}>
                    <Form.Item name="username" label="Username" rules={[{ required: true, message: "Please enter your username!" }]}>
                        <Input placeholder="Input Login" />
                    </Form.Item>
                    <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please enter your password!" }]}>
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
