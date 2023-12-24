import { createContext, useEffect, useState } from "react";

const NotificationContext = createContext({
    notification: null, // {test, message, status}
    showNotification: (notificationData) => {},
    hideNotification: () => {}
})

export default NotificationContext;

export const NotificationContextProvider = (props) => {

    const [activeNotification, setActiveNotification] = useState();

    useEffect(()=> {
        if(activeNotification && (activeNotification.status === "success" || activeNotification.status === "error"))
        {
            const timer = setTimeout(()=>{
                setActiveNotification(null);
            }, 1500);

            return () => {
                clearTimeout(timer);
            }
        }
    }, [activeNotification])

    const showNotificationHandler = (notificationData) => {
        setActiveNotification(notificationData);
    }

    const hideNotificationHandler = () => {
        setActiveNotification(null);
    }

    const context = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler,
    }

    return(
        <NotificationContext.Provider value={context}>
            {props.children}
        </NotificationContext.Provider>
    )
}