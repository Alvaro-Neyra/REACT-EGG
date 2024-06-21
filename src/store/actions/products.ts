import { createAction } from "@reduxjs/toolkit"

const captureText = createAction(
    "captureText",
    (object) => {
        return {
            payload: { text: object.text }
        }
    }
)

const productsActions = { captureText };

export default productsActions;