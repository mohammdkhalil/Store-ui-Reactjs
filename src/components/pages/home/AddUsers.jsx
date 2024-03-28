import { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Api from "../../../tools/api";
import { AppContext } from "../../layout/Layout";
import Button from "react-bootstrap/Button";

export default function AddUser() {
    
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    });
    
    const appContext = useContext(AppContext);

    const AddUser = async () => {
        // التحقق من توفر البيانات المطلوبة
        if (
            state.name == null || state.name.length === 0 ||
            state.email == null || state.email.length === 0 || 
            state.password == null || state.password.length === 0 
        ) {
            appContext.showPopup("Please enter all element values");
            return;
        }
    
        try {
            // إرسال طلب لإضافة فئة جديدة
            const response = await Api.fetch({
                url: "users",
                body: state,
                method: "POST",
                showPopup: appContext.showPopup,
            });
            if (response != null) {
                appContext.showPopup(response.message);
            }
        } catch (error) {
            console.error(error);
            appContext.showPopup("An error occurred. Please try again later.");
        }
        // إعادة توجيه المستخدم إلى الصفحة الرئيسية بعد إضافة مستخدم بنجاح
        window.location.href = '/AllUsers'
    };
    

    return (
        <>
            <Form>
                {/* حقول إدخال لاسم الفئة ووصفها ورابط الصورة */}
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name"
                        onChange={(e) => {
                            setState({ ...state, name: e.target.value });
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={(e) => {
                            setState({ ...state, email: e.target.value });
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {
                            setState({ ...state, password: e.target.value });
                        }}
                    />
                </Form.Group>

                {/* زر لإرسال البيانات وإضافة الفئة */}
                <Button onClick={(e) => {
                    AddUser()
                    e.preventDefault()
                }} variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}
