import "./App.scss";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DataContext from "./data/DataContext";
import FormComponent from "./components/FormComponent";
import Transaction from "./components/Transaction";
import ReportComponent from "./components/ReportComponent";

function App() {
    const design = { color: "black", textAlign: "center", fontsize: "1.5rem" };
    const iniData = [
        { id: 1, title: "Salary", amount: 5000 },
        { id: 2, title: "Electricity bill", amount: -1000 },
        { id: 3, title: "Water bill", amount: -300 },
    ];
    const [items, setItems] = useState(iniData);
    const onAddNewItem = (newItem) => {
        setItems((prevItem) => {
            return [newItem, ...prevItem];
        });
    };
    const [reportIncome, setReportIncome] = useState(0);
    const [reportExpense, setReportExpense] = useState(0);
    useEffect(() => {
        const amounts = items.map((items) => items.amount);
        const income = amounts
            .filter((val) => val > 0)
            .reduce((prev, curr) => (prev += curr), 0);
        const expense =
            amounts
                .filter((val) => val < 0)
                .reduce((prev, curr) => (prev += curr), 0) * -1;
        setReportIncome(income);
        setReportExpense(expense);
    }, [items, reportIncome, reportExpense]);

    return (
        <DataContext.Provider
            value={{
                income: reportIncome,
                expense: reportExpense,
            }}
        >
            <div className="container">
                <h1 className="title" style={design}>
                    Income - Expense
                </h1>
                <Router>
                    <div>
                        <ul className="Horizontal-menu">
                            <li>
                                <Link to="/">Summary</Link>
                            </li>
                            <li>
                                <Link to="/update">Update</Link>
                            </li>
                        </ul>
                        <Routes>
                            <Route path="/" element={<ReportComponent />} />
                            <Route
                                path="/update"
                                element={
                                    <div>
                                        <FormComponent
                                            onAddItem={onAddNewItem}
                                        />
                                        <Transaction items={items} />
                                    </div>
                                }
                            />
                        </Routes>
                    </div>
                </Router>
            </div>
        </DataContext.Provider>
    );
}

export default App;
