import { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Api from "../../../tools/api";
import { AppContext } from "../../layout/Layout";
import Button from "react-bootstrap/Button";

export default function AddCategoryPage() {
    const [state, setState] = useState({});
    const appContext = useContext(AppContext);

    // دالة لإضافة فئة جديدة
    const callAddCategory = async () => {
        // التحقق من توفر البيانات المطلوبة
        if (
            state.name == null || state.name.length === 0 ||
            state.desc == null || state.desc.length === 0 || 
            state.image == null || state.image.length === 0
        ) {
            appContext.showPopup("Please enter all element values");
            return;
        }

        try {
            // إرسال طلب لإضافة فئة جديدة
            const response = await Api.fetch({
                url: "categories",
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
        // إعادة توجيه المستخدم إلى الصفحة الرئيسية بعد إضافة الفئة بنجاح
        window.location.href = '/'
    };

    return (
        <>
            <Form>
                {/* حقول إدخال لاسم الفئة ووصفها ورابط الصورة */}
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Category Name"
                        onChange={(e) => {
                            setState({ ...state, name: e.target.value });
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Category Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Category Description"
                        onChange={(e) => {
                            setState({ ...state, desc: e.target.value });
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicImage">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Image URL"
                        onChange={(e) => {
                            setState({ ...state, image: e.target.value });
                        }}
                    />
                </Form.Group>
                {/* زر لإرسال البيانات وإضافة الفئة */}
                <Button onClick={(e) => {
                    callAddCategory()
                    e.preventDefault()
                }} variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}
