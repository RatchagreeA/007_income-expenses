import { useState, useEffect } from "react";
import "./FormComponent.scss";
import { v4 as uuidv4 } from "uuid";

const FormComponent = (props) => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState(0);
    const [formValid, setFormValid] = useState(false);
    const inputTitle = (event) => {
        setTitle(event.target.value);
    };
    const inputAmount = (event) => {
        setAmount(event.target.value);
    };
    const saveItem = (event) => {
        event.preventDefault();
        const itemData = {
            id: uuidv4(),
            title: title,
            amount: Number(amount),
        };
        props.onAddItem(itemData);
        setTitle("");
        setAmount(0);
    };
    useEffect(() => {
        const checkData = title.trim().length > 0 && amount !== 0;
        setFormValid(checkData);
    }, [title, amount]);
    return (
        <div className="form-container">
            <form onSubmit={saveItem} className="form-control">
                <div className="form-input">
                    <label>Detail</label>
                    <input
                        type="text"
                        placeholder="..."
                        onChange={inputTitle}
                        value={title}
                    />
                </div>
                <div className="form-input">
                    <label>Amount</label>
                    <input
                        type="number"
                        onChange={inputAmount}
                        value={amount}
                    />
                </div>
                <div className="form-submit">
                    <button type="submit" className="btn" disabled={!formValid}>
                        submit
                    </button>
                </div>
            </form>
        </div>
    );
};
export default FormComponent;
