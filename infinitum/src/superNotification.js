import { toast } from "react-toastify";
import store from "./store";

const notify = (msg, options) => { toast(msg, options) }

store.subscribe(() => {
    if (store.getState().showNotification) {
        notify(store.getState().notificationMsg, { type: toast.TYPE.ERROR })
    }
    console.log(store.getState().showNotification);
})