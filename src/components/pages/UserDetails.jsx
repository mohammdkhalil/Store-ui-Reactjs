import { useContext } from "react";
import { AppContext } from "../layout/Layout";
import { Card, Button } from "react-bootstrap";

export default function UserDetailsPage() {
    const appContext = useContext(AppContext);
    
    
    const getStatistics = async () => {
        try {
            const response = await fetch('statistics');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching statistics:', error);
            return null;
        }
    };
    
    return (
        <div className="user-details-page">
            <h1>User Details Page</h1>
            <Card>
                <Card.Body>
                    <Card.Title>{appContext.appState?.user?.name}</Card.Title>
                    <Card.Text>
                        Email: {appContext.appState?.user?.email}
                    </Card.Text>
                </Card.Body>
            </Card>
           

        </div>
    );
}
